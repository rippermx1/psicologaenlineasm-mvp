import { TestBed } from '@angular/core/testing';

import { ScheduleMeetService } from './schedule-meet.service';

describe('ScheduleMeetService', () => {
  let service: ScheduleMeetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleMeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
