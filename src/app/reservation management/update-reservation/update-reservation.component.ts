import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationManagementService } from 'src/app/_services/reservation-management.service';
import { ReservationsService } from 'src/app/_services/reservations.service';
import {Location} from '@angular/common';


@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.css']
})
export class UpdateReservationComponent implements OnInit {

  form: FormGroup;
  id: number;
  currentDate = new Date();
  minDate = new Date();
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  maxDate = new Date(this.year+2, this.month)

  constructor(private reservationManagementService: ReservationManagementService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private _location: Location) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      guestName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      guestLastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      requestMessage: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$')])),
      guestAddress: this.fb.group({
        street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        zipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      })
    })

    this.reservationManagementService.getReservationById$(this.id).subscribe(response => {
      console.log(response)
      this.form.patchValue({
        startDate: response.data.object.startDate,
        endDate: response.data.object.endDate,
        email: response.data.object.email,
        guestName: response.data.object.guestName, 
        guestLastName: response.data.object.guestLastName,
        requestMessage: response.data.object.requestMessage,
        guestAddress: {
          street: response.data.object.guestAddress.street,
          city: response.data.object.guestAddress.city,
          state: response.data.object.guestAddress.state,
          country: response.data.object.guestAddress.country,
          zipCode: response.data.object.guestAddress.zipCode,
        }
      })
  },
  error => console.log(error));
}

onSubmit() {

  this.reservationManagementService.updateReservation(this.id, this.form.value).then(data => {
    this.backClicked();
  },
  error => console.log(error));
}
  
backClicked() {
  this._location.back();
}

  get startDate() { return this.form.get('startDate'); }
  get endDate() { return this.form.get('endDate'); }
  get guestName() { return this.form.get('guestName'); }
  get guestLastName() { return this.form.get('guestLastName'); }
  get email() { return this.form.get('email'); }
  get requestMessage() { return this.form.get('requestMessage'); }
  get addressControls() { return ((this.form.get('guestAddress') as FormGroup).controls) }
  get street() { return this.form.get('street'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get country() { return this.form.get('country'); }
  get zipCode() { return this.form.get('hzipCode'); }
}
