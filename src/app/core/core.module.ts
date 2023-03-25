import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {RouterLink} from "@angular/router";
import { CreateBoardComponent } from './dialogs/create-board/create-board.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WelcomeComponent } from './pages/welcome-page/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { EditBoardComponent } from './dialogs/edit-board/edit-board.component';
import { CreateColumnComponent } from './dialogs/create-column/create-column.component';
import { EditUserComponent } from './dialogs/edit-user/edit-user.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { CreateTaskComponent } from './dialogs/create-task/create-task.component';
import { ErrorMessageComponent } from './dialogs/error-message/error-message.component';
import { EditTaskComponent } from './dialogs/edit-task/edit-task.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    CreateBoardComponent,
    WelcomeComponent,
    ConfirmationDialogComponent,
    EditBoardComponent,
    CreateColumnComponent,
    EditUserComponent,
    CreateTaskComponent,
    ErrorMessageComponent,
    EditTaskComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [CreateBoardComponent]
})
export class CoreModule { }
