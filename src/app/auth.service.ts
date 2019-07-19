import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { }
  form = new FormGroup({email:new FormControl(' '), password : new FormControl(' ')});

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

}
