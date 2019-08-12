import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() brdDetails = [];//게시판을 거쳐야만 상세정보가 나올것같음
  brdDetail: any;

  constructor(private route: ActivatedRoute, private location: Location, private boardComponent: BoardComponent) { }

  ngOnInit() {
    this.boardComponent.getItems().subscribe(doc => this.brdDetails = doc);
    console.log(this.brdDetails);
    this.getBrdDetail().subscribe(doc => this.brdDetail = doc);
  }

  getBrdDetail() {
    const brdSubId = this.route.snapshot.paramMap.get('id');
    return of(this.brdDetails.find(doc => doc.id.substring(0,6) === brdSubId));
  }

  goBack() {
    this.location.back();
  }
}
