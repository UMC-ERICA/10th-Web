const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

addBtn.addEventListener("click", () => {
  const text = input.value.trim();

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "완료";
  completeBtn.className = "complete-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "삭제";
  deleteBtn.className = "delete-btn";

  completeBtn.addEventListener("click", () => {
    doneList.appendChild(li);
    completeBtn.remove();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(completeBtn);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);

  input.value = "";
});