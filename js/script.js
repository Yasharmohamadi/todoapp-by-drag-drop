const $ = document;
const todoElem = $.querySelector('.todo');
const columnElems = $.querySelectorAll('.column');
const columnsElems = $.querySelectorAll('.columns');
const addTodoElem = $.querySelector('.btn_todo_add');
const modalContainerElem = $.querySelector('.modal_container');
const closeModalBtn = $.querySelector('.modal_btn_close');
const addTodoModalBtn = $.querySelector('.modal_btn_add');
const todoContainerElem = $.querySelector('.todo_container');
const modalInputElem = $.querySelector('.modal_input');
const newTodoPlaceElem = $.querySelector('#new_todo_place');
const todoCloseElem = $.querySelector('.todo_close');


function dragStartHandler(event) {
    event.dataTransfer.setData('elemId', event.target.id);
    console.log('ok');
};

function dropHandler(event) {
    let newToDoId = event.dataTransfer.getData('elemId');
    let newToDo = $.getElementById(newToDoId);
    event.target.append(newToDo)
};

function dragOverHandler(event) {
    event.preventDefault();
};
function openModal() {
    modalContainerElem.style.display = 'block';
    todoContainerElem.style.filter = 'blur(10px)';

};
function closeModal() {
    modalContainerElem.style.display = 'none';
    todoContainerElem.style.filter = 'blur(0)';
};

function addTodoOfModal() {
    let newModalTodo = $.createElement('div');
    newModalTodo.setAttribute('id', 'todo_id');
    newModalTodo.setAttribute('class', 'todo');
    newModalTodo.setAttribute('draggable', 'true');
    newModalTodo.innerHTML = modalInputElem.value;
    let modalTodoSpan = $.createElement('span');
    modalTodoSpan.innerHTML = '×';
    modalTodoSpan.setAttribute('class', 'todo_close');
    newModalTodo.append(modalTodoSpan);
    newTodoPlaceElem.append(newModalTodo);
    modalInputElem.value = '';
    newModalTodo.addEventListener('dragstart', dragStartHandler);
    modalTodoSpan.addEventListener('click', removetodo);
    closeModal();
}

function removetodo(event) {
    event.target.parentElement.remove();
    
};

function addTodoByKey(event) {
    if (event.key == 'Enter') {
        addTodoOfModal();
    }
}


columnElems.forEach(function (column) {
    column.addEventListener('dragover', dragOverHandler);
    column.addEventListener('drop', dropHandler);
});

todoElem.addEventListener('dragstart', dragStartHandler);
addTodoElem.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
addTodoModalBtn.addEventListener('click', addTodoOfModal);
todoCloseElem.addEventListener('click', removetodo);
modalInputElem.addEventListener('keydown', addTodoByKey);