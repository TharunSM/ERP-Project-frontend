import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'angularapp';

  universalNav = true;
  employeeNav = false;
  managerNav = false;
  windownWidth = undefined;


  constructor(public authService: AuthService) {
    let userRole = localStorage.getItem("role");
    if (userRole == "") {
      this.universalNav = true;
      this.employeeNav = false;
      this.managerNav = false;

    } else if (userRole == "Employee") {
      this.universalNav = false;
      this.employeeNav = true;
      this.managerNav = false;
    } else if (userRole == "Manager") {
      this.universalNav = false;
      this.managerNav = true;
      this.employeeNav = false;
    } else {
      this.universalNav = true;
      this.employeeNav = false;
      this.managerNav = false;
    }
  }

  ngOnInit(): void {
    this.windownWidth = window.innerWidth;
  }
}
