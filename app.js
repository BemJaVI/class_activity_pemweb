// --- Inisialisasi Elemen ---
const form = document.querySelector('#task-form');
const inputJudul = document.querySelector('#input-judul');
const inputMatkul = document.querySelector('#input-matkul');
const inputDeadline = document.querySelector('#input-deadline');
const errorMsg = document.querySelector('#error-msg');
const taskList = document.querySelector('#task-list');
const filterContainer = document.querySelector('#filter-buttons');
const taskCounter = document.querySelector('#task-counter');

// State Application
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'Semua';

// --- Commit "render": Fungsi utama untuk membangun UI ---
function render() {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'Aktif') return !task.selesai;
        if (currentFilter === 'Selesai') return task.selesai;
        return true; 
    });

    taskList.innerHTML = ''; 

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        if (task.selesai) li.classList.add('selesai');

        li.innerHTML = `
            <input type="checkbox" class="check-selesai" ${task.selesai ? 'checked' : ''}>
            <div class="task-content">
                <p class="task-title"></p>
                <p class="task-meta"></p>
            </div>
            <button class="delete-btn">X</button>
        `;

        li.querySelector('.task-title').textContent = task.judul;
        li.querySelector('.task-meta').textContent = `${task.matkul} • deadline ${task.deadline}`;

        taskList.appendChild(li);
    });

    const activeTasksCount = tasks.filter(t => !t.selesai).length;
    if (tasks.length === 0) {
        taskCounter.textContent = "Belum ada tugas. Yay!";
    } else {
        taskCounter.textContent = `${activeTasksCount} tugas aktif`;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

render();