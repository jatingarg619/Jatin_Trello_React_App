export default function reducer(state = [], action = {}) {
     switch (action.type) {
    case 'GET_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return  action.tasks 
    case 'UPDATE_TASK':
      return  action.tasks  
    case 'DELETE_TASK':
     return action.tasks       
    default:
      return state;
  }

}