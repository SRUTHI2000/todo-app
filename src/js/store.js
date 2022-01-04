import {createStore, applyMiddleware} from 'redux';
import { todoReducer } from './reducers/todo';
import logger from "redux-logger";

export const store = createStore(todoReducer, applyMiddleware(logger));
