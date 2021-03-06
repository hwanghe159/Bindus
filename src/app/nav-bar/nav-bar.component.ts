import { Component, OnInit } from '@angular/core';
import { LogInComponent } from '../log-in/log-in.component';
import { Router } from '@angular/router';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import * as firebase from "firebase";
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { Observable, of, from} from 'rxjs';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from '@angular/fire/storage';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loginStatus: string;
  constructor(
    private router: Router, 
    private firebaseAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private authService: AuthService) { }

  uid: string;
  isValidUser: boolean;
  users:any;
  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  async ngOnInit() {
    await this.checkLoggedIn();
    //this.uid = await this.authService.getCurrentUserUID();
    //console.log(this.uid);
  }

  async checkLoggedIn() {
    this.firebaseAuth.authState.subscribe((gUser: any) => {
      if (gUser) { //로그인 상태일때
        this.loginStatus = "로그아웃";
        this.router.navigate(['/']);
        this.uid = gUser.uid;
      } else { //로그아웃 상태일때
        this.loginStatus = "로그인";
      }
    })
      console.log("checkedLoggedIn func() called");
  }

  async mypage() {
    this.uid = await this.authService.getCurrentUserUID();
    if (this.uid != "0") {
      console.log(this.uid);
      let subUid = this.uid.substring(0, 6);
      this.router.navigate(['/page/' + subUid]);
    }
    else {
      alert('먼저 로그인을 해주세요.');
      this.router.navigate(['/login']);
    }
  }
//  getCurrentUser() {
//       return new Promise((resolve, reject) => {
//          const unsubscribe= firebase.auth().onAuthStateChanged(user => {
//           this.uid=user.uid;  
//           resolve(user.uid);
//          }, reject);
//       });
//     }


  // async getUID() {
  //    await firebase.auth().onAuthStateChanged(function (user) {
  //     if (user) {
  //       console.log("getUID func() called");
  //       this.uid=  user.uid;
  //       this.email= user.email;
  //       console.log("uid from getUID: " + this.uid + "email from getUID"+this.email);
  //     } else {
  //       console.log("signed out status");
  //     }
  //   });
    
  // }



  // async isGhost(_uid) {
  //   console.log("isGhost func() called");
  //   return await this.db.collection('user').doc(_uid).snapshotChanges();

    // this.db.collection('user').doc(this.uid).get().subscribe((res) => {
    //      console.log(res);
    //     if (res) {
    //       this.isValidUser = true;
    //       console.log(this.uid + "is valid user");
    //     }
    //     else
    //       this.isValidUser = false;
    //     // this.router.navigate(['/signup']);
    //     console.log(this.uid + "is invalid user");


        
    //   }
    //   )
    
  // }


  login_logout() {
    console.log("버튼 클릭");
    if (this.loginStatus === "로그아웃") {//로그인 되어있을때
      firebase.auth().signOut().then(function () {
        console.log("로그아웃 성공");
        this.router.navigate(['/']);
      }).catch(function (error) {
        // An error happened.
      });
    } else {//로그아웃 되어있을때
      this.router.navigate(['/login']);
    }
  }


}
