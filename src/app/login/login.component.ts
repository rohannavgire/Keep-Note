import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, FormControl } from '@angular/forms';
import { log } from 'util';
import { User } from '../user';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { error } from 'selenium-webdriver';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {


  public bearerToken: any;
  public submitMessage: string;
   userId = new FormControl;
   userPassword = new FormControl;

  user : User;
  
  loginForm = new FormGroup({
    userId: new FormControl('', [ Validators.required,Validators.minLength(5)]),
    userPassword: new FormControl('', [ Validators.required,Validators.minLength(6)])
   });
   

@ViewChild(FormGroupDirective)
formGroupDirective : FormGroupDirective;

constructor(private authService : AuthenticationService,private router:RouterService) {
  this.user = new User();
 }

ngOnInit() {
}

loginSubmit(){
  this.user = this.loginForm.value;  

  this.authService.authenticateUser(this.user).subscribe(res =>{

  this.authService.setUserId(this.user.userId);

  this.authService.setBearerToken(res['token']);

  this.router.routeToDashboard();

 },error =>{

   if(error.status === 404) {
    this.submitMessage = error.message;
   }
   else {
   this.submitMessage = error.error.message;
   }
 })
  this.formGroupDirective.resetForm();
}

openCreateUserView() {       
  this.router.routeToCreateUserView();
}

}
