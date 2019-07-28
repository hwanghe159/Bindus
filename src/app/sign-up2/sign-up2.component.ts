import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import * as firebase from "firebase";

@Component({
  selector: 'app-sign-up2',
  templateUrl: './sign-up2.component.html',
  styleUrls: ['./sign-up2.component.css']
})
export class SignUp2Component implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

}
