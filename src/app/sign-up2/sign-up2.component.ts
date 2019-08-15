import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import * as firebase from "firebase";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})
export class SignUp2Component implements OnInit {
  errorMessage: string;
  successMessage: string;
  userInfo;
  userBasic;
  uid: string;
  email: string;
  users: Observable<any[]>;
  hashItems = [];
  rmvdhashItems = [];

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.userInfo = this.formBuilder.group({
      name: '',
      gender: '',
      birthYear: '',
      birthMonth: '',
      birthDate: '',
      email: '',
      password: '',
      hashtag: []

    })



    this.userBasic = this.formBuilder.group({
      email: '',
      password: ''
    })

  }

  ngOnInit() {

  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.log(res.uid);

      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

  onItemRemoved(tag) {

    this.hashItems.forEach((item, index) => {
      if (item === tag) this.hashItems.splice(index, 1);
      console.log("successfully deleted" + this.hashItems);

    });

  }

  onTagSelected(tag) {


    console.log("hash items" + this.hashItems);
  }

  onSubmit(value) {
    this.userInfo.hashtag=this.hashItems;
    this.tryRegister(value);

  }
}
