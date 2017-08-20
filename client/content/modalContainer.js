import React, {Component} from "react";
import {connect} from "react-redux";
import CardModal from '../components/cards/modal.js'

class ModalContainer extends React.Component{
	render(){
		const {store,lists} = this.props
		const {dispatch} = store
		console.log("in modal")
		return(
				<CardModal/>
			  )
		
}

}

const mapStateToProps = (state) => {
        return {
            lists:state.lists,
            cards:state.cards,
            tasks:state.tasks,
            comments:state.comments
		};
    }



export default connect(mapStateToProps)(ModalContainer);