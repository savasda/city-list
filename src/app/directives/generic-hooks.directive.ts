import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive()
export class GenericHooks implements OnDestroy {
	subscriptions: Subscription[] = [];

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe())
	}
}
