import { FormBuilder } from '@angular/forms';
import { TuiDialogContext } from '@taiga-ui/core';
import { CSVRowInterface } from 'src/app/entities/row.interface';
import { EditCityDialogComponent } from './edit-city-dialog.component';

describe('EditCityDialogComponent', () => {
	const context = {
		completeWith: () => { },
		data: {
			city: {
				id: 0,
				name: 'City',
				photo: 'url'
			}
		}
	} as unknown as TuiDialogContext<CSVRowInterface | null, { city: CSVRowInterface }>;
	const formBuilder = {
		group: () => {
			/**
			 * Do nothing
			 */
		}
	} as unknown as FormBuilder;
	const component = new EditCityDialogComponent(context, formBuilder);

	describe('ngOnInit', () => {
		it('should init form', () => {
			spyOn(formBuilder, 'group');
			component.ngOnInit();
			expect(formBuilder.group).toHaveBeenCalled();
			expect(component.imageURL).toBe('url')
		})
	})

	it('should close the dialog', () => {
		spyOn(context, 'completeWith');
		component.cancel();
		expect(context.completeWith).toHaveBeenCalledWith(null)
	})
})
