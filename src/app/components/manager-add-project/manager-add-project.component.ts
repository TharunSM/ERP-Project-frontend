import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-add-project',
  templateUrl: './manager-add-project.component.html',
  styleUrls: ['./manager-add-project.component.css']
})
export class ManagerAddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  flag: boolean = false;
  exist: boolean = false;
  cancel: boolean = false;

  startDateOut: Date;
  endDateOut: Date;

  constructor(private service: ProjectService, private builder: FormBuilder, private router: Router) {
    this.addProjectForm = this.builder.group({
      projectTitle: this.builder.control("", Validators.required),
      projectDescription: this.builder.control("", Validators.required),
      startDate: this.builder.control("", [Validators.required, this.futureDateValidator]),
      endDate: this.builder.control("", [Validators.required, , this.futureDateValidators]),
      frontEndTechStack: this.builder.control("", Validators.required),
      backendTechStack: this.builder.control("", Validators.required),
      databaseStack: this.builder.control("", Validators.required),
      status: this.builder.control("", Validators.required)
    })
  }

  ngOnInit(): void {
  }

  public addProject() {
    if (this.addProjectForm.valid) {
      let project: Project = this.addProjectForm.value;
      this.service.addProject(project).subscribe(data => {
        this.flag = true;
        this.addProjectForm.reset();
      }, error => {
        this.exist = true;
      })
    }
  }

  futureDateValidator(control) {
    const startDateOut = new Date(control.value);
    const currentDate = new Date();
    if (startDateOut < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  futureDateValidators(control) {
    const endDateOut = new Date(control.value);
    const currentDate = new Date();
    if (endDateOut < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  public get projectTitle(): FormControl {
    return this.addProjectForm.get('projectTitle') as FormControl;
  }
  public get projectDescription(): FormControl {
    return this.addProjectForm.get('projectDescription') as FormControl;
  }
  public get startDate(): FormControl {
    return this.addProjectForm.get('startDate') as FormControl;
  }
  public get endDate(): FormControl {
    return this.addProjectForm.get('endDate') as FormControl;
  }
  public get frontEndTechStack(): FormControl {
    return this.addProjectForm.get('frontEndTechStack') as FormControl;
  }
  public get backendTechStack(): FormControl {
    return this.addProjectForm.get('backendTechStack') as FormControl;
  }
  public get databaseStack(): FormControl {
    return this.addProjectForm.get('databaseStack') as FormControl;
  }
  public get status(): FormControl {
    return this.addProjectForm.get('status') as FormControl;
  }
}




