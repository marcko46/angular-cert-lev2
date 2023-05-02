import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'src/app/utility/base.component';
import { ModalDTO } from 'src/app/utility/modal-dto';
import { ModalService } from './modal.service';
@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
})
export class ConfirmModalComponent extends BaseComponent implements OnInit, OnDestroy {

  template!: TemplateRef<Element>;
  choose!: boolean;
  viewModal!: boolean;
  subscription!: Subscription;
  constructor(private modalService: ModalService ) {
    super();
  }

  ngOnInit() {
    this.subscription = this.modalService.subject.subscribe((dto :ModalDTO) => {
      if(dto.template){
        this.template = dto.template;
        this.choose = dto.choose;
        this.viewModal = true;
      } else {
        this.viewModal = false;
      }

    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
