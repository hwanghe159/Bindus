import { Component, OnInit } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginStatus:string;
  constructor(private router: Router, private firebaseAuth: AngularFireAuth) { }

  ngOnInit() { 
    this.checkLoggedIn();
   }

  checkLoggedIn() {

    this.firebaseAuth.authState.subscribe((gUser: any) => {
      if (gUser) {
        this.loginStatus = "로그아웃";
        this.router.navigate(['/']);
      } else {
        this.loginStatus = "로그인";
      }
    })

  }

  login_logout(){
    console.log("버튼 클릭");
    
      if (this.loginStatus==="로그아웃") {//로그인 되어있을때
        firebase.auth().signOut().then(function() {
          console.log("로그아웃 성공");
        }).catch(function(error) {
          // An error happened.
        });
      } else {//로그아웃 되어있을때
        this.router.navigate(['/login']);
      }
  }
  

}
