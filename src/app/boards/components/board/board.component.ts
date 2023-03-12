import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../../core/services/api.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  @Input() board: any

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {

  }

  deleteBoard() {
    this.apiService.deleteBoard(this.board._id)
      .subscribe(
        (data) => (data),
        error => console.log(error)
        )
  }

}
