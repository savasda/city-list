import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CSVRowInterface } from 'src/app/entities/row.interface';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule } from '@taiga-ui/kit';
import {TuiButtonModule} from '@taiga-ui/core';
import { ImageErrorFallbackDirective } from 'src/app/directives/image-error-fallback.directive';

@Component({
  selector: 'app-edit-city-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiButtonModule,
    ImageErrorFallbackDirective
  ],
  templateUrl: './edit-city-dialog.component.html',
  styleUrls: ['./edit-city-dialog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCityDialogComponent implements OnInit {
  city!: CSVRowInterface;
  form!: FormGroup;
  imageURL!: string;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialogContext<CSVRowInterface | null>,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const { city } = this.context.data as any;
    const { id, name, photo } = city;
    this.imageURL = city.photo;
    this.form = this.fb.group({
      id: [id],
      name: [name],
      photo: [photo]
    });
  }

  ok() {
    this.context.completeWith(this.form.value);
  }

  cancel() {
    this.context.completeWith(null);
  }
}
