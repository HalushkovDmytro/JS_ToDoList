import { Modal } from './Modal.js';
import { createNewTask,isValidEnter,rejectTask,} from "./functions.js";
import { taskInput,tasksObj,plusIcon,ENTER_KEY_CODE } from "./variables.js";
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

document.getElementById('tasks').addEventListener('click',function chosenCheckbox(event) {
    if (event.target.type === 'checkbox') {
        const el = tasksObj.find(item => item.checkBoxId === event.target.id);
        const realEl = document.getElementById(el.groupDivId);

        if (!el.isCompleted) {
            el.isCompleted = true;
            realEl.style.color = 'lightgrey';
            realEl.style.textDecoration = 'line-through';
        }

        else if (el.isCompleted) {
            el.isCompleted = false;
            realEl.style.color = 'black';
            realEl.style.textDecoration = 'none';
        }
        
        console.log(tasksObj)
        
    }

})
