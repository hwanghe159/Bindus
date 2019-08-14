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

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainComponent },
  { path: 'login', component: LogInComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUp2Component},
  { path: 'createboard', component: CreateBoardComponent},
  { path: 'board', component: BoardComponent},
  { path: 'board/:id', component: DetailComponent },
  { path: 'mypage', component: MypageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
