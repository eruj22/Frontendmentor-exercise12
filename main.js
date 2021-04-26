// Selectors
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter');
const totalTasks = document.querySelector('.total-tasks span');
const checkbox = document.querySelector('.dark-mode');

const filterCompleted = document.querySelector('.filter-completed');
const filterActive = document.querySelector('.filter-active');
const filterClear = document.querySelector('.filter-clear');
const filterAll = document.querySelector('.filter-all');


// Event listeners
document.getElementById('form').addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(e) {
    // Prevent form from submitting
    e.preventDefault();
    
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    // sticking li into the div
    todoDiv.appendChild(newTodo);
    
    // check mark checkbox
    const completedCheckbox = document.createElement('input');
    completedCheckbox.type = 'checkbox';
    completedCheckbox.classList.add('complete-checkbox');
    todoDiv.appendChild(completedCheckbox);

    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-times"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // append to list
    todoList.appendChild(todoDiv);

    // clear to-do input value
    todoInput.value = '';

    countTodos();
}

function deleteCheck(e) {
    const item = e.target;

    // delete to-do
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('delete');
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
        deleteTodos();
    }



    // check mark
    if (item.classList[0] === 'complete-checkbox') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
    

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        filterActive.addEventListener('click', function() {
            if (todo.classList.contains('completed')) {
                todo.style.display = 'none';
            } else {
                todo.style.display = 'flex';
            }
        })
        filterCompleted.addEventListener('click', function() {
            if (todo.classList.contains('completed')) {
                todo.style.display = 'flex';
            } else {
                todo.style.display = 'none';
            }
        })
        filterClear.addEventListener('click', function() {
            if (todo.classList.contains('completed')) {
                todo.remove();
            }
        })
        filterAll.addEventListener('click', function() {
            todo.style.display = 'flex';
        })

    });
}

// number of added todos
function countTodos() {
    let len = document.querySelectorAll('.todo-list li').length;
    totalTasks.innerHTML = len;
}

// number of deleted todos
function deleteTodos() {
    let len = document.querySelectorAll('.todo-list li').length - 1;
    totalTasks.innerHTML = len;
}

// Toggle light and dark mode
const toggleColorMode = e => {
    if (e.currentTarget.classList.contains('light-hidden')) {
        document.documentElement.setAttribute('color-mode', 'light');
        return;
    }

    document.documentElement.setAttribute('color-mode', 'dark');

};

const toggleColorBtns = document.querySelectorAll('.color-mode-btn');

toggleColorBtns.forEach(btn => {
    btn.addEventListener('click', toggleColorMode);
});