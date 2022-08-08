import { TestBed } from '@angular/core/testing';

import { ReservationManagementService } from './reservation-management.service';

describe('ReservationManagementService', () => {
  let service: ReservationManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
