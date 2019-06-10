import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { GetOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  DATA_ONE_REQUEST,
  DATA_ONE_REQUEST_SUCCESS,
  DATA_ONE_REQUEST_FAILURE } from '../actions/data-one.action';
import { OVERLAY_FINISH } from '../actions/header.action';
import { GetDataResponse } from './interfaces/data.interfaces';

@Injectable()
export class GetOneDataEffect {

  private propName: string;
  private options: GetOptions<GetDataResponse[]>;
  @Effect()
  public data$: Observable<any> = this.actions$
    .pipe(ofType(DATA_ONE_REQUEST))
    .pipe(
      mergeMap((action: any) => {
        this.propName = action.payload.propName
        this.options.url = action.payload.url
        this.requestService.get<GetDataResponse[]>(this.options);
        return of({ type: 'DATA_ONE_REQUEST_PROCESSING' });
      })
    );

  constructor(
    private requestService: RequestService,
    private actions$: Actions,
    private router: Router,
    private store: Store<State>
  ) {
    // request config
    this.options = {
      url: '/user',
      handlers: {
        success: this.success.bind(this),
        error: this.error.bind(this)
      }
    };
  }
  // set data on success
  public success(data: GetDataResponse[]): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: DATA_ONE_REQUEST_SUCCESS,
      payload: { [this.propName]: data }
    });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: DATA_ONE_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
