import { ActionReducer } from '@ngrx/store';
import {
  Data,
  CreateAction,
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE,
  CREATE_REQUEST_PROCESSING,
  CREATE_REQUEST_CLEAN } from '../actions/create.action';
import update from 'immutability-helper';

export const defaultDataState: Data = new Data();
// data reducer config
export const create: ActionReducer<any> = (state: Data = defaultDataState, action: CreateAction) => {
  switch (action.type) {
    case CREATE_REQUEST:
      return action.payload;
    case CREATE_REQUEST_PROCESSING:
      return {
        ...state
      };
    case CREATE_REQUEST_SUCCESS:
      return action.payload;
    case CREATE_REQUEST_FAILURE:
      state = update(state, { $merge: action.payload});
      return {
        ...state
      };
    case CREATE_REQUEST_CLEAN:
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
