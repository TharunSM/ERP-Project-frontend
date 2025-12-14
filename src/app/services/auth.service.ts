import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { backendApi } from '../backendApi.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logout: any;
  apiUrl = backendApi;
  private isAuthenticated = false;
  UserRegisteredObject: User;

  public register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + '/api/register', user);
  }

  public login(login: Login, callback: any) {
    this.httpClient.post(this.apiUrl + '/api/login', login).subscribe((data: any) => {
      localStorage.setItem("jwtToken", data.jwtToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId + "");
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      this.isAuthenticated = true;
      if (data.role == "Employee") {
        this.router.navigate(['/home'])
      } else if (data.role == "Manager") {
        this.router.navigate(['/home']);

      }
      callback(true);
    }, error => {
      callback(false);
    });

  }

  public isLoggedIn(): boolean {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken == null || jwtToken == undefined) {
      return false;
    } else {
      return true;
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  isAuthenticatedRole(): string {
    return localStorage.getItem("role");
  }

  public getUserObjectById(): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/getUser/' + parseInt(localStorage.getItem("userId")));
  }

  constructor(private httpClient: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem("jwtToken");
  }
}
