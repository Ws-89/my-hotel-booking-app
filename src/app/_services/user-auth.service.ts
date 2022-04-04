import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setAuthorities(authorities: []){
    localStorage.setItem('authorities', JSON.stringify(authorities));
  }

  public getAuthorities(): []{
    return JSON.parse(localStorage.getItem('authorities'));
  }

  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem("jwtToken");
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn(){
    return this.getAuthorities() && this.getToken();
  }
}
