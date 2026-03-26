import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function AppContent() {
  const { dark, toggleDark } = useTheme();

  return (
    <div
      className={
        dark
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 text-black min-h-screen"
      }
    >
      <div className="p-5 flex flex-col items-center">
        <button
          onClick={toggleDark}
          className="mb-4 px-4 py-2 border rounded"
        >
          다크모드🌙
        </button>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
          <h1 className="text-xl font-bold mb-4">LUMI TODO</h1>

          <TodoForm />

          <div className="flex gap-4 mt-4">
            <TodoList title="할 일" isDone={false} />
            <TodoList title="완료" isDone={true} />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <AppContent />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;


