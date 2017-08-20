import React, { PropTypes } from 'react';
import PageClick            from 'react-page-click';
import List_Actions from '../../actions/lists.js'
import * as ListLinks from '../../utils/lists.js'

export default class ListForm extends React.Component{
 

constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleCancelClick = this._handleCancelClick.bind(this)
}



_handleSubmit(e) {
     e.preventDefault();
    let { dispatch} = this.props;
    let { name }    = this.refs;
    let data = {
            id: parseInt(Math.random() * Math.random() * 999),
            title: name.value,
            cards:[]
        }
     dispatch(List_Actions.addList(ListLinks.addList,data));
    this.props.onSubmit()   
  }




 _handleCancelClick(e) {
       e.preventDefault();
      this.props.onCancelClick()
  }

 render(){
		return(
	 <PageClick onClick={this._handleCancelClick}>
        <div className="form-card">
          <form id="new_list_form" onSubmit={this._handleSubmit} >
            <textarea ref="name" id="list_name" type="text" required="true" rows={2} placeholder="Enter list title..."/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button className="btn btn-danger btn-sm" onClick={this._handleCancelClick}>cancel</button>
          </form>
        </div>
      </PageClick>
			)
	}
}