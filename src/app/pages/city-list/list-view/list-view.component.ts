import { ChangeDetectionStrategy, Component, Inject, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, Observable } from 'rxjs';
import { CSVRowInterface } from 'src/app/entities/row.interface';
import { CitiesPopulationServiceTsService } from 'src/app/services/cities-population.service.ts.service';
import { DataProcessingService } from 'src/app/services/data-processing.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';
import { EditCityDialogComponent } from 'src/app/components/edit-city-dialog/edit-city-dialog.component';
import { PaginationEventInterface } from 'src/app/entities/table-data.interface';
import { GenericHooks } from 'src/app/helpers/generic-hooks.directive';


@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DataProcessingService
  ]
})
export class ListViewComponent extends GenericHooks {
  nameFormControl = new FormControl();
  readonly datasource$: Observable<CSVRowInterface[]> = this.dataProcessingService.dataForDisplaying$;
  readonly FILTER_FUNCTION = (value: string, row: CSVRowInterface) => {
    return row['name']?.toLowerCase().includes(value.toLowerCase());
  }

  constructor(
    public dataProcessingService: DataProcessingService<CSVRowInterface>,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    private citiesPopulationServiceTsService: CitiesPopulationServiceTsService) {
      super()
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.citiesPopulationServiceTsService.store$
      .subscribe((data) => this.dataProcessingService.updateData(data))
    )

    this.subscriptions.push(
      this.nameFormControl.valueChanges.pipe(debounceTime(400)).subscribe(value => {
        this.dataProcessingService.setFilter([{
          value,
          externalFilteringFunction: this.FILTER_FUNCTION
        }]);
        this.setDefaultPageSizeAndIndex();
      })
    );
  }

  onEditCity(city: CSVRowInterface): void {
    const dialogRef = this.dialogService
      .open(new PolymorpheusComponent(EditCityDialogComponent, this.injector), {data: {
        city
      }})

    this.subscriptions.push(
      dialogRef.pipe(filter((value: any) => !!value)).subscribe(value => {
        this.citiesPopulationServiceTsService.updateCity(value)
      })
    );
  }

  onPaginate(event: PaginationEventInterface): void {
    this.dataProcessingService.setPage(event)
  }

  identify(index: number, item: CSVRowInterface) {
    return `${index}_${item.name}`
  }

  setDefaultPageSizeAndIndex(): void {
    this.dataProcessingService.setPage({
      page: 0,
      size: this.dataProcessingService.TABLE_DEFAULT_PAGE_SIZE,
    })
  }
}
