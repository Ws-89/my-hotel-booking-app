import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { concat, forkJoin, zip } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
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
  reservationArrangement = new ReservationArrangement;
  

  
  constructor(private reservationService: ReservationsService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
    zip(this.messengerService.getReservationForNonLoggedInUser(), this.messengerService.getAvailabilitySearchData()).subscribe(result => {
      let price = 0;

      result[0].forEach(item => {
        this.reservationArrangement.reservations.push(item);
        price += item.price
      })
      this.reservationArrangement.price = price
      this.reservationArrangement.numberOfRooms = result[1].numberOfRooms;
      this.reservationArrangement.partySize = result[1].partySize;
    });
  }
  
  saveReservation(saveReservationForm: NgForm){
    this.reservationArrangement.email = saveReservationForm.form.value.email;
    console.log('reservation', this.reservationArrangement)
    this.reservationService.proceedReservationsForNonLoggedInUser(this.reservationArrangement).subscribe(
      data => console.log(data)
    )
  }

}
