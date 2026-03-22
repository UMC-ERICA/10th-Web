const todoInput = document.getElementById(
  "panel__todoInput",
) as HTMLInputElement;
const add_button = document.getElementById("panel__button--add");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");

const handleAddToDo = (text: string) => {
  //미리 스타일 된 투두 생성
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const content = document.createElement("div");
  content.textContent = text;
  todo.appendChild(content);

  const doneButton = document.createElement("button");
  doneButton.classList.add("ToDo__button--done");
  doneButton.textContent = "완료";
  todo.appendChild(doneButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("ToDo__button--delete");
  deleteButton.textContent = "삭제";
  todo.appendChild(deleteButton);

  //리스트에 추가
  todoList?.appendChild(todo);

  //이벤트 리스너 등록
  doneButton.addEventListener("click", () => {
    doneList?.appendChild(todo);
  });
  deleteButton.addEventListener("click", () => {
    todo.remove();
  });
};

add_button?.addEventListener("click", () => {
  const text = todoInput?.value.trim() ?? "";
  if (!text) return;
  handleAddToDo(text);
  if (todoInput) todoInput.value = "";
});
