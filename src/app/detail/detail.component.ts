import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { BoardService } from '../board.service';
import { FirebaseStorage } from '@angular/fire';


@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  brdDetail: any;
  //picRefs: any[];

  constructor(private route: ActivatedRoute, private location: Location, private boardService: BoardService, /*private storage: FirebaseStorage*/) { }
  //FirebaseStorage 의존성 주입하면 오류남. 왜그런진 모르겠음
  
  ngOnInit() {
    const brdSubId = this.route.snapshot.paramMap.get('id');
    this.boardService.getItem(brdSubId).subscribe(doc => this.brdDetail = doc);
    //this.getPictures();
  }

  getPictures() {
    // var httpReference1 = this.storage.refFromURL("{{brdPic1}}");
    // var httpReference2 = this.storage.refFromURL("{{brdPic2}}");
    // var httpReference3 = this.storage.refFromURL("{{brdPic3}}");
    // this.picRefs.push(httpReference1);
    // this.picRefs.push(httpReference2);
    // this.picRefs.push(httpReference3);
  }

  goBack() {
    this.location.back();
  }


  // @Input() brdDetails = [];
  // brdDetail: any;

  // constructor(private route: ActivatedRoute, private location: Location, private boardService: BoardService) { }

  // ngOnInit() {
  //   this.boardService.getItems().subscribe(doc => this.brdDetails = doc);
  //   console.log(this.brdDetails);
  //   this.getBrdDetail().subscribe(doc => this.brdDetail = doc);
  // }

  // getBrdDetail() {
  //   const brdSubId = this.route.snapshot.paramMap.get('id');
  //   return of(this.brdDetails.find(doc => doc.id.substring(0,6) === brdSubId));
  // }

  // goBack() {
  //   this.location.back();
  // }
}
