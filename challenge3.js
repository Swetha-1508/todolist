document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task');
  const addTaskButton = document.getElementById('addTask');
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');

  addTaskButton.addEventListener('click', addTask);

  function addTask() {
      const taskText = taskInput.value;
      if (taskText.trim() !== '') {
          const taskElement = document.createElement('li');
          const timestamp = getCurrentDateTime();

          taskElement.innerHTML = `
              <span>${taskText}</span>
              <span class="timestamp">Added: ${timestamp}</span>
              <button class="complete-button">Complete</button>
              <button class="edit-button">Edit</button>
              <button class="delete-button">Delete</button>
          `;

          const completeButton = taskElement.querySelector('.complete-button');
          completeButton.addEventListener('click', markAsComplete);

          const editButton = taskElement.querySelector('.edit-button');
          editButton.addEventListener('click', editTask);

          const deleteButton = taskElement.querySelector('.delete-button');
          deleteButton.addEventListener('click', deleteTask);

          pendingTasksList.appendChild(taskElement);
          taskInput.value = '';
      }
  }

  function markAsComplete() {
      const taskElement = this.parentNode;
      const timestamp = taskElement.querySelector('.timestamp');
      timestamp.innerText = `Completed: ${getCurrentDateTime()}`;
      taskElement.classList.add('completed');
      completedTasksList.appendChild(taskElement);
  }

  function editTask() {
      const taskElement = this.parentNode;
      const taskText = taskElement.querySelector('span');
      const updatedTaskText = prompt('Edit task:', taskText.innerText);

      if (updatedTaskText !== null && updatedTaskText.trim() !== '') {
          taskText.innerText = updatedTaskText;
      }
  }

  function deleteTask() {
      this.parentNode.remove();
  }

  function getCurrentDateTime() {
      const now = new Date();
      return `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }
});
