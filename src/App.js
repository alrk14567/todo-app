import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToDo, deleteToDo, toggleToDo} from "./redux/todoSlice";

function App() {
    let [name, setName] = useState('')
    let [detail, setDetail] = useState('')
    let [deadline, setDeadline] = useState('')

    let todos = useSelector(state => state.todos.todos)
    let dispatch = useDispatch()
    //dispatch 에서 name,detail,deadline 를 보낼건데 이 모든것을 합해서 payload라고 부른다.
    let onSubmit = (e) => {
        e.preventDefault()
        dispatch(addToDo({
            name, detail, deadline
        }))
        setName('')
        setDetail('')
        setDeadline('')
    }

    let getBackgroundColor = (deadline) => {
        let currentDate = new Date()
        let dueDate = new Date(deadline)
        let timeDiff = dueDate - currentDate
        timeDiff= timeDiff/1000/60/60/24
        return timeDiff <= 1 ? 'red' : timeDiff <= 2 ? 'lightgrey' : 'skyblue'
    }

    return (
        <div className="App">
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="할일" value={name} onChange={e => setName(e.target.value)} required/><br/>
                <input type="text" placeholder="세부내용" value={detail} onChange={e => setDetail(e.target.value)}
                       required/><br/>
                <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} required/><br/>
                <button type="submit">할일 추가하기</button>
            </form>
            <ul>
                {todos.map(t => (
                    <li
                        key={t.id}
                        style={{
                            backgroundColor: getBackgroundColor(t.deadline),
                            textDecoration: t.completed ? 'line-through':'none'
                        }}
                    >
                        <h1>{t.name}</h1>
                        <h2>{t.detail}</h2>
                        <h2 color="brown">D-day: {new Date(t.deadline).toLocaleDateString()}</h2>
                        <h2>추가일: {new Date(t.created).toLocaleDateString()}</h2>
                        <button onClick={() => dispatch(toggleToDo(t.id))}>
                            {t.completed ? 'MISSION COMPLETE!!!!' : 'MISSION FAIL....'}
                        </button>
                        <button onClick={()=> dispatch(deleteToDo(t.id))}>
                            삭제하기
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
