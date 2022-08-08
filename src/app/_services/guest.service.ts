import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomResponse } from '../models/interface/customResponse';
import { Guest } from '../models/interface/guest.interface';

@Injectable({
  providedIn: 'root'
})
export class GuestService {


  private baseUrl = environment.baseUrl;
  private guestUrl = 'user-management/users'
  
  constructor(private httpClient: HttpClient) { }

  getReservationById$ = (id: number): Observable<CustomResponse<Guest>> =>
    this.httpClient.get<CustomResponse<Guest>>(`${this.baseUrl}/${this.guestUrl}/get-by-id/${id}`)

  updateGuest(id: number, guest: Guest){
    return this.httpClient.put<Guest>(`${this.baseUrl}/${this.guestUrl}/update/${id}`, guest).toPromise();
  } 

  getPrincipal$ = (): Observable<CustomResponse<Guest>> =>
    this.httpClient.get<CustomResponse<Guest>>(`${this.baseUrl}/${this.guestUrl}/get-principal`)

  deleteGuest(id: number){
    return this.httpClient.delete(`${this.baseUrl}/${this.guestUrl}/delete/${id}`).toPromise();
  }

}


