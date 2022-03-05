import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AvailabilityRequest } from '../models/availabilityRequest';
import { AvailabilityService } from '../_services/availability.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  availabilityRequest: AvailabilityRequest = new AvailabilityRequest();


  constructor(private fb: FormBuilder, private availabilityService: AvailabilityService, private router: Router) { }

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
      roomAmmount: new FormControl(),
      partySize: new FormControl()
    })
    
  }

  onSubmit(){
    this.availabilityRequest = new AvailabilityRequest(this.form.value);
    this.availabilityService.passSearchParameters(this.availabilityRequest);
    this.router.navigate(['availability-list']);
  }



}
