import { TestBed } from '@angular/core/testing';

import { HistorialsService } from './historials.service';

describe('HistorialsService', () => {
  let service: HistorialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
