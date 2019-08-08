import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import {NgxPaginationModule} from 'ngx-pagination'; 

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  config:any;
  pageOfItems: Array<any>;
  p: number = 1;
  collection: any[];  
  items=[];
  cnt:number;

  constructor(private db: AngularFirestore) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.cnt
    };
  }

  ngOnInit() {
    this.db.collection("brd").get().toPromise().then((querySnapshot) => {
     this.cnt=querySnapshot.docs.length;
      querySnapshot.forEach((doc) => {
        this.items.push(doc.data());        
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
    //{id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}...
    // this.getData();
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getData() {
    this.db.collection("brd").get().toPromise().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.items.push(doc.data());
        console.log(`${doc.id} => ${doc.data()}`);
      });
    });
  }
}