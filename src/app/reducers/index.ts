import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as loginReducer from './login.reducer';
import * as logoutReducer from './logout.reducer';
import * as registrationReducer from './registration.reducer';
import * as headerReducer from './header.reducer';
import * as dataReducer from './data.reducer';
import * as dataOneReducer from './data-one.reducer';
import * as deleteReducer from './delete.reducer';
import * as updateReducer from './update.reducer';
import * as createReducer from './create.reducer';
import { environment } from '../../environments/environment';

export class State {
  public login: any;
  public logout: any;
  public registration: any;
  public header: any;
  public data: any;
  public dataOne: any;
  public create: any;
  public delete: any;
  public update: any;
}

export const reducers: ActionReducerMap<State> = {
  login: loginReducer.login,
  logout: logoutReducer.logout,
  registration: registrationReducer.registration,
  header: headerReducer.header,
  data: dataReducer.data,
  dataOne: dataOneReducer.data,
  delete: deleteReducer.deleteData,
  update: updateReducer.updateData,
  create: createReducer.create
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
