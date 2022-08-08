import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/interface/api-response.interface';
import { Page } from 'src/app/models/interface/page';
import { ReservationStatus } from 'src/app/models/interface/reservationStatus.interface';
import { Reservation } from 'src/app/models/reservation';
import { ReservationManagementService } from 'src/app/_services/reservation-management.service';

@Component({
  selector: 'app-hotel-reservation-list',
  templateUrl: './hotel-reservation-list.component.html',
  styleUrls: ['./hotel-reservation-list.component.css']
})
export class HotelReservationListComponent implements OnInit {

  hotelReservationList$: Observable<({ appState: string, appData?: ApiResponse<Page<Reservation>>, error?: HttpErrorResponse })>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  responseSubject = new BehaviorSubject<ApiResponse<Page<Reservation>>>(null);
  reservationStatus = ReservationStatus;
  reservationStatusKeys = [];
  form: FormGroup;
  

  constructor(private reservationManagementService: ReservationManagementService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reservationStatusKeys = Object.keys(this.reservationStatus).filter(x => x != ReservationStatus.Cancelled);

    this.form = this.fb.group({
      lastName: new FormControl(''),
      status: new FormControl('')
    })


    this.hotelReservationList$ = this.reservationManagementService.getReservationListByHotelId$(this.route.snapshot.params['id'], ReservationStatus.Initialized, '', 0, 10).pipe(
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
    this.hotelReservationList$ = this.reservationManagementService.getReservationListByHotelId$(this.route.snapshot.params['id'], ReservationStatus.Initialized, this.form.value.status, pageNumber).pipe(
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

  search(){
    console.log(this.form.value)
    this.hotelReservationList$ = this.reservationManagementService.getReservationListByHotelId$(this.route.snapshot.params['id'], this.form.value.status, this.form.value.lastName, 0, 10).pipe(
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

  deleteReservation(reservationId: number){
    this.reservationManagementService.deleteReservation(reservationId).then(
      res => this.goToPage(this.currentPageSubject.value)
    )
  }

  updateReservation(id: number){
    this.router.navigate(['reservation-update', id])
  }

  get status() { return this.form.get('status')};
  get lastName() { return this.form.get('lastName')};
 }
