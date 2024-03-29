import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

import { CreateHotelComponent } from './hotel management/create-hotel/create-hotel.component';
import { CreateRoomComponent } from './hotel management/create-room/create-room.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GuestComponent } from './guest-management/guest/guest.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailsComponent } from './hotel management/hotel-details/hotel-details.component';
import { HotelsListComponent } from './hotel management/hotels-list/hotels-list.component';
import { LoginComponent } from './login and registration/login/login.component';
import { RegisterSuccessComponent } from './login and registration/register-success/register-success.component';
import { RegisterComponent } from './login and registration/register/register.component';
import { RoomListComponent } from './hotel management/room-list/room-list.component';
import { UpdateHotelComponent } from './hotel management/update-hotel/update-hotel.component';
import { UpdateRoomComponent } from './hotel management/update-room/update-room.component';
import { AuthGuard } from './_auth/auth.guard';
import { CompleteTheTransactionComponent } from './reservation management/complete-the-transaction/complete-the-transaction.component';
import { HeaderComponent } from './header/header.component';
import { CancelComponent } from './payment/cancel/cancel.component';
import { SucessComponent } from './payment/sucess/sucess.component';
import { CheckoutComponent } from './payment/checkout/checkout.component';
import { AvailableHotelsListComponent } from './reservation management/available-hotels-list/available-hotels-list.component';
import { CommonModule } from '@angular/common';
import { AvailabilityComponent } from './reservation management/availability/availability.component';
import { ReservationListComponent } from './hotel management/reservation-list/reservation-list.component';
import { UpdateReservationComponent } from './reservation management/update-reservation/update-reservation.component';
import { GuestUpdateComponent } from './guest-management/guest-update/guest-update.component';
import { GuestReservationListComponent } from './guest-management/guest-reservation-list/guest-reservation-list.component';
import { HotelReservationListComponent } from './hotel management/hotel-reservation-list/hotel-reservation-list.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'available-hotels-list', component: AvailableHotelsListComponent },
  { path: 'availability-details', component: AvailabilityComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'guest', component: GuestComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_GUEST']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'hotels', component: HotelsListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-hotel', component: CreateHotelComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'rooms/:id', component: RoomListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-room', component: CreateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-room/:id', component: CreateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'update-room/:id', component: UpdateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'update-hotel/:id', component: UpdateHotelComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'hotel-details/:id', component: HotelDetailsComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'rooms', component: RoomListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'register-success', component: RegisterSuccessComponent},
  { path: 'complete-the-transaction', component: CompleteTheTransactionComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment-success', component: SucessComponent },
  { path: 'payment-canceled', component: CancelComponent },
  { path: 'reservation-list/:id', component: ReservationListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'reservation-update/:id', component: UpdateReservationComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']}},
  { path: 'update-guest/:id', component: GuestUpdateComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_GUEST']} },
  { path: 'guest-reservation-list/:id', component: GuestReservationListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_GUEST']}},
  { path: 'hotel-reservation-list/:id', component: HotelReservationListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  RoomListComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
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
    AvailableHotelsListComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    AvailabilityComponent,
    CompleteTheTransactionComponent,
    CancelComponent,
    SucessComponent,
    CheckoutComponent
]
