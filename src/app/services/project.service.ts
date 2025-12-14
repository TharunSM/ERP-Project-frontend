import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { backendApi } from '../backendApi.js';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiUrl: string = backendApi;

  constructor(private httpClient: HttpClient) { }

  //get all the projects
  public getAllProjects(): Observable<Project[]> {
    return this.httpClient.get(this.apiUrl + "/api/projects") as Observable<Project[]>;
  }

  //get All Projects for a user from localStorage
  public getAllProjectsForUser(): Observable<any> {
    let id = parseInt(localStorage.getItem("userId"));
    return this.httpClient.get(this.apiUrl + "/api/user/" + id);
  }

  //get project by projectId
  getProjectById(projectId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + "/api/projects/" + projectId);
  }

  //add Project
  addProject(project: Project): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/api/projects", project);
  }

  //updateProject by projectId
  updateProject(projectcId: number, project: Project): Observable<any> {
    return this.httpClient.put(this.apiUrl + "/api/projects/" + projectcId, project);
  }

  //delete a specific project by Id
  deleteProject(projectId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + "/api/projects/" + projectId);
  }

  //get AllUsers
  getAllUsers(): Observable<User[]> {
    return this.httpClient.get(this.apiUrl + "/api/users") as Observable<User[]>
  }

  //assign Project to User
  addUserToProject(projectId: number, userId: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/api/project/' + projectId + '/user/' + userId);
  }

  //Unassign Project to User
  removeUserFromProject(projectId: number, userId: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/api/project/remove/' + projectId + '/user/' + userId);
  }
}


