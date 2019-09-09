// var lunch = {
//     sandwich: 'ham',
//     snack: 'chips',
//     drink: 'soda',
//     desert: 'cookie',
//     guests: 3,
//     alcohol: false,
//     };

//     for (const key in lunch) {
//         if (lunch.hasOwnProperty(key)) {
//             const element = lunch[key];
//             console.log(element);    
//         }
//     }

    document.querySelector('#taskForm').addEventListener('submit', inPut);

    function inPut(e){
        let task = document.querySelector('#title').value;

        let tasks 
        if(localStorage.getItem('tasks') == null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        task.value = '';
        e.preventDefault();
    }

    tasks = JSON.parse(localStorage.getItem('tasks'));
    console.log(tasks)
    tasks.forEach(element => {
        console.log(element)
    });

