import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/pages/login/login.component";
import {SignupComponent} from "./auth/pages/signup/signup.component";

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'boards', loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
