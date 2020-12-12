import { TestBed } from '@angular/core/testing';

import { Account.RequestService } from './account.request.service';

describe('Account.RequestService', () => {
  let service: Account.RequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Account.RequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
