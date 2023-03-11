import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {RouterLink} from "@angular/router";
import { ModalComponent } from './pages/modal-window/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
