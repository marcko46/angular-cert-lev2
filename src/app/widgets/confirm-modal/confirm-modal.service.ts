import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ModalDTO } from 'src/app/utility/modal-dto';

@Injectable( {
    providedIn: 'root'
} )
export class ConfirmModalService {

    public subject = new Subject<ModalDTO>();
    public onChoose = new Subject<boolean>();
    constructor() { }

    public openModal( message: string, choose: boolean) {
      let dto = new ModalDTO();
      dto.message = message;
      dto.choose = choose;
      this.subject.next(dto);
    }

    public confirmChoose( choose: boolean ) {
        this.onChoose.next( choose );
    }
}
