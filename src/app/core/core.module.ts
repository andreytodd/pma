import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {RouterLink} from "@angular/router";
import { ModalComponent } from './pages/modal-window/modal/modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { WelcomeComponent } from './pages/welcome-page/welcome/welcome.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent,
    ModalComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  entryComponents: [ModalComponent]
})
export class CoreModule { }
