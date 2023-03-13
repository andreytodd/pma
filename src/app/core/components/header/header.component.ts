import { Component } from '@angular/core';
import {TokenService} from "../../../auth/services/token.service";
import {AuthService} from "../../../auth/services/auth.service";
import { MatDialog } from '@angular/material/dialog';
import {CreateBoardComponent} from "../../dialogs/create-board/create-board.component";


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

  public token = this.tokenService.getToken()

  signOut() {
    this.authService.signOut();
  }

  showModal() {
      this.dialog.open(CreateBoardComponent);
  }


}
