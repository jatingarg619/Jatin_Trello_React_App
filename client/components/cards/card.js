import React, {PropTypes}       from 'react';
import {DragSource, DropTarget} from 'react-dnd';
import ModalContainer from '../../content/modalContainer.js'
import CardModal from './modal.js'
import {Modal} from 'react-bootstrap'
import ItemTypes  from '../../constants/item_types';
import Card_Actions from '../../actions/cards.js'
import * as cardLinks from '../../utils/cards.js'


const cardSource = {
  beginDrag(props) {
 console.log("in begin drag card")

    return {
      id: props.card.id,
      list_id: props.list_id,
      card: props.card,
    };
  },

  isDragging(props, monitor) {
    console.log("in dragging card")
    return props.card.id === monitor.getItem().id;
  },
};

const cardTarget = {
  drop(targetProps, monitor) {
    const source = monitor.getItem();
    console.log(source, "in cardtarget")
    if (source.id !== targetProps.id) {
      
      const target = {
        id: targetProps.card.id,
        list_id: targetProps.list_id,
        card: targetProps.card,
      };

      targetProps.onDrop({ source, target });
    }
  },
};

@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

@DropTarget(ItemTypes.CARD, cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))


export default class Card extends React.Component {
constructor(props) {
        super(props);
       this.open = this.open.bind(this)
       this.close = this.close.bind(this)
       this._handleChange = this._handleChange.bind(this)
       this.state = {
        showModal: false,
        edit: false,
        value: ''
       }
        }

    componentWillMount(){
      const{card} = this.props
       this.setState({ value: card.title });
    }


    close() {
        this.setState({ showModal: false });
    }

    open(e) {
        const {card, dispatch} = this.props
        const {value} = this.state
        if(e.target.getAttribute('class').indexOf('fa fa-pencil') >= 0){
        this.setState({ edit: true });
      }
      else if (e.target.getAttribute('class').indexOf('fa fa-trash-o') >= 0){
        dispatch(Card_Actions.deleteCard(cardLinks.deleteCard,card.id))

      }
      else if (e.target.getAttribute('class').indexOf('save-button') >= 0){
        
        let data = {
            id: card.id,
            title: value,
            list_id: card.list_id,
            tasks:[]
        }
         dispatch(Card_Actions.editCard(cardLinks.updateCard,data))
      this.setState({ edit: false });
      }
      else if (e.target.getAttribute('class').indexOf('cancel-button') >= 0){
       
       this.setState({ edit: false });
      }
      else if (e.target.getAttribute('class').indexOf('textarea-button') >= 0){
      }
      else{
        this.setState({ showModal: true });
      }
    }

    _handleChange(e){
      const {card, dispatch} = this.props
      this.setState({value: e.target.value});

    }
   
 render() {
    const {tasks,card,comments,dispatch,list_id,isAddingNewComment,isAddingNewTask,connectDragSource, connectDropTarget} = this.props;
    const {edit,value} = this.state
    return connectDragSource(
      connectDropTarget(
       <div>
        
   {(card.list_id == list_id) ? <div className="card-container" onClick={this.open}>

       { !edit ? 
        <div className="card-content">{card.title}
              <div className="edit" ><a href="#"><i className="fa fa-pencil"></i></a></div>
              <div className="delete" ><a href="#"><i className="fa fa-trash-o"></i></a></div>
              </div> : 
          <div>
          <form id="new_card_form"  >
            <textarea className="textarea-button" ref="edit_title" value={value} id="card_name" type="text" required="true" rows={2} onChange={this._handleChange}/>
            <button className="save-button btn btn-primary btn-sm" type="submit">Save</button> or <button href="#" className="cancel-button btn btn-danger btn-sm" >cancel</button>
          </form>
          </div>
          }
           </div> : null }
         <div className="modal-container"> 
        <Modal show={this.state.showModal} onHide={this.close} >
        <CardModal card = {card} tasks = {tasks} comments ={comments} dispatch = {dispatch} isAddingNewComment={isAddingNewComment}
          isAddingNewTask={isAddingNewTask === card.id}  />
        </Modal>
        </div>
        </div> 
    
    )
      );
  }
}