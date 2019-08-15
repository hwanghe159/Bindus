import { TestBed } from '@angular/core/testing';

import { MoimService } from './moim.service';

describe('MoimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoimService = TestBed.get(MoimService);
    expect(service).toBeTruthy();
  });
});
