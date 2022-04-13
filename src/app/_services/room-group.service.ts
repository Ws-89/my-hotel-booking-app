import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  createRoomGroup(id: Number, roomGroup: Partial<RoomGroupInterface>): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/${id}`, roomGroup)
  }

  addToExistingGroup(id: Number): Observable<RoomGroupInterface>{
    return this.httpClient.get<RoomGroupInterface>(`${this.baseUrl}/existing-groups/${id}`)
  }

  removeFromGroup(id: Number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  deleteGroup(id: Number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseUrl}/delete-group/${id}`)
  }

  updateRoomGroup(roomGroup: RoomGroupInterface): Observable<void>{
    return this.httpClient.put<void>(`${this.baseUrl}`, roomGroup)
  }
}
