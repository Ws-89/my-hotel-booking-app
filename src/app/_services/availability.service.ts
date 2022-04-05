import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Availability } from '../models/availability';
import { AvailabilityRequest } from '../models/availabilityRequest';
import { BehaviorSubject } from 'rxjs';
import { AvailabilityInterface } from '../models/interface/availabilityInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private availabilitySearchData = new BehaviorSubject<AvailabilityRequest>(null);
  private searchResultData = new BehaviorSubject<Availability[]>(null);
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

  getAvailableRooms(availabilityRequest: AvailabilityRequest): Observable<AvailabilityInterface[]>{
      return this.httpClient.post<Availability[]>(`${this.baseUrl}`, availabilityRequest, { headers: this.requestHeader })
  }

  

  
}
