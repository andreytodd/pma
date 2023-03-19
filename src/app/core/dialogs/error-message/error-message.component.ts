import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent {
  @Input() message!: string;
  @Output() closePopup = new EventEmitter<void>();

  errorMessage!: string;

  showError(message: string) {
    this.errorMessage = message;
  }

  close() {
    this.closePopup.emit();
  }

}
