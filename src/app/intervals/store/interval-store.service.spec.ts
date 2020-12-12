import { TestBed } from '@angular/core/testing';

import { IntervalStoreService } from './interval-store.service';

describe('IntervalStoreService', () => {
  let service: IntervalStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
