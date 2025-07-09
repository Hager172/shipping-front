import { TestBed } from '@angular/core/testing';

import { CustomPriceService } from './custom-price.service';

describe('CustomPriceService', () => {
  let service: CustomPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
