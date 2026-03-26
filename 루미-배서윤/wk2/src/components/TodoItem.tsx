import type { Task } from "../types";
import { useTodo } from "../context/TodoContext";

type Props = {
  task: Task;
  isDone: boolean;
};

function TodoItem({ task, isDone }: Props) {
  const { completeTask, deleteTask } = useTodo();

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>

      <button
        className={`render-container__item-button ${
          isDone ? "delete" : "complete"
        }`}
        onClick={() => {
          if (isDone) {
            deleteTask(task); 77777777777777777                                                                                                                                                                                                                                                                                                                                                                                                                  
          } else {
            completeTask(task);
          }
        }}
      >
        {isDone ? "삭제" : "완료"} 
      </button>
    </li>
  );
}

export default TodoItem;