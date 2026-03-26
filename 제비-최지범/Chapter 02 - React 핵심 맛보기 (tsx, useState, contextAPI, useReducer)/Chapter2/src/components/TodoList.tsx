import Todo from "./Todo";
import { useTodo } from "../context/TodoContext";

type TodoListProps = {
  state: 0 | 1;
};

export const TodoList = ({ state }: TodoListProps) => {
  const { todoList } = useTodo();

  return (
    <div
      className="ToDolist-Container__list"
      id={`${state === 0 ? "todoList" : "doneList"}`}
    >
      <h3>{state === 0 ? "할일" : "완료"}</h3>
      {todoList
        .filter((todo) => todo.state === state)
        .map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
    </div>
  );
};

export default TodoList;
