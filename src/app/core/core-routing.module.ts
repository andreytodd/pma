import { Routes, RouterModule } from "@angular/router"
import {HeaderComponent} from "./components/header/header.component";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";


const routes: Routes = [
  { path: 'auth/login', component: LoginComponent},
  { path: 'auth/signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule{}
