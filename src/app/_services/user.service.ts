import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CredentialsInterface } from '../models/interface/credentials.interface';
import { User } from '../models/user';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  );

  registerHeader = new HttpHeaders(
    { "Register": "True"}
  );

  private baseUrl = environment.baseUrl;
  private authenticate = 'authenticate'
  private registrationUrl = "registration";

  

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  public login(loginData: CredentialsInterface) {
    return this.httpClient.post(`${this.baseUrl}/${this.authenticate}`, loginData, { headers: this.requestHeader }).toPromise();
  }

  register(user: User) {
    return this.httpClient.post(`${this.baseUrl}/${this.registrationUrl}`, user, { headers: this.registerHeader}).toPromise();
  }


  public authoritiesMatch(allowedAuthorities): boolean{
    let isMatch = false;
    const userAuthorities:any = this.userAuthService.getAuthorities();
    
    

    if(userAuthorities != null && userAuthorities){
      for(let i=0; i < userAuthorities.length; i++){
        for(let j=0; j < allowedAuthorities.length; j++){
          if(userAuthorities[i].authority === allowedAuthorities[j]){
            isMatch = true;
            return isMatch;
          }
          
        }
      }
    }
    return isMatch;
  }
}
