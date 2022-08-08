import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { MessengerService } from 'src/app/_services/messenger.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';

@Component({
  selector: 'app-complete-the-transaction',
  templateUrl: './complete-the-transaction.component.html',
  styleUrls: ['./complete-the-transaction.component.css']
})
export class CompleteTheTransactionComponent implements OnInit {

  reservationRequest: Reservation
  form: FormGroup;
  
  constructor(private reservationService: ReservationsService,
              private messengerService: MessengerService,
              private router: Router, private fb: FormBuilder, private userAuth: UserAuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      guestName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      guestLastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      requestMessage: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$')])),
      address: this.fb.group({
        street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        zipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      })
    })

    this.reservationRequest = this.messengerService.getReservationRequest();
    console.log('rr : ',this.reservationRequest)
  }
  
  saveReservation(){
    console.log(this.form.value, 'form ')
    console.log( this.reservationRequest, 'request ')
    this.reservationRequest.email = this.form.value.email
    this.reservationRequest.guestName = this.form.value.guestName
    this.reservationRequest.guestLastName = this.form.value.guestLastName
    this.reservationRequest.requestMessage = this.form.value.requestMessage
    this.reservationRequest.guestAddress = this.form.value.address
    
    if(this.userAuth.isLoggedIn()){
      this.reservationService.proceedReservationForLoggedInUser(this.reservationRequest).then(result => 
        this.router.navigate([''])
      )
    } else {
      this.reservationService.proceedReservation(this.reservationRequest).then(result => 
        this.router.navigate([''])
      )
    }
  }

  get guestName() { return this.form.get('guestName'); }
  get guestLastName() { return this.form.get('guestLastName'); }
  get email() { return this.form.get('email'); }
  get requestMessage() { return this.form.get('requestMessage'); }
  get addressControls() { return ((this.form.get('address') as FormGroup).controls) }
  get street() { return this.form.get('street'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get country() { return this.form.get('country'); }
  get zipCode() { return this.form.get('hzipCode'); }

}
