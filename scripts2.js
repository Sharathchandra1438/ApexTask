document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;
        if (!name) {
            showError('nameError');
            isValid = false;
        }
        if (!email) {
            showError('emailError');
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            showError('emailError');
            isValid = false;
        }
        if (!message) {
            showError('messageError');
            isValid = false;
        }
        if (isValid) {
            document.getElementById('successMessage').style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                document.getElementById('successMessage').style.display = 'none';
            }, 5000);
        }
    });
    document.getElementById('name').addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('nameError');
        } else {
            hideError('nameError');
        }
    });
    document.getElementById('email').addEventListener('blur', function() {
        const email = this.value.trim();
        if (!email) {
            document.getElementById('emailError').textContent = 'Email is required';
            showError('emailError');
        } else if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please enter a valid email address';
            showError('emailError');
        } else {
            hideError('emailError');
        }
    });
    document.getElementById('message').addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('messageError');
        } else {
            hideError('messageError');
        }
    });
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    setTimeout(() => {
        todos = [
            { id: todoIdCounter++, text: 'Learn HTML & CSS', completed: true },
            { id: todoIdCounter++, text: 'Master JavaScript DOM manipulation', completed: false },
            { id: todoIdCounter++, text: 'Build responsive layouts', completed: false },
            { id: todoIdCounter++, text: 'Create interactive web applications', completed: false }
        ];
        renderTodos();
        updateTodoCount();
    }, 500);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function showError(errorId) {
    document.getElementById(errorId).style.display = 'block';
}
function hideError(errorId) {
    document.getElementById(errorId).style.display = 'none';
}
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.style.display = 'none');
    document.getElementById('successMessage').style.display = 'none';
}
let todos = [];
let todoIdCounter = 1;
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoText = todoInput.value.trim();
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    const todo = {
        id: todoIdCounter++,
        text: todoText,
        completed: false
    };
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
    updateTodoCount();
}
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
    updateTodoCount();
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
    updateTodoCount();
}
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
function updateTodoCount() {
    const remainingTodos = todos.filter(todo => !todo.completed).length;
    document.getElementById('todoCount').textContent = remainingTodos;
}