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
  selector: 'admin-discount-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateDiscountComponent implements OnInit, OnDestroy {

  private model: CreateModel;
  public form: CreateForm;
  public isFormErrorMessage: boolean = false;
  public permission: boolean = !!window.location.href.match('edit');
  private id: string;
  public cities: any = [];
  public companies: any = [];
  public subscribtion$: any = null; 
  public subscribtion1$: any = null; 

  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.model = new CreateModel();
    this.form = new CreateForm(this.model);

    this.subscribtion$ = store.select<any>('dataOne').subscribe(data => {
      if (data.discount && !this.form.model.name) {
        this.form.patchForm(data.discount);
      }
    });
    this.subscribtion1$ = store.select<any>('data').subscribe(data => {
      if (data.cities) {
        this.cities = data.cities;
      }
      if (data.companies) {
        this.companies = data.companies;
      }
    });

    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/cities?res=full',
      }
    });

    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/companies?res=full',
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.store.dispatch({ type: OVERLAY_START });
        this.store.dispatch({ 
          type: DATA_ONE_REQUEST,
          payload: {
            propName: 'discount',
            url: `/discount/${this.id}`
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
        url: this.permission ? `/discount/${this.id}` : '/discount',
        data: this.form.model
      }
    });
  }

  public goBack(): void {
    this.router.navigate([`/discountes`])
  }

  // make subscribe on a component initialization
  public ngOnInit(): void {}

  // make unsubscribe before destroying component
  public ngOnDestroy(): void {}

}
