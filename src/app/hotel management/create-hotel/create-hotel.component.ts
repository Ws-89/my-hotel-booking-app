import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { Grade } from '../../enum/grade-type.enum';
import { HotelsService } from '../../_services/hotels.service';



@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css'],
})
export class CreateHotelComponent implements OnInit {

  grades = Grade;
  gradeKeys = [];
  form: FormGroup;
  hotel = new Hotel();
  errorMessage: string = '';

  constructor(private hotelService: HotelsService, private router: Router, private fb: FormBuilder) { 
    this.gradeKeys = Object.keys(this.grades);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      grade: new FormControl('', Validators.required),
      address: this.fb.group({
        street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        zipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      }),
      contact: this.fb.group({
        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
        phone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]))
      })
    })
  }

  saveHotel(){
    this.hotelService.saveHotel(this.form.value).then(res => {
      this.goToHotelList();
    },
    error => this.errorMessage = error);
  }

  goToHotelList(){
    this.router.navigate(['/hotels'])
  }
  
  
  get name() { return this.form.get('name'); }
  get grade() { return this.form.get('grade'); }
  get addressControls() { return ((this.form.get('address') as FormGroup).controls) }
  get street() { return this.form.get('street'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get country() { return this.form.get('country'); }
  get zipCode() { return this.form.get('hzipCode'); }
  get contactControls() { return ((this.form.get('contact') as FormGroup).controls) }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }
}

