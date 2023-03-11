import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import {BoardRoutingModule} from "./board-routing.module";



@NgModule({
  declarations: [
    BoardsPageComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
  ],
  exports: [
    BoardsPageComponent,
  ]
})
export class BoardsModule { }
