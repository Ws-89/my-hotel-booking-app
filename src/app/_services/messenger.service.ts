import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';
import { AvailabilityResponse } from '../models/interface/availabilityResponse.interface';
import { HotelInterface } from '../models/interface/hotelInterface.interface';
import { ReservationRequest } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  constructor() { }

  private availabilitySearchRequest$ = new BehaviorSubject<AvailabilityRequestInterface>(null);
  private availabilitySearchResult$ = new BehaviorSubject<HotelInterface[]>(null);
  private hotelDetails$ = new BehaviorSubject<AvailabilityResponse>(null);
  private reservationRequest$ = new BehaviorSubject<ReservationRequest>(null);
  
  sendAvailabilitySearchData(availabilityRequest: AvailabilityRequestInterface){
      this.availabilitySearchRequest$.next(availabilityRequest);
  }

  getAvailabilitySearchData(){
    return this.availabilitySearchRequest$.asObservable();
  }

  sendAvailabilitySearchResult(searchResults: HotelInterface[]){
    this.availabilitySearchResult$.next(searchResults)
  }

  getAvailabilitySearchResult(){
    return this.availabilitySearchResult$.asObservable();
  }

  sendHotelDetails(availabilities: AvailabilityResponse){
    this.hotelDetails$.next(availabilities);
  } 

  getHotelDetails$(){
    return this.hotelDetails$.getValue();
  }

  sendReservationRequest(request: ReservationRequest){
    this.reservationRequest$.next(request)
  }

  getReservationRequest(){
    return this.reservationRequest$.getValue()
  }
    
}