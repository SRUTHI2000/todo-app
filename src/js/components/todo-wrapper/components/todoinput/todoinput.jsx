import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../../../../actions/todo';
import './todoinput.scss';

const TodoInput = ({addTodo}) => {

    const [inp,setInp] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inp != "" && inp.trim() != ""){
            let todo = {text: inp, timestamp: Date.now(), progress: "new"};
            addTodo(todo);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='todo-input'>
                <input type="text" onChange={(e) => setInp(e.target.value)} />
                <button type='button' onClick={handleSubmit}>ADD TODO</button>
            </form>
        </div>
    );
};

//const mapStateToProps = ({text}) => ({text});

const mapDispatchToProps = dispatch => ({
    addTodo: (todo) => dispatch(addTodo(todo)),
});

export default connect(null,mapDispatchToProps) (TodoInput);