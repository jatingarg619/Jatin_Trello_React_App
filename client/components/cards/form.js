import React, { PropTypes } from 'react';
import PageClick            from 'react-page-click';
import Card_Actions from '../../actions/cards.js'
import * as cardLinks from '../../utils/cards.js'

export default class CardForm extends React.Component{
 

constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleCancelClick = this._handleCancelClick.bind(this)
}



_handleSubmit(e) {
     e.preventDefault();
    let { dispatch,list} = this.props;
    let { name }    = this.refs;
    let data = {
            id: parseInt(Math.random() * Math.random() * 999),
            title: name.value,
            list_id: list.id,
            tasks:[]
        }
     dispatch(Card_Actions.addCard(cardLinks.addCard,data));
    this.props.onSubmit()   
  }




 _handleCancelClick(e) {
       e.preventDefault();
      this.props.onCancelClick()
  }

 render(){
		return(
	 <PageClick onClick={this._handleCancelClick}>
        <div className="card-form">
          <form id="new_card_form" onSubmit={this._handleSubmit} >
            <textarea ref="name" id="card_name" type="text" required="true" rows={2} placeholder="Enter Card title..."/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button  className="btn btn-danger btn-sm" href="#" onClick={this._handleCancelClick}>cancel</button>
          </form>
        </div>
      </PageClick>
			)
	}
}