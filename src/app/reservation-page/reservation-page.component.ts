import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Availability } from '../models/availability';
import { Reservation } from '../models/reservation';
import { Reservations } from '../models/reservations';
import { AvailabilityService } from '../_services/availability.service';
import { ReservationsService } from '../_services/reservations.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations:Reservations;
  reservationRequest: Reservation;
  constructor(private activatedRoute: ActivatedRoute, 
              private reservationService: ReservationsService) { 
      this.setReservations();
  }

  setReservations(){
    this.reservations = this.reservationService.getReservations();
  }

  removeFromReservations(availability: Reservation){
    this.reservationService.removeReservation(availability.room_id);
    this.setReservations();
  }

  ngOnInit(): void {
  }

  saveReservation(): void {
      

  }

}
