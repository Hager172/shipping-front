import { TestBed } from '@angular/core/testing';

import { ShippingTypesService } from './shipping-types.service';

describe('ShippingTypesService', () => {
  let service: ShippingTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
