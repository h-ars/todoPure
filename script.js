const input = document.querySelector("#input");
const btn = document.querySelector("#taskBtn");
const listContainer = document.querySelector("#taskList");
const taskList = document.querySelector(".listItem");

function addTask() {
    const taskText = input.value.trim();
    if (!taskText) {
        alert("Enter task !!");
        return;
    }
    const li = document.createElement("li");
    li.classList.add("taskItem");
    const div = document.createElement('div')
    div.classList.add('store');
    const unchecked = document.createElement("i");
    unchecked.classList.add("fa-regular", "fa-square");
    const checked = document.createElement("i");
    checked.classList.add("fa-solid", "fa-square-check", "hide");
    const p = document.createElement("p");
    p.textContent = taskText;
    p.style.userSelect = "none";
    const xMark = document.createElement("i");
    xMark.classList.add("fa-solid", "fa-xmark");

    li.addEventListener("click", () => {
        if (li.classList.contains("checked")) {
            li.classList.remove("checked");
            unchecked.classList.remove("hide");
            checked.classList.add("hide");
            saveData();
        } else {
            li.classList.add("checked");
            unchecked.classList.add("hide");
            checked.classList.remove("hide");
            saveData();
        }
    });

    xMark.addEventListener("click", () => {
        li.remove();
        saveData();
    });

    div.appendChild(p);
    li.appendChild(div);
    li.appendChild(xMark);
    listContainer.appendChild(li);

    input.value = "";
    saveData();
}

function saveData(){
    localStorage.setItem('data',listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data') || "";
    
    document.querySelectorAll(".taskItem").forEach(li => {
        const xMark = li.querySelector(".fa-xmark");
        const unchecked = li.querySelector(".fa-regular.fa-square");
        const checked = li.querySelector(".fa-solid.fa-square-check");

        li.addEventListener("click", () => {
            li.classList.toggle("checked");
            unchecked.classList.toggle("hide");
            checked.classList.toggle("hide");
            saveData();
        });

        xMark.addEventListener("click", () => {
            li.remove();
            saveData();
        });
    });
}

btn.addEventListener("click", addTask);
showTask();

window.addEventListener('load',()=>{
    taskList.classList.remove('hide');
})
