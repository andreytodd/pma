import { NgModule } from '@angular/core';
import { AsyncPipe ,CommonModule} from '@angular/common';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import {BoardRoutingModule} from "./board-routing.module";
import { BoardComponent } from './components/board/board.component';




@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    AsyncPipe
  ],
  exports: [
    BoardsPageComponent,
  ]
})
export class BoardsModule { }
