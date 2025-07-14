import { TestBed } from '@angular/core/testing';

import { CourierdashboardService } from './courierdashboard.service';

describe('CourierdashboardService', () => {
  let service: CourierdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourierdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
