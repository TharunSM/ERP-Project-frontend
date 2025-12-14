import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectProposal } from 'src/app/models/projectProposal.model';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ChartComponent
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
@Component({
  selector: 'app-employee-view-proposal',
  templateUrl: './employee-view-proposal.component.html',
  styleUrls: ['./employee-view-proposal.component.css']
})
export class EmployeeViewProposalComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  projectProposal: ProjectProposal[] = [];
  flagDelete: boolean = false;
  flagDataNotFound: boolean = false;
  toDeleteId: number;
  searchTitle: string;

  chVal: number[] = [];

  UserRegistrationObject: User;
  status: string = "pending";
  currentSlide = 0;

  constructor(private service: ProjectProposalService, private userService: AuthService) {

    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.projectProposal.length;
    }, 2000);
  }

  ngOnInit(): void {
    this.getAllProjectProposals();
    this.userService.getUserObjectById().subscribe(data => this.UserRegistrationObject = data);
  }

  getAllProjectProposals() {
    this.service.getProposalByEmployeeId().subscribe(data => {
      this.projectProposal = data;
      if (this.projectProposal.length == 0) {
        this.flagDataNotFound = true;
      }
      else {
        this.flagDataNotFound = false;
        this.displayChart();
        this.chVal = null;
      }
    })
  }

  displayChart() {
    let aCount: number = 0;
    let rCount: number = 0;
    let pCount: number = 0;

    for (let p of this.projectProposal) {
      if (p.status == "Pending") {
        pCount++;
      }
      else if (p.status == "Approved") {
        aCount++;
      }
      else if (p.status == "Rejected") {
        rCount++;
      }
    }
    this.chVal.push(pCount);
    this.chVal.push(aCount);
    this.chVal.push(rCount);

    this.chartOptions = {
      series: this.chVal,
      chart: {
        type: "donut"
      },
      labels: ["Pending", "Approved", "Rejected"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


  deleteProjectProposal() {
    this.service.deleteProjectProposal(this.toDeleteId).subscribe(data => {
      this.getAllProjectProposals();
      location.reload();
      this.flagDelete = false;
    })
  }

  deleteProposalConformation(proposalId: number) {
    this.flagDelete = true;
    this.toDeleteId = proposalId;
  }

  searchProposal() {
    if (this.searchTitle.trim().length != 0) {
      this.projectProposal = this.projectProposal.filter(p => {
        return p.proposalTitle.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    } else {
      this.getAllProjectProposals();
    }
  }
}
