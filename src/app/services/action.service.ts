import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ModalDTO } from 'src/app/utility/modal-dto';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  public pastTrackingDaysChangeSubj = new Subject<number>();
  public subjectShowLoader = new Subject<boolean>();
  constructor() { }

  public pastTrackingDaysChange(pastDays: number) {
    this.pastTrackingDaysChangeSubj.next(pastDays);
  }

  public startLoader() {
    this.subjectShowLoader.next(true);
  }

  public stopLoader() {
    this.subjectShowLoader.next(false);
  }
}
