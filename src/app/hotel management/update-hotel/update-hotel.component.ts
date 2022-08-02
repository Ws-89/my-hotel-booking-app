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

    this.hotelService.getHotelById(this.id).then(data => {
        this.form.patchValue({
          name: data.name, 
          contact: {
            email: data.contact.email,
            phone: data.contact.phoneNumber
          },
          grade: data.grade,
          address: {
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            country: data.address.country,
            zipCode: data.address.zipCode,
          }
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
