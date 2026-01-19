import TodoItem from "./TodoItem";
import "./TodoList.css";


function TodoList({ title, todos, onToggle, onDelete }) {
    return (
        <div>
            <h2> {title} ({todos.length}) </h2>

            {todos.length === 0 && <p>No Items</p>}

            {todos.map((todo) => (
                <TodoItem 
                key={todo._id} 
                todo={todo}
                onToggle={onToggle} 
                onDelete={onDelete} 
                />

            ))}
        </div>
    );
}

export default TodoList;