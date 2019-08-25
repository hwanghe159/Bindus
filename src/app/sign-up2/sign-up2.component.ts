import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

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
  url: string|ArrayBuffer;
  files: any;
  imageChanged: boolean;
  URL = "https://firebasestorage.googleapis.com/v0/b/test-38218.appspot.com/o/user%2Fuser.png?alt=media&token=811174cc-98ee-4f4f-bb59-f06bc405e92f";

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private storage: AngularFireStorage) {
    this.userInfo = this.formBuilder.group({
      name: '',
      gender: '',
      birthYear: '',
      birthMonth: '',
      birthDate: '',
      email: '',
      password: '',
      hashtag: [],
      img: ''
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

  async onSubmit(value) {
    this.userInfo.hashtag = this.hashItems;
    console.log(this.imageChanged);
    if (this.imageChanged) {
      let filePath = '/user/' + 'pic' + Math.floor(Math.random() * 1000000);
      const snapshot = await this.storage.upload(filePath, this.files[0]);
      this.URL = await snapshot.ref.getDownloadURL();
      console.log(this.URL);
    }
    this.userInfo.value.img = this.URL;
    await this.tryRegister(value);
  }

  onSelectFile(event) {
    this.files = event.target.files;
    this.imageChanged = true;
    console.log(this.files);
    

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        //this.url = event.target.result;
        this.url = reader.result;
      }
    }
  }
  public delete(){
    this.url = null;
    this.imageChanged = false;
  }


}
