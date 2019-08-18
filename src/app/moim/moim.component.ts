import { Component, OnInit } from '@angular/core';
import { MoimService } from '../moim.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-moim',
  templateUrl: './moim.component.html',
  styleUrls: ['./moim.component.css']
})
export class MoimComponent implements OnInit {

  constructor(private moimService: MoimService, 
    private route: ActivatedRoute, 
    /*private firebaseAuth: AngularFireAuth,*/
    private authService: AuthService ) { }

  moim: any;//이 모임에 대한 정보
  loginStatus: string;

  ngOnInit() {
    const subId = this.route.snapshot.paramMap.get('id');
    this.moimService.getMoimBySubId(subId).subscribe(data => this.moim = data); 
  }


  async registrate() {
    let uid = await this.authService.getCurrentUserUID();
    
    console.log(uid);
  }
}
