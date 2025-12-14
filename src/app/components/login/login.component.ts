import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorFlag: boolean = false;

  public loginUser() {
    this.service.login(this.loginForm.value, (returnFlag: Boolean) => {
      this.errorFlag = !returnFlag;
    })
  }

  constructor(private builder: FormBuilder, private router: Router, private service: AuthService) {
    this.loginForm = this.builder.group({
      username: this.builder.control("", [Validators.required, Validators.email]),
      password: this.builder.control("", Validators.required)
    })
  }

  public get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  public get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  ngOnInit(): void {
  }
}
