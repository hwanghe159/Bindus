import { Component,OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { Observable, of, from } from 'rxjs';
import { AuthService } from './auth.service';
import { MoimService } from './moim.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  uid: string;
  isValidUser: boolean;

  constructor(private authService: AuthService, 
    private router: Router, 
    private firebaseAuth: AngularFireAuth, 
    private db: AngularFirestore,
    private moimService: MoimService) { }

  title = 'bindus';
  ngOnInit() {
    this.moimService.getAllMoims();
  }

  async getUID() {
   await firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        this.uid = await user.uid;
        this.email = await user.email;
        console.log("uid: " + this.uid);
        // …
      } else {
        console.log("signed out status");
      }
    });
  }


  async isGhost() {
    if (this.uid) {
      await this.db.collection("user").doc(this.uid).get().subscribe((res) => {
        if (res) {
          this.isValidUser = true;
          console.log(this.uid+"is valid user");
        }
        else
          this.isValidUser = false;
          this.router.navigate(['/signup']);     
          console.log(this.uid+"is invalid user");
 
        }
      )
    }
  }//isGost function end
}
