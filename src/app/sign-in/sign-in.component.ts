import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  uid:string;

  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  
  //입력받은 이메일과 비밀번호로 auth등록을 시도함
  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "계정이 생성되었습니다!";
      this.uid=res.user.uid;
      this.router.navigate(['/signup']);     

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        var token = (<any>res).credential.accessToken;
        var user = res.user;
        console.log("user="+user+"token="+token)
      })
    .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
    .then((res) => {
        var token = (<any>res).credential.accessToken;
        var user = res.user;
        console.log("user="+user+"token="+token);

      })
    .catch((err) => console.log(err));
  }

}
