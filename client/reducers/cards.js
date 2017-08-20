export default function reducer(state = [], action = {}) {
     switch (action.type) {
    case 'GET_CARDS':
      return action.cards;
    case 'ADD_CARD':
      return  action.cards 
    case 'UPDATE_CARD':
      return  action.cards 
     case 'DELETE_CARD':
      return  action.cards     
    default:
      return state;
  }

}