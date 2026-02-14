// Array that stores our todo lists
let toDoList = [];

// Function to save the list to localStorage
function saveTodoList() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

// Function to initialize the list from localStorage
function initializeToDoList() {
    const savedList = localStorage.getItem('toDoList');

    if(savedList) {
        toDoList = JSON.parse(savedList);
    }
}

// codes to be executed when add button is clicked
function addTodo() {
    const inputDOM = document.querySelector('.to-do-input');
    const inputValue = inputDOM.value.trim();//.trim() method removes whitespaces at the beginning and end of the text   
    if(inputValue === "") {
        alert("Enter a todo task!");
        return;
    }else if(inputValue !== "") {
        toDoList.push({
            name: inputValue,
            completed: false
        });
    }
    inputDOM.value = "";
    saveTodoList();
    showTodoList();
}

// codes to show the list to the page
function showTodoList() {
    let todoListHTML = "";
    
    for (let i = 0; i < toDoList.length; i++) {
        const todoObject = toDoList[i];
        const name = todoObject.name;
        const completed = todoObject.completed;
        const isChecked = completed ? 'checked' : '';
        const classCompleted = completed ? 'completed' : '';

        const html = `
        <div>
        <span>
        <input type="checkbox" class="todo-checkbox" data-index="${i}" ${isChecked}>
        </span>
        <span class="todo-text ${classCompleted}">${name}</span>
        </span>
        <button class="todoDelete" data-index="${i}">&times;</button>
        </div>
        `;
        todoListHTML += html;
    }

    // rendering to the page...
    document.querySelector('.taskList').innerHTML = todoListHTML;

    // To delete each todo list one by one
    document.querySelectorAll('.todoDelete').forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click', () => {
            toDoList.splice(index, 1);
            saveTodoList();
            showTodoList();
        })
    });

    document.querySelectorAll('.todo-checkbox').forEach((checkbox, index) => {
        checkbox.addEventListener('change', (event) => {
            toDoList[index].completed = event.target.checked;
            saveTodoList();
            showTodoList();
        })
    })
}

// Initialize the app and attach listeners that only need to run once
document.addEventListener('DOMContentLoaded', () => {
    initializeToDoList();
    showTodoList();

    const addBtnDOM = document.querySelector('.add-button');
    addBtnDOM.addEventListener('click', addTodo);

    const inputDOM = document.querySelector('.to-do-input');
    inputDOM.addEventListener('keydown', (event) => {
        if(event.key === 'Enter') {
            addTodo();
        }
    });
});

// Modal functionality
const menuBtnDOM = document.querySelector('.menuBtn');
const menuContentDOM = document.querySelector('.modalContent');
const modalDOM = document.querySelector('.modal-overlay');
const modalCloseBtnDOM = document.querySelector('.modal-close-btn');

function openModal() {
    modalDOM.classList.add('is-visible');
}
function closeModal() {
    modalDOM.classList.remove('is-visible');
}

menuBtnDOM.addEventListener('click', openModal);
modalCloseBtnDOM.addEventListener('click', closeModal);
modalDOM.addEventListener('click', (event) => {
    if(event.target === modalDOM) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape' && modalDOM.classList.contains('is-visible')) {
        closeModal();
    }
})