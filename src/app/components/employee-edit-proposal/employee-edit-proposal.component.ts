import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectProposal } from 'src/app/models/projectProposal.model';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';

@Component({
  selector: 'app-employee-edit-proposal',
  templateUrl: './employee-edit-proposal.component.html',
  styleUrls: ['./employee-edit-proposal.component.css']
})
export class EmployeeEditProposalComponent implements OnInit {

  proposalId: number;
  editForm: FormGroup;
  flag: boolean = false;

  proposal: ProjectProposal = {
    proposalId: 0,
    proposalTitle: "",
    proposalDescription: "",
    status: ""
  };

  proposals: ProjectProposal[];

  constructor(private service: ProjectProposalService, private activtedRoute: ActivatedRoute, private builder: FormBuilder, private router: Router) {

    this.proposalId = this.activtedRoute.snapshot.params['proposalId'];

    this.findByProposalId();
    this.editForm = this.builder.group({
      proposalTitle: this.builder.control("", [Validators.required, Validators.maxLength(50)]),
      proposalDescription: this.builder.control("", [Validators.required, Validators.maxLength(250)])
    })
  }

  ngOnInit(): void {
  }

  updateProposal() {
    this.service.updateProjectProposal(this.proposalId, this.proposal).subscribe(data => {
      this.flag = true;
    })
  }

  public findByProposalId() {
    this.service.getProjectProposalById(this.proposalId).subscribe(data => {
      this.proposal = data;
    })
  }

  toCancel() {
    this.router.navigate(["/employee/view/proposal"])
  }



  public get proposalTitle(): FormControl {
    return this.editForm.get('proposalTitle') as FormControl;
  }
  public get proposalDescription(): FormControl {
    return this.editForm.get('proposalDescription') as FormControl;
  }

}
