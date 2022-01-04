function storageDB() {
    const dbName = "todolist";
    const that = {};
    let db;

    const init = () => {
        const promise = new Promise( (resolve, reject) => {
            let dbRequest = indexedDB.open("todolist",1);

            dbRequest.onupgradeneeded = (event) => {
                db = event.target.result;
                let todoList;
                if(!db.objectStoreNames.contains('todolist')){
                    todoList = db.createObjectStore('todolist',{keyPath: 'timestamp'});
                } else {
                    todoList = dbRequest.transaction.objectStore('todolist');
                }
            
                console.log("Create Index");
                todoList.createIndex('timestamp','timestamp',{ unique: false });
            };

            dbRequest.onsuccess = (event) => {
                db = event.target.result;
                resolve(true);
                //addTodoList(db);
            };
            
            dbRequest.onerror = (event) => {
                alert('Error Opening Database' + event.target.errorCode);
            };
        });
        return promise;
    };

    const addTodo = (text) => {
        const promise = new Promise( (resolve,reject) => {
            let txn = db.transaction(['todolist'],'readwrite');
            let store = txn.objectStore('todolist');
            store.add({text: text, timestamp: Date.now(), progress: "new"})
            .onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
        return promise;
    };

    const getTodo = () => {
        const promise = new Promise( (resolve,reject) => {
            let txn = db.transaction(['todolist'],'readonly');
            let store = txn.objectStore('todolist');
            let index = store.index('timestamp');
            let req = index.openCursor(null,'next');
            let todoList = [];

            req.onsuccess = (event) => {
                let cursor = event.target.result;
                if(cursor != null) {
                    todoList.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(todoList);
                }
            };

        });
        return promise;
    };

    const deleteTodo = (date) => {
        const promise = new Promise( (resolve,reject) => {
            let txn = db.transaction(['todolist'],'readwrite');
            let store = txn.objectStore('todolist');
            let index = store.index('timestamp');
            console.log("KeyPath",date);
            store.delete(date);
            txn.oncomplete = (e) => {
                resolve(e.target.result);
            };
        });
        return promise;
    };

    const updateProgress = (obj) => {
        const promise = new Promise( (resolve,reject) => {
            let txn = db.transaction(['todolist'],'readwrite');
            let store = txn.objectStore('todolist');
            store.put(obj).onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
        return promise;
    };

    that.init = init;
    that.getTodo = getTodo;
    that.addTodo = addTodo;
    that.deleteTodo = deleteTodo;
    that.updateProgress = updateProgress;
    return that;
}

export default storageDB();