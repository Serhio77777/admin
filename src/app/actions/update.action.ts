import { Action } from '@ngrx/store';

export class Data {
  public data?: any;
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_REQUEST_PROCESSING = 'UPDATE_REQUEST_PROCESSING';
export const UPDATE_REQUEST_SUCCESS = 'UPDATE_REQUEST_SUCCESS';
export const UPDATE_REQUEST_FAILURE = 'UPDATE_REQUEST_FAILURE';
export const UPDATE_REQUEST_CLEAN = 'UPDATE_REQUEST_CLEAN';

export class UpdateAction implements Action {
  public type;

  constructor(
    public payload: Data
  ) {}
}
