import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parseCSV } from './../helpers/csv.helper'
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CSVRowInterface } from '../entities/row.interface';


@Injectable({
  providedIn: 'root'
})
export class CitiesPopulationServiceTsService {
  store$ = new BehaviorSubject<CSVRowInterface[]>([]);

  constructor(
    private http: HttpClient,
  ) {
    this.getCSVData().subscribe(data => this.store$.next(data))
  }


  /**
   * Update city name
   * @param {CSVRowInterface} city - updated city model
   */
  updateCity(city: CSVRowInterface): void {
    const listOfCities = this.store$.getValue();
    const foundCityIndex = listOfCities.findIndex(el => el.id === city.id);
    if(foundCityIndex !== -1) {
      listOfCities[foundCityIndex] = city;
      this.store$.next(listOfCities);
    }
  }


  /**
   * Getting data from the CSV file.
   */
  private getCSVData(): Observable<any> {
    return this.http.get('./../../assets/cities.csv', {responseType: 'text'})
      .pipe(
        map(data => parseCSV(data)),
      )
  }
}
