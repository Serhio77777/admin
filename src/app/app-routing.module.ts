import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { OneUserComponent } from './components/user/one/one.component';
import { CreateUserComponent } from './components/user/create/create.component';
import { MapComponent } from './components/map/map.component';
import { CountryComponent } from './components/country/country.component';
import { TipComponent } from './components/tip/tip.component';
import { OneTipComponent } from './components/tip/one/one.component';
import { CreateTipComponent } from './components/tip/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Guards
import { AuthenticationGuard } from './guards/authentication-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'users/create',
    component: CreateUserComponent,
  },
  {
    path: 'users/:id',
    component: OneUserComponent,
  },
  {
    path: 'users/:id/edit',
    component: CreateUserComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'country',
    component: CountryComponent,
  },
  {
    path: 'tips',
    component: TipComponent,
  },
  {
    path: 'tips/create',
    component: CreateTipComponent,
  },
  {
    path: 'tips/:id',
    component: OneTipComponent,
  },
  {
    path: 'tips/:id/edit',
    component: CreateTipComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
