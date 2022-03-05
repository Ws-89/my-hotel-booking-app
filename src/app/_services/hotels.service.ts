import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  private baseUrl = "http://localhost:8085/admin/management/hotels";
  private imagesUrl = "http://localhost:8085/images"

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

  uploadImage(id: Number, file: any): Observable<Object>{
    return this.httpClient.post(`${this.imagesUrl}/${id}/images/upload`, file);
  }

  downloadImage(id: Number):Observable<any>{
    return this.httpClient.get<any>(`${this.imagesUrl}/${id}/images/download`, { headers: this.requestHeader })
  }

}
