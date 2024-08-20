import todoReducer from './todoSlice'
import {configureStore} from "@reduxjs/toolkit";

let store =configureStore({ reducer: {
        todos: todoReducer
    }})

export default store

