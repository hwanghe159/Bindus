import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private db: AngularFirestore) { }

  imgsrc: string;
  
  form = new FormGroup({
    brdId: new FormControl(''),
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


  items = [];
  cnt: number;
  
  createBoard(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db.collection('/brd').add(data);
        
        //set(data).then(res => {}, err => reject(err));
    });
  }

  //모든 게시물을 items배열에 저장
  getData() {
    this.items = [];
    this.db.collection("brd").get().toPromise().then((querySnapshot) => {
      this.cnt = querySnapshot.docs.length;
      querySnapshot.query.orderBy("brdTime", "desc").get().then((data) => {
        data.forEach((doc => {
          this.items.push(doc);
        }))
      });
    });
  }
  
  getItems() {
    console.log("this.items = "+this.items);
    return of(this.items);
  }

  getItem(subId: string) {
    if (this.items.length == 0){
      this.getItems();
    }
    return of(this.items.find(item => item.id.substring(0,6) === subId));
  }

  // createReview(data) {
  //   return new Promise<any>((resolve, reject) =>{
  //       this.db.list('/brd').push(data).then(res => {}, err => reject(err));
  //   });
  // }
  
}
