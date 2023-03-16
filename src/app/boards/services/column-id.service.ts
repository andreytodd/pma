import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ColumnIdService {

  columnId: BehaviorSubject<any> = new BehaviorSubject<any>(0)
  constructor() { }


}
