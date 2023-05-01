import { Component, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: '[wgt-select]',
  template: `
    <option value='undefined' *ngIf="empyElement" selected>{{selectOption}}</option>
    <ng-content></ng-content>
  `,
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  selectOption!: string;
  @Input() empyElement: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.selectOption = "- Select an option -";
  }

}
