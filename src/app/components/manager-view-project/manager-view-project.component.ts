import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { ProjectService } from 'src/app/services/project.service';

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
  selector: 'app-manager-view-project',
  templateUrl: './manager-view-project.component.html',
  styleUrls: ['./manager-view-project.component.css']
})

export class ManagerViewProjectComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  flagDelete: boolean = false;
  flagDataNotFound: boolean = false;
  flagDeleteErrorUserAssigned = false;
  searchTitle: string;
  projects: Project[] = [];
  projectsReplica: Project[] = [];
  toDeleteId: number;
  selectedStatus: string = "All"
  selectOnSort: string = "All";
  toggleBind: string = "";

  chVal: number[] = [];

  currentSlide = 0;

  constructor(private service: ProjectService) {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.projects.length;
    }, 2000);
  }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.service.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projectsReplica = this.projects;

      if (this.projects.length == 0) {
        this.flagDataNotFound = true;
      } else {
        this.flagDataNotFound = false;
        this.displayChart();
        this.chVal = null;
      }
    })
  }

  displayChart() {
    let ipCount: number = 0;
    let pCount: number = 0;
    let cCount: number = 0;

    for (let p of this.projects) {
      if (p.status == "Planning") {
        pCount++;
      }
      else if (p.status == "In Progress") {
        ipCount++;
      }
      else if (p.status == "Completed") {
        cCount++;
      }
    }

    this.chVal.push(pCount);
    this.chVal.push(ipCount);
    this.chVal.push(cCount);

    this.chartOptions = {
      series: this.chVal,
      chart: {
        type: "donut"
      },
      labels: ["Planning", "In Progress", "Completed"],
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

  deleteProject() {
    this.service.deleteProject(this.toDeleteId).subscribe(data => {
      this.getAllProjects();
      this.flagDelete = false;
      window.location.reload();
    }, error => {
      this.flagDeleteErrorUserAssigned = true;
    })
  }


  deleteProjectConformtion(projectID: number) {
    this.flagDelete = true;
    this.toDeleteId = projectID;
  }

  searchProject() {
    if (this.searchTitle.trim().length != 0) {
      this.projects = this.projects.filter(p => {
        return p.projectTitle.toLowerCase().includes(this.searchTitle.toLowerCase());
      })
    } else {
      this.getAllProjects();
    }
  }

  setFlag() {
    this.flagDeleteErrorUserAssigned = false
    this.flagDelete = false
  }

  setDeleteFlag() {
    this.flagDelete = false;
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    this.projects = this.projectsReplica;
    if (this.selectedStatus == "All") {
      this.getAllProjects();
    } else {
      this.projects = this.projects.filter(data =>
        data.status == status
      );
    }
  }

  sortByTitle() {
    this.service.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projects.sort(this.compareTitle);
    })
  }

  compareTitle(t1: Project, t2: Project) {
    if (t1.projectTitle > t2.projectTitle)
      return 1;
    else if (t1.projectTitle < t2.projectTitle)
      return -1;
    else
      return 0;
  }

  sortByStartDate() {
    this.service.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projects.sort(this.compareStartDate);
    })
  }

  compareStartDate(s1: Project, s2: Project) {
    if (s1.startDate > s2.startDate)
      return 1;
    else if (s1.startDate < s2.startDate)
      return -1;
    else
      return 0;
  }

  sortByEndDate() {
    this.service.getAllProjects().subscribe(data => {
      this.projects = data;
      this.projects.sort(this.compareEndDate);
    })
  }

  compareEndDate(e1: Project, e2: Project) {
    if (e1.endDate > e2.endDate)
      return 1;
    else if (e1.endDate < e2.endDate)
      return -1;
    else
      return 0;
  }

  sortOnSelect() {
    if (this.selectOnSort == "All") {
      this.getAllProjects();
    }
    else if (this.selectOnSort == "title") {
      this.sortByTitle();
    }
    else if (this.selectOnSort == "startDate") {
      this.sortByStartDate();
    }
    else if (this.selectOnSort == "endDate") {
      this.sortByEndDate();
    }
  }
}