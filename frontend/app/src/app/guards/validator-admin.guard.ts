import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { map, Observable } from 'rxjs';

export const validatorAdminGuard: CanActivateChildFn = (
  childRoute,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(LoginService); 
  const router = inject(Router);

  return authService.userRol.pipe(
    map((rol) => {
      if (rol === 'ADMIN') {
        return true; // Permite el acceso si el usuario tiene rol ADMIN
      } else {
        return router.parseUrl('/forbidden'); // Redirige a la página de acceso denegado
      }
    })
  );
};
