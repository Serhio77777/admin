import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { PutOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  UPDATE_REQUEST,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_FAILURE } from '../actions/update.action';
import { OVERLAY_FINISH } from '../actions/header.action';

@Injectable()
export class UpdateEffect {

  private propName: string;
  private options: PutOptions<any, any>;
  @Effect()
  public data$: Observable<any> = this.actions$
    .pipe(ofType(UPDATE_REQUEST))
    .pipe(
      mergeMap((action: any) => {
        this.options.body = action.payload.data
        this.options.url = action.payload.url
        this.requestService.put<any, any>(this.options);
        return of({ type: 'UPDATE_REQUEST_PROCESSING' });
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
      },
      body: {}
    };
  }
  // set data on success
  public success(data: any): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({ type: UPDATE_REQUEST_SUCCESS });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: UPDATE_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
