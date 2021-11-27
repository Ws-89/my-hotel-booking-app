import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomListComponent } from './hotel management/room-list/room-list.component';
import { CreateRoomComponent } from './hotel management/create-room/create-room.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';
import { UpdateRoomComponent } from './hotel management/update-room/update-room.component';
import { RoomDetailsComponent } from './hotel management/room-details/room-details.component';
import { HotelsListComponent } from './hotel management/hotels-list/hotels-list.component';
import { CreateHotelComponent } from './hotel management/create-hotel/create-hotel.component';
import { UpdateHotelComponent } from './hotel management/update-hotel/update-hotel.component';
import { HotelDetailsComponent } from './hotel management/hotel-details/hotel-details.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { GuestComponent } from './guest/guest.component';
import { LoginComponent } from './login and registration/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AvailabilityComponent } from './reservation management/availability/availability.component';
import { ReservationComponent } from './reservation management/reservation/reservation.component';
import { PaymentComponent } from '../payment/payment.component';
import { RegisterComponent } from './login and registration/register/register.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { RegisterSuccessComponent } from './login and registration/register-success/register-success.component';


@NgModule({
  declarations: [
    AppComponent,
    RoomListComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
    RoomDetailsComponent,
    HotelsListComponent,
    CreateHotelComponent,
    UpdateHotelComponent,
    HotelDetailsComponent,
    HomeComponent,
    AdminComponent,
    GuestComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AvailabilityComponent,
    ReservationComponent,
    PaymentComponent,
    RegisterComponent,
    RegisterSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
