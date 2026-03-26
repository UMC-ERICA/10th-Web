import "./App.css";
import TodoForm from "./components/TodoForm";
import { useState } from "react";
import { TodoList } from "./components/TodoList";

const App = () => {
  const [todoList, setTodoList] = useState([
    { name: "할일", state: 0, id: String(new Date()) + "todo" },
  ]);

  const deleteTodo = (id: string) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: string) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, state: 1 } : todo)),
    );
  };
  return (
    <div className="body">
      <div className="panel">
        <h2 className="panel_titleText">제비의 TS ToDo</h2>
        <TodoForm setTodoList={setTodoList} />
        <div className="ToDolist-Container">
          <TodoList
            state={0}
            todoList={todoList}
            handleDone={handleDone}
            deleteTodo={deleteTodo}
          />

          <TodoList
            state={1}
            todoList={todoList}
            handleDone={handleDone}
            deleteTodo={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
