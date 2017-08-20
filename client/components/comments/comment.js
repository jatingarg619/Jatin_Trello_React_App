import React, {PropTypes}       from 'react';
import Comment_Actions from '../../actions/comments.js'
import * as commentLinks from '../../utils/comments.js'


export default class Comment extends React.Component {
constructor(props) {
        super(props);
         this.edit = this.edit.bind(this)
       this.delete = this.delete.bind(this)
      this._handleChange = this._handleChange.bind(this)
      this._handleSubmit = this._handleSubmit.bind(this)
      this._handleCancelClick = this._handleCancelClick.bind(this)
        this.state = {
          edit: false,
          value: ''
        
       }
        }


  componentWillMount(){
      const{comment} = this.props
       this.setState({ value: comment.title });
    }

    edit(){
  this.setState({ edit: true });

  }

  delete(){
      const {dispatch,comment} = this.props
      dispatch(Comment_Actions.deleteComment(commentLinks.deleteComment,comment.id))

  }
  
  _handleSubmit(){
    const{dispatch, comment} = this.props
    const {value} = this.state
     let data = {
            id: comment.id,
            title: value,
            task_id:comment.task_id
           }
    
    dispatch(Comment_Actions.editComment(commentLinks.updateComment,data))
    
    this.setState({ edit: false });
  }
  
_handleCancelClick(){
   const{dispatch, task} = this.props
  this.setState({ edit: false });
}

 _handleChange(e){
    
      this.setState({value: e.target.value});

    }
render() {
    const {comment,dispatch,task_id} = this.props;
    const {edit,value} = this.state
    const styles = {
      display:  'block',
    };
 
       
      return (
        <div>
         {(comment.task_id == task_id) ?  <div className="comment-container">
         { !edit ?  <div className="comment-content">{comment.title}
       <div className="edit" onClick={this.edit}><a href="#"><i className="fa fa-pencil"></i></a></div>
       <div className="delete" onClick={this.delete}><a href="#"><i className="fa fa-trash-o"></i></a></div>
      </div> :
      <div>
      <form id="new_comment_form" onSubmit={this._handleSubmit} >
            <textarea ref="name" id="comment_name"  value={value} type="text" required="true" rows={2} placeholder="Enter comment title..." onChange={this._handleChange}/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button className="btn btn-danger btn-sm" href="#" onClick={this._handleCancelClick}>cancel</button>
          </form>
      </div>}
      </div>:null}
               
        </div>       
         );
  }
}