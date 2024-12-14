import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { validatorAdminGuard } from './validator-admin.guard';

describe('validatorAdminGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validatorAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
