import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import CreateModel from './create.model';
import CreateForm from './create.form';
import { State } from '../../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../../actions/header.action';
import { Data, CREATE_REQUEST } from '../../../actions/create.action';
import { UPDATE_REQUEST } from '../../../actions/update.action';
import { DATA_ONE_REQUEST } from '../../../actions/data-one.action';
import { DATA_REQUEST } from '../../../actions/data.action';

@Component({
  selector: 'admin-trip-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateTripComponent implements OnInit, OnDestroy {

  private model: CreateModel;
  public form: CreateForm;
  public isFormErrorMessage: boolean = false;
  public permission: boolean = !!window.location.href.match('edit');
  private id: string;
  public users: any = [];
  public places: any = [];
  public subscribtion$: any = null; 
  public subscribtion1$: any = null; 

  public map: any = {
    lat: 64.09934734290941,
    lng: -21.89826329285006,
    zoom: 10
  }

  public checkInForm(id): boolean {
    return this.form.model.places && this.form.model.places.find(el => el === id)
  }

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.model = new CreateModel();
    this.form = new CreateForm(this.model);

    this.subscribtion$ = store.select<any>('dataOne').subscribe(data => {
      if (data.trip && !this.form.model.name) {
        this.form.patchForm(data.trip);
      }
    });
    this.subscribtion1$ = store.select<any>('data').subscribe(data => {
      if (data.users) {
        this.users = data.users;
      }
      if (data.places) {
        this.places = data.places;
      }
    });

    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/places?res=full',
      }
    });
    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/users?res=full',
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.store.dispatch({ type: OVERLAY_START });
        this.store.dispatch({ 
          type: DATA_ONE_REQUEST,
          payload: {
            propName: 'trip',
            url: `/trip/${this.id}`
          }
        });
      }
    });
  }

  // start form validation (to show what is wrong)
  private invalidForm(): void {
    this.form.validate();
    this.isFormErrorMessage = true;
  }

  // start login request
  public create(): void {
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({
      type: this.permission ? UPDATE_REQUEST : CREATE_REQUEST,
      payload: {
        url: this.permission ? `/trip/${this.id}` : '/trip',
        data: this.form.model
      }
    });
  }

  public goBack(): void {
    this.router.navigate([`/trips`])
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {}

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {}

}
