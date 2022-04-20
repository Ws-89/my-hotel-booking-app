import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  baseUrl = environment.baseUrl

  constructor(private httpClient: HttpClient) { }

  passSearchParameters(searchParameters){
    this.availabilitySearchData.next(searchParameters);
  }

  passAvailabilityResult(searchResult){
    this.searchResultData.next(searchResult);
  }

  getAvailableRooms(availabilityRequest: AvailabilityRequestInterface): Observable<AvailabilityInterface[]>{
      return this.httpClient.post<AvailabilityInterface[]>(`${this.baseUrl}/reservations/available-rooms`, availabilityRequest, { headers: this.requestHeader })
  }

  

  
}
