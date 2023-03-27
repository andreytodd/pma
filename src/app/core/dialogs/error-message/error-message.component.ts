import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() message!: string;

  constructor(private dialog: MatDialog) {
  }

  errorMessage!: string;

  close() {
    this.dialog.closeAll();
  }

}
