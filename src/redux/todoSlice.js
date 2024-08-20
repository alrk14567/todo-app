import {createSlice} from '@reduxjs/toolkit'
import {v4 as uuidv4} from 'uuid'

let initialState ={
    todos: []
}
// app 에서 보내주는 모든 것을 payload라고 한다.
let todoSlice=createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo: (state, action) => {
            state.todos.push({
                id: uuidv4(),
                ...action.payload,
                created: new Date().toISOString(),
                completed:false
            })
            state.todos.sort((a, b)=> new Date(a.deadline)-new Date(b.deadline))
        },
        toggleToDo: (state,action) => {
            let todo = state.todos.find(t=> t.id === action.payload)
            todo.completed = !todo.completed
        },
        deleteToDo: (state, action) => {
            state.todos = state.todos.filter(t=> t.id !== action.payload)
        }
    }
})

export let {addToDo, toggleToDo, deleteToDo} =todoSlice.actions
export default todoSlice.reducer