import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HotelInterface } from '../models/interface/hotelInterface.interface';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  private baseUrl = "http://localhost:8085/admin/management/hotels";

  private hotelsObs = new BehaviorSubject<HotelInterface[]>([]);
  hotels$ = this.hotelsObs.asObservable();

  constructor(private httpClient: HttpClient) {
    this.getHotelList();
   }

   getHotelList() {
    return this.httpClient.get<HotelInterface[]>(`${this.baseUrl}`).subscribe(
      hotels => {
        this.hotelsObs.next(hotels);
      },
      err => {
        console.log(err);
      }
    )
   }

  saveHotel(hotel: HotelInterface){
    return this.httpClient.post(`${this.baseUrl}`, hotel).toPromise();
  }
  
  getHotelById(id: Number){
    return this.httpClient.get<HotelInterface>(`${this.baseUrl}/${id}`).toPromise();
  }

  updateHotel(id: Number, hotel: HotelInterface){
    return this.httpClient.put<HotelInterface>(`${this.baseUrl}/${id}`, hotel).toPromise();
  }

  deleteHotel(id: Number){
    return this.httpClient.delete(`${this.baseUrl}/${id}`).toPromise();
  }

  uploadImage(id: Number, file: any){
    return this.httpClient.post(`${this.baseUrl}/images/upload/${id}`, file).toPromise();
  }
}
