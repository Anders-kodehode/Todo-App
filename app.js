//creating database structure
const db = new Dexie("Todo App");
db.version(1).stores({ todos: "++id, todo" });

const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const tasks = document.querySelector("#tasks");

//add todo
form.onsubmit = async (event) => {
  event.preventDefault();
  const todo = input.value;
  await db.todos.add({ todo });
  await getTodos();
  form.reset();
};

//display todo
const getTodos = async () => {
  const allTodos = await db.todos.reverse().toArray();
  tasks.innerHTML = allTodos
    .map(
      (todo) =>
    `
    <div class="task">
        <div class="content">
            <input id="edit" class="text" readonly="readonly" type="text" value= ${todo.todo}>
    </div>
        <div class="actions">
            <button class="edit" onclick="editTodo(event, ${todo.id})">Edit</button>
            <button class="delete" onclick="deleteTodo(event, ${todo.id})">Delete</button>
        </div>
    </div>
    `
    )
};
window.onload = getTodos;

//edit todo
const editTodo = async (event, id) => {
    await db.todos.edit(id);
    await getTodos();
};

//delete todo
const deleteTodo = async (event, id) => {
  await db.todos.delete(id);
  await getTodos();
};