import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Availability } from '../models/availability';
import { BehaviorSubject } from 'rxjs';
import { AvailabilityInterface } from '../models/interface/availability.interface';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private availabilitySearchData = new BehaviorSubject<AvailabilityRequestInterface>(null);
  private searchResultData = new BehaviorSubject<AvailabilityInterface[]>(null);
  public share = this.availabilitySearchData.asObservable();
  public shareResult = this.searchResultData.asObservable();

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  baseUrl = "http://localhost:8085/reservations"

  constructor(private httpClient: HttpClient) { }

  passSearchParameters(searchParameters){
    this.availabilitySearchData.next(searchParameters);
  }

  passAvailabilityResult(searchResult){
    this.searchResultData.next(searchResult);
  }

  getAvailableRooms(availabilityRequest: AvailabilityRequestInterface): Observable<AvailabilityInterface[]>{
      return this.httpClient.post<AvailabilityInterface[]>(`${this.baseUrl}`, availabilityRequest, { headers: this.requestHeader })
  }

  

  
}
