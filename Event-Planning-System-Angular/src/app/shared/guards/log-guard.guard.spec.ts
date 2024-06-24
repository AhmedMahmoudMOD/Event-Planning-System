import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logGuardGuard } from './log-guard.guard';

describe('logGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
