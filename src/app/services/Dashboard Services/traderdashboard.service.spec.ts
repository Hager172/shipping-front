import { TestBed } from '@angular/core/testing';

import { TraderdashboardService } from './traderdashboard.service';

describe('TraderdashboardService', () => {
  let service: TraderdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraderdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
