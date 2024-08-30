import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.userIsAuthenticated
                      .pipe(take(1),
                       tap(isAuthenticated => {
                        if (!isAuthenticated) {
                          router.navigateByUrl('/auth');
                        }
                       }));
};
