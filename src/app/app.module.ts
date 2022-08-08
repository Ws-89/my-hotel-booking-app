import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReservationListComponent } from './hotel management/reservation-list/reservation-list.component';
import { UpdateReservationComponent } from './reservation management/update-reservation/update-reservation.component';
import { GuestUpdateComponent } from './guest-management/guest-update/guest-update.component';
import { GuestReservationListComponent } from './guest-management/guest-reservation-list/guest-reservation-list.component';
import { HotelReservationListComponent } from './hotel management/hotel-reservation-list/hotel-reservation-list.component';






@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ReservationListComponent,
    UpdateReservationComponent,
    GuestUpdateComponent,
    GuestReservationListComponent,
    HotelReservationListComponent,
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
    RouterModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  
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
