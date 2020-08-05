import {combineReducers} from 'redux'
import myreducer from './myreducer';
import secondreducer from './secondreducer';

export default combineReducers({
    myreducer,
    secondreducer
})