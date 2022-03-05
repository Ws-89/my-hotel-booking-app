import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationItem } from '../models/reservationItem';
import { Reservations } from '../models/reservations';
import { AvailabilityService } from '../_services/availability.service';
import { ReservationsService } from '../_services/reservations/reservations.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations!:Reservations;
  constructor(private activatedRoute: ActivatedRoute, 
              private reservationService: ReservationsService) { 
  }

  setReservations(){
    this.reservations = this.reservationService.getReservations();
  }

  removeFromReservations(reservationItem: ReservationItem){
    this.reservationService.removeReservation(reservationItem.id);
    this.setReservations();
  }

  ngOnInit(): void {
  }

  // addToReservations(){
  //   this.reservationService.addReservationItem()
  // }

}
