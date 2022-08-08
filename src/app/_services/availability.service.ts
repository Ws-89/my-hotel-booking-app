import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';

import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';
import { AvailabilityResponse } from '../models/interface/availabilityResponse.interface';
import { HotelInterface } from '../models/interface/hotelInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private availabilitySearchData = new BehaviorSubject<AvailabilityRequestInterface>(null);

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  baseUrl = environment.baseUrl

  constructor(private httpClient: HttpClient) { }

  passSearchParameters(searchParameters){
    this.availabilitySearchData.next(searchParameters);
  }

  getAvailableRooms(availabilityRequest: AvailabilityRequestInterface): Observable<AvailabilityResponse>{
      return this.httpClient.post<AvailabilityResponse>(`${this.baseUrl}/reservations/available-rooms`, availabilityRequest, { headers: this.requestHeader })
  }

  

  
}
