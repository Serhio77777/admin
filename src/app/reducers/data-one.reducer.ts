import { ActionReducer } from '@ngrx/store';
import {
  Data,
  DataOneAction,
  DATA_ONE_REQUEST,
  DATA_ONE_REQUEST_SUCCESS,
  DATA_ONE_REQUEST_FAILURE,
  DATA_ONE_REQUEST_PROCESSING,
  DATA_ONE_REQUEST_CLEAN } from '../actions/data-one.action';
import update from 'immutability-helper';

export const defaultDataState: Data = new Data();
// data reducer config
export const data: ActionReducer<any> = (state: Data = defaultDataState, action: DataOneAction) => {
  switch (action.type) {
    case DATA_ONE_REQUEST:
      return action.payload;
    case DATA_ONE_REQUEST_PROCESSING:
      return {
        ...state
      };
    case DATA_ONE_REQUEST_SUCCESS:
      state = update(state, { $merge: action.payload});
      return state;
    case DATA_ONE_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case DATA_ONE_REQUEST_CLEAN:
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
