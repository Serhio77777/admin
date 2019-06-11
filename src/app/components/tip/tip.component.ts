import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { DELETE_REQUEST } from '../../actions/delete.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';

@Component({
  selector: 'admin-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.scss']
})
export class TipComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'city', 'tips', 'buttons'];
  public dataSource: MatTableDataSource<any>;
  public dataStore: any = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/tips?res=full',
      }
    });
    this.dataStore.model$ = store.select<any>('data').subscribe(data => {
      this.dataSource = new MatTableDataSource(data.tips);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public create(id: number): void {
    this.router.navigate([id ? `/tips/${id}/edit` : `/tips/create`])
  }

  public delete(id: number): void {
    this.store.dispatch({ 
      type: DELETE_REQUEST,
      payload: {
        url: `/tip/${id}`,
        request: `/tips?res=full`
      }
    });
  }

}