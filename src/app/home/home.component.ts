import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessengerService } from '../_services/messenger.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

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
    this.messengerService.sendAvailabilitySearchData(this.form.value);
    this.router.navigate(['available-hotels-list']);
  }



}
