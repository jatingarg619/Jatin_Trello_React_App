import axios from 'axios';

const Comment_Actions = {
getComments: (url) => {
     return (dispatch) => {
             return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
      .then(function(response) {
        dispatch({
            type: 'GET_COMMENTS',
            comments: response.data.comments
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},
addComment: (url,data) =>{
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
            type: 'ADD_COMMENT',
            comments: response.data.comments
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},
showCommentForm: (taskId) => {
    return dispatch => {
      dispatch({
        type: 'SHOW_COMMENT_FORM',
        taskId: taskId,
      });
    };
  },
  
editComment: (url,data) =>{
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
          type: 'UPDATE_COMMENT',
          comments: response.data.comments
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }
  },

  deleteComment: (url,id) =>{
    return (dispatch) => {
        return axios({         
      url: url.concat(id),
      timeout: 20000,
      method: 'delete',
      responseType: 'json'
        })
      .then(function(response) {
        dispatch({
          type: 'DELETE_COMMENT',
          comments: response.data.comments
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }

}
}

export default Comment_Actions;
