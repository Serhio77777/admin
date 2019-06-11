import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { State } from '../../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../../actions/header.action';
import { Data, CREATE_REQUEST } from '../../../actions/create.action';
import { UPDATE_REQUEST } from '../../../actions/update.action';

@Component({
  selector: 'admin-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {

  public country: string = '';
  public permission: boolean = false;
  public id: number;

  constructor(
    private store: Store<State>,
    public dialogRef: MatDialogRef<CreateCountryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data) {
        this.country = data.name;
        this.id = data.id;
        this.permission = true;
      }
  }

  public create(): void {
    console.log(this.country)
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({
      type: this.permission ? UPDATE_REQUEST : CREATE_REQUEST,
      payload: {
        url: this.permission ? `/country/${this.id}` : '/country',
        data: {name: this.country}
      }
    });

  }

  public ngOnInit(): void {}

}
