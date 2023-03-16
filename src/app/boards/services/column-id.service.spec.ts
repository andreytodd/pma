import { TestBed } from '@angular/core/testing';

import { ColumnIdService } from './column-id.service';

describe('ColumnIdService', () => {
  let service: ColumnIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
