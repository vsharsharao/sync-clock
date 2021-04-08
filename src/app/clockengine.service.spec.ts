import { TestBed } from '@angular/core/testing';

import { ClockengineService } from './clockengine.service';

describe('ClockengineService', () => {
  let service: ClockengineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClockengineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
