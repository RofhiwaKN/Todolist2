  // Fetch all todos from the server
  async function fetchTodos() {
    const response = await fetch('/api/todos');
    const todos = await response.json();
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.className = 'todo-item';
        listItem.innerHTML = `
            <input type="checkbox" ${todo.isComplete ? 'checked' : ''} 
                   onchange="toggleComplete(${todo.id}, this.checked)">
            ${todo.name} - ${todo.isComplete ? 'Complete' : 'Incomplete'}
            <button onclick="removeTodo(${todo.id})">Remove</button>
        `;
        todoList.appendChild(listItem);
    });
}

// Add a new todo
async function addTodo() {
    const name = document.getElementById('new-todo').value;
    if (!name) {
        alert("Please enter an activity.");
        return;
    }

    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
    });
    document.getElementById('new-todo').value = '';
    fetchTodos();
}

// Toggle the completion status of a todo
async function toggleComplete(id, isComplete) {
    await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isComplete })
    });
    fetchTodos();
}

// Delete a todo item with a confirmation 
async function removeTodo(id) {
    const confirmation = confirm("Are you sure you want to remove this todo item?");
    if (confirmation) {
        await fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        });
        fetchTodos();
    }
}

// Get all the items ready when the page loads
fetchTodos();