import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { plainToClass, plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';
import { Availability } from 'src/app/models/availability';
import { Reservation } from 'src/app/models/reservation';
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
  reservationArrangement = new ReservationArrangement;
  
  constructor(private reservationService: ReservationsService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
    this.setReservationArrangementDetails();
    this.setReservaionForNonLoggedInUser();
  }

  setReservaionForNonLoggedInUser(){
    this.messengerService.getReservationForNonLoggedInUser().subscribe(arg => {
      this.reservationArrangement.price = arg.price
      this.reservationArrangement.reservations.push(arg)
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
    this.reservationService.proceedReservationsForNonLoggedInUser(this.reservationArrangement).subscribe(
      localStorage.clear
    )
  }

}
