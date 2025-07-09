import { TestBed } from '@angular/core/testing';

import { ExtraVillagePriceService } from './extra-village-price.service';

describe('ExtraVillagePriceService', () => {
  let service: ExtraVillagePriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtraVillagePriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
