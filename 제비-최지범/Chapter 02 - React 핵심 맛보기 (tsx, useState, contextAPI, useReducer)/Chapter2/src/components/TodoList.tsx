import Todo from "./Todo";

export const TodoList = ({ state, handleDone, deleteTodo, todoList }) => {
  return (
    <div
      className="ToDolist-Container__list"
      id={`${state === 0 ? "todoList" : "doneList"}`}
    >
      <h3>{state === 0 ? "할일" : "완료"}</h3>
      {todoList
        .filter((todo) => todo.state === state)
        .map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            handleDone={handleDone}
            deleteTodo={deleteTodo}
          />
        ))}
    </div>
  );
};
