export interface DataFilterInterface<T> {
	value: string;
	externalFilteringFunction: (value: string, data: T) => boolean;
}
export interface PaginationEventInterface {
	page: number;
	size: number;
}
