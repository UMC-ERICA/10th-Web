import { useState } from "react";
import { useTodo } from "../context/TodoContext";

function TodoForm() {
  const [input, setInput] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTodo(input);
    setInput("");
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일 입력"
      />
      <button className="todo-container__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;