

const Actions = {
showCardForm: (listId) => {
    return dispatch => {
      dispatch({
        type: 'showCardForm',
        listId: listId,
      });
    };
  }

}	