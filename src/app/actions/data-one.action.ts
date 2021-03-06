import { Action } from '@ngrx/store';

export class Data {
  public data?: any;
}

export const DATA_ONE_REQUEST = 'DATA_ONE_REQUEST';
export const DATA_ONE_REQUEST_PROCESSING = 'DATA_ONE_REQUEST_PROCESSING';
export const DATA_ONE_REQUEST_SUCCESS = 'DATA_ONE_REQUEST_SUCCESS';
export const DATA_ONE_REQUEST_FAILURE = 'DATA_ONE_REQUEST_FAILURE';
export const DATA_ONE_REQUEST_CLEAN = 'DATA_ONE_REQUEST_CLEAN';

export class DataOneAction implements Action {
  public type;

  constructor(
    public payload: Data
  ) {}
}
