import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { BoardService } from '../board.service';
import { AuthService } from  '../auth.service';
import { throwIfEmpty } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})

export class MypageComponent implements OnInit {

  constructor(private storage:AngularFireStorage, private formBuilder: FormBuilder, private boardService: BoardService, 
    private authService: AuthService, private router: Router, private db: AngularFirestore) { }


    user:any;
  async ngOnInit() {

    let uid = await this.authService.getCurrentUserUID();
    console.log("auth service.getCurrentUID() returns"+uid);
    let email = await this.authService.getCurrentUserEmail();
    console.log("auth service.getCurrentEmail() returns"+email);
    this.user = await this.authService.getCurrentUser();
    console.log("this.user : "+this.user); 

  }

}
