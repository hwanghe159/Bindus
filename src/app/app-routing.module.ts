import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component'; 
import { LogInComponent } from './log-in/log-in.component';
import { CreateBoardComponent } from './create-board/create-board.component';
import { SignUp2Component } from './sign-up2/sign-up2.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
import { DetailComponent } from './detail/detail.component';
import { MypageComponent } from './mypage/mypage.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { MoimComponent } from './moim/moim.component';
import { CreatePlaceComponent } from './create-place/create-place.component';
import { CreateContentsComponent } from './create-contents/create-contents.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LogInComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUp2Component},
  { path: 'createboard', component: CreateBoardComponent},
  { path: 'board', component: BoardComponent},
  { path: 'board/:id', component: DetailComponent },
  { path: 'page/:id', component: MypageComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category/:engName', component: CategoryDetailComponent },
  { path: 'moim/:id', component: MoimComponent },
  { path: 'createplace', component: CreatePlaceComponent },
  { path: 'createcontents', component: CreateContentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
