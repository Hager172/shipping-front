import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[]; // ex: ['Admin', 'Courier']
  const userRole = authService.getUserRole(); // من localStorage

  if (allowedRoles.includes(userRole)) {
    return true; // مسموح يدخل
  }

  router.navigate(['/login']); // أو أي صفحة تانية
  return false;
};
