import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  alertMgs = '';
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin = false;
  isRegister = false;
  loginSuccessfull = false;
  
  constructor(
    private route: Router,
    private fb: FormBuilder,
    private loginService: LoginService
  ) { 
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   this.isLogin = true;
   localStorage.clear();
  }

  loginClicked(){
    this.isLogin = true;
    this.isRegister = false;
  }

  registerClicked() {
    this.isLogin = false;
    this.isRegister = true;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.loginService.getUserDetails().subscribe(users => 
        users.filter(cred => {
          if (cred.username == this.loginForm.value.email && cred.password == this.loginForm.value.password) {
            this.loginSuccessfull = true;
          }
        }));
      if (this.loginSuccessfull) {
        localStorage.setItem('loggedUser', this.loginForm.value.email);
        this.route.navigateByUrl('details');
      }
      else {
        this.alertMgs = "Login Credentials Invalid!";
        this.loginForm.reset();
      }
    }
    else {
      this.alertMgs = "Please enter Username & Password";
    }
  }

  onRegister() {
    if(this.registerForm.valid) {
      console.log("valid");
    }
    else {
      console.log("invalid");
    }
    this.isLogin = true;
    this.isRegister = false;
  }

}
