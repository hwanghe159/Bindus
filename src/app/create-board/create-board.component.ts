import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  file:string;
  filePath:string;
  constructor(private storage:AngularFireStorage) { }

  ngOnInit() {
  }
  async uploadFile() {
    const snapshot = await this.storage.upload(this.filePath, this.file)
    return await snapshot.ref.getDownloadURL();
  }



  updateFile(event) {
    this.file = event.target.files[0];
  }



//   async onSubmit() {
//     this.filePath = '/review/' + 'pic' + Math.floor(Math.random() * 1000000);
//     this.reviewService.form.patchValue({ imgsrc: this.filePath });
//     this.downloadURL = await this.uploadFile();
 
//     this.reviewService.form.patchValue({ imgurl: this.downloadURL });

//     this.reviewService.form.patchValue({ seatid:
//         this.reviewService.form.controls['loc'].value
//         + '_' + this.reviewService.form.controls['sec'].value
//         + '_' + this.reviewService.form.controls['row'].value
//         + '_' + this.reviewService.form.controls['num'].value});

//     // uid 추가
//     this.reviewService.form.patchValue({ uid: this.uid });

//     let data = this.reviewService.form.value;

//     this.reviewService.createReview(data).then(res => {});


}
