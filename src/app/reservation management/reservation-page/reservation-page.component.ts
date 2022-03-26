import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { Reservation } from 'src/app/models/reservation';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { isTemplateExpression } from 'typescript';




@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations:Availability[];
  reservationRequest: Reservation;

  totalPrice: number = 0;

  constructor(private activatedRoute: ActivatedRoute, 
              private reservationService: ReservationsService) { 
      // this.setReservations();
  }

  setReservations(){
    this.reservations = this.reservationService.getReservations();
  }

  setReservationsFromCart(){
    this.reservationService.getReservationCart().subscribe(data => {
      this.reservations = data.cartItems;

      this.reservations.forEach(reservation => {
        this.totalPrice += reservation.price;
    })
  })}


  removeFromReservations(availability: Availability){
    var id = availability.availability_id.toString();
    this.reservationService.removeItemFromReservationCart(id).subscribe(data => 
      this.setReservations()
    )
    
  }

  ngOnInit(): void {
    this.setReservationsFromCart()
  }

  saveReservation(): void {

  }

}
