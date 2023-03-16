import { Component } from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  userName: string = '';

  editUserForm = new FormGroup({
    title: new FormControl(),
    name: new FormControl(),
    password: new FormControl()
  })
}
