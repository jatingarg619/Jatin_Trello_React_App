
export default function reducer(state = [], action = {}) {
     switch (action.type) {
    case 'GET_LISTS':
      return action.lists;
    case 'ADD_LIST':
      return action.lists;
    default:
      return state;
  }

}


