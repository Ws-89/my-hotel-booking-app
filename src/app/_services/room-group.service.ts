import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoomGroupInterface } from '../models/interface/roomGroup.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomGroupService {

  private baseUrl = "http://localhost:8085/admin/management/room-groups"

  constructor(private httpClient: HttpClient) { }

  getRoomGroupById(id: Number): Observable<RoomGroupInterface>{
    return this.httpClient.get<RoomGroupInterface>(`${this.baseUrl}/${id}`)
  }

  getRoomGroupsByHotelId(id: Number): Observable<RoomGroupInterface[]>{
    return this.httpClient.get<RoomGroupInterface[]>(`${this.baseUrl}/by-hotel/${id}`)
  }

  createRoomGroup(id: Number, roomGroup: Partial<RoomGroupInterface>) {
    return this.httpClient.post(`${this.baseUrl}/${id}`, roomGroup).toPromise();
  }

  addToExistingGroup(id: Number) {
    return this.httpClient.get<RoomGroupInterface>(`${this.baseUrl}/existing-groups/${id}`).toPromise();
  }

  removeFromGroup(id: Number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`).toPromise();
  }

  deleteGroup(id: Number){
    return this.httpClient.delete<void>(`${this.baseUrl}/delete-group/${id}`).toPromise();
  }

  updateRoomGroup(roomGroup: RoomGroupInterface){
    return this.httpClient.put<RoomGroupInterface>(`${this.baseUrl}`, roomGroup).toPromise();
  }
}
