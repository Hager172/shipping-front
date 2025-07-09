import { TestBed } from '@angular/core/testing';

import { RejectionReasonService } from './rejection-reason.service';

describe('RejectionReasonService', () => {
  let service: RejectionReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RejectionReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
