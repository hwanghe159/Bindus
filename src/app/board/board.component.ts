import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  
  items = [];
  pageOfItems: Array<any>;

  constructor() { }

  ngOnInit() {
    //{id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}...
    this.items = Array(150).fill(0).map((x, i) => ({ id: (i+1), name: `Item ${i + 1}`}));
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}
