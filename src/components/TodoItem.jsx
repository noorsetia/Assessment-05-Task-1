import "./TodoItem.css";

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`todo ${todo.completed ? "done" : ""}`}>
            <input type="checkbox" checked={todo.completed} 
            onChange={() => onToggle(todo._id, todo.completed)} />

            <span>{todo.title}</span>

            <button onClick={() =>onDelete(todo._id)}>Delete</button>
        </div>
    );
}

export default TodoItem;

