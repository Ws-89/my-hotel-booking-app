import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailabilityRequest } from '../models/availabilityRequest';
import { AvailabilityService } from '../_services/availability.service';
import { MessengerService } from '../_services/messenger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, private availabilityService: AvailabilityService, private router: Router, private messengerService: MessengerService) { }

  startDate = new Date();
  minDate = new Date();
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  maxDate = new Date(this.year+2, this.month)

  ngOnInit(): void {
    this.form = this.fb.group({
      from_date: new FormControl(),
      to_date: new FormControl(),
      city: new FormControl(),
      numberOfRooms: new FormControl(),
      partySize: new FormControl()
    })
    
  }

  onSubmit(){
    this.messengerService.sendAvailabilitySearchData(new AvailabilityRequest(this.form.value));
    this.router.navigate(['available-hotels-list']);
  }



}
