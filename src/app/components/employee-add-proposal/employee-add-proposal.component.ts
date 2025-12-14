import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectProposal } from 'src/app/models/projectProposal.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';

@Component({
  selector: 'app-employee-add-proposal',
  templateUrl: './employee-add-proposal.component.html',
  styleUrls: ['./employee-add-proposal.component.css']
})
export class EmployeeAddProposalComponent implements OnInit {

  proposalForm: FormGroup;
  proposal: ProjectProposal;
  status: string = "Pending";
  flag: boolean = false;
  cancel: boolean = false;
  exist: boolean = false;
  userForProposal: User = null;

  constructor(private service: ProjectProposalService, private builder: FormBuilder, private router: Router, private userServ: AuthService) {
    this.proposalForm = this.builder.group({
      proposalTitle: this.builder.control("", [Validators.required, Validators.maxLength(50)]),
      proposalDescription: this.builder.control("", [Validators.required, Validators.maxLength(250)])
    })
  }

  ngOnInit(): void {
    this.userServ.getUserObjectById().subscribe(data => {
      this.userForProposal = data;
    })
  }
  addProjectProposal() {
    if (this.proposalForm.valid) {
      this.proposal = {
        proposalTitle: this.proposalForm.get('proposalTitle').value,
        proposalDescription: this.proposalForm.get('proposalDescription').value,
        status: "Pending",
        user: this.userForProposal
      }
      this.service.addProjectProposal(this.proposal).subscribe(data => {
        this.flag = true;
        this.proposalForm.reset();
      },
        error => {
          this.exist = true

        })
    }

  }
  public get proposalTitle(): FormControl {
    return this.proposalForm.get('proposalTitle') as FormControl;
  }
  public get proposalDescription(): FormControl {
    return this.proposalForm.get('proposalDescription') as FormControl;
  }

}
