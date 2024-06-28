import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';

export const logGuardGuard: CanActivateFn = (route, state) => {
  let accountService = inject(AccountService);
  let router = inject(Router);
  if (!accountService.LoggedIn()) {
    return true;
  }
  router.navigate(['/events']);
  return true;
};
