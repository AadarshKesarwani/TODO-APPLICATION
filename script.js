function loadTodos() {
    // this function will load the todos from the browser
    const todos = localStorage.getItem("todos");
    console.log(todos);
    return todos ? JSON.parse(todos) : { todolist: [] }; // ✅ use consistent name
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todolist.push(todoText); // ✅ same name as above
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todoText) {
    const taskList = document.getElementById("taskList");

    const todoItem = document.createElement("li");

    const textDiv =document.createElement("div");

    textDiv.textContent = todoText;
    todoItem.classList.add("todoItem");

    const wrapper=document.createElement("div");
    wrapper.classList.add("todoButtons")

    const editBtn=document.createElement("button");
    editBtn.textContent="EDIT";
    editBtn.classList.add("editBtn");

    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="DELETE";
    deleteBtn.classList.add("deleteBtn");

    const completedBtn=document.createElement("button");
    completedBtn.textContent="COMPLETED";
    completedBtn.classList.add("completedBtn");
    

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);


    todoItem.appendChild(textDiv)
    todoItem.appendChild(wrapper);



    
    taskList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addtodo");
    const taskList = document.getElementById("taskList");

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value.trim();
        if (todoText === "") {
            alert("Please write something for todo");
        } else {
            addTodoToLocalStorage(todoText);
            appendTodoInHtml(todoText);
            todoInput.value = "";
        }
    });

    todoInput.addEventListener("change", (event) => {
        event.target.value = event.target.value.trim();
        console.log(event.target.value);
    });

    // Load existing todos
    const todos = loadTodos();
    todos.todolist.forEach((todo) => { // ✅ fixed here also
        appendTodoInHtml(todo);
    });
});
