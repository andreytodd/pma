import {Component, OnInit} from '@angular/core';
import {TokenService} from "./auth/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
  }
  title = 'Project Management App';

}
