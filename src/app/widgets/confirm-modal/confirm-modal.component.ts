import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/utility/base.component';
import { ModalDTO } from 'src/app/utility/modal-dto';
import { ConfirmModalService } from './confirm-modal.service';
@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
	styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent extends BaseComponent implements OnInit, OnDestroy {

  message!: string;
  choose!: boolean;
  viewModal!: boolean;
  subscription!: Subscription;
  constructor(private confirmModalService: ConfirmModalService ) {
    super();
  }

  ngOnInit() {
    this.subscription = this.confirmModalService.subject.subscribe((dto :ModalDTO) => {
      this.message = dto.message;
      this.choose = dto.choose;
      this.viewModal = true;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  public onChoose(choose: boolean){
      this.message = '';
      this.viewModal = false;
      this.confirmModalService.confirmChoose(choose);
  }
}
