import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegisterForm: FormGroup;
  userAlreadyExist = false;
  UserObjectAfterRegister: User;

  public registerUser() {
    this.service.register(this.userRegisterForm.value).subscribe(data => {
      this.UserObjectAfterRegister = data;
      alert('Registration Successfull')
      this.router.navigate(['/login']);
    }, error => {
      this.userAlreadyExist = true;
    })
  }

  public getRegisteredUser(): User {
    return this.UserObjectAfterRegister;
  }

  constructor(private builder: FormBuilder, private service: AuthService, private router: Router) {
    this.userRegisterForm = this.builder.group({
      username: this.builder.control("", Validators.required),
      email: this.builder.control("", [Validators.email, Validators.required]),
      mobileNumber: this.builder.control("", [Validators.pattern('[0-9]{10,10}'), Validators.required]),
      password: this.builder.control("", [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%&?])[A-Za-z0-9@$!%&?#]{8,20}'), Validators.required]),
      confirmPassword: this.builder.control("", Validators.required),
      role: this.builder.control("", Validators.required)
    })
  }

  public get username(): FormControl {
    return this.userRegisterForm.get('username') as FormControl;
  }
  public get email(): FormControl {
    return this.userRegisterForm.get('email') as FormControl;
  }
  public get password(): FormControl {
    return this.userRegisterForm.get('password') as FormControl;
  }
  public get confirmPassword(): FormControl {
    return this.userRegisterForm.get('confirmPassword') as FormControl;
  }
  public get mobileNumber(): FormControl {
    return this.userRegisterForm.get('mobileNumber') as FormControl;
  }
  public get role(): FormControl {
    return this.userRegisterForm.get('role') as FormControl;
  }

  ngOnInit(): void {
    this.userAlreadyExist = false;
  }
}
