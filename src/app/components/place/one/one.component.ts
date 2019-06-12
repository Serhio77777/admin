import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../../actions/header.action';
import { Data, DATA_ONE_REQUEST } from '../../../actions/data-one.action';

@Component({
  selector: 'admin-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OnePlaceComponent implements OnInit, OnDestroy {

  public model: any = {};
  private id: string;
  public cities: any = [];
  public subscribtion$: any = null;
  constructor(
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscribtion$ = store.select<any>('dataOne').subscribe(data => {
      if (data.place && !this.model.name) {
        this.model = data.place;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.store.dispatch({ type: OVERLAY_START });
      this.store.dispatch({ 
        type: DATA_ONE_REQUEST,
        payload: {
          propName: 'place',
          url: `/place/${this.id}`
        }
      });
    });
  }
  
  public ngOnDestroy(): void {
    this.subscribtion$.unsubscribe();
  }

  public goBack(): void {
    this.router.navigate(['/places'])
  }

  public ngOnInit(): void {
  }
}
