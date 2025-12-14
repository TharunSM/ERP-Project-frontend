import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    return this.checkAuth();
  }

  //If user is a Employee
  private checkAuth(): boolean {
    if (!this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/home']);
      return false;
    } else {
      if (localStorage.getItem('role') == 'Employee') {
        return true;
      } else {
        // Redirect to the login page if the user is not authenticated
        this.router.navigate(['/error']);
        return false;
      }

    }
  }

}





