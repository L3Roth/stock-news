import { TestBed } from '@angular/core/testing';

import { StockNewsServiceService } from './stock-news-service.service';

describe('StockNewsServiceService', () => {
  let service: StockNewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockNewsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
