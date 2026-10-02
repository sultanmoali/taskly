const list = document.getElementById("taskList");
const completedEl = document.getElementById("completedTasks");
const totalEl = document.getElementById("totalTasks");
const barFill = document.getElementById("barFill");


const hour = new Date().getHours();
const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
document.getElementById("greeting").textContent = greet + " 👋";

function render() {
    let tasks = [];
    try {
        tasks = JSON.parse(localStorage.getItem("data")) || [];
    } catch (e) {}

    const done = tasks.filter(t => t.completed).length;
    completedEl.textContent = done;
    totalEl.textContent = tasks.length;
    barFill.style.width = tasks.length ? (done / tasks.length * 100) + "%" : "0%";

    list.innerHTML = "";

    if (tasks.length === 0) {
        list.innerHTML = '<li class="empty">No tasks yet. Add your first one!</li>';
        return;
    }

    [...tasks]
        .sort((a, b) => a.completed - b.completed)
        .slice(0, 5)
        .forEach(t => {
            const li = document.createElement("li");
            li.textContent = t.title;
            if (t.completed) li.classList.add("checked");
            list.appendChild(li);
        });
}

render();

window.addEventListener("storage", render);