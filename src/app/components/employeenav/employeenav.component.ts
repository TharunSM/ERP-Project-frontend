import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employeenav',
  templateUrl: './employeenav.component.html',
  styleUrls: ['./employeenav.component.css']
})
export class EmployeenavComponent implements OnInit {
  
  mode:boolean = false;
  mode1:boolean=false;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"])
  }
}
