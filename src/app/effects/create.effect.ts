import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { RequestService } from '../services/request.service';
import { PostOptions } from '../services/interfaces/request.interfaces';

import { State } from '../reducers';
import {
  CREATE_REQUEST,
  CREATE_REQUEST_SUCCESS,
  CREATE_REQUEST_FAILURE } from '../actions/create.action';
import { OVERLAY_FINISH } from '../actions/header.action';

@Injectable()
export class CreateEffect {

  private options: PostOptions<any, any>;
  @Effect()
  public data$: Observable<any> = this.actions$
    .pipe(ofType(CREATE_REQUEST))
    .pipe(
      mergeMap((action: any) => {
        this.options.url = action.payload.url
        this.options.body = action.payload.data
        this.requestService.post<any, any>(this.options);
        return of({ type: 'CREATE_REQUEST_PROCESSING' });
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
    this.store.dispatch({ type: CREATE_REQUEST_SUCCESS });
  }
  // error handler
  public error(httpErrorResponse: HttpErrorResponse): void {
    this.store.dispatch({ type: OVERLAY_FINISH });
    this.store.dispatch({
      type: CREATE_REQUEST_FAILURE,
      payload: {
        error: httpErrorResponse
      }
    });
  }
}
