import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityListRoutingModule } from './city-list-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { ImageErrorFallbackDirective } from 'src/app/directives/image-error-fallback.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiButtonModule } from '@taiga-ui/core';
import { EditCityDialogComponent } from 'src/app/components/edit-city-dialog/edit-city-dialog.component';

@NgModule({
	declarations: [
		ListViewComponent,
	],
	imports: [
		CommonModule,
		CityListRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		TuiInputModule,
		HttpClientModule,
		TuiTablePaginationModule,
		TuiButtonModule,
		EditCityDialogComponent,
		ImageErrorFallbackDirective
	]
})
export class CityListModule { }
