import { Component } from '@angular/core';
import {TokenService} from "../../../auth/services/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private tokenService: TokenService) {
  }
  public isLoggedIn = this.tokenService.isLoggedInObs();
}
