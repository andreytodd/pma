import {Component, OnInit} from '@angular/core';
import {TokenService} from "./auth/services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private tokenService: TokenService, private router: Router) {
  }
  title = 'Project Management App';

  ngOnInit() {
    if (!this.tokenService.getToken()) {
      this.router.navigate([''])
    }
  }
}
