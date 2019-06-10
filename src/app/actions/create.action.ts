import { Action } from '@ngrx/store';

export class Data {
  public data?: any;
}

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_REQUEST_PROCESSING = 'CREATE_REQUEST_PROCESSING';
export const CREATE_REQUEST_SUCCESS = 'CREATE_REQUEST_SUCCESS';
export const CREATE_REQUEST_FAILURE = 'CREATE_REQUEST_FAILURE';
export const CREATE_REQUEST_CLEAN = 'CREATE_REQUEST_CLEAN';

export class CreateAction implements Action {
  public type;

  constructor(
    public payload: Data
  ) {}
}
