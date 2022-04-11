import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserAuthService } from '../../_services/user-auth.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  constructor(
    private userService: UserService, 
    private userAuthService: UserAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  register(registerForm:NgForm){
    console.log(registerForm.value)
    this.userService.register(registerForm.value).subscribe(data => {
      console.log(data); 
      this.registrationSuccess();
    }, 
    error => console.log(error));
  }

  registrationSuccess(){
    this.router.navigate(['/register-success'])
  }
}
