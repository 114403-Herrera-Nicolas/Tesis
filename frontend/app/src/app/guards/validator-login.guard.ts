import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { map, Observable } from 'rxjs';

export const validatorLoginGuard: CanActivateFn = (
  route,
  state
): Observable<boolean | UrlTree> => {
  const authService = inject(LoginService); 
  const router = inject(Router);

  return authService.userLoginOn.pipe(
    map((loginOn) => {
      if (loginOn) {
        return true; // Permite el acceso si el usuario está autenticado
      } else {
        return router.parseUrl('/login'); // Redirige a la página de inicio de sesión
      }
    })
  );
};
