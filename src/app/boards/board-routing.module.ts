import { Routes, RouterModule } from "@angular/router"
import {BoardsPageComponent} from "./pages/boards-page/boards-page.component";
import {NgModule} from "@angular/core";


const routes: Routes = [
  { path: '', component: BoardsPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule{}
