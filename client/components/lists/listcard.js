import React from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import CardForm   from '../../components/cards/form';
import List_Actions from '../../actions/lists.js';
import Card from '../../components/cards/card';
import ItemTypes  from '../../constants/item_types';


const cardTarget = {
  drop(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    const source = {
      id: sourceProps.id,
      list_id: targetProps.id,
      card: targetProps.card
    };

    // if (!targetProps.cards.length) {
    //   targetProps.onDropCardWhenEmpty(source);
    // }
  },
};

@DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
  connectCardDropTarget: connect.dropTarget()
}))


export default class ListCard extends React.Component{
	constructor(props) {
        super(props);
        this._renderCards =  this._renderCards.bind(this)
        this._handleAddClick = this._handleAddClick.bind(this)
        this._renderAddNewCard = this._renderAddNewCard.bind(this)
        this._renderForm = this._renderForm.bind(this)
        this._hideCardForm = this._hideCardForm.bind(this)
        this._handleDropCard = this._handleDropCard.bind(this)
}

	_renderCards() {
    const { cards, dispatch , list, tasks, comments,isAddingNewComment,isAddingNewTask} = this.props;
    console.log(this.props)
    return cards.map((card) => {
      return (
        <Card
          card={card}
          dispatch={dispatch}
          list_id={list.id}
          tasks={tasks}
          comments={comments}
          isAddingNewComment={isAddingNewComment}
          isAddingNewTask={isAddingNewTask}
          onDrop={this._handleDropCard}
          />
      );
    });
  }

_handleDropCard({ source, target }){
      console.log("in list drop function")
      this.props.onDropCard({ source, target });

}

 
 _handleAddClick(){
   const { isAddingNewCard,dispatch ,list} = this.props;
   dispatch(List_Actions.showCardForm(list.id))
   
 }

_hideCardForm() {
    const { dispatch } = this.props;

  dispatch(List_Actions.showCardForm(null))
  }

  _renderAddNewCard() {
    const { isAddingNewCard } = this.props;
     
    if (!isAddingNewCard) {
      console.log(isAddingNewCard,"in add new card")
      return (<a className="add-new" href="#" onClick={this._handleAddClick}>Add a new Card...</a>);
    }
   return false;
    
  }

  _renderForm() {
    const { isAddingNewCard } = this.props;
    
    if (!isAddingNewCard) return false;

    const {  dispatch , list } = this.props;
    console.log(isAddingNewCard,"in form")
    return (
      <CardForm
        list={list}
        dispatch={dispatch}
       onCancelClick = {this._hideCardForm}
       onSubmit = {this._hideCardForm}
       />
    );
  }



	render(){
		const {dispatch,list, connectCardDropTarget} = this.props
		return connectCardDropTarget(
     
			<div className="col-md-2 list-container" >
      <div className="container col-sm-12">
      <span className="list_heading">{list.title}</span>

      {this._renderCards()}
      {this._renderForm()}
      <div className="add-new">
      {this._renderAddNewCard()}
      </div>
      </div>
      </div>
      
			)
	}
}
