import { Component, OnInit } from '@angular/core';
import { Availability } from 'src/app/models/availability';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-complete-the-transaction',
  templateUrl: './complete-the-transaction.component.html',
  styleUrls: ['./complete-the-transaction.component.css']
})
export class CompleteTheTransactionComponent implements OnInit {
  reservations:Availability[];
  reservation: Availability;
  totalPrice: number = 0;
  
  constructor(private userAuthService: UserAuthService,
              private reservationService: ReservationsService,
              private messengerService: MessengerService) { }

  ngOnInit(): void {
      this.setReservaionForNonLoggedInUser();
  }

  setReservaionForNonLoggedInUser(){
    this.messengerService.getReservationForNonLoggedInUser().subscribe(data => {
      this.reservation = <Availability>data
      this.totalPrice = this.reservation.price
      console.log(this.totalPrice + " cena")
    })
   
  }

}
