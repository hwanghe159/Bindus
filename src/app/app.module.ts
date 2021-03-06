import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule,AngularFireStorage } from '@angular/fire/storage'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 
import { AuthService } from './auth.service';
import { LogInComponent } from './log-in/log-in.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { SignUp2Component } from './sign-up2/sign-up2.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
//import { JwPaginationComponent } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailComponent } from './detail/detail.component';
import { BoardService } from './board.service';
import { MypageComponent } from './mypage/mypage.component';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MoimService } from './moim.service';
import { MoimComponent } from './moim/moim.component';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { CreateContentsComponent } from './create-contents/create-contents.component';
import { MatFormFieldModule,MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    LogInComponent,
    NavBarComponent,
    CreateBoardComponent,
    SignUp2Component,
    MainComponent,
    BoardComponent,
    //JwPaginationComponent,
    DetailComponent,    MypageComponent,
    CategoryComponent,
    CategoryDetailComponent,
    MoimComponent,
    CreatePlaceComponent,
    CreateContentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    NgxPaginationModule,
    TagInputModule, 
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule

    


  ],
  providers: [
    AuthService,
    BoardService,
    MoimService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


