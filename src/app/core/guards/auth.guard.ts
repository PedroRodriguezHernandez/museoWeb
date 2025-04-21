import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSupabaseService } from '../services/auth-supabase.service';
import { map } from 'rxjs/operators';
import {AuthInterface} from '../intefaces/auth-interface';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthInterface = inject(AuthSupabaseService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    map(user => {
      if (user) {
        return true;
      } else {
        router.navigate(['']);
        return false;
      }
    })
  );
};
