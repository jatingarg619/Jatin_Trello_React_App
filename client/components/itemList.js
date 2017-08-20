import React from 'react';
import { connect } from 'react-redux';
import { 
    addCard
} from '../actions/index';
import Main from './Main.component';

  const mapStateToProps = (state) => {
        return {
            cardData:state.cardData,
            loading:state.loading,
            likeCount:state.likeCount,
            dislikeCount:state.dislikeCount,
            bookmarkStatus:state.bookmarkStatus,
            cardActive:state.cardActive
        };
    }

const mapDispatchToProps = (dispatch) => {
        return {
            getCards: (url) => dispatch(getCards(url)),
            deleteData:()=>dispatch(deleteData()),
            isLoading:(bool)=>dispatch(isLoading(bool)),
            like:(id,count)=>dispatch(like(id,count)),
            dislike:(id,count)=>dispatch(dislike(id,count)),
            bookmark:(id,status)=>dispatch(bookmark(id,status)),
            activeCard:(card)=>dispatch(activeCard(card)),
            addCard:(obj)=>dispatch(addCard(obj)),
            addCardBackend:(url,obj)=>dispatch(addCardBackend(url,obj))
        };
    }
    var App=connect(mapStateToProps, mapDispatchToProps)(Main);
export default App;
