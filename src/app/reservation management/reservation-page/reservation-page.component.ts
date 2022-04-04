import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Availability } from 'src/app/models/availability';
import { Reservation } from 'src/app/models/reservation';
import { ReservationArrangement } from 'src/app/models/reservationArrangement';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { isTemplateExpression } from 'typescript';




@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations:Availability[];
  reservationArrangement = new ReservationArrangement;

  totalPrice: number;

  constructor(private router: Router,
              private reservationService: ReservationsService,
              private messengerService: MessengerService) { 
      
  }

  setReservationsAndPriceFromCart(){
    this.reservationService.getReservationCart().subscribe(data => {
      this.reservations = data.cartItems;

      this.totalPrice = 0;
      this.reservations.forEach(reservation => {
        this.totalPrice += reservation.price;

      this.reservationArrangement.reservations = this.reservations
      this.reservationArrangement.price = this.totalPrice;
    })
  })}

  removeFromReservations(availability: Availability){
    var id = availability.availability_id.toString();
    this.reservationService.removeItemFromReservationCart(id).subscribe(data => 
      this.setReservationsAndPriceFromCart()
    )
  }

  setReservationArrangementToSend(){
    this.messengerService.getAvailabilitySearchData().subscribe(data => {
      this.reservationArrangement.numberOfRooms = data.numberOfRooms;
      this.reservationArrangement.partySize = data.partySize;
    })
  }

  ngOnInit(): void {
    this.setReservationsAndPriceFromCart()
    this.setReservationArrangementToSend()
  }

  saveReservation(): void {
    this.reservationService.proceedReservations(this.reservationArrangement).subscribe(data => 
      this.reservations.forEach(x => {
        this.removeFromReservations(x);
      })
    )
  }

  addNewReservation(): void {
    this.router.navigate(['home']);
  }

}
