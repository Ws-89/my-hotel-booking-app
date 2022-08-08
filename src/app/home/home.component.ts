import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailabilityRequestInterface } from '../models/interface/availabilityRequest.interface';
import { Reservation } from '../models/reservation';
import { MessengerService } from '../_services/messenger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  reservationRequest: AvailabilityRequestInterface;

  constructor(private fb: FormBuilder, private router: Router, private messengerService: MessengerService) { }

  startDate = new Date();
  minDate = new Date();
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  maxDate = new Date(this.year+2, this.month)

  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      city: new FormControl('',Validators.required),
      numberOfRooms: new FormControl('',Validators.required),
      partySize: new FormControl('',Validators.required)
    })
  }

  onSubmit(){
    this.reservationRequest = this.form.value;
    const startDate = this.form.value.startDate + 'Z';
    const startDateIso = new Date(startDate).toISOString()
    const endDate = this.form.value.endDate + 'Z';
    const endDateIso = new Date(endDate).toISOString()
    this.reservationRequest.startDate = startDateIso;
    this.reservationRequest.endDate = endDateIso;
    this.messengerService.sendAvailabilitySearchData(this.reservationRequest);
    this.router.navigate(['available-hotels-list']);
  }
}
