import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CSVRowInterface } from '../entities/row.interface';
import { CitiesPopulationServiceTsService } from './cities-population.service.ts.service';


describe('CitiesPopulationServiceTsService', () => {
  let service: CitiesPopulationServiceTsService;
  let http = {
    get: () => {
      /**
       * Do nothing
       */
    }
  } as unknown as HttpClient;
  let mockData: CSVRowInterface[] = [
    {id: 1, name: 'test', photo: ''},
    {id: 2, name: 'test2', photo: ''}
  ]

  beforeEach(() => {
    spyOn(http, 'get').and.returnValue(of(''))
    service = new CitiesPopulationServiceTsService(http);
  });


  describe('updateCity', () => {
    it('should update existing city', (done) => {
      const updatedCity = {id: 1, name: 'Updated', photo: 'url'}
      service.store$.next(mockData);
      service.updateCity(updatedCity);
      service.store$.subscribe(cities => {
        const city = cities.find(el => el.id === 1);
        expect(city).toEqual(updatedCity);
        done()
      })
    });
  });
});
