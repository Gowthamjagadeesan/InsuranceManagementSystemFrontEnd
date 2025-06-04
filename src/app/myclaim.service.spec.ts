import { TestBed } from '@angular/core/testing';

import { MyclaimService } from './myclaim.service';

describe('MyclaimService', () => {
  let service: MyclaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyclaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
