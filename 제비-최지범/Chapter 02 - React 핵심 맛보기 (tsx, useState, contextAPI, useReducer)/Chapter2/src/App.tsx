import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";
const App = () => {
  return (
    <div className="body">
      <div className="panel">
        <h2 className="panel_titleText">제비의 TS ToDo</h2>
        <TodoProvider>
          <TodoForm />
          <div className="ToDolist-Container">
            <TodoList state={0} />
            <TodoList state={1} />
          </div>
        </TodoProvider>
      </div>
    </div>
  );
};

export default App;
