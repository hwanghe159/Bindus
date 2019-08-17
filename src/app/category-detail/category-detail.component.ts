import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoimService } from '../moim.service';


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private moimService: MoimService) { }

  category: object;//이 카테고리의 모든 정보
  moims = [];

  async ngOnInit() {

    const engName = this.route.snapshot.paramMap.get('engName');
    console.log(engName);
    this.category = await this.moimService.getOneCategory(engName);
    console.log(this.category);
    this.moims=await this.moimService.getMoims(engName);
    console.log(this.moims);

  }
}
