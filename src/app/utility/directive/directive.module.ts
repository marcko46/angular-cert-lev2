import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoldDirective } from './bold.directive';
import { ColspanDirective } from './colspan.directive';

@NgModule({
	declarations: [
		ColspanDirective,
    BoldDirective
	],
	imports: [
		CommonModule
	],
	exports: [
		ColspanDirective,
    BoldDirective
	]
})
export class DirectivesModule { }
