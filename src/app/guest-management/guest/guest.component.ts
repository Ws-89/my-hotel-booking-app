import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { CustomResponse } from '../../models/interface/customResponse';
import { Guest } from '../../models/interface/guest.interface';
import { GuestService } from '../../_services/guest.service';
import { UserAuthService } from '../../_services/user-auth.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  guestDetails$: Observable<({ appState: string, appData?: CustomResponse<Guest>, error?: HttpErrorResponse })>

  constructor(private router: Router, private guestService: GuestService, private authService: UserAuthService) { }

  ngOnInit(): void {
    this.guestDetails$ = this.guestService.getPrincipal$().pipe(
      map((response: CustomResponse<Guest>) => {
        return ({ appState: 'APP_LOADED', appData: response})
      }),
      startWith({ appState: 'APP_LOADING'}),
      catchError((error: HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error })
      })
    )
  }
  

  showCompletedReservationList(id: number){
    this.router.navigate(['guest-reservation-list', id])
  }

  updateGuest(id: number){
    this.router.navigate(['update-guest', id])
  }

  deleteGuest(id: number){
    this.guestService.deleteGuest(id).then(response => {
      this.authService.clear();
      this.router.navigate([''])
    })
  }
}
