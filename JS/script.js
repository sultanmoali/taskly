const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
let tasks = [];

function AddTask() {
    const title = inputBox.value.trim();

    if (title === "") {
        alert("You must write something!");
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        completed: false
    });

    inputBox.value = "";
    saveData();
    displayTasks();
} 

listContainer.addEventListener("click", function (e) {
    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);

    if (e.target.tagName === "SPAN") {
        tasks = tasks.filter(function (t) {
            return t.id !== id;
        });
    } else {
        const task = tasks.find(function (t) {
            return t.id === id;
        });
        if (task) task.completed = !task.completed;
    }

    saveData();
    displayTasks();
}, false);

function displayTasks() {
    listContainer.innerHTML = "";

    tasks.forEach(function (task) {
        let li = document.createElement("li");
        li.textContent = task.title;
        li.dataset.id = task.id;

        if (task.completed) {
            li.classList.add("checked");
        }

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    });
}

function saveData() {
    localStorage.setItem("data", JSON.stringify(tasks));
}

function showTasks() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        tasks = JSON.parse(savedData);
    }
    displayTasks();
}


showTasks();