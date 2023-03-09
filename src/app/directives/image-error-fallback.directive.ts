import { Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
	selector: '[imageErrorFallback]',
	standalone: true,
})
export class ImageErrorFallbackDirective implements OnDestroy {
	@Input() imageErrorFallback: string | undefined;
	constructor(
		private renderer: Renderer2,
		private elementRef: ElementRef) { }

	@HostListener('error')
	onError(): void {
		const imageRef = <HTMLImageElement>this.elementRef.nativeElement;
		imageRef.src = this.imageErrorFallback || '../../assets/images/iPhone-cannot-load-photo-fix.jpg';
	}

	ngOnDestroy(): void {
		/**
		 * Abort of image loading
		 */
		this.renderer.removeAttribute(this.elementRef.nativeElement, 'src');
	}
}
