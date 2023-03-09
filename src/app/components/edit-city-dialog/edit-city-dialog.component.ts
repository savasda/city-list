import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDialogContext, TuiErrorModule, TuiButtonModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CSVRowInterface } from 'src/app/entities/row.interface';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiInputModule, TuiFieldErrorPipeModule } from '@taiga-ui/kit';
import { ImageErrorFallbackDirective } from 'src/app/directives/image-error-fallback.directive';
import { TuiValidationError } from '@taiga-ui/cdk';

@Component({
	selector: 'app-edit-city-dialog',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		TuiInputModule,
		TuiButtonModule,
		ImageErrorFallbackDirective,
		TuiFieldErrorPipeModule,
		TuiErrorModule
	],
	templateUrl: './edit-city-dialog.component.html',
	styleUrls: ['./edit-city-dialog.component.less'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCityDialogComponent implements OnInit {
	error = new TuiValidationError('Name of the city cannot be less than 2 characters.');
	city!: CSVRowInterface;
	form!: FormGroup;
	imageURL!: string;


	constructor(
		@Inject(POLYMORPHEUS_CONTEXT)
		private readonly context: TuiDialogContext<CSVRowInterface | null, { city: CSVRowInterface }>,
		private readonly fb: FormBuilder
	) {
	}

	ngOnInit(): void {
		const { city } = this.context.data;
		const { id, name, photo } = city;
		this.imageURL = photo;
		this.form = this.fb.group({
			id: [id],
			name: [name, [Validators.minLength(2), Validators.required]],
			photo: [photo]
		});
	}

	ok(): void {
		this.context.completeWith(this.form.value);
	}

	cancel(): void {
		this.context.completeWith(null);
	}
}
