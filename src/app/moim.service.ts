import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoimService {

  constructor(private db: AngularFirestore) { }

  allMoims = [];//모든 모임들
  allCategories = [];//모든 카테고리들
  oneCategoryMoims = [];//한 카테고리에 대한 모든 모임들
  selectedMoims = [];
  getAllMoims() {
    this.allMoims = [];
    this.db.collection("moim").get().toPromise().then((data) => {
      data.forEach((doc => {
        this.allMoims.push(doc);
      }))
    });
  };

  getAllCategories() {
    this.allCategories = [];
    this.db.collection("category").get().toPromise().then((data) => {
      data.forEach((doc => {
        this.allCategories.push(doc);
      }))
    });
  };

  //영어이름으로 해당 카테고리 찾기
  getOneCategory(engName: any) {
    this.getAllCategories();
    console.log(this.allCategories);//받아옴!

    return this.db.collection("category").doc(engName).get().toPromise().then((data) => {
      return data.data();
    })

  }

  //영어 이름으로 oneCategoryMoims채우기

  getMoims(engName: string) {
    return this.db.collection('moim').get().toPromise().then((data) =>
      data.query.where("category", "array-contains", engName).get().then((doc) => {
        doc.forEach(element => {
          this.selectedMoims.push(element.data());
          console.log(element.data());
        });
        console.log(this.selectedMoims);
        return this.selectedMoims;
      })
    )
  }


}
