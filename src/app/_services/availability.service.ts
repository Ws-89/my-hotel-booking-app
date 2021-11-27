import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  baseUrl = "http://localhost:8085/reservations"

  constructor(private httpClient: HttpClient) { }

  
}
