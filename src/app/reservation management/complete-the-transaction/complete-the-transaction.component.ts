import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Availability } from 'src/app/models/availability';
import { ReservationArrangement } from 'src/app/models/reservationArrangement';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';

@Component({
  selector: 'app-complete-the-transaction',
  templateUrl: './complete-the-transaction.component.html',
  styleUrls: ['./complete-the-transaction.component.css']
})
export class CompleteTheTransactionComponent implements OnInit {
  reservation: Availability;
  reservationArrangement = new ReservationArrangement
  
  constructor(private reservationService: ReservationsService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
      this.setReservaionForNonLoggedInUser();
      this.setReservationArrangementDetails();
  }

  setReservaionForNonLoggedInUser(){
    this.messengerService.getReservationForNonLoggedInUser().subscribe(data => {
      this.reservation = data;
    })
  }

  setReservationArrangementDetails(){
    this.messengerService.getAvailabilitySearchData().subscribe(data => {
      this.reservationArrangement.numberOfRooms = data.numberOfRooms;
      this.reservationArrangement.partySize = data.partySize;
    })
  }
  

  saveReservation(saveReservationForm: NgForm){
    this.reservationArrangement.email = saveReservationForm.form.value.email;
    console.log(this.reservationArrangement)
  }

}
