import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  loginStatus: string;
  session$: Observable<boolean>;

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private authService: AuthService, private router: Router, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {

    // this.session$ = this.firebaseAuth.authState.map(user => !!user);
    // this.session$.subscribe(auth => this.loginStatus = auth ? '로그아웃' : '로그인');
  }

  async tryLogin(value) {

       var user = await this.authService.loginWithEmail(value.email, value.password);
      // var user = await firebase.auth().currentUser;
      console.log(user);
      if (user) {
        this.loginStatus = "로그인된 상태";
      } else {
        this.loginStatus = "로그아웃된 상태";
      }  }


  async checkLoggedIn(){

    var user = await firebase.auth().currentUser;
    console.log(user);
    if (user) {
      this.loginStatus = "로그인된 상태";
    } else {
      this.loginStatus = "로그아웃된 상태";
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        var token = (<any>res).credential.accessToken;
        var user = res.user;
      })
      .catch((err) => console.log(err));
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook()
      .then((res) => {
        var token = (<any>res).credential.accessToken;
        var user = res.user;
      })
      .catch((err) => console.log(err));
  }

}
