import { useState } from "react";

const TodoForm = ({ setTodoList }) => {
  const [formData, setFormData] = useState<string>("");

  const handleOnchange = (e: any) => {
    setFormData(e.target.value);
  };
  const handleAddTodo = () => {
    setTodoList((prev) =>
      prev.concat({
        name: formData,
        state: 0,
        id: String(new Date()) + "todo",
      }),
    );
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
