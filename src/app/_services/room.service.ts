import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoomInterface } from '../models/interface/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.baseUrl
  private roomGroupUrl = 'hotel-management/room-groups'

  constructor(private httpClient: HttpClient) { }

  getRoomById(id: Number): Observable<RoomInterface>{
    return this.httpClient.get<RoomInterface>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`)
  }

  getRoomsByHotelId(id: Number): Observable<RoomInterface[]>{
    return this.httpClient.get<RoomInterface[]>(`${this.baseUrl}/${this.roomGroupUrl}/by-hotel/${id}`)
  }

  createRoom(id: Number, roomGroup: Partial<RoomInterface>) {
    return this.httpClient.post(`${this.baseUrl}/${this.roomGroupUrl}/by-hotel/${id}`, roomGroup).toPromise();
  }

  deleteRoom(id: Number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`).toPromise();
  }

  updateRoom(id: Number, roomGroup: RoomInterface){
    return this.httpClient.put<RoomInterface>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`, roomGroup).toPromise();
  }
}
