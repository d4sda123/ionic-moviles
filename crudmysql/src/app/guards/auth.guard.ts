import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuth = !!localStorage.getItem('auth');
  if (isAuth) return true;
  router.navigateByUrl('/login');
  return false;
};
