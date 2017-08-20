import { combineReducers } from 'redux';
import lists from './lists.js';
import cards from './cards.js';
import tasks from './tasks.js';
import comments from './comments.js';
import common from './common.js'

var rootReducer= combineReducers({
  	lists: lists,
  	cards: cards,
  	tasks: tasks,
  	comments: comments,
  	common: common
});

export default rootReducer;