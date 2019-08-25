import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { ContentsService } from '../contents.service';
import { AuthService } from '../auth.service';
import { throwIfEmpty } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-create-contents',
  templateUrl: './create-contents.component.html',
  styleUrls: ['./create-contents.component.css']
})
export class CreateContentsComponent implements OnInit {

  files: Array<any>;
  filePath: string;
  URLs: Array<string>;
  URL: string;
  cnt: number = 0;
  user: any;
  userInfo: Object;
  uid: string;
  dateItems :Array<any>;
  
  constructor(private storage: AngularFireStorage, private formBuilder: FormBuilder, private contentsService: ContentsService,
    private authService: AuthService, private router: Router, private db: AngularFirestore) {
  }

  async ngOnInit() {
    this.contentsService.form.reset();
    this.uid = await this.authService.getCurrentUserUID();
    console.log("auth service.getCurrentUID() returns" + this.uid);
    let email = await this.authService.getCurrentUserEmail();
    console.log("auth service.getCurrentEmail() returns" + email);
    this.user = await this.authService.getCurrentUserName();
    console.log("this.user : " + this.user);
  }

  
  onItemRemoved(tag) {
    this.dateItems.forEach((item, index) => {
      if (item === tag) this.dateItems.splice(index, 1);

    });
  }
  
  async onSubmit() {

    this.contentsService.form.patchValue({ UID: this.uid });
    this.contentsService.form.patchValue({ career: this.contentsService.form.controls['career'].value });
    this.contentsService.form.patchValue({ location: this.contentsService.form.controls['location'].value });
    this.contentsService.form.patchValue({ time: this.contentsService.form.controls['time'].value });
    this.contentsService.form.patchValue({ intro: this.contentsService.form.controls['intro'].value });
    this.contentsService.form.patchValue({ price: this.contentsService.form.controls['price'].value });
    this.contentsService.form.patchValue({ title: this.contentsService.form.controls['title'].value });


    let data = this.contentsService.form.value;
    this.contentsService.createContents(data).then(res => { });
    alert('컨텐츠 등록이 완료되었습니다!');
    this.router.navigate(['/']);

  }
}