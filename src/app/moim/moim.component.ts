import { Component, OnInit } from '@angular/core';
import { MoimService } from '../moim.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-moim',
  templateUrl: './moim.component.html',
  styleUrls: ['./moim.component.css']
})
export class MoimComponent implements OnInit {

  constructor(private moimService: MoimService, private route: ActivatedRoute) { }

  moim: any;//이 모임에 대한 정보

  ngOnInit() {
    const subId = this.route.snapshot.paramMap.get('id');
    this.moimService.getMoimBySubId(subId).subscribe(data => this.moim = data);
    console.log(this.moim);
  }

}
