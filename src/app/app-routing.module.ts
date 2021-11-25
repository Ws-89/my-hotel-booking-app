import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AvailabilityComponent } from './availability/availability.component';
import { CreateHotelComponent } from './create-hotel/create-hotel.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { GuestComponent } from './guest/guest.component';
import { HomeComponent } from './home/home.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { RoomListComponent } from './room-list/room-list.component';
import { UpdateHotelComponent } from './update-hotel/update-hotel.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { AuthGuard } from './_auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'guest', component: GuestComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_GUEST']}},
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'availability', component: AvailabilityComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'hotels', component: HotelsListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-hotel', component: CreateHotelComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'rooms/:id', component: RoomListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-room', component: CreateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'create-room/:id', component: CreateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'update-room/:id', component: UpdateRoomComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'room-details/:id', component: RoomDetailsComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'update-hotel/:id', component: UpdateHotelComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'hotel-details/:id', component: HotelDetailsComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'rooms', component: RoomListComponent, canActivate:[AuthGuard], data:{authorities:['ROLE_ADMIN']} },
  { path: 'register-success', component: RegisterSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
