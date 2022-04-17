import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';
import { HotelInterface } from '../models/interface/hotelInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  private baseUrl = "http://localhost:8085/admin/management/hotels";
  

  constructor(private httpClient: HttpClient) { }

  getHotelList(): Observable<HotelInterface[]>{
    return this.httpClient.get<HotelInterface[]>(`${this.baseUrl}`); 
  }
  
  saveHotel(hotel: Hotel): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, hotel);
  }

  getHotelById(id: Number): Observable<HotelInterface>{
    return this.httpClient.get<HotelInterface>(`${this.baseUrl}/${id}`);
  }

  updateHotel(id: Number, hotel: Hotel): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, hotel);
  }

  deleteHotel(id: Number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  uploadImage(id: Number, file: any): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/images/upload/${id}`, file);
  }
}
