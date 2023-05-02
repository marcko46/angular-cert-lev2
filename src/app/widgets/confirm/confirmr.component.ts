import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionService } from 'src/app/services/action.service';
import { BaseComponent } from 'src/app/utility/base.component';
import { ModalService } from '../modal/modal.service';
@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
})
export class ConfirmComponent extends BaseComponent implements OnInit {

  public showLoader = false;
  subscription!: Subscription;

  constructor(private modalService: ModalService) {
    super();
  }

  ngOnInit() {

  }

  public onChoose(choose: boolean) {
    this.modalService.closeModal();
    this.modalService.confirmChoose(choose);
  }

}
