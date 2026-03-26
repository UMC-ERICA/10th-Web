import { useState } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [formData, setFormData] = useState<string>("");
  const { addTodo } = useTodo();

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(e.target.value);
  };

  const handleAddTodo = () => {
    addTodo(formData);
    setFormData("");
  };

  return (
    <div className="panel__form">
      <input
        id="panel__todoInput"
        placeholder="할 일 입력"
        onChange={(e) => handleOnchange(e)}
        value={formData}
      />
      <button
        id="panel__button--add"
        type="button"
        onClick={() => handleAddTodo()}
      >
        추가
      </button>
    </div>
  );
};

export default TodoForm;
