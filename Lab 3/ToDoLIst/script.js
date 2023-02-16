let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.List');
let del = document.querySelector('.del');

let todoList = [];

if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}
addButton.addEventListener('click',function(){
    let newTodo = {
        todo: addMessage.value,
        done: false
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo',JSON.stringify(todoList));
});
function displayMessages(){
    let displayMessage = '';
    for(let i = 0; i < todoList.length; i++){
        displayMessage += `
        <li id='task' class="${todoList[i].done === false ? 'checked' : 'unchecked'}">
            <input type='checkbox' id='item_${i}' ${todoList[i].done === true ? 'checked' : ''}>
            <label for='item_${i}'>${todoList[i].todo}</label>
        </li>
        <button class="del" id='item_${i}' onclick="deleting(id)"><img src="rubbish.png" class="rub"></button>
        `;
        todo.innerHTML = displayMessage;
        localStorage.setItem('todo',JSON.stringify(todoList));
    }
};
todo.addEventListener('change',function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+idInput+']');
    let valueLabel = forLabel.innerHTML;
    for(let i = 0; i < todoList.length; i++){
        if(todoList[i].todo === valueLabel){
            todoList[i].done = !todoList[i].done;
            displayMessages();
            localStorage.setItem('todo',JSON.stringify(todoList));
        }
    }
});
function deleting(id) {
    if(todoList.length === 1){
        todoList = [];
        todo.innerHTML = '';
        localStorage.setItem('todo',JSON.stringify(todoList));
    }
    else{
        let forLabel = todo.querySelector('[for='+id+']');
        let valueLabel = forLabel.innerHTML;
        for(let i = 0; i < todoList.length; i++){
            if(valueLabel == todoList[i].todo){
                todoList.splice(i,1);
            }
        }
        displayMessages();
    }
}