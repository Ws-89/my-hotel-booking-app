import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  private baseUrl = "http://localhost:8085/admin/management/hotels";

  constructor(private httpClient: HttpClient) { }

  getHotelList(): Observable<Hotel[]>{
    return this.httpClient.get<Hotel[]>(`${this.baseUrl}`);
  }

  saveHotel(hotel: Hotel): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, hotel);
  }

  getHotelById(id: Number): Observable<Hotel>{
    return this.httpClient.get<Hotel>(`${this.baseUrl}/${id}`);
  }

  updateHotel(id: Number, hotel: Hotel): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, hotel);
  }

  deleteHotel(id: Number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

}
