import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

type TodoContextValue = {
  todoList: Todo[];
  addTodo: (name: string) => void;
  deleteTodo: (id: string) => void;
  handleDone: (id: string) => void;
};

const TodoContext = createContext<TodoContextValue | null>(null);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const addTodo = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setTodoList((prev) =>
      prev.concat({
        name: trimmed,
        state: 0,
        id: String(new Date()) + "todo",
      }),
    );
  };

  const deleteTodo = (id: string) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: string) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, state: 1 } : todo)),
    );
  };

  return (
    <TodoContext.Provider value={{ todoList, addTodo, deleteTodo, handleDone }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within TodoProvider");
  }
  return context;
};
