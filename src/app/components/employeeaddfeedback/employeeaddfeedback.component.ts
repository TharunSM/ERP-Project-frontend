import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-employeeaddfeedback',
  templateUrl: './employeeaddfeedback.component.html',
  styleUrls: ['./employeeaddfeedback.component.css']
})
export class EmployeeaddfeedbackComponent implements OnInit {

  feedbacks: Feedback;
  feedbackrating: number;
  feedbackForm: FormGroup;

  UserRegistrationObject: any;
  feedbackArea: string = "";

  feedback: Feedback = { feedbackText: '', date: undefined, user: null };
  addFlag: boolean = false;

  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number = 0;

  countStar(star: number) {
    this.selectedValue = star;
  }

  addClass(star: number) {
    let ab = "";
    for (let i = 0; i < star; i++) {
      ab = "starId" + i;
      document.getElementById(ab).classList.add("selected");
    }
  }

  removeClass(star: number) {
    let ab = "";
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

  constructor(private service: FeedbackService, private router: Router, private userService: AuthService, private builder: FormBuilder) {

    this.feedbackForm = this.builder.group({
      feedBackText: this.builder.control("", [Validators.required, Validators.minLength(10), Validators.maxLength(250)])
    })

    this.userService.getUserObjectById().subscribe(data => {
      this.UserRegistrationObject = data
    })
  }

  public get feedBackText(): FormControl {
    return this.feedbackForm.get('feedBackText') as FormControl;
  }


  ngOnInit(): void {
    this.userService.getUserObjectById().subscribe(data => {
      this.UserRegistrationObject = data
    });
  }

  public sendFeedback() {
    if (this.feedbackForm.valid) {
      let date: Date = new Date();
      let formattedDate = date.toISOString();
      formattedDate = formattedDate.slice(0, 10);

      let userObj: User = {
        userId: this.UserRegistrationObject.userId,
        username: this.UserRegistrationObject.username,
        email: this.UserRegistrationObject.email,
        mobileNumber: this.UserRegistrationObject.mobileNumber
      }

      this.feedbackrating = this.selectedValue
      this.feedback = {
        feedbackText: this.feedbackArea,
        date: formattedDate,
        user: userObj,
        feedbackRating: this.feedbackrating
      };

      this.service.sendFeedBack(this.feedback).subscribe(data => {
        this.addFlag = true;
      })
      this.router.navigate(['/employee/view/feedback']);
    }
    else {
      alert("Feedback should not be empty...")
    }
  }
}
