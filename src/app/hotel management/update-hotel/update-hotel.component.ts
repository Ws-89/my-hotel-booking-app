import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelInterface } from 'src/app/models/interface/hotelInterface.interface';
import { Grade } from '../../enum/grade-type.enum';
import { HotelsService } from '../../_services/hotels.service';


@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.css']
})
export class UpdateHotelComponent implements OnInit {

  hotel: HotelInterface;
  id: number;
  form: FormGroup;
  grades = Grade;
  gradeKeys = [];

  constructor(private hotelService: HotelsService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { 
    this.gradeKeys = Object.keys(this.grades)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      hotelName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelEmail: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      hotelGrade: new FormControl('', Validators.required),
      hotelStreet: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelCity: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelState: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelCountry: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelZipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      hotelPhone: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]))
    })

    this.hotelService.getHotelById(this.id).then(data => {
        this.form.patchValue({
          hotelName: data.hotelName, 
          hotelEmail: data.email, 
          hotelGrade: data.grade,
          hotelStreet: data.street,
          hotelCity: data.city,
          hotelState: data.state,
          hotelCountry: data.country,
          hotelZipCode: data.zipCode,
          hotelPhone: data.phoneNumber
        })
    },
    error => console.log(error));
  }

  onSubmit() {
    this.hotelService.updateHotel(this.id, this.form.value).then(data => {
      this.goToHotelList();
    },
    error => console.log(error));
  }

  goToHotelList(){
    this.router.navigate(['/hotels'])
  }

  get hotelName() { return this.form.get('hotelName'); }
  get hotelEmail() { return this.form.get('hotelEmail'); }
  get hotelGrade() { return this.form.get('hotelGrade'); }
  get hotelStreet() { return this.form.get('hotelStreet'); }
  get hotelCity() { return this.form.get('hotelCity'); }
  get hotelState() { return this.form.get('hotelState'); }
  get hotelCountry() { return this.form.get('hotelCountry'); }
  get hotelZipCode() { return this.form.get('hotelZipCode'); }
  get hotelPhone() { return this.form.get('hotelPhone'); }
  

}
