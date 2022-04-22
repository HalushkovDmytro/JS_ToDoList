import { regex,taskInput,tasksObj,currentDate } from "./variables.js";
import { Task } from "./Task.js"
//cheking the validation 
export function isValidEnter(userEnter) {
    return userEnter.match(regex);
}

// getting the current date
export function getCreationDate(currentDate) {
    let currentDay = currentDate.getDate(),
        currentMonth = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear();
    if (currentDay < 10) {
        currentDay = `0${currentDay}`
    }
    if (currentMonth < 10) {
        currentMonth = `0${currentMonth}`;
    }
    return `${currentDay}-${currentMonth}-${currentYear}`
    // currentDate.getMonth() + 1 : because months are from 0 to 11, we need : 1 - 12
}

// calculating the expiration date
export function getExpirationDate(currentDate) {
    const MAX_DAYS = 31;
    const START_VALUE = 1;
    const MAX_MONTHS = 12

    let expirationDay = currentDate.getDate() + 1,
        expirationMonth = currentDate.getMonth() + 1,
        expirationYear = currentDate.getFullYear();

    if (expirationDay > MAX_DAYS) {          // if more then days in month
        expirationDay = START_VALUE;         // then change on first day of month
        expirationMonth += START_VALUE;      // and change current month to the next month
    }
    if (expirationMonth > MAX_MONTHS) {  // if more then months in year
        expirationMonth = START_VALUE;   // then change on first month of year
        expirationYear += START_VALUE;             // and change current year to the next year
    }

    if (expirationMonth < 10) {
        expirationMonth = `0${expirationMonth}`;
    }

    return `${expirationDay}-${expirationMonth}-${expirationYear}`
}


export function createNewTask() {
    let theTask = new Task({
        text: taskInput.value,
        creationDate: getCreationDate(currentDate),
        expirationDate: getExpirationDate(currentDate)
    });
    tasksObj.push(theTask);
    tasks.innerHTML += theTask.getInnerHtml();
    taskInput.value = "";
};

export function rejectTask() {
    taskInput.style.color = 'rgba(246, 15, 15, 0.622)';
    taskInput.style.border = '1px solid rgba(246, 15, 15, 0.622)';
    taskInput.style.backgroundColor = 'rgba(246, 15, 15, 0.122)';
    setTimeout(() => {
        taskInput.style.color = 'black';
        taskInput.style.backgroundColor = 'white';
        taskInput.style.border = 'none';
        taskInput.style.borderBottom = '1px solid silver';
    },2000);
};

export function markAsInvalid(element) {
    element.style.color = 'rgba(246, 15, 15, 0.622)';
    element.style.border = '1px solid rgba(246, 15, 15, 0.622)';
    element.style.backgroundColor = 'rgba(246, 15, 15, 0.122)';
    setTimeout(() => {
        element.style.color = 'black';
        element.style.backgroundColor = 'white';
        element.style.border = 'none';
        element.style.borderBottom = '1px solid silver';
    },2000);
};

export function convertDate(dateString) {
    return dateString.split('.').reverse().join('-');
};

export function convertDateReadable(dateString) {
    return dateString.split('-').reverse().join('-');
};

export function isValidDate(dateStart,dateEnd) {
    const dateStartObject = new Date(dateStart);
    const dateEndObject = new Date(dateEnd);
    return ((Date.now() <= dateStartObject) && (dateStartObject <= dateEndObject));
};

export function createInputGroup({ inputId,pText,inputType }) {
    return `
        <div class="modalGroup">
            <p>${pText}<input id="${inputId}" class="modalTaskDate" type="${inputType}" required></p>
        </div>
   `
};
