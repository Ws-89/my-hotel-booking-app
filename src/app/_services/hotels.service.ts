import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HotelInterface } from '../models/interface/hotelInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  private baseUrl = environment.baseUrl;
  private hotelUrl = 'hotel-management/hotels'

  constructor(private httpClient: HttpClient) {
    this.getHotelList();
   }

   getHotelList(): Observable<HotelInterface[]>{
    return this.httpClient.get<HotelInterface[]>(`${this.baseUrl}/${this.hotelUrl}`)
   }

  saveHotel(hotel: HotelInterface){
    return this.httpClient.post(`${this.baseUrl}/${this.hotelUrl}`, hotel).toPromise();
  }
  
  getHotelById(id: Number){
    return this.httpClient.get<HotelInterface>(`${this.baseUrl}/${this.hotelUrl}/${id}`).toPromise();
  }

  updateHotel(id: Number, hotel: HotelInterface){
    return this.httpClient.put<HotelInterface>(`${this.baseUrl}/${this.hotelUrl}/${id}`, hotel).toPromise();
  }

  deleteHotel(id: Number){
    return this.httpClient.delete(`${this.baseUrl}/${this.hotelUrl}/${id}`).toPromise();
  }

  uploadImage(id: Number, file: any){
    return this.httpClient.post(`${this.baseUrl}/${this.hotelUrl}/${id}/images/upload/`, file).toPromise();
  }
}
