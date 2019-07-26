import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-board',
  templateUrl: './show-board.component.html',
  styleUrls: ['./show-board.component.css']
})
export class ShowBoardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
