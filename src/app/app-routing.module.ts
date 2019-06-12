import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserComponent } from './components/user/user.component';
import { OneUserComponent } from './components/user/one/one.component';
import { CreateUserComponent } from './components/user/create/create.component';
import { CountryComponent } from './components/country/country.component';
import { TipComponent } from './components/tip/tip.component';
import { CreateTipComponent } from './components/tip/create/create.component';
import { CompanyComponent } from './components/company/company.component';
import { CreateCompanyComponent } from './components/company/create/create.component';
import { DiscountComponent } from './components/discount/discount.component';
import { CreateDiscountComponent } from './components/discount/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PlaceComponent } from './components/place/place.component';
import { CreatePlaceComponent } from './components/place/create/create.component';
import { OnePlaceComponent } from './components/place/one/one.component';
import { TripComponent } from './components/trip/trip.component';
import { CreateTripComponent } from './components/trip/create/create.component';
import { OneTripComponent } from './components/trip/one/one.component';

// Guards
import { AuthenticationGuard } from './guards/authentication-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
    path: 'tips/:id/edit',
    component: CreateTipComponent,
  },
  {
    path: 'companies',
    component: CompanyComponent,
  },
  {
    path: 'companies/create',
    component: CreateCompanyComponent,
  },
  {
    path: 'companies/:id/edit',
    component: CreateCompanyComponent,
  },
  {
    path: 'discountes',
    component: DiscountComponent,
  },
  {
    path: 'discountes/create',
    component: CreateDiscountComponent,
  },
  {
    path: 'discountes/:id/edit',
    component: CreateDiscountComponent,
  },
    {
    path: 'places',
    component: PlaceComponent,
  },
  {
    path: 'places/create',
    component: CreatePlaceComponent,
  },
  {
    path: 'places/:id',
    component: OnePlaceComponent,
  },
  {
    path: 'places/:id/edit',
    component: CreatePlaceComponent,
  },
    {
    path: 'trips',
    component: TripComponent,
  },
  {
    path: 'trips/create',
    component: CreateTripComponent,
  },
  {
    path: 'trips/:id',
    component: OneTripComponent,
  },
  {
    path: 'trips/:id/edit',
    component: CreateTripComponent,
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
