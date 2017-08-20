import React, {Component} from "react";
import {connect} from "react-redux";

class Header extends React.Component {
	render(){
		return(
			<div>
			<nav className="navbar navbar-default top-header">
  			<div className="container-fluid">
    		<div className="navbar-header">
     	  	<a className="navbar-brand" href="#"><i className="fa fa-apple icon" ></i></a>
   			 </div>
   			 <div className="col-sm-8">
    		</div>
    		
			<ul className="nav navbar-nav navbar-right">
          <li><a href="#"><i className="fa fa-search icon" aria-hidden="true" ></i>
			</a></li>
          <li><a href="#"><i className="fa fa-bars icon" ></i>
			</a></li>
  			  </ul>
  			</div>
			</nav>
			</div>
			  )
		}
}

export default Header;