import axios from 'axios';

const Task_Actions = {
getTasks: (url) => {
     return (dispatch) => {
             return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
      .then(function(response) {
        dispatch({
            type: 'GET_TASKS',
            tasks: response.data.tasks
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},
addTask: (url,data) =>{
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
            type: 'ADD_TASK',
            tasks: response.data.tasks
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},
showTaskForm: (cardId) => {
    return dispatch => {
      dispatch({
        type: 'SHOW_TASK_FORM',
        cardId: cardId,
      });
    };
  },
  updateDragTask: (url,data) =>{
    return (dispatch) => {
        return axios({         
      url: url,
      timeout: 20000,
      method: 'post',
      data,
      responseType: 'json'
        })
      .then(function(response) {
        dispatch({
          type: 'UPDATE_TASK',
            tasks: response.data.tasks
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }

},
editTask: (url,data) =>{
    return (dispatch) => {
        return axios({         
      url: url.concat(data.id),
      timeout: 20000,
      method: 'put',
      data,
      responseType: 'json'
        })
      .then(function(response) {
        dispatch({
          type: 'UPDATE_TASK',
          tasks: response.data.tasks
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }
  },

  deleteTask: (url,id) =>{
    return (dispatch) => {
        return axios({         
      url: url.concat(id),
      timeout: 20000,
      method: 'delete',
      responseType: 'json'
        })
      .then(function(response) {
        dispatch({
          type: 'DELETE_TASK',
          tasks: response.data.tasks
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }

}
}

export default Task_Actions;
