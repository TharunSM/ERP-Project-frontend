import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


//MANAGER AUTH GUARD
@Injectable({
  providedIn: 'root'
})
export class AuthManagerGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    return this.checkAuth();
  }


  //If user is a Manager
  private checkAuth(): boolean {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      if (localStorage.getItem('role') == 'Manager') {
        return true;
      } else {
        // Redirect to the login page if the user is not authenticated
        this.router.navigate(['/error']);
        return false;
      }

    }
  }

}
