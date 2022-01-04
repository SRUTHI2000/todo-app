import React, { useState } from 'react';
import './todoitem.scss';

const TodoItem = (props) => {
    const {item,onDeleteButtonClick, onDoneButtonClick, onProgressButtonClick, onEditButtonClick, inputKeyPressHandler, checkedList } = props;

    const [newTitle,setNewTitle] = useState("");

    return (
        <div className='todo-item'>
            <input className='todo-checkbox' type="checkbox" onClick={checkedList(item)} />
            <span className='todo-name'>{item.text}</span>
            <input className='todo-input-name' id={item.timestamp} type="text" disabled={true} hidden={true} onKeyPress={inputKeyPressHandler(item,newTitle)} onChange={(e) => setNewTitle(e.target.value)} />
            <span className='todo-progress'>Status: {item.progress}</span>
            <div className='icons'>
                <img src='../../../../../../assets/icons/edit-icon.png' onClick={(e) => {onEditButtonClick(item)}} />
                <img src='../../../../../../assets/icons/progress-icon.png' onClick={(e) => {onProgressButtonClick(item)}} />
                <img src='../../../../../../assets/icons/done-icon.png' onClick={(e) => {onDoneButtonClick(item)}} />
                <img src='../../../../../../assets/icons/delete-icon.png' onClick={(e) => {onDeleteButtonClick(item.timestamp)}} />
            </div>
        </div>
    );
};

export default  TodoItem;