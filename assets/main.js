let todoList = localStorage.getItem("todoList");
function updateStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

let currentDisplaiedList = todoList;

function restart() {
  localStorage.removeItem("todoList");
  location.reload();
}

let currentID = 1;

async function getList() {
  const loading = document.getElementById("loading");
  loading.style.display = "block";
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  loading.style.display = "none";
  todoList = data.todos;
  updateStorage();
  currentDisplaiedList = todoList;
  displayList();
}
if (todoList == null) {
  getList();
} else {
  todoList = JSON.parse(todoList);
  currentDisplaiedList = todoList;
  displayList();
}

function displayList(currentList = currentDisplaiedList) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";
  currentList.forEach((todo) => {
    addTask(todo);
  });
  document.querySelector("footer").innerHTML = `Total TODOs: ${
    currentList.length
  }
  <br />
    Completed: ${
      currentList.filter((todo) => todo.completed).length
    } | Pending: ${currentList.filter((todo) => !todo.completed).length}`;
}

function addTask(todo) {
  currentID++;
  const list = document.getElementById("todo-list");
  const row = document.createElement("div");
  row.className = `todo-row ${todo.completed ? "completed" : ""}`;
  row.innerHTML = `
        <p class="todo-id">${todo.id}</p>
        <p class="todo-todo">${todo.todo}</p>
        <p class="todo-userId">${todo.userId}</p>
        <p class="todo-completed">${
          todo.completed ? "Completed" : "Pending"
        }</p>
        <div class="todo-btn">
            <button class="btn btn-delete" onclick="deleteTODO(${
              todo.id
            })">Delete</button>
            <button class="btn btn-done" onclick="doneTODO(${
              todo.id
            })">Done</button>
        </div>
    `;
  list.appendChild(row);
}

function deleteTODO(id) {
  if (confirm("Are you sure you want to delete this TODO?")) {
    const index = todoList.findIndex((todo) => todo.id == id);
    todoList.splice(index, 1);
    updateStorage();
    displayList();
  }
}
function doneTODO(id) {
  const index = todoList.findIndex((todo) => todo.id == id);
  todoList[index].completed = !todoList[index].completed;
  updateStorage();
  displayList();
}
function addTODO(e) {
  e.preventDefault();
  const todo = document.getElementById("todo-input");
  const todo_val = todo.value.trim();
  const userId = document.getElementById("user-id");
  const userId_val = userId.value.trim();
  if (!todo_val || !userId_val) {
    alert("Please enter TODO and User ID");
    return;
  }
  todoList.push({
    id: currentID,
    todo: todo_val,
    completed: false,
    userId: userId_val,
  });
  updateStorage();
  displayList();
  todo.value = "";
  userId.value = "";
}

document.getElementById("search-input").addEventListener("input", (e) => {
  const search = e.target.value.trim();
  const filteredList = todoList.filter((todo) =>
    todo.todo.toLowerCase().includes(search.toLowerCase())
  );
  currentDisplaiedList = filteredList;
  displayList();
});
