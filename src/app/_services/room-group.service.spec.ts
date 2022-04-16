import { TestBed } from '@angular/core/testing';

import { RoomGroupService } from './room-group.service';

describe('RoomGroupService', () => {
  let service: RoomGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
