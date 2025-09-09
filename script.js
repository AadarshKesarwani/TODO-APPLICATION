function loadTodos() {
    // this function will load the todos from the browser
    const todos = localStorage.getItem("todos");
    console.log(todos);
    return todos ? JSON.parse(todos) : { todolist: [] }; 
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todolist.push(todo); 
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todo) {
    const taskList=document.getElementById("taskList");


    const todoItem=document.createElement("li");

    const textDiv=document.createElement("div");

    textDiv.textContent=todo.text;
    todoItem.classList.add("todoItem");

    const wrapper=document.createElement("div");
    wrapper.classList.add("todoButtons");


    const completedBtn=document.createElement("button");
    completedBtn.textContent="COMPLETED";
    completedBtn.classList.add("completedBtn");

    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="DELETE";
    deleteBtn.classList.add("deleteBtn");

    const editBtn=document.createElement("button");
    editBtn.textContent="EDIT";
    editBtn.classList.add("editBtn");


    wrapper.appendChild(completedBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(editBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);


    taskList.appendChild(todoItem);  

}


function executeFilterAction(event){
    const element=event.target;
    const value=element.getAttribute("data-filter");
    const taskList=document.getElementById("taskList");
    taskList.innerHTML = '';
    // Load existing todos
    const todos = loadTodos();

    if(value==="all"){
        todos.todolist.forEach((todo) => { 
        appendTodoInHtml(todo);
        });
    }

    else if(value==="pending"){
        todos.todolist.forEach(todo=>{
            if(todo.isCompleted===false){
                appendTodoInHtml(todo);
            }
        })
    }
    else{//completed
        todos.todolist.forEach(todo=>{
            if(todo.isCompleted===true){
                appendTodoInHtml(todo);
            }
        })
    }

}




document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addtodo");
    const taskList = document.getElementById("taskList");

    const filterBtns=document.getElementsByClassName("filterBtn");

    for(btn of filterBtns){
        btn.addEventListener("click" , executeFilterAction)
    }

    // Load existing todos
    const todos = loadTodos();
    todos.todolist.forEach((todo) => { 
        appendTodoInHtml(todo);
    });

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value.trim();
        if (todoText === "") {
            alert("Please write something for todo");
        } else {
            addTodoToLocalStorage({text:todoText,isCompleted:false});
            appendTodoInHtml({text:todoText,isCompleted:false});
            todoInput.value = "";
        }
    });

    todoInput.addEventListener("change", (event) => {
        event.target.value = event.target.value.trim();
        console.log(event.target.value);
    });

    
});
