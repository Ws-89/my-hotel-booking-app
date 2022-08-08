import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/interface/api-response.interface';
import { CustomResponse } from '../models/interface/customResponse';
import { Page } from '../models/interface/page';
import { RoomInterface } from '../models/interface/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.baseUrl
  private roomUrl = 'hotel-management/rooms'

  constructor(private httpClient: HttpClient) { }

  getRoomListByHotelId$ = (id: number, page: number = 0, size: number = 10): Observable<ApiResponse<Page<RoomInterface>>> =>
  this.httpClient.get<ApiResponse<Page<RoomInterface>>>(`${this.baseUrl}/${this.roomUrl}/by-hotel/${id}?page=${page}&size=${size}`)

  getRoomById(id: Number): Observable<RoomInterface>{
    return this.httpClient.get<RoomInterface>(`${this.baseUrl}/${this.roomUrl}/${id}`)
  }

  getRoomById$ = (id: number): Observable<CustomResponse<RoomInterface>> =>
  this.httpClient.get<CustomResponse<RoomInterface>>(`${this.baseUrl}/${this.roomUrl}/${id}`)

  createRoom(id: Number, roomGroup: Partial<RoomInterface>) {
    return this.httpClient.post(`${this.baseUrl}/${this.roomUrl}/by-hotel/${id}`, roomGroup).toPromise();
  }

  deleteRoom(id: Number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${this.roomUrl}/${id}`).toPromise();
  }

  updateRoom(id: Number, roomGroup: RoomInterface){
    return this.httpClient.put<RoomInterface>(`${this.baseUrl}/${this.roomUrl}/${id}`, roomGroup).toPromise();
  }

  switchRoomState(id: Number, state: boolean){
    return this.httpClient.get<RoomInterface>(`${this.baseUrl}/${this.roomUrl}/switch-room-state/${id}?state=${state}`).toPromise();
  }
}
