import { ElementRef, Renderer2 } from '@angular/core';
import { ImageErrorFallbackDirective } from './image-error-fallback.directive';

describe('ImageErrorFallbackDirective', () => {
	let renderer: jasmine.SpyObj<Renderer2>;
	let elementRef: jasmine.SpyObj<ElementRef>;
	let directive: ImageErrorFallbackDirective;

	beforeEach(() => {
		renderer = jasmine.createSpyObj('Renderer2', ['removeAttribute']);
		elementRef = jasmine.createSpyObj('ElementRef', ['nativeElement']);
		directive = new ImageErrorFallbackDirective(renderer, elementRef);
	});

	it('should set image src to fallback when onError is called', () => {
		directive.imageErrorFallback = 'fallback.jpg';
		const imageRef = {
			src: '',
		} as HTMLImageElement;
		elementRef.nativeElement = imageRef;
		directive.onError();
		expect(imageRef.src).toEqual('fallback.jpg');
	});

	it('should remove src attribute on destroy', () => {
		const imageRef = {} as HTMLImageElement;
		elementRef.nativeElement = imageRef;
		directive.ngOnDestroy();

		expect(renderer.removeAttribute)
			.toHaveBeenCalledWith(imageRef, 'src');
	});
});
