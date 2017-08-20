import axios from 'axios';

const Card_Actions = {
getCards: (url) => {
     return (dispatch) => {
             return axios({
      url: url,
      timeout: 20000,
      method: 'get',
      responseType: 'json'
    })
      .then(function(response) {
        dispatch({
            type: 'GET_CARDS',
            cards: response.data.cards
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},

addCard: (url,data) =>{
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
            type: 'ADD_CARD',
            cards: response.data.cards
          })
      })
      .catch(function(response){
        console.log(response)
        })
      }
},

updateDragCard: (url,data) =>{
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
          type: 'UPDATE_CARD',
            cards: response.data.cards
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }

},

 editCard: (url,data) =>{
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
          type: 'UPDATE_CARD',
          cards: response.data.cards
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }
  },

  deleteCard: (url,id) =>{
    return (dispatch) => {
        return axios({         
      url: url.concat(id),
      timeout: 20000,
      method: 'delete',
      responseType: 'json'
        })
      .then(function(response) {
        dispatch({
          type: 'DELETE_CARD',
          cards: response.data.cards
          })
      })
      .catch(function(response){
        console.log(response)
        })

    }

}




}

export default Card_Actions;
