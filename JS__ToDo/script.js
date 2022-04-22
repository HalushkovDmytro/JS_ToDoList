import { Modal } from './Modal.js';
import { createNewTask,isValidEnter,rejectTask,} from "./functions.js";
import { taskInput,tasksObj,plusIcon,ENTER_KEY_CODE } from "./variables.js";

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
