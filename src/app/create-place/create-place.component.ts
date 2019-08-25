import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { PlaceService } from '../place.service';
import { AuthService } from '../auth.service';
import { throwIfEmpty } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-create-place',
  templateUrl: './create-place.component.html',
  styleUrls: ['./create-place.component.css']
})
export class CreatePlaceComponent implements OnInit {

  files: Array<any>;
  filePath: string;
  URLs: Array<string>;
  URL: string;
  cnt: number = 0;
  user: any;
  userInfo: Object;
  uid: string;
  dateItems :Array<any>;
  
  constructor(private storage: AngularFireStorage, private formBuilder: FormBuilder, private placeService: PlaceService,
    private authService: AuthService, private router: Router, private db: AngularFirestore) {
  }

  async ngOnInit() {
    this.placeService.form.reset();
    this.uid = await this.authService.getCurrentUserUID();
    console.log("auth service.getCurrentUID() returns" + this.uid);
    let email = await this.authService.getCurrentUserEmail();
    console.log("auth service.getCurrentEmail() returns" + email);
    this.user = await this.authService.getCurrentUserName();
    console.log("this.user : " + this.user);
  }

  //파일첨부 상태가 변하면 실행됨
  updateFile(event) {
    this.files = event.target.files;
    this.cnt = event.target.files.length;
    console.log(this.files);
  }

  updateDate(event) {
    this.dateItems.push(event.target.value);
    console.log(event.target.value);
    console.log(this.dateItems);
  }


  
  onItemRemoved(tag) {
    this.dateItems.forEach((item, index) => {
      if (item === tag) this.dateItems.splice(index, 1);

    });
  }
  
  async onSubmit() {
    this.URLs = [];

    for (let i = 0; i < this.cnt; i++) {
      this.filePath = '/place/' + 'pic' + Math.floor(Math.random() * 1000000);
      const snapshot = await this.storage.upload(this.filePath, this.files[i])
      this.URL = await snapshot.ref.getDownloadURL();
      this.URLs.push(this.URL);
    }

    this.placeService.form.patchValue({ UID: this.uid });
    this.placeService.form.patchValue({ location: this.placeService.form.controls['location'].value });
    this.placeService.form.patchValue({ place: this.placeService.form.controls['place'].value });
    this.placeService.form.patchValue({ time: this.placeService.form.controls['time'].value });
    this.placeService.form.patchValue({ max: this.placeService.form.controls['max'].value });

    if (this.cnt >= 1) {
      this.placeService.form.patchValue({ pic1: this.URLs[0] });
      if (this.cnt >= 2) {
        this.placeService.form.patchValue({ pic2: this.URLs[1] });
        if (this.cnt >= 3) {
          this.placeService.form.patchValue({ pic3: this.URLs[2] });
        }
      }
    }

    let data = this.placeService.form.value;
    this.placeService.createPlace(data).then(res => { });
    alert('공간 등록이 완료되었습니다!');
    this.router.navigate(['/']);

  }
}