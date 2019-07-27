import { Component, OnInit, QueryList } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

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
  ghost : boolean;
  uid : string;
  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private authService: AuthService, private router: Router, private firebaseAuth: AngularFireAuth,private db:AngularFirestore) { }

  ngOnInit() {
    this.checkLoggedIn();

    // this.session$ = this.firebaseAuth.authState.map(user => !!user);
    // this.session$.subscribe(auth => this.loginStatus = auth ? '로그아웃' : '로그인');
  }



  async tryLogin(value) {
    await this.authService.loginWithEmail(value.email, value.password);
    // await this.isGhost();
    // if(this.ghost){
    //   this.router.navigate(['/signup']);
    // }
    // else{
    //   this.router.navigate(['/']);
    // }
  }

  // isGhost(){
  //   this.db.collection("user").doc(this.uid);
  // }

  checkLoggedIn() {

    this.firebaseAuth.authState.subscribe((gUser: any) => {
      if (gUser) {
        // this.uid = gUser.uid;
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
