import { Action } from '@ngrx/store';

export class Data {
  public data?: any;
}

export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_REQUEST_PROCESSING = 'DELETE_REQUEST_PROCESSING';
export const DELETE_REQUEST_SUCCESS = 'DELETE_REQUEST_SUCCESS';
export const DELETE_REQUEST_FAILURE = 'DELETE_REQUEST_FAILURE';
export const DELETE_REQUEST_CLEAN = 'DELETE_REQUEST_CLEAN';

export class DeleteAction implements Action {
  public type;

  constructor(
    public payload: Data
  ) {}
}
