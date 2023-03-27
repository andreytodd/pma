import { Routes, RouterModule } from "@angular/router";
import {BoardsPageComponent} from "./pages/boards-page/boards-page.component";
import {NgModule} from "@angular/core";
import {BoardPageComponent} from "./pages/board-page/board-page.component";
import {AuthGuard} from "../auth/guards/auth.guard";


const routes: Routes = [
  { path: '', component: BoardsPageComponent, canActivate: [AuthGuard]},
  { path: ':id', component: BoardPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule{}
