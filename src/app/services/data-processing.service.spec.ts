import { skip } from "rxjs";
import { DataProcessingService } from "./data-processing.service";

describe('DataProcessingService', () => {
  let service: DataProcessingService<any>;
  const mockData = [{name: 'Cucumber'}, {name: 'Lemon'}, {name: 'Orange'}];

  beforeEach(() => {
    service = new DataProcessingService<any>();
  });

  describe('updateData', () => {{
    it('should update list of data', (done) => {
      service.updateData(mockData);
      service.dataForDisplaying$.subscribe(result => {
        expect(result).toEqual(mockData)
        done()
      })
    })
  }})

  describe('setFilter', () => {
    const FILTER_FUNCTION = (value: string, row: any) => {
      return row['name']?.toLowerCase().includes(value.toLowerCase());
    }

    beforeEach(() => {
      service.updateData(mockData);
    })

    it('should return empty array', (done) => {
      service.setFilter([{
        value: 'j',
        externalFilteringFunction: FILTER_FUNCTION
      }]);
      service.dataForDisplaying$.subscribe(result => {
        expect(result).toEqual([])
        done()
      })
    })

    it('should return found item', (done) => {
      service.setFilter([{
        value: 'u',
        externalFilteringFunction: FILTER_FUNCTION
      }]);
      service.dataForDisplaying$.subscribe(result => {
        expect(result).toEqual([{name: 'Cucumber'}])
        done()
      })
    })
  })

  describe('setPage', () => {
    beforeEach(() => {
      const jubjectUnedTest = service as any;
      jubjectUnedTest['TABLE_DEFAULT_PAGE_SIZE'] = 1;
      service.updateData(mockData);
    })

    it('should update page size and index', (done) => {
      service.setPage({
        size: 2,
        page: 1
      });
      service.dataForDisplaying$.subscribe(data => {
        expect(data.length).toBe(2);
        done()
      })
    })
  })

});

