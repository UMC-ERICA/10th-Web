import { useTodo } from "../context/TodoContext";
import TodoItem from "./TodoItem";

type Props = {
  title: string;
  isDone: boolean;
};

function TodoList({ title, isDone }: Props) {
  const { todos, doneTasks } = useTodo();

  const tasks = isDone ? doneTasks : todos;

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>

      <ul className="render-container__list">
        {tasks.map((task) => (
          <TodoItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;