export let tasksObj = [];
export const taskInput = document.getElementById('taskInput');
export const tasks = document.getElementById('tasks');
export const plusIcon = document.getElementById('plusImg');
export const currentDate = new Date();
export const regex = new RegExp("^[a-zA-Z0-9 ]+$");
export const dateRegex = new RegExp("^([0-2][0-9]|(3)[0-1])(\-)(((0)[0-9])|((1)[0-2]))(\-)\\d{4}$");
export const ENTER_KEY_CODE = 13;
export const STYLES = {
        COLOR : {
            LIGHTGREY_COLOR : 'lightgrey',
            BLACK_COLOR : 'black'
        },
        DISPLAY : {
             NONE : 'none',
             BLOCK : 'block'
        },
        TEXT : {
            LINE_THROUGH : 'line-through',
            NONE : 'none',
        },
        ATTR : {
             CHECKBOX : 'checkbox'
        }
}






