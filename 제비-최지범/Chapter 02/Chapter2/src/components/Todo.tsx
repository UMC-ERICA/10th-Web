import { useTodo } from "../context/TodoContext";

const Todo = ({ todo }) => {
  const { handleDone, deleteTodo } = useTodo();

  return (
    <div className="todo">
      <div className="content">{todo.name}</div>
      <div className="buttonBox">
        <button
          className="ToDo__button--done"
          onClick={() => handleDone(todo.id)}
        >
          완료
        </button>
        <button
          className="ToDo__button--delete"
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default Todo;
