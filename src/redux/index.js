import {combineReducers} from 'redux';
import InfoUse from './reducers/InfoReducers';
import Color from './reducers/ColorReducers';
import Icon from './reducers/IconReducers';

export default combineReducers({InfoUse, Color, Icon});
