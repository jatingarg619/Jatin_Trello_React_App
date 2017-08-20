import React, {PropTypes}       from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import {Modal} from 'react-bootstrap';
import Task from '../tasks/task.js'
import Task_Actions from '../../actions/tasks.js'
import TaskForm from '../../components/tasks/form.js'
import * as taskLinks from '../../utils/tasks.js'


export default class CardModal extends React.Component {

	constructor(props) {
        super(props);
       this._renderTasks = this._renderTasks.bind(this)
       this._renderForm = this._renderForm.bind(this)
       this._renderAddNewtask = this._renderAddNewtask.bind(this)
         this._handleAddClick = this._handleAddClick.bind(this)
         this._hidetaskForm = this._hidetaskForm.bind(this)
         this._handleDropTask=this._handleDropTask.bind(this)
        }

       
         _handleAddClick(){
          console.log(" in add task")
      const { dispatch , card} = this.props;
      dispatch(Task_Actions.showTaskForm(card.id))
   
 }

 _hidetaskForm(){
  const { dispatch , card} = this.props;
        dispatch(Task_Actions.showTaskForm(null))

 }

 _handleDropTask({ source, target }){
  console.log(source, target )
const {tasks, dispatch} = this.props
  
  const sourceTaskIndex = tasks.findIndex((task) => { return task.id === source.id; });
    const sourceTask = source.task;
    const targetTaskIndex = tasks.findIndex((task) => { return task.id === target.id; });
    const targetTask = target.task;
    console.log(sourceTaskIndex,targetTaskIndex)

    let data = {
            id: sourceTask.id,
            title: sourceTask.title,
            card_id: target.card_id,
            comments:[],
            target_index: targetTaskIndex,
            source_index: sourceTaskIndex
        }
     dispatch(Task_Actions.updateDragTask(taskLinks.updateDragTask, data))

 }

    _renderTasks(){
    	 const {card ,dispatch , tasks, comments,isAddingNewComment,isAddingNewTask} = this.props;
    console.log(this.props)
      return tasks.map((task) => {
      return (
        <Task
          task={task}
          dispatch={dispatch}
          card_id={card.id}
          comments={comments}
          isAddingNewComment={isAddingNewComment === task.id}
          isAddingNewTask={isAddingNewTask}
          onDrop={this._handleDropTask}
           />
      );
    })
    }	

       _renderForm() {
    const { isAddingNewTask } = this.props;
    
    if (!isAddingNewTask) return false;
    console.log("in render form task")
    const {  dispatch , card } = this.props;
    console.log(isAddingNewTask,"in form")
    return (
      <TaskForm
        card={card}
        dispatch={dispatch}
       onCancelClick = {this._hidetaskForm}
       onSubmit = {this._hidetaskForm}
       />
    );
  }
    

    _renderAddNewtask() {
    const { isAddingNewTask } = this.props;
     
    if (!isAddingNewTask) {
      return (<a className="add-new" href="#" onClick={this._handleAddClick}>Add a new task...</a>);
    }
   return false;
    
  }

    render(){
    	const {card, tasks,comments,dispatch} = this.props
    	return(
    		<div>
    		<Modal.Header closeButton>
    		<Modal.Title>
    		<span className="list_heading">{card.title}</span>
    		</Modal.Title>
    		</Modal.Header>
    		<Modal.Body>
    		{this._renderTasks()}
        {this._renderForm()}
        <div className="add-new">
        {this._renderAddNewtask()}
        </div>
    		</Modal.Body>
    		<Modal.Footer>
    		</Modal.Footer>

    		</div>
    		)
	}

}	