import React, { PropTypes } from 'react';
import PageClick            from 'react-page-click';
import task_Actions from '../../actions/tasks.js'
import * as taskLinks from '../../utils/tasks.js'

export default class TaskForm extends React.Component{
 

constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleCancelClick = this._handleCancelClick.bind(this)
}



_handleSubmit(e) {
     e.preventDefault();
    let { dispatch,card} = this.props;
    let { name }    = this.refs;
    let data = {
            id: parseInt(Math.random() * Math.random() * 999),
            title: name.value,
            card_id: card.id,
            comments:[]
        }
     dispatch(task_Actions.addTask(taskLinks.addTask,data));
    this.props.onSubmit()   
  }




 _handleCancelClick(e) {
       e.preventDefault();
      this.props.onCancelClick()
  }

 render(){
		return(
	 <PageClick onClick={this._handleCancelClick}>
        <div className="task form">
          <form id="new_task_form" onSubmit={this._handleSubmit} >
            <textarea  ref="name" id="task_name" type="text" required="true" rows={2} placeholder="Enter task title..."/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button className="btn btn-danger btn-sm" href="#" onClick={this._handleCancelClick}>cancel</button>
          </form>
        </div>
      </PageClick>
			)
	}
}