import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private db: AngularFireDatabase) { }

  imgsrc: string;
  
  form = new FormGroup({
    UID: new FormControl(''),
    brdContents: new FormControl(''),
    brdFlag: new FormControl(1),
    brdPic1: new FormControl(''),
    brdPic2: new FormControl(''),
    brdPic3: new FormControl(''),
    brdPicCnt: new FormControl(0),
    brdTime: new FormControl(''),
    brdTitle: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl('')
  })


  createReview(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db.list('/brd').push(data).then(res => {}, err => reject(err));
    });
  }
  
  
}
