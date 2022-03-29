import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Availability } from '../models/availability';
import { AvailabilityRequest } from '../models/availabilityRequest';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  private availabilitySearchData$ = new BehaviorSubject<AvailabilityRequest>(null);
  private searchResultData$ = new BehaviorSubject<Availability[]>(null);
  private reservation = new Subject<Availability>();

  sendAvailabilitySearchData(availabilityRequest: AvailabilityRequest){
      this.availabilitySearchData$.next(availabilityRequest);
  }

  getAvailabilitySearchData(){
    return this.availabilitySearchData$.asObservable();
  }

  sendSearchResultData(availabilities: Availability[]){
    this.searchResultData$.next(availabilities);
  } 

  getSearchResultData(){
    return this.searchResultData$.asObservable();
  }

  sendReservationForNonLoggedInUser(availability: Availability){
    this.reservation.next(availability);
  }

  getReservationForNonLoggedInUser(){
    return this.reservation.asObservable();
  }
    
}