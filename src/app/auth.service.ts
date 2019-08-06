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
  name: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.user = firebaseAuth.authState;
  }

  //입력받은 이메일과 비밀번호로 auth등록
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          console.log("Auth Service"+res.user.uid);    
          value.password='';
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
    return await this.firebaseAuth.auth.currentUser.uid;
   }
 
  
  //로그인되어 있는 email반환
  async getCurrentUserEmail() {
    return await this.firebaseAuth.auth.currentUser.email;
  }

  //로그인되어 있는 uid의 이름 수정
  async getCurrentUserName() {
    let uid = this.firebaseAuth.auth.currentUser.uid;
    await this.db.collection('user').doc(uid).ref.get().then(
      function (doc) {
        if (doc.exists) {
          console.log(doc.data());
          this.name = doc.data().name;
          console.log(this.name);
        }
        else {
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

  }
  // let name = this.db.collection('user').doc(uid).ref.get().then(
  //   function (doc) {
  //     if (doc.exists) {
  //       console.log(doc.data());
  //       return name;
  //     }
  //   }
  // )

}
