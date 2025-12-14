import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectProposal } from '../models/projectProposal.model';
import { backendApi } from '../backendApi.js';

@Injectable({
  providedIn: 'root'
})
export class ProjectProposalService {

  apiUrl: string = backendApi;

  constructor(private http: HttpClient) { }

  // getallprojects
  getAllProjectProposals(): Observable<ProjectProposal[]> {
    return this.http.get(this.apiUrl + "/api/projectproposals") as Observable<ProjectProposal[]>;
  }

  //getProposalByEmployeeId
  getProposalByEmployeeId(): Observable<any> {
    let empId = parseInt(localStorage.getItem('userId'));
    return this.http.get(this.apiUrl + '/api/projectproposals/employee/' + empId);
  }

  //getprojects by id
  getProjectProposalById(proposalId: number): Observable<ProjectProposal> {
    return this.http.get(this.apiUrl + "/api/projectproposals/" + proposalId);
  }

  //getProjectProposalByUserId
  getProjectProposalsByUserId(userId: number): Observable<ProjectProposal[]> {
    return this.http.get(this.apiUrl + "/api/projectproposals/user/" + userId) as Observable<ProjectProposal[]>;
  }

  //addProjectProposal
  addProjectProposal(projectProposal: ProjectProposal): Observable<any> {
    return this.http.post(this.apiUrl + '/api/projectproposals', projectProposal);
  }

  //updateProjectProposal
  updateProjectProposal(proposalId: number, projectPrposal: ProjectProposal): Observable<any> {
    return this.http.put(this.apiUrl + "/api/projectproposals/" + proposalId, projectPrposal);
  }

  //deleteProjectProposal
  deleteProjectProposal(proposalId: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/api/projectproposals/" + proposalId);
  }
}
