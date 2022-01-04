import React, { useEffect, useState } from 'react';
import TodoItem from './components/todo-item';
import TodoInput from './components/todoinput/todoinput.jsx';
import { connect } from 'react-redux';
import storageDB from '../../../../services/storageDB.js';
import { deleteTodo, updateCompleted, updateProgress, updateTodo, setSelected, deleteFromSelected } from '../../actions/todo';
import './todowrapper.scss';

const TodoWrapper = ({todolist, selected, deleteTodo, updateCompleted, updateProgress, updateTodo, setSelected,deleteFromSelected}) => {
    const [todos,setTodos] = useState([]);

    useEffect(() => {
        storageDB.init().then( () => {
            storageDB.getTodo().then( (todolist) => {
                setTodos(todolist);
            });
        });
    });

    const onDeleteButtonClick = (time) => {
        deleteTodo(time);
    };

    const onDoneButtonClick = (todo) => {
        todo = {...todo, progress: "Completed"};
        updateCompleted(todo);
    };

    const onProgressButtonClick = (todo) => {
        if(todo.progress == "new"){
            todo = {...todo, progress: "In Progress"};
            updateProgress(todo);
        }
    };

    const onEditButtonClick = (todo) => {
        let inputFieldId = document.getElementById(todo.timestamp);
        inputFieldId.disabled = false;
        inputFieldId.hidden = false;
        inputFieldId.defaultValue = " ";
        inputFieldId.focus();
    };

    const inputKeyPressHandler = (todo,newTitle) => (e) => {
        let inputFieldId = document.getElementById(todo.timestamp);
        if(e.key == 'Enter'){
            inputFieldId.disabled = true;
            inputFieldId.hidden = true;
            if(newTitle != "" && newTitle.trim() != ""){
                todo = {...todo, text: newTitle};
                updateTodo(todo);
            }
        }
    };

    const checkedList = (todo) => (e) => {
        if(e.target.checked){
            setSelected(todo);
        } else{
            deleteFromSelected(todo);
        }
    };

    const handleSelected = (type) => (e) => {
        e.preventDefault();
        if(type == "delete"){
            selected.map( (todo,i) => {
                deleteTodo(todo.timestamp);
            })
        } else if(type == "progress") {
            selected.map( (todo,i) => {
                onProgressButtonClick(todo);
            });
        } else if(type == "completed") {
            selected.map( (todo,i) => {
                onDoneButtonClick(todo);
            });
        }
    };

    return (
        <div className='todo-wrapper'>
            <h1>TODO APP</h1>
            <TodoInput />
            <div className='icon-info-wrapper'>
                <div className='icon-info'>
                    <img className='img-button' src='../../../../assets/icons/progress-icon.png'/>
                    <span className='img-button'>In Progress</span>
                </div>
                <div className='icon-info'>
                    <img className='img-button' src='../../../../assets/icons/done-icon.png'/>
                    <span className='img-button'>Mark as Completed</span>
                </div>
                <div className='icon-info'>
                    <img className='img-button' src='../../../../assets/icons/delete-icon.png'/>
                    <span className='img-button'>Delete</span>
                </div>
            </div>
            <div className='icons-wrapper'>
                <img className='img-button' src='../../../../assets/icons/progress-icon.png' onClick={handleSelected("progress")} />
                <img className='img-button' src='../../../../assets/icons/done-icon.png' onClick={handleSelected("completed")} />
                <img className='img-button' src='../../../../assets/icons/delete-icon.png' onClick={handleSelected("delete")} />
            </div>
            <div>
            {todos.map((todo,i) => (
                <TodoItem key={i} item={todo} onDeleteButtonClick={onDeleteButtonClick} onDoneButtonClick={onDoneButtonClick} onProgressButtonClick={onProgressButtonClick} onEditButtonClick={onEditButtonClick} inputKeyPressHandler={inputKeyPressHandler} checkedList={checkedList} />
            ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    selected: state.selected,
    todolist: state.todolist
});

const mapDispatchToProps = dispatch => ({
    deleteTodo: time => dispatch(deleteTodo(time)),
    updateCompleted: todo => dispatch(updateCompleted(todo)),
    updateProgress: todo => dispatch(updateProgress(todo)),
    updateTodo: todo => dispatch(updateTodo(todo)),
    setSelected: todo => dispatch(setSelected(todo)),
    deleteFromSelected: todo => dispatch(deleteFromSelected(todo))
});

export default connect(mapStateToProps,mapDispatchToProps) (TodoWrapper);