import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundPageComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
