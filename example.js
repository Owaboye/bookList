const form = document.getElementById('task-form');
const taskInput = document.getElementById('task');
let taskList = document.querySelector('.list-group');
let cleartask = document.querySelector('.clear-tasks');
let filterTask = document.querySelector('#filter');

loadEvent();

function loadEvent(){
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    filterTask.addEventListener('keyup', filter);

    cleartask.addEventListener('click', clearTask);

}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        let li = document.createElement('li');
        li.classList.add('list-group-item');

        li.appendChild(document.createTextNode(task));

       let link = document.createElement('a');
       link.className = 'delete-item secondary-content';
       link.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';

       li.appendChild(link);

       taskList.appendChild(li);
    })
}

function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task')
    }

    let task = taskInput.value;

    //create li element
    let li = document.createElement('li');

    li.className = 'list-group-item';
    //console.log(li)

    //create and append text node to element
    li.appendChild(document.createTextNode(task))
    

    //create link
    let link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="glyphicon glyphicon-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append to ul to create task list
    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(task);

    taskInput.value = '';
    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure')){
            e.target.parentElement.parentElement.remove()

            //remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(task, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTask(){
    taskList.innerHTML = '';

    localStorage.clear();
}

//filter task
function filter(e){
    let text = e.target.value.toLowerCase();
    //console.log(text)
    document.querySelectorAll('.list-group-item').forEach(function(task){
        //console.log(task.firstChild.textContent)
       let item = task.firstChild.textContent
       if(item.toLowerCase().indexOf(text) != -1){
           task.style.display = 'block';
       }else{
        task.style.display = 'none';
       }

    })
}

//Store in locatstorage
function storeTaskInLocalStorage(task){
    let tasks;
    //console.log(task)
    if(localStorage.getItem('tasks') == null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        //console.log(tasks)
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

