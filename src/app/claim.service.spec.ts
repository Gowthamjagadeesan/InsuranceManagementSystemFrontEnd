import { TestBed } from '@angular/core/testing';

import { CLaimService } from './claim.service';

describe('CLaimService', () => {
  let service: CLaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CLaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
