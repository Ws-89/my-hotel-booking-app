import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { UserAuthService } from '../../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg = '';
  form: FormGroup;

  constructor(
    private userService: UserService, 
    private userAuthService: UserAuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: new FormControl('', Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$')])),
      userPassword: new FormControl('', Validators.required)
    })
  }

  login() {
    this.userService.login(this.form.value).then(
      (response:any)=> {

        this.userAuthService.setAuthorities(response.userDetails.authorities);
        this.userAuthService.setToken(response.jwtToken);
        
        const roles_array: any[] = response.userDetails.authorities;
        
        if(roles_array.find(e => e.authority === 'ROLE_ADMIN')){
          this.router.navigate(['/admin']);
        }else if(roles_array.find(e => e.authority === 'ROLE_GUEST')){
          this.router.navigate(['/home'])
        }else{
          console.log("No role assigned");
          
        }
      },
      error => {
        console.log(error);
        this.msg = "The given login or password is incorrect."
      }
    )
  }

  register(){
    this.router.navigate(['/register'])
  }

  get userName() { return this.form.get('userName'); }
  get userPassword() { return this.form.get('userPassword'); }
}
