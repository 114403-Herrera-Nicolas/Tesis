/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CabinService } from './Cabin.service';

describe('Service: Cabin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CabinService]
    });
  });

  it('should ...', inject([CabinService], (service: CabinService) => {
    expect(service).toBeTruthy();
  }));
});
