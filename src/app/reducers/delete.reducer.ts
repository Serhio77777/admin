import { ActionReducer } from '@ngrx/store';
import {
  Data,
  DeleteAction,
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILURE,
  DELETE_REQUEST_PROCESSING,
  DELETE_REQUEST_CLEAN } from '../actions/delete.action';
import update from 'immutability-helper';

export const defaultDataState: Data = new Data();
// data reducer config
export const deleteData: ActionReducer<any> = (state: Data = defaultDataState, action: DeleteAction) => {
  switch (action.type) {
    case DELETE_REQUEST:
      return action.payload;
    case DELETE_REQUEST_PROCESSING:
      return {
        ...state
      };
    case DELETE_REQUEST_SUCCESS:
      return action.payload;
    case DELETE_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case DELETE_REQUEST_CLEAN:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};
