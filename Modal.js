import { Task } from "./Task.js";
import { createInputGroup, convertDate, isValidDate, isValidDateChange, isValidEnter, markAsInvalid, convertDateReadable, convertForInputDate  } from "./functions.js";
import { taskInput, tasksObj, STYLES} from "./variables.js";

export class Modal {
    selfId
    inputTaskId
    inputCreationId
    inputExpirationId
    buttonOKId
    buttonCANCELId
    modalTitle
    targetObject

    constructor(modalData) {
        Object.assign(this,{ ...modalData });

        this.selfInputTaskId = `selfInputTaskId${Task.getUniqueId()}`;
        this.selfInputCreationDateId = `selfInputCreationDateId${Task.getUniqueId()}`;
        this.selfInputExpirationDateId = `selfInputExpirationDateId${Task.getUniqueId()}`;

        this.changingTaskId = `changingTaskId${Task.getUniqueId()}`;
        this.changingCreationDateId = `changingCreationDateId${Task.getUniqueId()}`;
        this.changingExpirationDateId = `changingExpirationDateId${Task.getUniqueId()}`;

        this.buttonSAVEId = `buttonSAVEId${Task.getUniqueId()}`;
        this.buttonCANCELId = `buttonCANCELId${Task.getUniqueId()}`;
    }

    initializeModal() {
        return document.getElementById('forModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modalContent" id="modalContent">
                    <h2>${this.modalTitle}</h2>
                    
                    ${createInputGroup({
                        inputId: this.inputTaskId,
                        pText: `Task : `,
                        inputType: 'text'
                    })}
                    ${createInputGroup({
                        inputId: this.inputCreationId,
                        pText: `Creation Date :`,
                        inputType: 'date'
                    })}
                    ${createInputGroup({
                        inputId: this.inputExpirationId,
                        pText: `Expiration Date :`,
                        inputType: 'date'
                    })}
                    
            <div class="modalButtons" id="modalButtons">
                    <button class="SAVE" id="${this.buttonOKId}">SAVE</button>
                    <button class="CANCEL" id="${this.buttonCANCELId}">CANCEL</button>
            </div> 
        `
    }

    initializeChangeModal() {
        document.getElementById('forChangeModal').innerHTML = `
            <div id="${this.selfId}" class="modal">
                <div class="modalContent">
                    <h2>${this.modalTitle}</h2>
                    
                    ${createInputGroup({
                        inputId: this.changingTaskId,
                        pText: `Task : `,
                        inputType: 'text'
                    })}
                    ${createInputGroup({
                        inputId: this.changingCreationDateId,
                        pText: `Creation Date :`,
                        inputType: 'date'
                    })}
                    ${createInputGroup({
                        inputId: this.changingExpirationDateId,
                        pText: 'Expiration Date :',
                        inputType: 'date'
                    })}
            <div class="modalButtons" id="modalButtons">
                    <button class="SAVE" id="${this.buttonSAVEId}">SAVE</button>
                    <button class="CANCEL" id="${this.buttonCANCELId}">CANCEL</button>
            </div> 
        `
    }

    static clearInputs(modal) {
        document.getElementById(modal.inputTaskId).value = "";
        document.getElementById(modal.inputCreationId).value = "";
        document.getElementById(modal.inputExpirationId).value = "";
    }

    initializeInputDefaultValues() {
        document.getElementById(this.changingTaskId).value = this.targetObject.text;
        document.getElementById(this.changingCreationDateId).value = convertForInputDate(this.targetObject.creationDate);
        document.getElementById(this.changingExpirationDateId).value = convertForInputDate(this.targetObject.expirationDate);
    }

    static initializeHandlers(modal) {
        document.getElementById(modal.buttonOKId).addEventListener('click',function okClicked() {
            const inputTask = document.getElementById(modal.inputTaskId);

            const
                dateCreateId = document.getElementById(modal.inputCreationId),
                dateCreation = convertDate(dateCreateId.value);

            const
                dateExpId = document.getElementById(modal.inputExpirationId),
                dateExpiration = convertDate(dateExpId.value);

            if (isValidEnter(inputTask.value) && isValidDate(dateCreation, dateExpiration)) {
                const task = new Task({
                    text: inputTask.value,
                    creationDate: convertDateReadable(document.getElementById(modal.inputCreationId).value),
                    expirationDate: convertDateReadable(document.getElementById(modal.inputExpirationId).value),
                });

                tasksObj.push(task);
                document.getElementById('tasks').innerHTML += task.getInnerHtml();
                taskInput.value = "";
                Modal.clearInputs(modal);
                document.getElementById(modal.selfId).style.display = STYLES.DISPLAY.NONE;

            } else {
                if (!isValidEnter(inputTask.value)) {
                    markAsInvalid(inputTask);
                }

                if (!isValidDate(dateCreation, dateExpiration)) {
                    const creationElem = document.getElementById(modal.inputCreationId);
                    const expirationElem = document.getElementById(modal.inputExpirationId);

                    markAsInvalid(creationElem);
                    markAsInvalid(expirationElem);
                }
            }
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click', function cancelClicked() {
            document.getElementById(modal.selfId).style.display = STYLES.DISPLAY.NONE;
            Modal.clearInputs(modal);
        });
    }

    static initializeChangeHandlers(modal) {
        document.getElementById(modal.buttonSAVEId).addEventListener('click',function okClicked() {

            const
                changingTaskEl = document.getElementById(modal.changingTaskId),
                changingCreationDateEl = document.getElementById(modal.changingCreationDateId),
                changingExpirationDateEl = document.getElementById(modal.changingExpirationDateId);

            const
                changedTaskText = document.getElementById(modal.changingTaskId).value,
                changedTaskCreationDate = document.getElementById(modal.changingCreationDateId).value,
                changedTaskExpirationDate = document.getElementById(modal.changingExpirationDateId).value;

            const
                toChangeTaskElem = document.getElementById(modal.targetObject.taskTextId),
                toChangeCreationDateElem = document.getElementById(modal.targetObject.creationDateId),
                toChangeExpirationDateElem = document.getElementById(modal.targetObject.expirationDateId);

            let allChecked = (isValidEnter(changedTaskText) && isValidDateChange(convertDate(changedTaskCreationDate),convertDate(changedTaskExpirationDate)));

            if (allChecked) {
                toChangeTaskElem.innerText = `Task: ${changedTaskText}`;
                toChangeCreationDateElem.innerText = `Creation Date: ${convertDateReadable(changedTaskCreationDate)}`;
                toChangeExpirationDateElem.innerText = `Expiration Date: ${convertDateReadable(changedTaskExpirationDate)}`;

                const changedTaskObj = new Task({
                    isCompleted: modal.targetObject.isCompleted,
                    taskTextId: modal.targetObject.taskTextId,
                    creationDateId: modal.targetObject.creationDateId,
                    expirationDateId: modal.targetObject.expirationDateId,
                    mainId: modal.targetObject.mainId,
                    groupDivId: modal.targetObject.groupDivId,
                    checkBoxId: modal.targetObject.checkBoxId,
                    pencilEditId: modal.targetObject.pencilEditId,
                    crossRowId: modal.targetObject.crossRowId,
                    text: changedTaskText,
                    creationDate: convertDateReadable(changedTaskCreationDate),
                    expirationDate: convertDateReadable(changedTaskExpirationDate),
                });

                Task.replaceTask(changedTaskObj);
                document.getElementById(modal.selfId).style.display = STYLES.DISPLAY.NONE;

            } else {
                if (!isValidEnter(changedTaskText)) {
                    markAsInvalid(changingTaskEl);
                }
                if (!isValidDate(convertDate(changedTaskCreationDate),convertDate(changedTaskExpirationDate))) {
                    markAsInvalid(changingCreationDateEl);
                    markAsInvalid(changingExpirationDateEl);
                }
            }
        });

        document.getElementById(modal.buttonCANCELId).addEventListener('click',function cancelClicked() {
            document.getElementById(modal.selfId).style.display = STYLES.DISPLAY.NONE;
        });

    }

    visible() {
        document.getElementById(this.selfId).style.display = STYLES.DISPLAY.BLOCK;
    }

    initChange() {
        this.initializeChangeModal();
        this.initializeInputDefaultValues();
        Modal.initializeChangeHandlers(this);
        this.visible();
    }
}
