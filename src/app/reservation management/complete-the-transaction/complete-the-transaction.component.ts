import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationRequest } from 'src/app/models/reservation';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';

@Component({
  selector: 'app-complete-the-transaction',
  templateUrl: './complete-the-transaction.component.html',
  styleUrls: ['./complete-the-transaction.component.css']
})
export class CompleteTheTransactionComponent implements OnInit {

  reservationRequest: ReservationRequest
  
  constructor(private reservationService: ReservationsService,
              private messengerService: MessengerService,
              private router: Router) { }

  ngOnInit(): void {
    this.reservationRequest = this.messengerService.getReservationRequest();
    console.log('rr : ',this.reservationRequest)
  }
  
  saveReservation(saveReservationForm: NgForm){
    this.reservationRequest.email = saveReservationForm.form.value.email;
    
    this.reservationService.proceedReservationsForNonLoggedInUser(this.reservationRequest).then(result => 
      this.router.navigate([''])
    )
  }

}
