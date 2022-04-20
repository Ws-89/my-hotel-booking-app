import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoomGroupInterface } from '../models/interface/roomGroup.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomGroupService {

  private baseUrl = environment.baseUrl
  private roomGroupUrl = 'hotel-management/room-groups'

  constructor(private httpClient: HttpClient) { }

  getRoomGroupById(id: Number): Observable<RoomGroupInterface>{
    return this.httpClient.get<RoomGroupInterface>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`)
  }

  getRoomGroupsByHotelId(id: Number): Observable<RoomGroupInterface[]>{
    return this.httpClient.get<RoomGroupInterface[]>(`${this.baseUrl}/${this.roomGroupUrl}/by-hotel/${id}`)
  }

  createRoomGroup(id: Number, roomGroup: Partial<RoomGroupInterface>) {
    return this.httpClient.post(`${this.baseUrl}/${this.roomGroupUrl}/by-hotel/${id}`, roomGroup).toPromise();
  }

  addToExistingGroup(id: Number) {
    return this.httpClient.get<RoomGroupInterface>(`${this.baseUrl}/${this.roomGroupUrl}/${id}/add-room`).toPromise();
  }

  removeFromGroup(id: Number) {
    return this.httpClient.delete(`${this.baseUrl}/${this.roomGroupUrl}/${id}/remove-room`).toPromise();
  }

  deleteGroup(id: Number){
    return this.httpClient.delete<void>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`).toPromise();
  }

  updateRoomGroup(id: Number, roomGroup: RoomGroupInterface){
    return this.httpClient.put<RoomGroupInterface>(`${this.baseUrl}/${this.roomGroupUrl}/${id}`, roomGroup).toPromise();
  }
}
