import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from "@angular/forms";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private db: AngularFirestore) { }

  imgsrc: string;
  
  form = new FormGroup({
    UID: new FormControl(''),
    location: new FormControl(''),
    place: new FormControl(''),
    time: new FormControl(''), 
    contents: new FormControl(''),  
    pic1: new FormControl(''),
    pic2: new FormControl(''),
    pic3: new FormControl(''),
    max: new FormControl('')
  })
  
  createPlace(data) {
    return new Promise<any>((resolve, reject) =>{
        this.db.collection('/place').add(data);
    });
  }
}
