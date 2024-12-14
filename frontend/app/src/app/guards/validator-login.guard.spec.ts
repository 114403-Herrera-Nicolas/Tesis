import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validatorLoginGuard } from './validator-login.guard';

describe('validatorLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validatorLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
