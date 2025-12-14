import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Subscriber } from 'rxjs';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-employeeviewfeedback',
  templateUrl: './employeeviewfeedback.component.html',
  styleUrls: ['./employeeviewfeedback.component.css']
})
export class EmployeeviewfeedbackComponent implements OnInit {

  deleteFlag: boolean = false;
  updateFlag: boolean = false;
  feedbacks: Feedback[] = [];
  feedbackText: string;
  UserRegistrationObject: User;
  selectedFeedback: Feedback = null
  feedback: Feedback = { feedbackText: '', date: undefined, user: null };

  constructor(private service: FeedbackService, private userService: AuthService, private router: Router) {
    this.userService.getUserObjectById().subscribe(data => {
      this.UserRegistrationObject = data
      this.getAllFeedbackByUserId();
    });
  }

  ngOnInit(): void {
    this.userService.getUserObjectById().subscribe(data => {
      this.UserRegistrationObject = data
      this.getAllFeedbackByUserId();
    });
  }

  //getting all feedbacks of particular logged in user
  getAllFeedbackByUserId() {
    this.service.getAllFeedbackByUserId(parseInt(localStorage.getItem("userId"))).subscribe(data => {

      this.feedbacks = data
    })
  }

  setDeletedFlag(feedback: Feedback) {
    this.selectedFeedback = feedback;
    this.deleteFlag = true;
  }

  //deleting a particular feedback in feedbacks
  deleteFeedback(feedbackId: number) {
    this.deleteFlag = true
    this.service.deleteFeedback(this.selectedFeedback.feedbackId).subscribe(data => {
      this.getAllFeedbackByUserId();
      this.deleteFlag = false;
      this.selectedFeedback = null;
    })
  }

  setUpdateFlag(feedback: Feedback) {
    this.selectedFeedback = feedback;
    this.updateFlag = true;
  }

  editFeedback() {
    let date: Date = new Date();
    let formattedDate = date.toISOString();
    formattedDate = formattedDate.slice(0, 10);
    this.feedback = { feedbackId: this.selectedFeedback.feedbackId, feedbackText: this.selectedFeedback.feedbackText, date: formattedDate, user: this.selectedFeedback.user };

    this.service.updateFeedback(this.selectedFeedback.feedbackId, this.feedback).subscribe(value => {
      this.getAllFeedbackByUserId();
      this.updateFlag = false
      this.feedbackText = ''
      this.selectedFeedback = null;
    })
  }

  public calcelBtm() {
    this.getAllFeedbackByUserId();
    this.updateFlag = false
    this.router.navigate(['/employeeviefeedback'])
  }

}


