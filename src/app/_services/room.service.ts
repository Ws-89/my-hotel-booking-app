import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Room } from '../models/room';

// ng g s room <- wygenerowane ta komenda
@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = "http://localhost:8085/admin/management/rooms";
  constructor(private httpClient: HttpClient) { }

  getRoomlist(): Observable<Room[]>{
    return this.httpClient.get<Room[]>(`${this.baseUrl}`)
  }

  getRoomlistByHotelId(id: Number): Observable<Room[]>{
    return this.httpClient.get<Room[]>(`${this.baseUrl}/hotel/${id}`)
  }

  createRoom(id: Number, room: Room): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/${id}`, room)
  }

  getRoomById(id: Number): Observable<Room>{
    return this.httpClient.get<Room>(`${this.baseUrl}/${id}`);
  }

  updateRoom(id: Number, room: Room): Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, room);
  }

  deleteRoom(id: Number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
}
