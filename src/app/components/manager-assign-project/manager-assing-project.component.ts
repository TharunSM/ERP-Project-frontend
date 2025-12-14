import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-assing-project',
  templateUrl: './manager-assing-project.component.html',
  styleUrls: ['./manager-assing-project.component.css']
})
export class ManagerAssingProjectComponent implements OnInit {

  flag: boolean = undefined;
  users: User[] = [];
  projects: Project[];
  empListToView: User[] = [];
  empListToAddToProject: User[] = [];
  userIdAssigned: number;
  searchTitle: string;
  projectIdToAddEmp: number = undefined;

  constructor(private service: ProjectService, private router: Router) {
    this.getAllUsers();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  addEmployeeToProject(id: number) {
    this.projectIdToAddEmp = id;
  }

  projectIsAssignedToUser(user: any) {
    let projectsToCheck: Project[] = user.project;
    this.userIdAssigned = user.userId;

    for (let p of projectsToCheck) {
      if (p.projectId == this.projectIdToAddEmp) {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }

    if (projectsToCheck.length <= 0) {
      this.flag = true;
    }
  }


  assignUserToProject(employeeId: number) {
    this.service.addUserToProject(this.projectIdToAddEmp, employeeId).subscribe(data => {
      location.reload();
    });
  }

  unassignUserToProject(employeeId: number) {
    this.service.removeUserFromProject(this.projectIdToAddEmp, employeeId).subscribe(data => {
      location.reload();
    });
  }

  getAllUsers() {
    this.service.getAllUsers().subscribe(data => {
      this.users = data;
      for (let i in this.users) {
        if (this.users[i].role == "Employee") {
          this.empListToView.push(this.users[i]);
        }
      }
    })
  }

  getAllProjects() {
    this.service.getAllProjects().subscribe(data => this.projects = data)
  }

  searchProject() {
    if (this.searchTitle.trim().length != 0) {
      this.projects = this.projects.filter(p => {
        return p.projectTitle.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    } else {
      this.getAllProjects();
    }
  }

  getcolor() {
    if (this.flag)
      return 'green'
    else
      return 'red'
  }
}
