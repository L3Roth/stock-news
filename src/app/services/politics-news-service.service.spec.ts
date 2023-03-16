import { TestBed } from '@angular/core/testing';

import { PoliticsNewsServiceService } from './politics-news-service.service';

describe('PoliticsNewsServiceService', () => {
  let service: PoliticsNewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticsNewsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
