import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ApiResponse } from 'src/app/models/interface/api-response.interface';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { Page } from 'src/app/models/interface/page';
import { HotelsService } from '../../_services/hotels.service';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {

  hotelsList$: Observable<({ appState: string, appData?: ApiResponse<Page<HotelInterface>>, error?: HttpErrorResponse })>;
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();
  responseSubject = new BehaviorSubject<ApiResponse<Page<HotelInterface>>>(null)

  hotels = new Array<HotelInterface>();
  retrievedImages = new Map<number, any>();
  base64Data: any;
  retrieveResonse: any;
 
  constructor(private hotelService: HotelsService, private router: Router) { }

  ngOnInit(): void {
    this.hotelsList$ = this.hotelService.getHotelList$(0, 10).pipe(
      map((response: ApiResponse<Page<HotelInterface>>) =>  {
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
    this.hotelsList$ = this.hotelService.getHotelList$(pageNumber).pipe(
      map((response: ApiResponse<Page<HotelInterface>>) => {
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

  hotelDetails(id: number){
    this.router.navigate(['hotel-details', id]);
  }

}
