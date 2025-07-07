import { TestBed } from '@angular/core/testing';

import { GovernrateService } from './governrate.service';

describe('GovernrateService', () => {
  let service: GovernrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GovernrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
