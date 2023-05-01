import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bold]'

})
export class BoldDirective {


  constructor(public _el: ElementRef, private _renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this._renderer.setStyle(this._el.nativeElement,"font-weight","bold");
  }


}
