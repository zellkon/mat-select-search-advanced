import { TestBed } from '@angular/core/testing';

import { MatSelectSearchAdvancedService } from './mat-select-search-advanced.service';

describe('MatSelectSearchAdvancedService', () => {
  let service: MatSelectSearchAdvancedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatSelectSearchAdvancedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
