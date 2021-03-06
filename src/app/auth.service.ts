import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  form = new FormGroup({ email: new FormControl(' '), password: new FormControl(' ') });

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  uid: string;
  email: string;
  data:any;
  
  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  loggedin_uid: string;

  async setLoggedinUid() {
    try {
      this.loggedin_uid = await this.firebaseAuth.auth.currentUser.uid;
    }
    catch (e) {
      this.loggedin_uid = "0";
    }
  }

  //입력받은 이메일과 비밀번호로 auth등록
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          console.log("Auth Service" + res.user.uid);
          value.password = '';
          this.db.collection("user").doc(res.user.uid).set(value).then(res => { }, err => reject(err));

          resolve(res);
        }, err => reject(err))
    })
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithFacebook() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  //uid와 form이 입력되면 그 uid에 form정보들 입력
  registerUser(uid, data) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection("user").doc(uid).set(data).then(res => { }, err => reject(err));
    });
  }

  loginWithEmail(email, password) {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function () {
        firebase.auth().signInWithEmailAndPassword(email, password);
        console.log("로그인 성공");
        return firebase.auth().currentUser;
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  }

  //로그인되어 있는 uid반환
  async getCurrentUserUID() {
    try {
      return await this.firebaseAuth.auth.currentUser.uid;
    }
    catch (e) {
      console.log(e);
      return "0";
    }
  }


  //로그인되어 있는 email반환
  async getCurrentUserEmail() {
    return await this.firebaseAuth.auth.currentUser.email;
  }

  //로그인되어 있는 uid의 이름 
  async getCurrentUserName() {
    let uid = await this.firebaseAuth.auth.currentUser.uid;
    return this.db.collection('user').doc(uid).ref.get().then(
      function (doc) {
        if (doc.exists) {
          console.log(doc.data());
          return doc.get("name");
          
          //this.name = doc.data().name;
          //console.log(this.name);
        }
        else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

  }


  async getCurrentUser() {
    let uid = await this.firebaseAuth.auth.currentUser.uid;
    return this.db.collection('user').doc(uid).ref.get().then(
      function (doc) {
        if (doc.exists) {
          console.log(doc.data());
          return doc.data();
    
        }
        else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

  }

  async getAllUsers() {
    let users = [];
    return this.db.collection("user").get().toPromise().then(
      function (data) {
        data.forEach((doc => {
          users.push(doc)
        }))
        return users;
      });
  }

  //부분uid로 user 도큐먼트 얻기
  async getUserDocfrom(subUid: string) {
    let users = [];
    users = await this.getAllUsers();
    console.log(users);

    if (users.length !== 0) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id.includes(subUid)) {
          return users[i];
        }
      }
    }
    else {
      console.log("실패");
    }
  }

  // async getAllUids() {
  //   let uids = [];
  //   return this.db.collection("user").get().toPromise().then(
  //     function (data) {
  //       data.forEach((doc => {
  //         uids.push(doc.id)
  //       }))
  //       return uids;
  //     });
  // }

  // //부분uid로 전체 uid얻기
  // async getUIDfrom(subUid: string) {
  //   console.log("getUIDfrom() 시작");
  //   let uids = [];
  //   uids = await this.getAllUids();
  //   console.log(uids);

  //   if (uids.length !== 0) {
  //     for (var i = 0; i < uids.length; i++) {
  //       console.log(i + "번째 점검 : " + uids[i] + "와 " + subUid + "와의 비교.");
  //       if (uids[i].includes(subUid)) {
  //         return uids[i];
  //       }
  //     }
  //   }
  //   else {
  //     console.log("실패");
  //   }
  // }
}