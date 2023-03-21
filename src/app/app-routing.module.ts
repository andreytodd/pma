import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/pages/login/login.component";
import {SignupComponent} from "./auth/pages/signup/signup.component";
import {LoggedInGuard} from "./auth/guards/logged-in.guard";
import {WelcomeComponent} from "./core/pages/welcome-page/welcome.component";
import {UserPageComponent} from "./auth/pages/user-page/user-page.component";
import {AuthGuard} from "./auth/guards/auth.guard";

const routes: Routes = [
  {path: '', component: WelcomeComponent, canActivate: [LoggedInGuard]},
  {path: 'auth/login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'auth/signup', component: SignupComponent, canActivate: [LoggedInGuard]},
  {path: 'user/settings', component: UserPageComponent, canActivate: [AuthGuard] },
  {path: 'boards', loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
