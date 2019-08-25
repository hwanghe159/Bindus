import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(private db: AngularFirestore) { }
  
  form = new FormGroup({
    UID: new FormControl(''),
    location: new FormControl(''),
    career: new FormControl(''),
    time: new FormControl(''), 
    intro: new FormControl(''),
    price: new FormControl(0),  
    title: new FormControl('')
  })
  
  createContents(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db.collection('/contents').add(data);
    });
  }
}
