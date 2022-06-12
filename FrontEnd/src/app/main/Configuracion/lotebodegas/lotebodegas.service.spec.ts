import { TestBed } from '@angular/core/testing';

import { LotebodegasService } from './lotebodegas.service';

describe('LotebodegasService', () => {
  let service: LotebodegasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotebodegasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
