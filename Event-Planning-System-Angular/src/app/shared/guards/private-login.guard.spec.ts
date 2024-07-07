import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { privateLoginGuard } from './private-login.guard';

describe('privateLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => privateLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
