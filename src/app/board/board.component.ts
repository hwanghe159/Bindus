import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  items =[];
  pageOfItems: Array<any>;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    
    this.getData();

    console.log("POI is "+this.pageOfItems);

    //{id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}...
    // this.getData();
    // this.items = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}` }));
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
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