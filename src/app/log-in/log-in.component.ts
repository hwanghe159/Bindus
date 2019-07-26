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
  user: Promise<any>;
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private authService: AuthService, private router: Router, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() {
    this.checkLoggedIn();

    // this.session$ = this.firebaseAuth.authState.map(user => !!user);
    // this.session$.subscribe(auth => this.loginStatus = auth ? '로그아웃' : '로그인');
  }



  async tryLogin(value) {
    await this.authService.loginWithEmail(value.email, value.password);
    /*if(this.isGhost()){
      this.router.navigate(['/signup']);
    }
    else{
      this.router.navigate(['/']);
    }*/
  }

  /*isGhost() : boolean{
    
  }*/

  checkLoggedIn() {

    this.firebaseAuth.authState.subscribe((gUser: any) => {
      if (gUser) {
        this.loginStatus = "로그인된 상태";
        this.router.navigate(['/']);
      } else {
        this.loginStatus = "로그아웃된 상태";
      }
    })

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
