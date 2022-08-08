import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../_services/guest.service';

@Component({
  selector: 'app-guest-update',
  templateUrl: './guest-update.component.html',
  styleUrls: ['./guest-update.component.css']
})
export class GuestUpdateComponent implements OnInit {

  form: FormGroup;
  id: number;

  constructor(private fb: FormBuilder, private guestService: GuestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      guestAddress: this.fb.group({
        street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
        zipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      }),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]))
    })

    this.guestService.getPrincipal$().subscribe(response => {
      console.log(response)
      this.form.patchValue({
        firstName: response.data.object.firstName,
        lastName: response.data.object.lastName,
        email: response.data.object.email,
        guestAddress: response.data.object.address,
        phoneNumber: response.data.object.phoneNumber
      })
    },
    error => console.log(error));
  }

  updateGuest(){
    this.guestService.updateGuest(this.id, this.form.value).then(response => {
        this.router.navigate(['guest']);
    })
  }

  get firstName() { return this.form.get('firstName') };
  get lastName() { return this.form.get('lastName') };
  get email() { return this.form.get('email') };
  get addressControls() { return ((this.form.get('guestAddress') as FormGroup).controls) }
  get phoneNumber() { return this.form.get('phoneNumber')};
    
  
}
