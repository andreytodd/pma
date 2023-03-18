import { NgModule } from '@angular/core';
import { AsyncPipe ,CommonModule} from '@angular/common';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardRoutingModule } from "./board-routing.module";
import { BoardComponent } from './components/board/board.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardColumnComponent } from './components/board-column/board-column.component';
import { TaskComponent } from './components/task/task.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import { SortPipe } from './pipes/sort.pipe';




@NgModule({
  declarations: [
    BoardsPageComponent,
    BoardComponent,
    BoardPageComponent,
    BoardColumnComponent,
    TaskComponent,
    SortPipe,
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    AsyncPipe,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup
  ],
  exports: [
    BoardsPageComponent,
  ]
})
export class BoardsModule { }
