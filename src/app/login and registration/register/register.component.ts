import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  form: FormGroup;

  constructor(
    private userService: UserService, 
    private router: Router,
    private fb: FormBuilder,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$')])),
      street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      city: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      state: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      country: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      zipCode: new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
      phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{9}$')]))
    })
  }
  
  register(){
    this.userService.register(this.form.value).then(data => {
      
      this.registrationSuccess();
    }, 
    error => console.log(error));
  }

  registrationSuccess(){
    this.router.navigate(['/register-success'])
  }

  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get street() { return this.form.get('street'); }
  get city() { return this.form.get('city'); }
  get state() { return this.form.get('state'); }
  get country() { return this.form.get('country'); }
  get zipCode() { return this.form.get('zipCode'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
}
