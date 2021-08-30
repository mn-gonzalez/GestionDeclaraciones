import { TestBed } from '@angular/core/testing';

import { DeudorService } from './deudor.service';

describe('DeudorService', () => {
  let service: DeudorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeudorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
