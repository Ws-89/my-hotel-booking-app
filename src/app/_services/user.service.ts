import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  private baseUrl = "http://localhost:8085/authenticate";
  private registrationUrl = "http://localhost:8085/registration";

  

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService) { }

  public login(loginData) {
    return this.httpClient.post(`${this.baseUrl}`, loginData, { headers: this.requestHeader })
  }

  register(user: User): Observable<Object>{
    return this.httpClient.post(`${this.registrationUrl}`, user, { headers: this.registerHeader})
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
