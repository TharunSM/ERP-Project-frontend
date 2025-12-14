import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //feedbacks for homepage
  feedBacks: Feedback[] = [];

  //Contact Us form homepage
  contactUsForm: FormGroup;
  formsubmitedFlag = false;

  //Flag for redirection in features
  isManagerPer = false;
  isEmployeePropo = false;
  isEmployeeFeed = false;

  constructor(private service: FeedbackService, private builder: FormBuilder, private router: Router) {
    this.contactUsForm = this.builder.group({
      role: this.builder.control("", Validators.required),
      name: this.builder.control("", Validators.required),
      surname: this.builder.control("", Validators.required),
      emailAddress: this.builder.control("", [Validators.required, Validators.email]),
      phoneNumber: this.builder.control("", [Validators.required, Validators.pattern('[0-9]{10,10}')]),
      message: this.builder.control("", [Validators.required, Validators.maxLength(250)])
    })
  }

  formSubmit() {
    this.formsubmitedFlag = true;
  }

  redirectToViewProjects() {
    if (localStorage.getItem("role") == "Manager") {
      this.router.navigate(['/manager/view/project']);
    } else {
      this.isManagerPer = true;
    }
  }


  redirectToAddProposal() {
    if (localStorage.getItem("role") == "Employee") {
      this.router.navigate(['/employee/add/proposal']);
    } else {
      this.isEmployeePropo = true;
    }
  }

  redirectToAddFeedback() {
    if (localStorage.getItem("role") == "Employee") {
      this.router.navigate(['/employee/add/feedback']);
    } else {
      this.isEmployeeFeed = true;
    }
  }

  ngOnInit(): void {
    this.getfeedbackForHome();
    this.isManagerPer = false;
    this.isEmployeePropo = false;
    this.isEmployeeFeed = false;
  }

  //Feedback carousel
  getfeedbackForHome() {
    this.service.getAllFeedBackForHomePage().subscribe(data => {
      this.feedBacks = data;
      this.feedBacks = this.feedBacks.reverse();
      this.feedBacks = this.feedBacks.filter(this.onReview);
      if (this.feedBacks.length > 10) {
        this.feedBacks = this.feedBacks.slice(0, 5);
      }
    })
  }

  onReview(feedback) {
    return feedback.feedbackRating > 3;
  }
}
