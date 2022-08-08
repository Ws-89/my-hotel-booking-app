import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';
import { ApiResponse } from '../models/interface/api-response.interface';
import { CustomResponse } from '../models/interface/customResponse';
import { HotelInterface } from '../models/interface/hotelInterface.interface';
import { Page } from '../models/interface/page';

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
    
   }

   getHotelList$ = (page: number = 0, size: number = 10): Observable<ApiResponse<Page<HotelInterface>>> =>
      this.httpClient.get<ApiResponse<Page<HotelInterface>>>(`${this.baseUrl}/${this.hotelUrl}/list?page=${page}&size=${size}`)

  saveHotel(hotel: HotelInterface){
    return this.httpClient.post(`${this.baseUrl}/${this.hotelUrl}`, hotel).toPromise();
  }

  getHotelById$ = (id: number): Observable<CustomResponse<HotelInterface>> =>
    this.httpClient.get<CustomResponse<HotelInterface>>(`${this.baseUrl}/${this.hotelUrl}/${id}`)
  
  updateHotel(id: Number, hotel: HotelInterface){
    return this.httpClient.put<HotelInterface>(`${this.baseUrl}/${this.hotelUrl}/${id}`, hotel).toPromise();
  }

  deleteHotel(id: Number){
    return this.httpClient.delete(`${this.baseUrl}/${this.hotelUrl}/${id}`).toPromise();
  }

  uploadImage(id: Number, file: any){
    return this.httpClient.post(`${this.baseUrl}/${this.hotelUrl}/${id}/images/upload/`, file).toPromise();
  }

  switchHotelState(id: Number, state: boolean){
    return this.httpClient.get<HotelInterface>(`${this.baseUrl}/${this.hotelUrl}/switch-hotel-state/${id}?state=${state}`).toPromise();
  }
}
