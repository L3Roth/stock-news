import { TestBed } from '@angular/core/testing';

import { CryptoNewsServiceService } from './crypto-news-service.service';

describe('CryptoNewsServiceService', () => {
  let service: CryptoNewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoNewsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
