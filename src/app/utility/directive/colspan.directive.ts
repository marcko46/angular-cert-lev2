import { Directive, Input, ElementRef, SimpleChanges, Renderer2 } from '@angular/core';
import { GRID_COLL_CSS_CLASS } from '../constants';

@Directive({
  selector: '[colspan]',
  exportAs: 'colspan'
})
export class ColspanDirective {

  @Input("colspan") colspan!: number;

  constructor(public _el: ElementRef, private _renderer: Renderer2) { }

  ngAfterContentInit(): void {
    if (this.colspan) {
      this.addClassListToElement(this._el.nativeElement, GRID_COLL_CSS_CLASS.get(this.colspan));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["colspan"]) {
      this.removeClassListToElement(this._el.nativeElement, GRID_COLL_CSS_CLASS.get(changes["colspan"].previousValue));
      this.addClassListToElement(this._el.nativeElement, GRID_COLL_CSS_CLASS.get(this.colspan));
    }
  }

  public addClassListToElement(element: any, cssClasses: string[]): any {
    if (cssClasses) {
      for (const cssClass of cssClasses) {
        if (cssClass !== '') {
          this._renderer.addClass(element, cssClass);
        }
      }
    }
    return element;
  }

  public removeClassListToElement(element: any, cssClasses: string[]): any {
    if (element && cssClasses) {
      for (const cssClass of cssClasses) {
        if (cssClass !== '') {
          this._renderer.removeClass(element, cssClass);
        }
      }
    }
    return element;
  }
}
