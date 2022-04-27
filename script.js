import { Modal } from './Modal.js';
import { createNewTask, isValidEnter, rejectTask, MarkAsInProgress, MarkAsDone } from "./functions.js";
import { taskInput, tasksObj, plusIcon, tasks, ENTER_KEY_CODE, STYLES } from "./variables.js";
import { Task } from "./Task.js";

taskInput.addEventListener('keypress',function (e) {
    if (e.keyCode !== ENTER_KEY_CODE) {
        return
    }

    const isValid = isValidEnter(taskInput.value);

    isValid ? createNewTask() : rejectTask();
});

let modal = new Modal({
    selfId: 'modal',
    inputTaskId: 'inputTask',
    inputCreationId: 'inputCreation',
    inputExpirationId: 'inputExpiration',
    buttonOKId: 'buttonOK',
    buttonCANCELId: 'buttonCANCEL',
    modalTitle: 'Date setter'
});

modal.initializeModal();
Modal.initializeHandlers(modal);

plusIcon.addEventListener('click',function plusIconClicked() {
    modal.visible();
});

tasks.addEventListener('click',function chosenCheckbox(event) {
    if (event.target.type !== STYLES.ATTR.CHECKBOX) {
        return
    }

    const el = tasksObj.find((item) => item.checkBoxId === event.target.id);

    const htmlTaskElement = document.getElementById(el.mainId);

    event.target.checked ? MarkAsDone(el,htmlTaskElement) : MarkAsInProgress(el,htmlTaskElement);
});

tasks.addEventListener('click',function crossRowRemove(event) {
    const target = event.target;

    const isCrossRow = target.classList.contains('crossRow');

    const taskEl = tasksObj.find((item) => item.crossRowId === target.id);

    if (!isCrossRow || (target.id !== taskEl.crossRowId)) {
        return;
    }

    Task.deleteTask(taskEl.mainId);
});

tasks.addEventListener('click',function editTask(event) {
    const target = event.target;

    const isPencil = target.classList.contains('pencilEdit');

    const taskEl = tasksObj.find((item) => item.pencilEditId === target.id);

    if (!isPencil || (target.id !== taskEl.pencilEditId)) {
        return
    }

    const modalChange = new Modal({
        selfId: 'changeTask',
        modalTitle: 'Change the task',
        targetObject: taskEl,
    });

    modalChange.initChange();
});

document.getElementById('buttonAll').addEventListener('click', function showAll(){
    tasksObj.forEach((item) => {
        document.getElementById(item.mainId).style.display = STYLES.DISPLAY.FLEX;
    });
});

document.getElementById('buttonActive').addEventListener('click', function showActive(){
    tasksObj.forEach((item) => {
        if (!item.isCompleted) {
            document.getElementById(item.mainId).style.display = STYLES.DISPLAY.FLEX;
        } else {
            document.getElementById(item.mainId).style.display = STYLES.DISPLAY.NONE;
        }
    })
})

document.getElementById('buttonCompleted').addEventListener('click', function showComplited(){
    tasksObj.forEach((item) => {
        if(item.isCompleted){
            document.getElementById(item.mainId).style.display = STYLES.DISPLAY.FLEX;
        } else {
            document.getElementById(item.mainId).style.display = STYLES.DISPLAY.NONE;
        }
    })
})

document.getElementById('buttonClearCompleted').addEventListener('click', function clearCompleted() {
    const completedObj = tasksObj.filter( item => item.isCompleted === true)

    completedObj.forEach( item => Task.deleteTask(item.mainId));
})
