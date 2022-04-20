import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { UserAuthService } from './user-auth.service';
import { AvailabilityInterface } from '../models/interface/availability.interface';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';
import { environment } from 'src/environments/environment';
import { ReservationArrangement } from '../models/reservationArrangement';



@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );
  private baseUrl = environment.baseUrl
  private reservationUrl = "reservations"
  private userReservationUrl = "reservations/user/bookmarks"

  private reservationRequest = new Subject<AvailabilityRequestInterface>();
  public reservationRequestWithDate = this.reservationRequest.asObservable();
  
  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  
  
  addReservationItemCart(availability: AvailabilityInterface[]){
    return this.httpClient.post(`${this.baseUrl}/${this.userReservationUrl}`, availability).toPromise();
  }

  getReservationCart(): Observable<AvailabilityInterface[]>{
    return this.httpClient.get<AvailabilityInterface[]>(`${this.baseUrl}/${this.userReservationUrl}`);
  }

  addReservaionRequestDate(availabilityRequest: AvailabilityRequestInterface){
    this.reservationRequest.next(availabilityRequest);
  }

  removeItemFromReservationCart(id : string){
    return this.httpClient.delete(`${this.baseUrl}/${this.userReservationUrl}/${id}`).toPromise();
  }

  proceedReservations(reservationArrangement: ReservationArrangement){
    return this.httpClient.post(`${this.baseUrl}/reservations/user/place-a-booking`, reservationArrangement).toPromise();
  }

  proceedReservationsForNonLoggedInUser(reservationArrangement: ReservationArrangement) {
    return this.httpClient.post
    (`${this.baseUrl}/${this.reservationUrl}/place-a-booking`, reservationArrangement, { headers: this.requestHeader }).toPromise();
  }

  handleError(handleError: any): Observable<never> {
    return throwError ('Method not implemented')
  }
}
