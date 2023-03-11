import { Component } from '@angular/core';
import {TokenService} from "../../../auth/services/token.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private tokenService: TokenService, private authService: AuthService) {
  }
  public isLoggedIn = this.tokenService.isLoggedInObs();

  signOut() {
    this.authService.signOut();
  }
}
