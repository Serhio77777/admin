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
import { CityComponent } from './components/city/city.component';
import { PlaceComponent } from './components/city/place/place.component';
import { TripComponent } from './components/city/trip/trip.component';
import { TipComponent } from './components/city/tip/tip.component';
import { DiscountComponent } from './components/city/discount/discount.component';
import { ErrorComponent } from './components/parts/error/error.component';
import { ModalComponent } from './components/parts/modal/modal.component';
import { ShowOneComponent } from './components/parts/show-one/show-one.component';
import { CreateComponent } from './components/parts/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { DiComponent } from './components/city/di/di.component';
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
    CityComponent,
    PlaceComponent,
    TripComponent,
    TipComponent,
    DiscountComponent,
    ErrorComponent,
    ModalComponent,
    ShowOneComponent,
    LoginComponent,
    RegistrationComponent,
    DiComponent,
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
  entryComponents: [ErrorComponent, ModalComponent, CreateCountryComponent, CreateCityComponent]
})
export class AppModule { }
     