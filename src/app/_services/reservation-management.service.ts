import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/interface/api-response.interface';
import { CustomResponse } from '../models/interface/customResponse';
import { Page } from '../models/interface/page';
import { ReservationStatus } from '../models/interface/reservationStatus.interface';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationManagementService {

  private baseUrl = environment.baseUrl
  private reservationUrl = "reservations-management"

  constructor(private httpClient: HttpClient) { }

  getReservationsByRoomId$ = (roomId: number, status: ReservationStatus = ReservationStatus.Initialized, page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reservation>>> =>
    this.httpClient.get<ApiResponse<Page<Reservation>>>(`${this.baseUrl}/${this.reservationUrl}/by-room-id/${roomId}?status=${status}&page=${page}&size=${size}`)


  deleteReservation(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${this.reservationUrl}/delete/${id}`).toPromise();
  }

  updateReservation(id: number, reservation: Reservation) {
    return this.httpClient.put(`${this.baseUrl}/${this.reservationUrl}/update/${id}`, reservation).toPromise();
  }

  getReservationById$ = (id: number): Observable<CustomResponse<Reservation>> =>
    this.httpClient.get<CustomResponse<Reservation>>(`${this.baseUrl}/${this.reservationUrl}/find-by-id/${id}`)

  getReservationListByGuestId$ = (guestId: number, status: ReservationStatus = ReservationStatus.Initialized, page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reservation>>> =>
    this.httpClient.get<ApiResponse<Page<Reservation>>>(`${this.baseUrl}/${this.reservationUrl}/by-guest-id/${guestId}?status=${status}&page=${page}&size=${size}`)

  getReservationListByHotelId$ = (hotelId: number, status: ReservationStatus = ReservationStatus.Active, lastName: string, page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reservation>>> =>
    this.httpClient.get<ApiResponse<Page<Reservation>>>(`${this.baseUrl}/${this.reservationUrl}/search-by-hotel-id/${hotelId}?status=${status}&lastName=${lastName}&page=${page}&size=${size}`)

  getCurrentUserReservations$ = (status: ReservationStatus = ReservationStatus.Initialized, page: number = 0, size: number = 10): Observable<ApiResponse<Page<Reservation>>> =>
    this.httpClient.get<ApiResponse<Page<Reservation>>>(`${this.baseUrl}/${this.reservationUrl}/current-user-reservations?status=${status}&page=${page}&size=${size}`)
}

