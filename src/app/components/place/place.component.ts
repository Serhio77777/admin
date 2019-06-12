import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { DELETE_REQUEST } from '../../actions/delete.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';

@Component({
  selector: 'admin-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss']
})
export class PlaceComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'rate', 'name', 'description', 'buttons'];
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
        url: '/places?res=full',
      }
    });
    this.dataStore.model$ = store.select<any>('data').subscribe(data => {
      this.dataSource = new MatTableDataSource(data.places);
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

  public create(id: number): void {
    this.router.navigate([id ? `/places/${id}/edit` : `/places/create`])
  }

  public goNext(id: number | string): void {
    this.router.navigate([`places/${id}`])
  }

  public delete(id: number): void {
    this.store.dispatch({ 
      type: DELETE_REQUEST,
      payload: {
        url: `/place/${id}`,
        request: `/places?res=full`
      }
    });
  }

}