import { CREATE_TODO, DELETE_FROM_SELECTED, DELETE_TODO, SET_SELECTED, SET_TODOS, UPDATE_COMPLETED, UPDATE_PROGRESS, UPDATE_TODO } from "./types";

export const addTodo = todo => ({
    type: CREATE_TODO, payload: todo
});

export const deleteTodo = date => ({
    type: DELETE_TODO, payload: date
});

export const updateTodo = (todo) => ({
    type: UPDATE_TODO, payload: todo
});

export const updateProgress = todo => ({
    type: UPDATE_PROGRESS, payload: todo
});

export const updateCompleted = todo => ({
    type: UPDATE_COMPLETED, payload: todo
});

export const setTodos = todos => ({
    type: SET_TODOS, payload: todos
});

export const setSelected = todo => ({
    type: SET_SELECTED, payload: todo
});

export const deleteFromSelected = todo => ({
    type: DELETE_FROM_SELECTED, payload: todo
});