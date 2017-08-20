const initialState = {
  addingNewCardInListId: null,
  addingNewTaskInCardId: null,
  addingNewCommentInTaskId: null,
  addingNewList:false
 };


export default function reducer(state = initialState, action = {}) {
     switch (action.type) {
     case 'SHOW_CARD_FORM': 
    return Object.assign({}, state, {
        addingNewCardInListId: action.listId
      }) 
    case 'SHOW_TASK_FORM': 
    return Object.assign({}, state, {
        addingNewTaskInCardId: action.cardId
      }) 
    case 'SHOW_COMMENT_FORM': 
    return Object.assign({}, state, {
        addingNewCommentInTaskId: action.taskId
      }) 
     case 'SHOW_LIST_FORM': 
    return Object.assign({}, state, {
        addingNewList: action.show
      }) 
    default:
      return state;
  }
}