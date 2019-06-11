import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';

import { environment } from '../environments/environment';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { RequestService } from './services/request.service';

// Guards
import { AuthenticationGuard } from './guards/authentication-guard';

// Interceptors
import { HeadersInterceptor } from './interceptors/interceptors.header';
import { EmptyResponseBodyErrorInterceptor } from './interceptors/interceptors.empty';
import { LoggingInterceptor } from './interceptors/interceptors.logging';

// Reducers
import { reducers, metaReducers } from './reducers';

// Effects
import { GetDataEffect } from './effects/get-data.effect';
import { GetOneDataEffect } from './effects/get-one-data.effect';
import { CreateEffect } from './effects/create.effect';
import { DeleteEffect } from './effects/delete.effect';
import { UpdateEffect } from './effects/update.effect';
import { LoginEffect } from './effects/login.effect';
import { LogoutEffect } from './effects/logout.effect';
import { RegistrationEffect } from './effects/registration.effect';

// Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { OneUserComponent } from './components/user/one/one.component';
import { CreateUserComponent } from './components/user/create/create.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CountryComponent } from './components/country/country.component';
import { CreateCountryComponent } from './components/country/create-country/create-country.component';
import { CreateCityComponent } from './components/country/create-city/create-city.component';
import { PlaceComponent } from './components/place/place.component';
import { CreatePlaceComponent } from './components/place/create/create.component';
import { OnePlaceComponent } from './components/place/one/one.component';
import { TripComponent } from './components/trip/trip.component';
import { CreateTripComponent } from './components/trip/create/create.component';
import { OneTripComponent } from './components/trip/one/one.component';
import { TipComponent } from './components/tip/tip.component';
import { CreateTipComponent } from './components/tip/create/create.component';
import { CompanyComponent } from './components/company/company.component';
import { CreateCompanyComponent } from './components/company/create/create.component';
import { DiscountComponent } from './components/discount/discount.component';
import { CreateDiscountComponent } from './components/discount/create/create.component';
import { ErrorComponent } from './components/parts/error/error.component';
import { ModalComponent } from './components/parts/modal/modal.component';
import { ShowOneComponent } from './components/parts/show-one/show-one.component';
import { CreateComponent } from './components/parts/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/parts/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    NotFoundComponent,
    OneUserComponent,
    CreateUserComponent,
    CreateComponent,
    MapComponent,
    CountryComponent,
    PlaceComponent,
    CreatePlaceComponent,
    OnePlaceComponent,
    TripComponent,
    CreateTripComponent,
    OneTripComponent,
    TipComponent,
    CreateTipComponent,
    CompanyComponent,
    CreateCompanyComponent,
    DiscountComponent,
    CreateDiscountComponent,
    ErrorComponent,
    ModalComponent,
    ShowOneComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    CreateCityComponent,
    CreateCountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([
      GetDataEffect,
      GetOneDataEffect,
      CreateEffect,
      DeleteEffect,
      UpdateEffect,
      LoginEffect, 
      LogoutEffect, 
      RegistrationEffect
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC20W4WxCKZ_vgEe1pXacKNXe3bEOpG2o4'
    }),
    MatNativeDateModule
  ],
  providers: [

    // Services
    RequestService,

    // Guards
    AuthenticationGuard,

    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EmptyResponseBodyErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ErrorComponent, 
    ModalComponent,
    CreateCountryComponent, 
    CreateCityComponent
  ]
})
export class AppModule { }
     