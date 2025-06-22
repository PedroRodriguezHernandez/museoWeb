import {Inject, inject} from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthSupabaseService } from '../services/auth-supabase.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {AuthInterface} from '../intefaces/auth.interface';
import {UserInterface} from '../intefaces/user.interface';
import {UserSupabaseService} from '../services/user-supabase.service';
import {of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const authService:AuthInterface = inject(AuthSupabaseService);
  const  userService: UserInterface = inject(UserSupabaseService);

  const router = inject(Router);


  return authService.getCurrentUser().pipe(
    switchMap(authUser => {
      if (!authUser) {
        router.navigate(['/']);
        return of(false);
      }

      return userService.getUserByID(authUser.uid).pipe(
        tap(user => {
          if (user.rol === 'cliente') {
            router.navigate(['/']);
          }
        }),
        map(user => user.rol !== 'cliente')
      );
    })
    );
};

export const adminOnlyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthSupabaseService);
  const userService = inject(UserSupabaseService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    switchMap(authUser => {
      if (!authUser) {
        router.navigate(['/']);
        return of(false);
      }

      return userService.getUserByID(authUser.uid).pipe(
        tap(user => {
          if (user.rol !== 'admin') {
            router.navigate(['/']);
          }
        }),
        map(user => user.rol === 'admin')
      );
    })
  );
};

export const authOnlyGuard: CanActivateFn = () => {
  const authService = inject(AuthSupabaseService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    tap(user => {
      if (!user) {
        router.navigate(['/']);
      }
    }),
    map(user => !!user)
  );
};
