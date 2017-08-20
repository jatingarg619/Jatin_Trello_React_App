import React from 'react';
import { render } from 'react-dom';
import css from './css/style.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Root from './containers/Root/index.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()
const store = configureStore();

render(
	<Root store={store}/>,
	document.getElementById('root')
)
