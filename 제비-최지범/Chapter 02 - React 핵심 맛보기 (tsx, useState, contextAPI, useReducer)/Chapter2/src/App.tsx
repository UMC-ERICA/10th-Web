import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useTodo } from "./context/TodoContext";

const App = () => {
  const { colorMode, setColorMode } = useTodo();
  return (
    <div
      className={`body ${colorMode === "color1" ? "bg-[#382a2a]" : "bg-[#374151]"}`}
    >
      <div className="panel">
        <h2 className="panel_titleText">제비의 TS ToDo</h2>
        <div className="flex gap-2">
          <button onClick={() => setColorMode("color1")}>color1</button>
          <button onClick={() => setColorMode("color2")}>color2</button>
        </div>
        <TodoForm />
        <div className="ToDolist-Container">
          <TodoList state={0} />
          <TodoList state={1} />
        </div>
      </div>
    </div>
  );
};

export default App;
