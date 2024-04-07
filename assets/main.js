async function displayList() {
  const response = await fetch("https://dummyjson.com/todos");
  const data = await response.json();
  const list = document.getElementById("todo-list");
  for (const todo of data.todos) {
    const row = document.createElement("div");
    row.className = "todo-row";
    row.innerHTML = `
        <p class="todo-id">${todo.id}</p>
        <p class="todo-todo">${todo.todo}</p>
        <p class="todo-userId">${todo.userId}</p>
        <p>${todo.completed ? "Completed" : "Pending"}</p>
        <div class="todo-btn">
            <button class="btn btn-delete" onclick="deleteTODO()">Delete</button>
            <button class="btn btn-done">Done</button>
        </div>
    `;
    list.appendChild(row);
  }
}
displayList();

function deleteTODO(e) {
  console.log(e);
}
