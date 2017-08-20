import React, {Component} from "react";
import {connect} from "react-redux";
import ListCard from '../components/lists/listcard.js'
import List_Actions from '../actions/lists.js'
import Card_Actions from '../actions/cards.js'
import Task_Actions from '../actions/tasks.js'
import Comment_Actions from '../actions/comments.js'
import * as listLinks from '../utils/lists.js';
import * as cardLinks from '../utils/cards.js'
import * as taskLinks from '../utils/tasks.js'
import * as commentLinks from '../utils/comments.js'
import {DragDropContext}    from 'react-dnd';
import HTML5Backend        from 'react-dnd-html5-backend';
import ListForm from '../components/lists/form.js'

@DragDropContext(HTML5Backend)
class Content extends React.Component {
	constructor(props) {
        super(props);
        this._renderLists =  this._renderLists.bind(this)
        this._handleDropCard = this._handleDropCard.bind(this)
        this._renderAddNewList =  this._renderAddNewList.bind(this)
        this._renderForm =  this._renderForm.bind(this)
        this._handleAddClick = this._handleAddClick.bind(this)
        this._hideListForm = this._hideListForm.bind(this)
}

componentDidMount() {
		const {store} = this.props	
	    const {dispatch} = store
	    dispatch(List_Actions.getLists(listLinks.getLists))
	    dispatch(Card_Actions.getCards(cardLinks.getCards))
	    dispatch(Task_Actions.getTasks(taskLinks.getTasks))
	    dispatch(Comment_Actions.getComments(commentLinks.getComments))

	}

_handleDropCard({ source, target }){
	const {cards, dispatch} = this.props
	
	const sourceCardIndex = cards.findIndex((card) => { return card.id === source.id; });
    const sourceCard = source.card;
    const targetCardIndex = cards.findIndex((card) => { return card.id === target.id; });
    const targetCard = target.card;

    let data = {
            id: sourceCard.id,
            title: sourceCard.title,
            list_id: target.list_id,
            tasks:[],
            target_index: targetCardIndex,
            source_index: sourceCardIndex
        }
     dispatch(Card_Actions.updateDragCard(cardLinks.updateDragCard, data))

}	

_handleAddClick(){
const {store } = this.props;
const {dispatch} = store
dispatch(List_Actions.showListForm(true))
}

_hideListForm(){
const {store } = this.props;
const {dispatch} = store
dispatch(List_Actions.showListForm(false))
}
_renderForm(){
  const { addingNewList } = this.props.common;
    
    if (!addingNewList) return false;

    const {  store , list } = this.props;
    const {dispatch} = store
    return (
      <ListForm
        dispatch={dispatch}
       onCancelClick = {this._hideListForm}
       onSubmit = {this._hideListForm}
       />
    );
}

_renderLists(){
	const {store, cards, tasks, comments,lists} =  this.props
	const {addingNewCardInListId,addingNewTaskInCardId,addingNewCommentInTaskId} = this.props.common
	const {dispatch} = store
	return lists.map((list) => {
      return (
        <ListCard
          list={list}
          dispatch ={dispatch}
          cards ={cards}
          tasks = {tasks}
          comments ={comments}
          isAddingNewCard={addingNewCardInListId === list.id}
		  isAddingNewTask={addingNewTaskInCardId}
		  isAddingNewComment={addingNewCommentInTaskId}
		  onDropCard={this._handleDropCard}
		 />
      );
    });
}
_renderAddNewList(){
    const { addingNewList } = this.props.common;
     
    if (!addingNewList) {
      return (<a className="add-new" href="#" onClick={this._handleAddClick}>Add a new List...</a>);
    }
   return false;
  }
	render(){
		const {store,lists} = this.props
		const {dispatch} = store
		return(
      <div className="content">
     
			<div className="row-flex" style={{marginLeft: '10px'}}>{this._renderLists()}
      <div className="list-container">
      <div className="container col-sm-12">
      {this._renderForm()}
              {this._renderAddNewList()}
               </div> 
              </div>
          </div>
   
			</div>
        )
		
}

}


const mapStateToProps = (state) => {
        return {
            lists:state.lists,
            cards:state.cards,
            tasks:state.tasks,
            comments:state.comments,
            common:state.common
		};
    }



export default connect(mapStateToProps)(Content);