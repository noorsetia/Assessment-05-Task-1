import { useState } from "react";
import "./AddTodoForm.css";

function AddTodoForm({ onAdd }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) 
            return ;

        setLoading(true);
        await onAdd(text.trim());
        setText("");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={text} onChange={(e) => setText(e.target.value)}
            placeholder ="Enter todo" disabled={loading} />

            <button disabled={loading || !text.trim()}> Add </button>
            </form>
    );
}

export default AddTodoForm;
