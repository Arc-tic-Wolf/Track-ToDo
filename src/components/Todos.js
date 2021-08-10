import Todo from './Todo'



const Todos = (props) => {
    
    return (
        <>
        {props.todos.map((todo)=> (
            <Todo key={todo.id} todo={todo} onDelete={props.onDelete} onToggle={props.onToggle} />
        ))}
        </>
    )
}

export default Todos