// 1. Calculator yazin
// 2. Faktoriali hesablayan proqram
// 3. to do list

const form = document.getElementById("form");
const inputField = document.getElementById("inputField");
const tasks = [];

form.onsubmit = (e) => {
  e.preventDefault();
  const obj = {
    id: Date.now(),
    taskName: inputField.value,
  };
  tasks.push(obj);
  console.log(tasks);
  inputField.value = "";
  updatedList();
};

const list = document.getElementById("list");

const updatedList = () => {
  list.innerHTML = "";
  tasks.forEach((task) => {
    list.innerHTML += `
   <div class="element">
  <ul>
    <li>${task.taskName}</li></ul>
    <button onclick="deleteTasks(${task.id})">Delete</button>
</div>
    `;
  });
};

const deleteTasks = (id) => {
  const index = tasks.findIndex((task) => id === task.id);
  if (id !== -1) {
    tasks.splice(index, 1);
  }
  updatedList();
};
