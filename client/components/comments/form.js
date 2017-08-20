import React, { PropTypes } from 'react';
import PageClick            from 'react-page-click';
import Comment_Actions from '../../actions/comments.js'
import * as commentLinks from '../../utils/comments.js'

export default class CommentForm extends React.Component{
 

constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleCancelClick = this._handleCancelClick.bind(this)
}



_handleSubmit(e) {
     e.preventDefault();
    let { dispatch,task} = this.props;
    let { name }    = this.refs;
    let data = {
            id: parseInt(Math.random() * Math.random() * 999),
            title: name.value,
            task_id: task.id,
        }
     dispatch(Comment_Actions.addComment(commentLinks.addComment,data));
    this.props.onSubmit()   
  }




 _handleCancelClick(e) {
       e.preventDefault();
      this.props.onCancelClick()
  }

 render(){
  console.log("in commnetform")
		return(
	 <PageClick onClick={this._handleCancelClick}>
        <div className="comment form">
          <form id="new_comment_form" onSubmit={this._handleSubmit} >
            <textarea ref="name" id="comment_name" type="text" required="true" rows={2} placeholder="Enter comment title..."/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button className="btn btn-danger btn-sm" href="#" onClick={this._handleCancelClick}>cancel</button>
          </form>
        </div>
      </PageClick>
			)
	}
}