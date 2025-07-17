import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as string[]; 
  const userRole = authService.getUserRole();

  if (allowedRoles.includes(userRole)) {
    return true; 
  }

  router.navigate(['/login']); 
  return false;
};
