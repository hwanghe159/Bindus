import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { Observable, of } from 'rxjs';
import { BoardService } from '../board.service';
import { FirebaseStorage } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-details',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() brdDetails = [];//게시판을 거쳐야만 상세정보가 나올것같음
  brdDetail: any;
  picUrls: string[] = [];
  //picRefs: string[];

  constructor(private route: ActivatedRoute, 
    private location: Location, 
    private boardService: BoardService, 
    /*private storage: FirebaseStorage*/
    private storage: AngularFireStorage) { }
  
  ngOnInit() {
    const brdSubId = this.route.snapshot.paramMap.get('id');
    this.boardService.getItem(brdSubId).subscribe(doc => this.brdDetail = doc);
    this.getPictures();
  }

  getPictures() {
    var brdPic1 : string = this.brdDetail.data().brdPic1;
    var brdPic2 : string = this.brdDetail.data().brdPic2;
    var brdPic3 : string = this.brdDetail.data().brdPic3;
    this.picUrls.push(brdPic1);
    this.picUrls.push(brdPic2);
    this.picUrls.push(brdPic3);


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
}