import { FaTimes } from 'react-icons/fa'

const Todo=(props)=>{
    return (
        <div className={`todo ${props.todo.reminder? 'reminder':''}`}
        onDoubleClick={()=>props.onToggle(props.todo.id)}>
            <h3>{props.todo.text} <FaTimes style={{color:'red'}} onClick={()=>props.onDelete(props.todo.id)} /></h3>
            <p>{props.todo.day}</p>
        </div>
    )
}

export default Todo