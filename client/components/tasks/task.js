import React, {PropTypes}       from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import Comment from '../comments/comment';
import Comment_Actions from '../../actions/comments.js'
import CommentForm from '../../components/comments/form.js'
import ItemTypes  from '../../constants/item_types';
import Task_Actions from '../../actions/tasks.js'
import * as taskLinks from '../../utils/tasks.js'


const taskSource = {
  beginDrag(props) {

    return {
      id: props.task.id,
      card_id: props.card_id,
      task: props.task,
    };
  },

  isDragging(props, monitor) {
    return props.task.id === monitor.getItem().id;
  },
};

const taskTarget = {
  drop(targetProps, monitor) {
    const source = monitor.getItem();
    if (source.id !== targetProps.id) {
      
      const target = {
        id: targetProps.task.id,
        card_id: targetProps.card_id,
        task: targetProps.task,
      };

      targetProps.onDrop({ source, target });
    }
  },
};

@DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

@DropTarget(ItemTypes.TASK, taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))


export default class Task extends React.Component {
	constructor(props) {
        super(props);
        this._renderAddNewcomment = this._renderAddNewcomment.bind(this)
        this._renderForm = this._renderForm.bind(this)    
        this._hidecommentForm = this._hidecommentForm.bind(this)
        this._renderComments =  this._renderComments.bind(this)
       this._handleAddClick = this._handleAddClick.bind(this)
       this._handleSubmit = this._handleSubmit.bind(this)
       this._handleCancelClick = this._handleCancelClick.bind(this)
       this.edit = this.edit.bind(this)
       this.delete = this.delete.bind(this)
      this._handleChange = this._handleChange.bind(this)
        this.state = {
          edit: false,
          value: ''
        
       }
}


  componentWillMount(){
      const{task} = this.props
       this.setState({ value: task.title });
    }

_handleAddClick(){
     const { dispatch , task} = this.props;
      dispatch(Comment_Actions.showCommentForm(task.id))
}

  _renderComments(){
       const { dispatch , comments, task, isAddingNewComment } = this.props;
      return comments.map((comment) => {
       return(
        <Comment 
        comment={comment} 
        dispatch={dispatch} 
        task_id={task.id} 
        isAddingNewComment={isAddingNewComment}/>    
        )
      })

  }
 

    _handleChange(e){
    
      this.setState({value: e.target.value});

    }

_hidecommentForm() {
    const { dispatch } = this.props;

  dispatch(Comment_Actions.showCommentForm(null))
  }

   _renderAddNewcomment() {
    const { isAddingNewComment } = this.props;
     
    if (!isAddingNewComment) {
      return (<a className="add-new" href="#" onClick={this._handleAddClick}>Add a new comment...</a>);
    }
   return false;
    
  }

  _renderForm() {
    const { isAddingNewComment } = this.props;
    
    if (!isAddingNewComment) return false;

    const {  dispatch , task } = this.props;
    console.log(isAddingNewComment,"in form")
    return (
      <CommentForm
        task={task}
        dispatch={dispatch}
       onCancelClick = {this._hidecommentForm}
       onSubmit = {this._hidecommentForm}
       />
    );
  }

  edit(){
  this.setState({ edit: true });

  }

  delete(){
      const {dispatch,task} = this.props
      dispatch(Task_Actions.deleteTask(taskLinks.deleteTask,task.id))

  }
  
  _handleSubmit(){
    const{dispatch, task} = this.props
    const {value} = this.state
     let data = {
            id: task.id,
            title: value,
            card_id: task.card_id,
            comments:[]
        }
    
    dispatch(Task_Actions.editTask(taskLinks.updateTask,data))
    
    this.setState({ edit: false });
  }
  
_handleCancelClick(){
   const{dispatch, task} = this.props
  this.setState({ edit: false });
}


	render(){
		const {dispatch,task,card_id,connectDragSource,connectDropTarget} = this.props
    const {edit,value} = this.state
    

    return connectDragSource(
      connectDropTarget(
     <div>
	     <div>
      {(task.card_id == card_id) ? <div className="col-md-12 task-container container" >
      { !edit ? <div> 
        <div className="task-content">{task.title}
       <div className="edit" onClick={this.edit}><a href="#"><i className="fa fa-pencil"></i></a></div>
       <div className="delete" onClick={this.delete}><a href="#"><i className="fa fa-trash-o"></i></a></div>
      </div>
      {this._renderComments()}
      {this._renderForm()}
       <div className="add-new">
       {this._renderAddNewcomment()}
       </div>
       </div>
       :
       <div>
       <form id="new_task_form" onSubmit={this._handleSubmit} >
            <textarea ref="name" id="task_name" value={value} type="text" required="true" rows={2} onChange={this._handleChange}/>
            <button className="btn btn-primary btn-sm" type="submit">Add</button> or <button className="btn btn-danger btn-sm" href="#" onClick={this._handleCancelClick}>cancel</button>
       </form>
       </div>
     }
     </div> : null}
     </div>
     
     
      </div>
     
			)
      )
	}


}