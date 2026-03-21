const todoInput = document.getElementById(
  "todoInput",
) as HTMLInputElement | null;
const add_button = document.getElementById("add_button");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

const handleAddToDo = (text: string) => {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const content = document.createElement("div");
  content.classList.add("content");
  content.textContent = text;
  todo.appendChild(content);

  const doneButton = document.createElement("button");
  doneButton.classList.add("doneButton");
  doneButton.textContent = "완료";
  todo.appendChild(doneButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.textContent = "삭제";
  todo.appendChild(deleteButton);

  todoList?.appendChild(todo);
};

todoList?.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const doneBtn = target.closest(".doneButton");
  if (!doneBtn) return;
  const todo = doneBtn.closest(".todo");
  if (!todo) return;
  doneList?.appendChild(todo);
});

doneList?.addEventListener("click", (e) => {
  const target = e.target;
  if (!(target instanceof Element)) return;
  const deleteBtn = target.closest(".delete");
  if (!deleteBtn) return;
  const todo = deleteBtn.closest(".todo");
  if (!todo) return;
  todo.remove();
});

add_button?.addEventListener("click", () => {
  const text = todoInput?.value.trim() ?? "";
  if (!text) return;
  handleAddToDo(text);
  if (todoInput) todoInput.value = "";
});
