import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map } from 'rxjs';
import { DataFilterInterface, PaginationEventInterface } from '../entities/table-data.interface';

@Injectable()
export class DataProcessingService<T> {
	readonly NUMBER_OF_FIRST_PAGE = 1;
	readonly PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
	readonly TABLE_DEFAULT_PAGE_SIZE = this.PAGE_SIZE_OPTIONS[0];
	private readonly _index$ = new BehaviorSubject<number>(this.NUMBER_OF_FIRST_PAGE);
	private readonly _size$ = new BehaviorSubject<number>(this.TABLE_DEFAULT_PAGE_SIZE);
	private readonly _data$ = new BehaviorSubject<readonly T[]>([]);

	/**
	 * Array of applied filters
	 */
	private readonly operators$ = new BehaviorSubject<Array<DataFilterInterface<T>>>([]);

	/**
	 * Filtered list of data.
	 */
	private readonly processedData$ = combineLatest([this._data$, this.operators$]).pipe(
		map(([listOfData, operators]) => {
			let processed = [...listOfData];

			/**
			 * Searching for applied filters
			 */
			const filters = operators.filter((item) => {
				const { externalFilteringFunction, value } = item;
				return (value && typeof externalFilteringFunction === 'function')
			});

			/**
			 * Apply filtering function to data
			 */
			for (const item of filters) {
				const { externalFilteringFunction, value } = item;
				processed = processed.filter(data => (externalFilteringFunction)(value, data));
			}

			return processed;
		})
	);

	/**
	 * Data sliced on the pages
	 */
	readonly dataForDisplaying$ = combineLatest([this._index$, this._size$, this.processedData$]).pipe(
		filter((payload) => {
			const [pageIndex, pageSize, listOfData] = payload;
			const maxIndex = Math.ceil(listOfData.length / pageSize) || 1;
			return pageIndex <= maxIndex;
		}),
		map(([pageIndex, pageSize, listOfData]) => listOfData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)),
	)

	/**
	 * Length of the data list
	 */
	readonly length$ = this.processedData$.pipe(map(data => data.length));

	/**
	 * Page size
	 */
	readonly size$ = this._size$.pipe(distinctUntilChanged());

	/**
	 * Current page index
	 */
	readonly index$ = this._index$.pipe(distinctUntilChanged());

	/**
	 * Update page size and page index
	 * @param {PaginationEventInterface} event
	 */
	setPage(event: PaginationEventInterface) {
		const { page, size } = event;
		const currentPageSize = this._size$.getValue();
		const currentPageIndex = this._index$.getValue();
		const nextPageIndex = page + 1;
		if (nextPageIndex !== currentPageIndex) {
			this._index$.next(nextPageIndex)
		}
		if (currentPageSize !== size) {
			this._size$.next(size);
			this._index$.next(this.NUMBER_OF_FIRST_PAGE);
		}
	}

	/**
	 * @param {DataFilterInterface<T>[]} filter - filter items by value
	 */
	setFilter(filter: DataFilterInterface<T>[]): void {
		this.operators$.next(filter);
	}

	/**
	 * @param {readonly T[]} list - data list
	 */
	updateData(list: readonly T[]): void {
		this._data$.next(list);
	}
}
