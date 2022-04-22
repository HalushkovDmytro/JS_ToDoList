import { Modal } from './Modal.js';
import { createNewTask,isValidEnter,rejectTask,} from "./functions.js";
import { taskInput,tasksObj,plusIcon } from "./variables.js";

taskInput.addEventListener('keypress',function (e) {
    if (e.keyCode == 13 && isValidEnter(taskInput.value)) {
        createNewTask();
    } else if (e.keyCode == 13 && !isValidEnter(taskInput.value)) {
        rejectTask();
    }
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
