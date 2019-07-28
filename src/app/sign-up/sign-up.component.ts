import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  userInfo;
  uid:string;
  email:string;

  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.userInfo = this.formBuilder.group({
      name: '',
      gender: '',
      birthYear: '',
      birthMonth: '',
      birthDate: '',
      email: ''
    })
   }

  ngOnInit() {
    this.waitForCurrentUser();    //this.getUID();
  }
  
  async waitForCurrentUser(){

    try {
       this.uid = await firebase.auth().currentUser.uid;
       this.email=await firebase.auth().currentUser.email;
    }

    catch(e){
     console.log(e)
    }

  //  return userIdIs(uid);//returns promise
  };


  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "계정이 생성되었습니다!";
      this.router.navigate(['/signup']);     

    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }


  //현재 로그인 된 사용자의 uid와 이메일을 전역변수에 저장
  getUID(){
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        this.uid= await user.uid;
        this.email = await user.email;
        console.log("uid: "+this.uid);
            // …
      } else {
        // User is signed out.
        // …
  
        console.log("signed out status");
      }
    });
  }


  onSubmit() {
    this.userInfo.patchValue({ email: this.email });//form의 email부분을 전역변수 email에서 가져다 붙임
    let data = this.userInfo.value;//찾아봐
    this.authService.registerUser(this.uid, data);//그 uid에 form정보들 입력
    console.log(data);
  }

}
