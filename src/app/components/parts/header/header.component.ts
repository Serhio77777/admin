import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { State } from '../../../reducers';
import { Login, LOGIN_REQUEST_CLEAN } from '../../../actions/login.action';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private model$: any = null;
  public permission: boolean = !!localStorage.getItem('login');

  constructor(
    private store: Store<State>,
    private router: Router
  ) {
    this.model$ = store.select<any>('login').subscribe(data => {
      if (data && data.email) {
        if (!this.permission) {
          this.router.navigate(['users'])
        }
        this.permission = true;
      } else if (!localStorage.getItem('login')) {
        this.router.navigate(['login'])
      }
    });
  }

  ngOnInit() {
  }
  public ngOnDestroy(): void {
    this.model$.unsibscribe();
  }

  public logout(): void {
    this.store.dispatch({ type: LOGIN_REQUEST_CLEAN });
  }

}
