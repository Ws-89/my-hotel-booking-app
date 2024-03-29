import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService, 
    private router: Router,
    private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.userAuthService.getToken() !== null) {
      const authorities = route.data['authorities'] as Array<string>

      if(authorities){
        const match = this.userService.authoritiesMatch(authorities);

        if(match){
          return true;
        } else {
          this.router.navigate(['/forbidden'])
          return false;
        }

      }

    }



    this.router.navigate(['/login']);
    return false;
  }
  
}
