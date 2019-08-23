import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { BoardService } from '../board.service';
import { AuthService } from  '../auth.service';
import { throwIfEmpty } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})

export class MypageComponent implements OnInit {

  constructor(private storage:AngularFireStorage, private formBuilder: FormBuilder, private boardService: BoardService, 
    private authService: AuthService, private router: Router, private db: AngularFirestore, private route: ActivatedRoute) { }

  user: any;
  uid: any;
  moims = [];
  categories = [];//이 유저가 참여했던 모든 모임의 카테고리의 doc배열
  categoryNames = [];//이 유저가 참여했던 모든 모임의 카테고리


  async ngOnInit() {
    const subUid = this.route.snapshot.paramMap.get('id');
    this.user = await this.authService.getUserDocfrom(subUid);
    this.uid = this.user.id;
    console.log(this.user);    
    console.log(this.uid);
    this.categoryNames = await this.getMoims();
    console.log(this.categoryNames);
    await this.getCategories();
    console.log(this.categories);

    // this.uid = await this.authService.getCurrentUserUID();
    // console.log("auth service.getCurrentUID() returns"+this.uid);
    // let email = await this.authService.getCurrentUserEmail();
    // console.log("auth service.getCurrentEmail() returns"+email);
    // this.user = await this.authService.getCurrentUser();
    // console.log("this.user : "+this.user); 
    // this.getMoims();
  }

  //참여한 모든 모임의 doc을 moims배열에 저장하면서 categoryNames배열 반환
  async getMoims() {
    this.moims = [];
    let categoryNames = [];
    await this.db.collection('moim').get().toPromise().then((data) =>
      data.query.where("UIDs", "array-contains", this.uid).get().then((doc) => {
        doc.forEach(element => {
          this.moims.push(element);
          for(let i = 0; i<element.data().category.length; i++){
            categoryNames.push(element.data().category[i]);
          }
        });
      })
    )

    console.log(categoryNames);
    let res: string[];
    res = categoryNames.filter((item,idx,array) => array.indexOf(item) === idx);
    return res;
  }

  //this.moims(이 유저가 참여한 모든 모임의 doc을 저장한 배열)에서 category들(string)을 모아서 중복을 제거한 배열 반환
  // async getCategoryNames() {
  //   let categoryNames = [];

  //   // for (let i = 0; i<this.moims.length; i++) {
  //   //   categoryNames.concat(this.moims[i].data().category);
  //   //   console.log(categoryNames);
  //   // }

    
  //   // this.moims.forEach(function (doc) {
  //   //   categoryNames.concat(doc.data().categoty)
  //   // }
  //   // );

  // }

  //이 user가 참여한 모든 모임의 카테고리의 doc을 categories[]에 저장
  async getCategories() {
    for (let i = 0; i < this.categoryNames.length; i++) {
      this.db.collection('category').doc(this.categoryNames[i]).ref.get().then(
        doc => this.categories.push(doc)
      )
    }
  }

  // getMoims(engName: string) {
  //   this.selectedMoims = [];
  //   return this.db.collection('moim').get().toPromise().then((data) =>
  //     data.query.where("category", "array-contains", engName).get().then((doc) => {
  //       doc.forEach(element => {
  //         this.selectedMoims.push(element);
  //         console.log(element);
  //       });
  //       console.log(this.selectedMoims);
  //       return this.selectedMoims;
  //     })
  //   )

}
