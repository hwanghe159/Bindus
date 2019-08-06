import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private db: AngularFirestore) { }

  imgsrc: string;
  
  form = new FormGroup({
    UID: new FormControl(''),
    brdContents: new FormControl(''),
    brdFlag: new FormControl(1),
    brdPic1: new FormControl(''),
    brdPic2: new FormControl(''),
    brdPic3: new FormControl(''),
    brdPicCnt: new FormControl(0),
    brdTime: new FormControl(),
    brdTitle: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl('')
  })


  createBoard(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db.collection('/brd').add(data);
        
        
        //set(data).then(res => {}, err => reject(err));
    });
  }
  
  
}
