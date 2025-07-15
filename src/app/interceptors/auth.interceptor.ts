import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // تأكد من المسار

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const excludedUrls = ['/Auth/login', '/Auth/register'];

  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req);
  }
  const authService = inject(AuthService);
  const token = authService.gettoken();

  if (token) {
    const clonedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(clonedReq);
  }

  return next(req);
};
