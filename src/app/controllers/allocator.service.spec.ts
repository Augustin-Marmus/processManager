/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AllocatorService } from './allocator.service';

describe('Service: Allocator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllocatorService]
    });
  });

  it('should ...', inject([AllocatorService], (service: AllocatorService) => {
    expect(service).toBeTruthy();
  }));
});
