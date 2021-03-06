import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvailabilityInterface } from 'src/app/models/interface/availability.interface';
import { ReservationDate } from 'src/app/models/interface/reservationDate.interface';
import { ReservationArrangement } from 'src/app/models/reservationArrangement';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';


@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {
  reservations:AvailabilityInterface[];
  reservationArrangement = new ReservationArrangement;
  reservationDates: ReservationDate[];

  totalPrice: number;

  constructor(private router: Router,
              private reservationService: ReservationsService,
              private messengerService: MessengerService) { 
      
  }

  setReservationsAndPriceFromCart(){
    this.reservationService.getReservationCart().subscribe(data => {
      this.reservations = data;

      this.totalPrice = 0;
      this.reservationDates = [];
      this.reservations.forEach(reservation => {
        this.totalPrice += reservation.price;

        let tempStartDate = new Date(reservation.from_date)
        let tempEndDate = new Date(reservation.to_date)  
        var newReservationDate: ReservationDate = {
          reservation_start: tempStartDate.toISOString().split('T')[0],
          reservation_end: tempEndDate.toISOString().split('T')[0]
        }
        this.reservationDates.push(newReservationDate)
      })

      this.reservationArrangement.reservations = this.reservations
      this.reservationArrangement.price = this.totalPrice;
        
      
    
  })}
  

  removeFromReservations(availability: AvailabilityInterface){
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
