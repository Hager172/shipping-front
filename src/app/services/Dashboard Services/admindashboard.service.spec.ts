import { TestBed } from '@angular/core/testing';

import { AdminDashboardService } from './admindashboard.service';

describe('AdminDashboardService', () => {
  let service: AdminDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
