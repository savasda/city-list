import { Directive, ElementRef, HostListener, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
	selector: '[imageErrorFallback]',
	standalone: true,
})
export class ImageErrorFallbackDirective implements OnInit, OnDestroy {
	@Input() imageErrorFallback: string | undefined;
	private imageSrc!: string;
	private isErrorOfLoading = false;
	private readonly LOADER_IMAGE_URL = '../../assets/images/loading-gif.gif';
	private readonly FALLBACK_IMAGE_URL = '../../assets/images/iPhone-cannot-load-photo-fix.jpg';

	constructor(
		private renderer: Renderer2,
		private elementRef: ElementRef) {
	}

	@HostListener('error')
	onError(): void {
		this.isErrorOfLoading = true;
		this.elementRef.nativeElement.src = this.imageErrorFallback || this.FALLBACK_IMAGE_URL;
	}

	@HostListener('load')
	onLoad(): void {
		if (!this.isErrorOfLoading) {
			this.elementRef.nativeElement.src = this.imageSrc;
		}
	}

	ngOnInit(): void {
		this.imageSrc = this.elementRef.nativeElement.src;
		this.elementRef.nativeElement.src = this.LOADER_IMAGE_URL
	}

	ngOnDestroy(): void {
		/**
		 * Abort of image loading
		 */
		this.renderer.removeAttribute(this.elementRef.nativeElement, 'src');
	}
}
