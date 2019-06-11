import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  MatPaginator, 
  MatSort,
  MatDialog, 
  MatDialogRef, 
  MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CreateCountryComponent } from './create-country/create-country.component';
import { CreateCityComponent } from './create-city/create-city.component';
import { State } from '../../reducers';
import { SHOW_HEADER, OVERLAY_START } from '../../actions/header.action';
import { DELETE_REQUEST } from '../../actions/delete.action';
import { Data, DATA_REQUEST } from '../../actions/data.action';

@Component({
  selector: 'admin-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  public displayedColumnsCountries: string[] = ['id', 'name', 'buttons'];
  public displayedColumnsCities: string[] = ['id', 'name', 'country', 'buttons'];
  public dataSourceCountries: MatTableDataSource<any>;
  public dataSourceCities: MatTableDataSource<any>;
  public dataStore: any = {};

  @ViewChild('#countriesPag', {static: true}) countriesPaginator: MatPaginator;
  @ViewChild('#countriesSort', {static: true}) countriesSort: MatSort;

  @ViewChild('#citiesPag', {static: true}) citiesPaginator: MatPaginator;
  @ViewChild('#citiesSort', {static: true}) citiesSort: MatSort;

  constructor(
    private store: Store<State>,
    private router: Router,
    public dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
    this.dataSourceCountries = new MatTableDataSource([]);
    this.dataSourceCities = new MatTableDataSource([]);
    this.store.dispatch({ type: OVERLAY_START });
    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/countries?res=full'
      }
    });
    this.store.dispatch({ 
      type: DATA_REQUEST,
      payload: {
        url: '/cities?res=full'
      }
    });
    this.dataStore.model$ = store.select<any>('data').subscribe(data => {
      console.log(data)
      if (data.countries) {
        this.dataSourceCountries = new MatTableDataSource(data.countries);
        this.dataSourceCountries.paginator = this.countriesPaginator;
        this.dataSourceCountries.sort = this.countriesSort;
      }
      if (data.cities) {
        this.dataSourceCities = new MatTableDataSource(data.cities);
        this.dataSourceCities.paginator = this.citiesPaginator;
        this.dataSourceCities.sort = this.citiesSort;
      }
    });
  }

  public ngOnInit(): void {
    this.dataSourceCountries.paginator = this.countriesPaginator;
    this.dataSourceCountries.sort = this.countriesSort;
    this.dataSourceCities.paginator = this.citiesPaginator;
    this.dataSourceCities.sort = this.citiesSort;
  }

  public applyFilter(filterValue: string, propName: string): void {
    this[propName].filter = filterValue.trim().toLowerCase();

    if (this[propName].paginator) {
      this[propName].paginator.firstPage();
    }
  }

  public goNext(id: number | string): void {
    this.router.navigate([`users/${id}`])
  }

  public create(dialogName: string, mode: string, data: number): void {
    if (dialogName === 'country') {
      const dialogRef = this.dialog.open(CreateCountryComponent, mode ? {
        width: '400px',
        data: data
      } : { width: '400px' });
      dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch({ type: OVERLAY_START });
        this.store.dispatch({ 
          type: DATA_REQUEST,
          payload: {
            url: '/countries?res=full'
          }
        });
      });
    } else {
      const dialogRef = this.dialog.open(CreateCityComponent, mode ? {
        width: '400px',
        data: {
          city: data,
          countries: this.dataSourceCountries.filteredData
        }
      } : { 
        width: '400px',
        data: this.dataSourceCountries.filteredData
      });
      dialogRef.afterClosed().subscribe(result => {
        this.store.dispatch({ type: OVERLAY_START });
        this.store.dispatch({ 
          type: DATA_REQUEST,
          payload: {
            url: '/cities?res=full'
          }
        });
      });
    }
    // this.router.navigate([`/users/create`])
  }

  public delete(propName: string, propRequestName: string, id: number): void {
    this.store.dispatch({ 
      type: DELETE_REQUEST,
      payload: {
        url: `/${propName}/${id}`,
        request: `/${propRequestName}?res=full`
      }
    });
  }

}