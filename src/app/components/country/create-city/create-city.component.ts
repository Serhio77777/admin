import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from '../../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../../actions/header.action';
import { Data, CREATE_REQUEST } from '../../../actions/create.action';
import { UPDATE_REQUEST } from '../../../actions/update.action';

@Component({
  selector: 'admin-create-city',
  templateUrl: './create-city.component.html',
  styleUrls: ['./create-city.component.scss']
})
export class CreateCityComponent implements OnInit {

  public countries: any = [];
  public city: string = '';
  public countryId: number;
  public permission: boolean = false;
  public id: number;

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<CreateCityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      if (data.city) {
        this.city = data.city.name;
        this.countries = data.countries;
        this.countryId = data.countries.find(el => el.name === data.city.countryId).id;
        this.id = data.city.id;
        this.permission = true;
      } else {
        this.countries = data;
      }
  }

  public create(): void {
    if (this.city && this.countryId) {
      this.store.dispatch({ type: OVERLAY_START });
      this.store.dispatch({
        type: this.permission ? UPDATE_REQUEST : CREATE_REQUEST,
        payload: {
          url: this.permission ? `/city/${this.id}` : '/city',
          data: {countryId: this.countryId, name: this.city}
        }
      });
    }
  }

  public ngOnInit(): void {}

}
