import { Injector } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core';
import { BehaviorSubject, of } from 'rxjs';
import { CSVRowInterface } from 'src/app/entities/row.interface';
import { PaginationEventInterface } from 'src/app/entities/table-data.interface';
import { CitiesPopulationServiceTsService } from 'src/app/services/cities-population.service';
import { DataProcessingService } from 'src/app/services/data-processing.service';
import { ListViewComponent } from './list-view.component';

describe('ListViewComponent', () => {
  let component: ListViewComponent;
  let injector = {} as Injector;

  let dataProcessingServiceSpy: jasmine.SpyObj<DataProcessingService<CSVRowInterface>>;
  let dialog = {
    open: () => {
      /**
       * Do nothing
       */
    }
  } as unknown as TuiDialogService;
  let service = {
    updateCity: () => {
      /**
       * Do nothing
       */
    },
    store$: new BehaviorSubject([])
  } as unknown as CitiesPopulationServiceTsService;

  beforeEach(() => {
    dataProcessingServiceSpy = jasmine.createSpyObj('DataProcessingService', ['setPage', 'updateData', 'setFilter']);
    component = new ListViewComponent(dataProcessingServiceSpy, injector, dialog, service);
  });

  it('should set default page size and index', () => {
    component.setDefaultPageSizeAndIndex();
    expect(dataProcessingServiceSpy.setPage).toHaveBeenCalledWith({ page: 0, size: component.dataProcessingService.TABLE_DEFAULT_PAGE_SIZE });
  });

  it('shuld return uniq key', () => {
    const index = 100;
    const item = {
      name: 'TEST_NAME'
    } as CSVRowInterface;

    expect(component.identify(index, item)).toBe('100_TEST_NAME')
  })

  it('should call setPage method', () => {
    const data: PaginationEventInterface = {
      page: 100,
      size: 200,
    };
    component.onPaginate(data);
    expect(dataProcessingServiceSpy.setPage).toHaveBeenCalledWith({ page: 100, size: 200 });
  })

  describe('onEditCity', () => {
    const city = {} as CSVRowInterface;
    beforeEach(() => {
      spyOn(dialog, 'open').and.returnValue(of(city));
      spyOn(service, 'updateCity')
    })
    it('should open edit City dialog', () => {
      component.onEditCity(city);
      expect(dialog.open).toHaveBeenCalled();
      expect(service.updateCity).toHaveBeenCalledWith(city)
    })
  })

  describe('ngOnInit', () => {
    it('should get data from the store and call updateData method', () => {
      component.ngOnInit();
      expect(dataProcessingServiceSpy.updateData).toHaveBeenCalledWith([])
    })

    it('should update filter when nameFormControl was changed', fakeAsync(() => {
      component.nameFormControl = new FormControl(null);
      spyOn(component, 'setDefaultPageSizeAndIndex');
      component.ngOnInit();
      component.nameFormControl.patchValue('test')
      tick(500)
      expect(dataProcessingServiceSpy.setFilter).toHaveBeenCalled()
    }))
  })

});
