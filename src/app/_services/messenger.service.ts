import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailabilityInterface } from '../models/interface/availability.interface';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  private availabilitySearchData$ = new BehaviorSubject<AvailabilityRequestInterface>(null);
  private searchResultData$ = new BehaviorSubject<AvailabilityInterface[]>(null);
  private reservation = new BehaviorSubject<AvailabilityInterface>(null);

  sendAvailabilitySearchData(availabilityRequest: AvailabilityRequestInterface){
      this.availabilitySearchData$.next(availabilityRequest);
  }

  getAvailabilitySearchData(){
    return this.availabilitySearchData$.asObservable();
  }

  sendSearchResultData(availabilities: AvailabilityInterface[]){
    this.searchResultData$.next(availabilities);
  } 

  getSearchResultData(){
    return this.searchResultData$.asObservable();
  }

  sendReservationForNonLoggedInUser(availability: AvailabilityInterface){
    this.reservation.next(availability);
  }

  getReservationForNonLoggedInUser(){
    return this.reservation.asObservable();
  }
    
}