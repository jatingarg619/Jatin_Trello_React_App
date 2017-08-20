export default function reducer(state = [], action = {}) {
     switch (action.type) {
    case 'GET_COMMENTS':
      return action.comments;
    case 'ADD_COMMENT':
      return  action.comments  
    case 'UPDATE_COMMENT':
      return  action.comments  
    case 'DELETE_COMMENT':
     return action.comments    
    default:
      return state;
  }

}