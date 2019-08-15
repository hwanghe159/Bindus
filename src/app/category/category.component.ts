import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MoimService } from '../moim.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private moimService: MoimService/*private db:AngularFirestore*/) { }

  //categories = [];
  
  ngOnInit() {
    this.moimService.getAllCategories();
    //this.getCategories();
  }

  // getCategories() {
  //   this.categories = [];
  //   this.db.collection("category").get().toPromise().then((data) => {
  //     data.forEach((doc => {
  //       this.categories.push(doc);
  //     }))
  //   });
  // };

}
