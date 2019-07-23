import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  form = new FormGroup({email:new FormControl(' '), password : new FormControl(' ')});

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) { }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => {
        resolve(res);
        console.log(res);
        console.log("uid="+res.user.uid);
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

  createReview(data) {
    return new Promise<any>((resolve, reject) =>{
     this.db.collection("user").doc("new-city-id").set(data);
        this.db.collection("user").add(data).then(res => {}, err => reject(err));
    });
  }
  


}
