const taskList = document.getElementById("taskList");
const tasks = [];
let draggedTaskId;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const task = { text: taskText, id: Date.now() };
    tasks.push(task);
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  taskList.innerHTML = tasks
    .map(
      (task) => `
        <div class="task-item" draggable="true" ondragstart="dragStart(event, ${task.id})" id="${task.id}">
            ${task.text}
            <button onclick="removeTask(${task.id})">Удалить</button>
        </div>
      `
    )
    .join("");
}

function removeTask(taskId) {
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index > -1) {
    tasks.splice(index, 1); // Удаляем задачу из массива
    renderTasks(); // Перерисовываем список задач
  }
}

function dragStart(event, taskId) {
  draggedTaskId = taskId;
  event.dataTransfer.effectAllowed = "move";
}

taskList.addEventListener("dragover", (event) => {
  event.preventDefault();
});

taskList.addEventListener("drop", (event) => {
  event.preventDefault();

  const dropTarget = event.target.closest(".task-item");
  if (dropTarget && dropTarget.id !== draggedTaskId) {
    const dropTargetId = parseInt(dropTarget.id);
    const draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId);
    const dropIndex = tasks.findIndex((task) => task.id === dropTargetId);

    const [draggedTask] = tasks.splice(draggedIndex, 1);
    tasks.splice(dropIndex, 0, draggedTask);

    renderTasks();
  }
});
