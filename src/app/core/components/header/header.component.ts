import { Component } from '@angular/core';
import {TokenService} from "../../../auth/services/token.service";
import {AuthService} from "../../../auth/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {ModalComponent} from "../../pages/modal-window/modal/modal.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}
  public isLoggedIn = this.tokenService.isLoggedInObs();

  signOut() {
    this.authService.signOut();
  }

  showModal() {
      this.dialog.open(ModalComponent);
  }

}
