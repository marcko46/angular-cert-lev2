import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from "rxjs";
import { ModalDTO } from 'src/app/utility/modal-dto';

@Injectable( {
    providedIn: 'root'
} )
export class ModalService {

    public subject = new Subject<ModalDTO>();
    public onChoose = new Subject<boolean>();
    constructor() { }

    public openModal( template: TemplateRef<Element>, choose: boolean) {
      let dto = new ModalDTO();
      dto.template = template;
      dto.choose = choose;
      this.subject.next(dto);
    }

    public closeModal() {
      let dto = new ModalDTO();
      this.subject.next(dto);
    }

    public confirmChoose( choose: boolean ) {
        this.onChoose.next( choose );
    }
}
