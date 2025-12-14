import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/user.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-employee-view-project',
  templateUrl: './employee-view-project.component.html',
  styleUrls: ['./employee-view-project.component.css']
})
export class EmployeeViewProjectComponent implements OnInit {

  projects: Project[] = [];
  flagDataNotFound: boolean = false;
  users: User;
  constructor(private service: ProjectService) {
    this.getAllProjectsForUser();
  }

  ngOnInit(): void {
  }

  getAllProjectsForUser() {
    this.service.getAllProjectsForUser().subscribe(data => {
      let id = parseInt(localStorage.getItem("userId"));
      this.users = data;
      this.projects = this.users.project;
      if (this.projects.length == 0) {
        this.flagDataNotFound = true;
      }
      else {
        this.flagDataNotFound = false;
      }
    })
  }

}
