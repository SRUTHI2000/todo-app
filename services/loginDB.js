import bcrypt from 'bcryptjs';

function loginDB() {
    const dbName = "login";
    const that = {};
    const salt = bcrypt.genSaltSync(6);
    let db;
    const init = () => {
        const promise = new Promise( (resolve, reject) => {
            let dbRequest = indexedDB.open("login",1);

            dbRequest.onupgradeneeded = (event) => {
                db = event.target.result;
                let todoList;
                if(!db.objectStoreNames.contains('login')){
                    todoList = db.createObjectStore('login',{keyPath: 'user'});
                } else {
                    todoList = dbRequest.transaction.objectStore('login');
                }
            
                console.log("Create Index");
                todoList.createIndex('user','user',{ unique: true });
            };

            dbRequest.onsuccess = (event) => {
                db = event.target.result;
                resolve(true);
            };
            
            dbRequest.onerror = (event) => {
                alert('Error Opening Database' + event.target.errorCode);
            };
        });
        return promise;
    };

    const addUser = (username,password) => {
        const hashedPass = getHashedPassword(password,salt);
        const promise = new Promise( (resolve,reject) => {
            console.log(db);
            let txn = db.transaction(['login'],'readwrite');
            let store = txn.objectStore('login');
            store.add({username: username, password: hashedPass, salt: salt, user: username})
            .onsuccess = (event) => {
                resolve(event.target.result);
            };
        });
        return promise;
    };

    const getUser = () => {
        const promise = new Promise( (resolve,reject) => {
            let txn = db.transaction(['login'],'readonly');
            let store = txn.objectStore('login');
            let index = store.index('user');
            let req = index.openCursor(null,'next');
            let user = [];

            req.onsuccess = (event) => {
                let cursor = event.target.result;
                if(cursor != null) {
                    user.push(cursor.value);
                    cursor.continue();
                } else {
                    resolve(user);
                }
            };

        });
        return promise;
    };

    const getHashedPassword = (password,salt) => {
        let pass = bcrypt.hashSync(password,salt);
        return pass;
    };

    that.init = init;
    that.addUser = addUser;
    that.getUser = getUser;
    that.getHashedPassword = getHashedPassword;

    return that;
}

export default loginDB();