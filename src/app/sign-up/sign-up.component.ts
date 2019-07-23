import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  uid:string;
  email:string;

  registerForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  this.getUID();
  }



  
   getUID(){
  firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {

      this.uid= await user.uid;
      this.email = await user.email;
          // ...
    } else {
      // User is signed out.
      // ...

      console.log("signed out status");
    }
  });
}

onSubmit(){

}
  
  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "계정이 생성되었습니다!";
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }
  
}
