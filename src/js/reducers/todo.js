import storageDB from '../../../services/storageDB';
import { CREATE_TODO, DELETE_FROM_SELECTED, DELETE_TODO, SET_SELECTED, SET_TODOS, UPDATE_COMPLETED, UPDATE_PROGRESS, UPDATE_TODO } from '../actions/types';

const initialState = {
    todolist: [], 
    selected: [],
};

export const todoReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type) {
        case CREATE_TODO:
            storageDB.addTodo(payload.text).then(() => {
                state.todolist = [...state.todolist,payload];
            });
            return state;
        
        case DELETE_TODO:
            storageDB.deleteTodo(payload).then(() => {
                state.todolist = state.todolist.filter( (item) => item.timestamp != payload);
            });
            return state;

        case UPDATE_TODO:
        case UPDATE_COMPLETED:
        case UPDATE_PROGRESS:
            storageDB.updateProgress(payload).then(() => {
                storageDB.getTodo().then((todolist) => {
                    state.todolist = todolist;
                });
            });
            return state;
        
        case SET_TODOS:
            return {...state,todolist: payload};

        case SET_SELECTED:
            return {...state, selected: [...state.selected, payload]};

        case DELETE_FROM_SELECTED:
            return {...state, selected: state.selected.filter( (item) => item.timestamp != payload.timestamp)};

        default:
            return state;
    }
}