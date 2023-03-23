import { Component } from '@angular/core';
import {TokenService} from "../../../auth/services/token.service";
import {AuthService} from "../../../auth/services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router

  ) {}

  public token = this.tokenService.getToken()

  signOut() {
    this.authService.signOut();
    window.location.reload()
    this.router.navigate([''])
  }

}
