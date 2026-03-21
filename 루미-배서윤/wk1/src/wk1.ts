const input = document.getElementById("todo-input") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  const completeBtn = document.createElement("button");
  completeBtn.innerText = "완료";
  completeBtn.className = "complete-btn";

  completeBtn.addEventListener("click", () => {
    doneList.appendChild(li);
    completeBtn.remove();

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "삭제";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    li.appendChild(deleteBtn);
  });

  li.appendChild(span);
  li.appendChild(completeBtn);

  todoList.appendChild(li);

  input.value = "";
});