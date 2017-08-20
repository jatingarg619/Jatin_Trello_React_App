import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Content from '../../content/content.js';
import Header from '../../layout/header/Header.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Root extends React.Component {
	render() {
		const { store } = this.props;
		return (
			<Provider store={store}>
			  <MuiThemeProvider>
			  <div>
			    
			    <Header/>
				<Content className="body-container" store={store}/>

			  </div>
			   </MuiThemeProvider>
			</Provider>
		)
	}

}

export default Root;