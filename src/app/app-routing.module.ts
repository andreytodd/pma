import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/pages/login/login.component";
import {SignupComponent} from "./auth/pages/signup/signup.component";
import {LoggedInGuard} from "./auth/guards/logged-in.guard";
import {WelcomeComponent} from "./core/pages/welcome-page/welcome/welcome.component";

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'auth/login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'auth/signup', component: SignupComponent, canActivate: [LoggedInGuard]},
  {path: 'boards', loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule)},
  // {
  //   path: 'boards',
  //   component: BoardsPageComponent,
  //   canActivate: [AuthGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
