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
  moim: any;//한 모임에 대한 정보

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
      //return data.data();
      return data;
    })

  }

  //영어 이름으로 selectedMoims채우고 반환
  getMoims(engName: string) {
    this.selectedMoims = [];
    return this.db.collection('moim').get().toPromise().then((data) =>
      data.query.where("category", "array-contains", engName).get().then((doc) => {
        doc.forEach(element => {
          this.selectedMoims.push(element);
          console.log(element);
        });
        console.log(this.selectedMoims);
        return this.selectedMoims;
      })
    )

    
    
    // return this.db.collection('moim').get().toPromise().then((data) =>
    //   data.query.where("category", "array-contains", engName).get().then((doc) => {
    //     doc.forEach(element => {
    //       this.selectedMoims.push(element.data());
    //       console.log(element.data());
    //     });
    //     console.log(this.selectedMoims);
    //     return this.selectedMoims;
    //   })
    // )
  }

  //index로 한 모임에 대한 정보 반환
  getMoimBySubId(subId: string) {
    if (this.allMoims.length == 0) {
      this.getAllMoims();
    }
    return of(this.allMoims.find(item => item.id.substring(0,6) === subId));
  }


}
