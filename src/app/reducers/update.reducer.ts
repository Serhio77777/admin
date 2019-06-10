import { ActionReducer } from '@ngrx/store';
import {
  Data,
  UpdateAction,
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAILURE,
  UPDATE_REQUEST_PROCESSING,
  UPDATE_REQUEST_CLEAN } from '../actions/update.action';
import update from 'immutability-helper';

export const defaultDataState: Data = new Data();
// data reducer config
export const updateData: ActionReducer<any> = (state: Data = defaultDataState, action: UpdateAction) => {
  switch (action.type) {
    case UPDATE_REQUEST:
      return action.payload;
    case UPDATE_REQUEST_PROCESSING:
      return {
        ...state
      };
    case UPDATE_REQUEST_SUCCESS:
      return action.payload;
    case UPDATE_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case UPDATE_REQUEST_CLEAN:
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
