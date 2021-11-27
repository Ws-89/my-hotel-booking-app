import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService, 
    private userAuthService: UserAuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(loginForm:NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response:any)=> {

        this.userAuthService.setAuthorities(response.userDetails.authorities);
        this.userAuthService.setToken(response.jwtToken);

        const roles_array: any[] = response.userDetails.authorities;

        console.log(this.userService.authoritiesMatch(['ROLE_ADMIN']))
        
        if(roles_array.find(e => e.authority === 'ROLE_ADMIN')){
          this.router.navigate(['/admin']);
        }else if(roles_array.find(e => e.authority === 'ROLE_GUEST')){
          this.router.navigate(['/guest'])
        }else{
          console.log("No role assigned");
          
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  register(){
    this.router.navigate(['/register'])
  }
}
