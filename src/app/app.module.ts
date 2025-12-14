import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeAddProposalComponent } from './components/employee-add-proposal/employee-add-proposal.component';
import { EmployeeViewProjectComponent } from './components/employee-view-project/employee-view-project.component';
import { EmployeeViewProposalComponent } from './components/employee-view-proposal/employee-view-proposal.component';
import { EmployeeaddfeedbackComponent } from './components/employeeaddfeedback/employeeaddfeedback.component';
import { EmployeenavComponent } from './components/employeenav/employeenav.component';
import { EmployeeviewfeedbackComponent } from './components/employeeviewfeedback/employeeviewfeedback.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManagerviewfeedbackComponent } from './components/managerviewfeedback/managerviewfeedback.component';
import { ManagernavComponent } from './components/managernav/managernav.component';
import { ManagerViewProposalComponent } from './components/manager-view-proposal/manager-view-proposal.component';
import { ManagerViewProjectComponent } from './components/manager-view-project/manager-view-project.component';
import { ManagerEditProjectComponent } from './components/manager-edit-project/manager-edit-project.component';
import { ManagerAddProjectComponent } from './components/manager-add-project/manager-add-project.component';
import { ErrorComponent } from './components/error/error.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeEditProposalComponent } from './components/employee-edit-proposal/employee-edit-proposal.component';

import { ManagerAssingProjectComponent } from './components/manager-assign-project/manager-assing-project.component';
import { AuthInterceptor } from './services/auth.interceptor';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewPortComponent } from './components/view-port/view-port.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddProposalComponent,
    EmployeeViewProjectComponent,
    EmployeeViewProposalComponent,
    EmployeeaddfeedbackComponent,
    EmployeenavComponent,
    EmployeeviewfeedbackComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    ManagerviewfeedbackComponent,
    ManagernavComponent,
    ManagerViewProposalComponent,
    ManagerViewProjectComponent,
    ManagerEditProjectComponent,
    ManagerAddProjectComponent,
    ErrorComponent,
    EmployeeEditProposalComponent,
    ManagerAssingProjectComponent,
    ManagerAssingProjectComponent,
    ViewPortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgApexchartsModule,
    BrowserModule,
    NgbModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
