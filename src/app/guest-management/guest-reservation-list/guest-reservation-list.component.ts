import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/interface/api-response.interface';
import { Page } from 'src/app/models/interface/page';
import { ReservationStatus } from 'src/app/models/interface/reservationStatus.interface';
import { Reservation } from 'src/app/models/reservation';
import { ReservationManagementService } from 'src/app/_services/reservation-management.service';

@Component({
  selector: 'app-guest-reservation-list',
  templateUrl: './guest-reservation-list.component.html',
  styleUrls: ['./guest-reservation-list.component.css']
})
export class GuestReservationListComponent implements OnInit {

  guestReservationlist$: Observable<({ appState: string, appData?: ApiResponse<Page<Reservation>>, error?: HttpErrorResponse })>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  responseSubject = new BehaviorSubject<ApiResponse<Page<Reservation>>>(null)


  constructor(private reservationManagementService: ReservationManagementService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.guestReservationlist$ = this.reservationManagementService.getCurrentUserReservations$(ReservationStatus.Initialized, 0, 10).pipe(
      map((response: ApiResponse<Page<Reservation>>) =>  {
        console.log('response',response)
        this.responseSubject.next(response)
        this.currentPageSubject.next(response.data.page.number)
        return ({ appState: 'APP_LOADED', appData: response })
      }),
      startWith({ appState: 'APP_LOADING'}),
      catchError((error:HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error }) 
      })) 
  }

  goToPage(pageNumber: number = 0): void{
    this.guestReservationlist$ = this.reservationManagementService.getCurrentUserReservations$(ReservationStatus.Initialized, pageNumber).pipe(
      map((response: ApiResponse<Page<Reservation>>) => {
        this.responseSubject.next(response)
        this.currentPageSubject.next(response.data.page.number)
        return ({ appState: 'APP_LOADED', appData: response})
      }),
      startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error:HttpErrorResponse) => {
        return of({ appState: 'APP_ERROR', error})
      })
    )
  }

  goToNextOrPrevious(direction?: string): void {
    this.goToPage(direction == 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value -1)
  }

}
