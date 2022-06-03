//Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")

//Event Listners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)

//Functions
function addTodo(event){
    //Prevent form from submiting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value)

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)

    //CHECK Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton)

    //APPEND TO LIST
    if(todoInput.value === ""){
        console.log("yes")
        void(0)
    }else{
        todoList.appendChild(todoDiv)
    }
    
    //Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    //Delete Todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        //Transition
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
        
    }

    //Check Mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

//Setting todos to local storage
function saveLocalTodos(todo){
    //CHECKS if todo is already in local storage
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    if(todoInput.value === ""){
        void(0)
    }else{
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    
} 

function getTodos(){
    //CHECKS if todo is already in local storage
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
    //Todo DIV
    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo); 

    //CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class = 'fas fa-check'></i>";
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton)

    //CHECK Trash BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class = 'fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton)

    //APPEND TO LIST
    todoList.appendChild(todoDiv)
    });
}


function removeLocalTodos(todo){
    //CHECKS if todo is already in local storage
    let todos;
    if (localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
