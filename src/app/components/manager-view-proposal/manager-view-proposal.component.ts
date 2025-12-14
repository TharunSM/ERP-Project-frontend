import { Component, OnInit ,ViewChild} from '@angular/core';
import { ProjectProposal } from 'src/app/models/projectProposal.model';
import { ProjectProposalService } from 'src/app/services/project-proposal.service';
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
  selector: 'app-manager-view-proposal',
  templateUrl: './manager-view-proposal.component.html',
  styleUrls: ['./manager-view-proposal.component.css']
})
export class ManagerViewProposalComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  projectProposal:ProjectProposal[]=[];
  proposalReplica:ProjectProposal[]=[];
  status:string="Pending";
  searchTitle:string;
  proposalToUpdateStatus:ProjectProposal;
  selectedStatus: string = "All";

  chVal:number[]=[];

  currentSlide=0;
  constructor(private service:ProjectProposalService,private router:Router) { 
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.projectProposal.length;
    }, 2000);
  }

  ngOnInit(): void {
    this.getAllProjectProposals();
  }

  getAllProjectProposals(){
    return this.service.getAllProjectProposals().subscribe(data=>{
      this.projectProposal=data;
    this.proposalReplica=this.projectProposal;
    this.displayChart();
    this.chVal=null;
    });
  }

  displayChart(){
    let aCount:number=0;
    let rCount:number=0;
    let pCount:number=0;
  
    for(let p of this.projectProposal){
      if(p.status=="Pending"){
        pCount++;
      }
      else if(p.status=="Approved"){
        aCount++;
      }
      else if(p.status=="Rejected"){
        rCount++;
      }
    }

    this.chVal.push(pCount);
    this.chVal.push(aCount);
    this.chVal.push(rCount);

    this.chartOptions = {
      series:this.chVal,
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

  approve(id:number){
    this.service.getProjectProposalById(id).subscribe(data=>{
      this.proposalToUpdateStatus = data;
      this.proposalToUpdateStatus.status="Approved";
      this.service.updateProjectProposal(id,this.proposalToUpdateStatus).subscribe(data=>{
        this.getAllProjectProposals();
        this.status= "Approved";
      })
      location.reload();
    })
    
  }

  reject(id:number){
    this.service.getProjectProposalById(id).subscribe(data=>{
      this.proposalToUpdateStatus = data;
      this.proposalToUpdateStatus.status="Rejected";
      this.service.updateProjectProposal(id,this.proposalToUpdateStatus).subscribe(data=>{
        this.getAllProjectProposals();
        this.status= "Rejected";
      })
      location.reload();
    })
  }

  searchProposal(){
    if(this.searchTitle.trim().length!=0){
      this.projectProposal=this.projectProposal.filter(p=>{
        return p.proposalTitle.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    }else{
      this.getAllProjectProposals();
    }
  }

  filterByStatus(status:string){
    this.selectedStatus = status;
    this.projectProposal=this.proposalReplica;
    if(status === 'All'){
      this.getAllProjectProposals();
    }
    else{
      this.projectProposal = this.projectProposal.filter(p=>p.status === status);
    }
  }
}
