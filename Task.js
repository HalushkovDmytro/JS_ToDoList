import { tasksObj } from "./variables.js";


export class Task {
    text
    creationDate
    expirationDate

    constructor(taskData) {
        this.isCompleted = false;
        this.taskTextId = `taskTextId${Task.getUniqueId()}`;
        this.creationDateId = `creationDateId${Task.getUniqueId()}`;
        this.expirationDateId = `expirationDateId${Task.getUniqueId()}`;
        this.mainId = `mainId${Task.getUniqueId()}`;
        this.groupDivId = `groupDivId${Task.getUniqueId()}`;
        this.checkBoxId = `checkBoxId${Task.getUniqueId()}`;
        this.crossRowId = `crossrow${Task.getUniqueId()}`;
        Object.assign(this,{ ...taskData });
    }

    static getUniqueId() {
        return Date.now();
    }

    getInnerHtml() {
        return `
            <div class="createdTask" id="${this.mainId}">
                <div id="createdTaskCheckboxContainer" class="createdTaskCheckboxContainer">
                    <input id="${this.checkBoxId}" name="createdCheckBox" type="checkbox" ${this.isCompleted ? 'checked' : ''} class="createdTaskCheckbox">
                </div>
                <div class="createdTaskContent" id="${this.groupDivId}">
                    <p id=${this.taskTextId}>Task: ${this.text}  
                    </p>
                    <p id=${this.creationDateId}>Creation Date: ${this.creationDate} 
                    </p>
                    <p id=${this.expirationDateId}>Expiration Date: ${this.expirationDate}
                    </p>
                </div>
                <div class="createdTaskOptions">
                    <div class="crossRowContainer">
                    <img src="./img/crossImg.png" id="${this.crossRowId}" class="crossRow" style="width: 20px; height: 20px; cursor: pointer">
                    </div>
                </div>
            </div>
        `
    }

    static deleteTask(createdTaskId) {
        document.getElementById(createdTaskId).remove();

        const removeTaskIndex = tasksObj.findIndex( (item) => item.mainId === createdTaskId)

        tasksObj.splice(removeTaskIndex,1)
    }
}












































