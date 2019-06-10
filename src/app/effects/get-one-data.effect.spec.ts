import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GetOneDataEffect } from './app.effects';

describe('GetOneDataEffect', () => {
  let actions$: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetOneDataEffect,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(GetOneDataEffect);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
