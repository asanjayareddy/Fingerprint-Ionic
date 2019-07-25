import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(private router: Router,  private authService: AuthenticationService) {

  }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
