import { Modal } from './Modal.js';
import { createNewTask,isValidEnter,rejectTask,MarkAsInProgress,MarkAsDone } from "./functions.js";
import { taskInput,tasksObj,plusIcon,ENTER_KEY_CODE,tasks,CHECKBOX } from "./variables.js";
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
    if (event.target.type === CHECKBOX) {
        const el = tasksObj.find((item) => item.checkBoxId === event.target.id);
        const realEl = document.getElementById(el.mainId);
        event.target.checked ? MarkAsDone(el,realEl) : MarkAsInProgress(el,realEl);
    }
})


tasks.addEventListener('click',function crossRowRemove(event) {
    if (event.target.classList.contains('crossRow')) {
        const el = tasksObj.find((item) => item.crossRowId === event.target.id);
        if (event.target.id === el.crossRowId) {
            Task.deleteTask(el.mainId);
        }
    }
})


