import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { DeleteOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  DELETE_REQUEST,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_FAILURE } from '../actions/delete.action';
import { DATA_REQUEST } from '../actions/data.action';
import { OVERLAY_FINISH } from '../actions/header.action';

@Injectable()
export class DeleteEffect {

  private requestUrl: string;
  private options: DeleteOptions<any>;
  @Effect()
  public data$: Observable<any> = this.actions$
    .pipe(ofType(DELETE_REQUEST))
    .pipe(
      mergeMap((action: any) => {
        this.options.url = action.payload.url
        this.requestUrl = action.payload.request
        this.requestService.delete<any>(this.options);
        return of({ type: 'DELETE_REQUEST_PROCESSING' });
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
  public success(data: any): void {
    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: this.requestUrl
      }
    });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: DELETE_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
