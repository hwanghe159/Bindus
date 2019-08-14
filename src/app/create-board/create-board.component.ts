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
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  files:Array<any>;
  filePath:string;
  URLs:Array<string>;
  URL:string;
  cnt:number = 0;
  user:any;
  userInfo:Object;

  constructor(private storage:AngularFireStorage, private formBuilder: FormBuilder, private boardService: BoardService, 
    private authService: AuthService, private router: Router, private db: AngularFirestore) { 
  }

  async ngOnInit() {
    this.boardService.form.reset();
    let uid = await this.authService.getCurrentUserUID();
    console.log("auth service.getCurrentUID() returns"+uid);
    let email = await this.authService.getCurrentUserEmail();
    console.log("auth service.getCurrentEmail() returns"+email);
    this.user = await this.authService.getCurrentUserName();
    console.log("this.user : "+this.user); 


      // this.db.collection('user').doc(uid).ref.get().then(
      //   function(doc){
      //     if(doc.exists)
      //     {console.log(doc.data());}
      //     else
      //     {}
      //   }
      // )
      
    // this.authService.getCurrrentUserName().then()=>{


    //   res.subscribe((ref)=>{console.log(ref[5]);});
    //   console.log(res);
    //   console.log(res[5]);
    // })
    
      
   

  }

  // //파일 1개에 대하여 DB에 올리고 URL 반환
  // async uploadFile(i: number) {
  //     const snapshot = await this.storage.upload(this.filePaths[i], this.files[i])
  //     return await snapshot.ref.getDownloadURL();
  // }


  //파일첨부 상태가 변하면 실행됨
  updateFile(event) {
    this.files = event.target.files;
    this.cnt = event.target.files.length;
    //this.boardService.form.patchValue({brdPicCnt:this.cnt});
    console.log(this.files);
  }



  async onSubmit() {
    this.URLs = [];
    
    for (let i = 0; i < this.cnt; i++) {
      this.filePath = '/brd/' + 'pic' + Math.floor(Math.random() * 1000000);
      const snapshot = await this.storage.upload(this.filePath, this.files[i])
      this.URL = await snapshot.ref.getDownloadURL();
      this.URLs.push(this.URL);
    }

    let _brdId = this.db.createId().substring(0,6);
    let _brdTitle = this.boardService.form.controls['brdTitle'].value;
    let _brdContents = this.boardService.form.controls['brdContents'].value;

    this.boardService.form.patchValue({ brdId: _brdId });
    this.boardService.form.patchValue({ brdTitle: _brdTitle });
    this.boardService.form.patchValue({ brdContents: _brdContents });
    this.boardService.form.patchValue({ name: this.user });
    this.boardService.form.patchValue({ brdFlag: 1 });


    this.boardService.form.patchValue({ brdPicCnt: this.cnt });
    if (this.cnt >= 1) {
      this.boardService.form.patchValue({ brdPic1: this.URLs[0] });
      if (this.cnt >= 2) {
        this.boardService.form.patchValue({ brdPic2: this.URLs[1] });
        if (this.cnt >= 3) {
          this.boardService.form.patchValue({ brdPic3: this.URLs[2] });
        }
      }
    }


    // this.authService.getCurrentUserUID().then(res=>{
    //   UID = res;
    // })
    // .then()
    // https://joshua1988.github.io/web-development/javascript/promise-for-beginners/ 이거 참고하면서 따라해보기

    let UID = await this.authService.getCurrentUserUID();
    let email = await this.authService.getCurrentUserEmail();
    //await this.authService.getCurrentUserName();
    let name = await this.authService.getCurrentUserName();
    console.log("UID: "+UID+", email: "+email+", name: "+name);
    this.boardService.form.patchValue({ UID: UID });
    this.boardService.form.patchValue({ email: email });
    this.boardService.form.patchValue({ name: name });


    let time = firebase.firestore.Timestamp.now();
    this.boardService.form.patchValue({ brdTime: time });


    // for (let i = 0; i < this.cnt; i++) {
    //   console.log("for문 " + i + "번째 탐");
    //   this.uploadFile(i).then(res => {
    //     this.URLs.push(res);})
    //   console.log("URLs : " + this.URLs);
    // }
 
    // this.boardService.form.patchValue({ imgurl: this.downloadURL });

    // this.boardService.form.patchValue({ seatid:
    //     this.boardService.form.controls['loc'].value
    //     + '_' + this.reviewService.form.controls['sec'].value
    //     + '_' + this.reviewService.form.controls['row'].value
    //     + '_' + this.reviewService.form.controls['num'].value});

    // // uid 추가
    // this.reviewService.form.patchValue({ uid: this.uid });

    let data = this.boardService.form.value;

    this.boardService.createBoard(data).then(res => {});
    this.router.navigate(['/']);

 }
}