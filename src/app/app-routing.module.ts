import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { ManagerAddProjectComponent } from './components/manager-add-project/manager-add-project.component';
import { ManagerViewProjectComponent } from './components/manager-view-project/manager-view-project.component';
import { ManagerViewProposalComponent } from './components/manager-view-proposal/manager-view-proposal.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ManagerEditProjectComponent } from './components/manager-edit-project/manager-edit-project.component';

import { EmployeeAddProposalComponent } from './components/employee-add-proposal/employee-add-proposal.component';
import { EmployeeViewProjectComponent } from './components/employee-view-project/employee-view-project.component';
import { EmployeeaddfeedbackComponent } from './components/employeeaddfeedback/employeeaddfeedback.component';
import { EmployeeviewfeedbackComponent } from './components/employeeviewfeedback/employeeviewfeedback.component';
import { EmployeeViewProposalComponent } from './components/employee-view-proposal/employee-view-proposal.component';
import { ErrorComponent } from './components/error/error.component';
import { EmployeeEditProposalComponent } from './components/employee-edit-proposal/employee-edit-proposal.component';
import { ManagerAssingProjectComponent } from './components/manager-assign-project/manager-assing-project.component';
import { AuthManagerGuard } from './components/authguard/authManager.guard';
import { AuthEmployeeGuard } from './components/authguard/auth-employee.guard';



const routes: Routes = [

  { path: "register", component: RegistrationComponent },

  { path: "login", component: LoginComponent },

  //Main component
  { path: "home", component: HomeComponent },

  { path: "error", component: ErrorComponent },

  //Manager Routing Links
  { path: "manager/add/project", component: ManagerAddProjectComponent, canActivate: [AuthManagerGuard] },

  { path: "editManagerProject/:projectId", component: ManagerEditProjectComponent, canActivate: [AuthManagerGuard] },

  { path: "manager/view/project", component: ManagerViewProjectComponent, canActivate: [AuthManagerGuard] },
  { path: "viewManagerProject", component: ManagerViewProjectComponent, canActivate: [AuthManagerGuard] },

  { path: "manager/view/proposal", component: ManagerViewProposalComponent, canActivate: [AuthManagerGuard] },

  { path: "manager/view/feedback", component: ManagerviewfeedbackComponent, canActivate: [AuthManagerGuard] },
  { path: "managerview", component: ManagerviewfeedbackComponent, canActivate: [AuthManagerGuard] },

  { path: "manager/assign/project", component: ManagerAssingProjectComponent, canActivate: [AuthManagerGuard] },


  { path: "editManagerProject/:projectId", component: ManagerEditProjectComponent },

  //Employee Routing Links
  { path: "editEmployeeProposal/:proposalId", component: EmployeeEditProposalComponent, canActivate: [AuthEmployeeGuard] },


  { path: "employee/add/proposal", component: EmployeeAddProposalComponent, canActivate: [AuthEmployeeGuard] },

  { path: "employee/view/proposal", component: EmployeeViewProposalComponent, canActivate: [AuthEmployeeGuard] },

  { path: "viewEmployeeProject", component: EmployeeViewProjectComponent, canActivate: [AuthEmployeeGuard] },
  { path: "employee/project", component: EmployeeViewProjectComponent, canActivate: [AuthEmployeeGuard] },


  { path: "employee/add/feedback", component: EmployeeaddfeedbackComponent, canActivate: [AuthEmployeeGuard] },
  { path: "employeeaddfeedback", component: EmployeeaddfeedbackComponent, canActivate: [AuthEmployeeGuard] },

  { path: "employee/view/feedback", component: EmployeeviewfeedbackComponent, canActivate: [AuthEmployeeGuard] },
  { path: "employeeviefeedback", component: EmployeeviewfeedbackComponent, canActivate: [AuthEmployeeGuard] },


  { path: "", component: HomeComponent },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
