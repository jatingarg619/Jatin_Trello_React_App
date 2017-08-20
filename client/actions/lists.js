import Constants from '../constants';
import axios from 'axios';

const List_Actions = {
  showCardForm: (listId) => {
    return dispatch => {
      dispatch({
        type: 'SHOW_CARD_FORM',
        listId: listId,
      });
    };
  },

  getLists: (url) => {
     return (dispatch) => {
             return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
      .then(function(response) {
        console.log(response)
        dispatch({
            type: 'GET_LISTS',
            lists: response.data.lists
          })

      })
      .catch(function(response){
        console.log(response)
        })
      }
},

  addList: (url,data) =>{
  return (dispatch) => {
             return axios({
      url: url,
      timeout: 20000,
      method: 'post',
      data,
      responseType: 'json'
    })
      .then(function(response) {
       console.log(response)
        dispatch({
            type: 'ADD_LIST',
            lists: response.data.lists
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},
showListForm: (show) => {
    return dispatch => {
      dispatch({
        type: 'SHOW_LIST_FORM',
        show: show,
      });
    };
  },
};

export default List_Actions;
