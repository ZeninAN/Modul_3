import { TestBed } from '@angular/core/testing';

import { ChequecompletionService } from './chequecompletion.service';

describe('ChequecompletionService', () => {
  let service: ChequecompletionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequecompletionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
