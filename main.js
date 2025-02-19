$(document).ready(function() {
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Render initial tasks
    renderTasks();

    // Form submission handler
    $('#task-form').on('submit', function(e) {
        e.preventDefault();
        
        const taskInput = $('#task-input');
        const taskText = taskInput.val().trim();
        
        if (taskText) {
            // Add new task
            tasks.push({
                id: Date.now(),
                text: taskText,
                completed: false
            });
            
            // Save to localStorage
            saveTasks();
            
            // Clear input
            taskInput.val('');
            
            // Render updated list
            renderTasks();
        }
    });

    // Task completion toggle
    $('#task-list').on('click', '.task-item', function(e) {
        if (!$(e.target).hasClass('delete-btn')) {
            const taskId = $(this).data('id');
            const taskIndex = tasks.findIndex(task => task.id === taskId);
            
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = !tasks[taskIndex].completed;
                saveTasks();
                renderTasks();
            }
        }
    });

    // Delete task
    $('#task-list').on('click', '.delete-btn', function(e) {
        e.stopPropagation();
        const taskId = $(this).closest('.task-item').data('id');
        
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    });

    // Helper function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Helper function to render tasks
    function renderTasks() {
        const taskList = $('#task-list');
        taskList.empty();

        tasks.forEach(task => {
            const taskElement = $(`
                <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <span class="task-text">${escapeHtml(task.text)}</span>
                    <button class="delete-btn">Excluir</button>
                </li>
            `);
            
            taskList.append(taskElement);
        });
    }

    // Helper function to escape HTML special characters
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});