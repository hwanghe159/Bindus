import { Component, OnInit } from '@angular/core';
import { MoimService } from '../moim.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-moim',
  templateUrl: './moim.component.html',
  styleUrls: ['./moim.component.css']
})
export class MoimComponent implements OnInit {

  constructor(private moimService: MoimService, 
    private route: ActivatedRoute, 
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService,
    private db: AngularFirestore) { }

  moim: any;//이 모임에 대한 정보
  place_pics = [];//이 모임의 공간의 이미지들
  users = [];//이 모임 참가자들의 doc 배열


   ngOnInit() {
    this.moimService.getAllCategories();
    console.log(1);
    const subId = this.route.snapshot.paramMap.get('id');
    console.log(2);
    this.moimService.getMoimBySubId(subId).subscribe((data) => 
    { this.moim = data
      this.place_pics=data.data().placeimg;
    }
    );
    console.log(3);
    console.log(4);
    this.getUsers();
    console.log("this.moimService.allMoims : " + this.moimService.allMoims);
    console.log("this.moimService.allCategories : " + this.moimService.allCategories);
    console.log("this.moimService.oneCategoryMoims : " + this.moimService.oneCategoryMoims);
    console.log("this.moimService.selectedMoims : " + this.moimService.selectedMoims);
    console.log("this.moimService.moim : " + this.moimService.moim);
  }


  isContains(uid: string) {
    return this.db.collection('moim').doc(this.moim.id).get().toPromise().then(
      (data) => {
        {
          return data.data().UIDs.includes(uid);
        }
      })
  }

  async registrate() {
    let uid = await this.authService.getCurrentUserUID();
    if (uid != "0") { //로그인상태일때
      let isInvalid = await this.isContains(uid);
      if (isInvalid) { //포함되어있을때
        alert("이미 신청한 모임입니다.")
      }
      else { //포함 안되어있을때
        this.db.collection('moim').doc(this.moim.id).update({
          UIDs: firebase.firestore.FieldValue.arrayUnion(uid)
        });
        alert("신청 완료!")
      }
    }
    else { //로그아웃 상태일때
      alert("먼저 로그인을 해주세요.")
      location.href = "/login";
    }
  }

  //uid로 해당 user doc 반환
  async getUserInfo(uid: string) {
    //console.log(this.db.collection('user').doc(uid));
    return this.db.collection('user').doc(uid).ref.get().then((doc) => 
    { 
      console.log(doc);
      return doc; 
    });
  }

  //해당 모임의 모든 참가자의 정보를 users배열에 저장
  async getUsers() {
    const uids = this.moim.data().UIDs;
    console.log(uids);
    for (let i=0; i<uids.length; i++) {
      let data = await this.getUserInfo(uids[i]);
      this.users.push(data);
    }
  }


  /*
  async isContains(uid: string) {
    return this.db.collection('moim').doc(this.moim.id).get().toPromise().then((data) => {
        return data.data().UIDs.includes(uid);
      }
    );
  }

  
  async registrate() {
    this.firebaseAuth.authState.subscribe(
      async function(gUser: any) {
      if (gUser) { //로그인 상태일때
        let contains: any;
        contains = await this.isContains(gUser.uid);
        console.log(contains);
        if(contains) {
          console.log("포함됨");
        } 
        
        // let length = this.db.collection('moim').doc(this.moim.id).ref.get().then(
        //   function (doc) {
        //     return doc.get('UIDs').length;//console.log(doc.get('UIDs').length)하면 1이 나오는데 39줄에서는 이상한 형태로 나옴..
        //   })
        // console.log(length);

        // if () {//UIDs 배열 안에 없으면 추가하고 "신청 완료" alert
        //   this.db.collection('moim').doc(this.moim.id).update({
        //     UIDs: firebase.firestore.FieldValue.arrayUnion(gUser.uid)
        //   });
        // }
        // else { //배열안에 이미 있으면 "이미 신청한 모임입니다." alert

        // }

      } else { //로그아웃 상태면 alert뜨고 로그인 페이지로

      }
    })
  
    // let uid = await this.firebaseAuth.auth.currentUser.uid;
    // this.db.collection('user').doc(uid).ref.get().then(
    //   function (doc) {
    //     if (doc.exists) {
    //       console.log(doc.data());    
    //     }
    //     else {
    //       console.log("No such document!");
    //     }
    //   }).catch(function (error) {
    //     console.log("Error getting document:", error);
    //   });
  }
*/
}
