
export class Task {
    text
    creationDate
    expirationDate

    constructor(taskData) {
        this.isCompleted = false;
        this.taskTextId = `taskTextId${Task.getUniqueId()}`;
        this.creationDateId = `creationDateId${Task.getUniqueId()}`;
        this.expirationDateId = `expirationDateId${Task.getUniqueId()}`;

        Object.assign(this,{ ...taskData });
    }

    static getUniqueId() {
        return Date.now();
    }

    getInnerHtml() {
        return `
            <div class="createdTask" id="${this.mainId}">
            
                <div class="createdTaskContent" id="${this.divId}">
                    <p id=${this.taskTextId}>Task: ${this.text}  
                    </p>
                    <p id=${this.creationDateId}>Creation Date: ${this.creationDate} 
                    </p>
                    <p id=${this.expirationDateId}>Expiration Date: ${this.expirationDate}
                    </p>
                </div>
                
            </div>
        `
    }
}