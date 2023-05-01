import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActionService } from 'src/app/services/action.service';
@Component({
	selector: 'page-loader',
	templateUrl: './page-loader.component.html',
	styleUrls: ['./page-loader.component.css'],
})
export class WgtPageLoaderComponent implements OnInit, OnDestroy {

	public showLoader = false;
  subscription!: Subscription;

	constructor(private actionService: ActionService, private cdRef: ChangeDetectorRef, private el: ElementRef) { }

	ngOnInit() {
		this.subscription = this.actionService.subjectShowLoader.subscribe(showLoader => {
			this.displayLoader(showLoader);
			this.cdRef.detectChanges();
		});
	}

	displayLoader(showLoader: boolean) {
		this.showLoader = showLoader;
	}

	ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
	}

}
