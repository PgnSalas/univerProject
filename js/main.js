// looking for elements on the page
const form = document.querySelector('#form'),
      taskInput = document.querySelector('#taskInput'),
      taskList = document.querySelector('#tasksList'),
      emptyList = document.querySelector('#emptyList');

taskList.addEventListener('click', doneTask);

form.addEventListener('submit', addTask);

taskList.addEventListener('click', deleteTask);

taskList.addEventListener('click', doneTask);

function doneTask(e) {
    if (e.target.dataset.action === 'done') {
        const parentNode = e.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');
    };
}

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value;
    const taskHtml = `<li class="list-group-item d-flex justify-content-between task-item">
                        <span class="task-title">${taskText}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;

    // add on the page
    taskList.insertAdjacentHTML("beforeend", taskHtml);

    // clean field in input
    taskInput.value = '';
    taskInput.focus();

    if (taskList.children.length > 1) {
        emptyList.classList.add('none');
    } 
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return;

    const parentNode = e.target.closest('.list-group-item');
    parentNode.remove();

    if (taskList.children.length === 1) {
        emptyList.classList.remove('none');
    } 
} 

function saveHTMLtoLC() {
    localStorage.setItem('tasksHTML', taskList.innerHTML);
}

