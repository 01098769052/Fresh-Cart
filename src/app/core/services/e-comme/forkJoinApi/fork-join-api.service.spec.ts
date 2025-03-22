import { TestBed } from '@angular/core/testing';

import { ForkJoinApiService } from './fork-join-api.service';

describe('ForkJoinApiService', () => {
  let service: ForkJoinApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForkJoinApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
