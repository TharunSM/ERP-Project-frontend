import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {

  feedBacks: Feedback[] = [];
  UserForfeedBack: User;
  viewUserFlag: boolean = false;
  selectedFeedback: Feedback;
  viewFeedBackId: number;

  selectedStatus: string = "All"
  selectOnSort: string = "All";

  constructor(private service: FeedbackService) {
    this.getAllFeedbacks();
  }

  ngOnInit(): void {
  }

  //get all feedbacks from service 
  getAllFeedbacks() {
    this.service.getFeedbacks().subscribe(value => {
      this.feedBacks = value;
    })
  }

  getUserDetails(feedback: Feedback) {
    this.viewUserFlag = true;
    this.selectedFeedback = feedback
  }

  setViewFlagToClose() {
    this.viewUserFlag = false
  }

  getColor(userId: number): string {

    if (userId > 6) {
      userId = userId % 6;
      if (userId == 0) {
        userId = 6;
      }
    }
    else {
      if (userId == 1)
        return '#E0F7FA';
      else if (userId == 2)
        return '#E8F5E9'
      else if (userId == 3)
        return '#FFFDE7'
      else if (userId == 4)
        return '#FDEDEC'
      else if (userId == 5)
        return '#F3E5F5'
      else if (userId == 6)
        return '#FFF3E0'
    }

  }

  sortInAsc() {
    this.service.getFeedbacks().subscribe(data => {
      this.feedBacks = data;
      this.feedBacks.sort(this.compareAscDate);
    })
  }

  compareAscDate(s1: Feedback, s2: Feedback) {
    if (s1.date > s2.date)
      return 1;
    else if (s1.date < s2.date)
      return -1;
    else
      return 0;
  }

  sortInDec() {
    this.service.getFeedbacks().subscribe(data => {
      this.feedBacks = data;
      this.feedBacks.sort(this.compareDscDate);
    })
  }

  compareDscDate(s1: Feedback, s2: Feedback) {
    if (s1.date < s2.date)
      return 1;
    else if (s1.date > s2.date)
      return -1;
    else
      return 0;
  }

  sortOnSelect() {
    if (this.selectOnSort == "All") {
      this.getAllFeedbacks();
    }
    else if (this.selectOnSort == "asc") {
      this.sortInAsc();
    }
    else if (this.selectOnSort == "dsc") {
      this.sortInDec();
    }
  }
}
