import { TestBed } from '@angular/core/testing';

import { BrowserPlatformService } from './browser-platform.service';

describe('BrowserPlatformService', () => {
  let service: BrowserPlatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserPlatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
