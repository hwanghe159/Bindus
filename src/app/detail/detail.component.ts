import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  item = { id: 0, name: "" };
  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.getItem();
  }

  getItem() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.item.id = id;
    this.item.name = `Item ${id}`;
    console.log("Enter Details => "+"id: "+this.item.id+", name: "+this.item.name);
  }

  goBack() {
    this.location.back();
  }
}
