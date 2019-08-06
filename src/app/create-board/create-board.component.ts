import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { FormControl, FormGroup, FormsModule, FormBuilder } from "@angular/forms";
import { BoardService } from '../board.service';
import { AuthService } from '../auth.service';
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.css']
})
export class CreateBoardComponent implements OnInit {

  file:string;
  filePath:string;
  downloadURL:string;

  constructor(private db : AngularFirestore, private storage:AngularFireStorage, private formBuilder: FormBuilder, private boardService: BoardService, private authService:AuthService) { 
  }

  async ngOnInit() {
    let uid = await this.authService.getCurrentUserUID();
    console.log("auth service.getCurrentUID() returns"+uid);
    let email = await this.authService.getCurrentUserEmail();
    console.log("auth service.getCurrentUID() returns"+email);

      this.db.collection('user').doc(uid).ref.get().then(
        function(doc){
          if(doc.exists)
          {console.log(doc.data());}
          else
          {}
        }
      )
      
    // this.authService.getCurrrentUserName().then()=>{


    //   res.subscribe((ref)=>{console.log(ref[5]);});
    //   console.log(res);
    //   console.log(res[5]);
    // })
    
      
   

  }

  async uploadFile() {
    const snapshot = await this.storage.upload(this.filePath, this.file)
    return await snapshot.ref.getDownloadURL();
  }



  updateFile(event) {
    this.file = event.target.files.length
    console.log(this.file);
  }



  async onSubmit() {
    this.downloadURL = await this.uploadFile();
    console.log(this.downloadURL);
 
    // this.boardService.form.patchValue({ imgurl: this.downloadURL });

    // this.boardService.form.patchValue({ seatid:
    //     this.boardService.form.controls['loc'].value
    //     + '_' + this.reviewService.form.controls['sec'].value
    //     + '_' + this.reviewService.form.controls['row'].value
    //     + '_' + this.reviewService.form.controls['num'].value});

    // // uid 추가
    // this.reviewService.form.patchValue({ uid: this.uid });

    // let data = this.reviewService.form.value;

    // this.reviewService.createReview(data).then(res => {});


 }
}