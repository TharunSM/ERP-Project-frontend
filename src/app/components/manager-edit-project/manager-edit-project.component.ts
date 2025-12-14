import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manager-edit-project',
  templateUrl: './manager-edit-project.component.html',
  styleUrls: ['./manager-edit-project.component.css']
})
export class ManagerEditProjectComponent implements OnInit {

  projectId: number;
  flag: boolean = false;
  project: Project;
  projects: Project[];
  editForm: FormGroup;

  constructor(private service: ProjectService, private activtedRoute: ActivatedRoute, private builder: FormBuilder, private router: Router) {

    this.projectId = this.activtedRoute.snapshot.params['projectId'];

    this.findByProjectId();

    this.editForm = builder.group({
      projectTitle: builder.control("", Validators.required),
      projectDescription: builder.control("", Validators.required),
      startDate: builder.control("", [Validators.required, this.futureDateValidator]),
      endDate: builder.control("", [Validators.required, this.futureDateValidators]),
      frontEndTechStack: builder.control("", Validators.required),
      backendTechStack: builder.control("", Validators.required),
      databaseStack: builder.control("", Validators.required),
      status: builder.control("", Validators.required)
    })
  }

  ngOnInit(): void {
  }

  updateProject() {
    this.service.updateProject(this.projectId, this.project).subscribe(data => {
      this.flag = true;
    })
  }

  public findByProjectId() {
    this.service.getProjectById(this.projectId).subscribe(data => {
      this.project = data;
    })
  }

  futureDateValidator(control) {
    const startDate = new Date(control.value);
    const currentDate = new Date();
    if (startDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  futureDateValidators(control) {
    const endDate = new Date(control.value);
    const currentDate = new Date();
    if (endDate < currentDate) {
      return { pastDate: true };
    }
    return null;
  }

  cancelEdit() {
    this.router.navigate(['/viewManagerProject'])
  }
  public get projectTitle(): FormControl {
    return this.editForm.get('projectTitle') as FormControl;
  }
  public get projectDescription(): FormControl {
    return this.editForm.get('projectDescription') as FormControl;
  }
  public get startDate(): FormControl {
    return this.editForm.get('startDate') as FormControl;
  }
  public get endDate(): FormControl {
    return this.editForm.get('endDate') as FormControl;
  }
  public get frontEndTechStack(): FormControl {
    return this.editForm.get('frontEndTechStack') as FormControl;
  }
  public get backendTechStack(): FormControl {
    return this.editForm.get('backendTechStack') as FormControl;
  }
  public get databaseStack(): FormControl {
    return this.editForm.get('databaseStack') as FormControl;
  }
  public get status(): FormControl {
    return this.editForm.get('status') as FormControl;
  }
}