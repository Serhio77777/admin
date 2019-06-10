import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'image', 'name', 'role'];
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
      payload: 'users'
    });
    this.dataStore.model$ = store.select<any>('data').subscribe(data => {
      this.dataSource = new MatTableDataSource(data.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public goNext(id: number | string): void {
    this.router.navigate([`users/${id}`])
  }

  public create(): void {
    this.router.navigate([`/users/create`])
  }

}