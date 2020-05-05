import { combineReducers } from 'redux';
import loginUser from './loginReducer';
import giayInfo from './giayReducer';
export default combineReducers({
  loginUser,
  giayInfo
});
