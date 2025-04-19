import { Injectable } from '@angular/core';
import {AuthInterface, AuthUser} from '../intefaces/auth-interface';
import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService implements AuthInterface {

  login(user: string, password: string): Observable<AuthUser> {
    return from(
      supabase.auth.signInWithPassword({ email: user, password })
    ).pipe(
      map(({ data, error }) => {
        if (error || !data.user) throw error || new Error('Login failed');
        return {
          uid: data.user.id,
          userName: data.user.email || ''
        };
      })
    );
  }

  logout(): void {
    supabase.auth.signOut();
  }

  getCurrentUser(): Observable<AuthUser | null> {
    const user = supabase.auth.getUser();
    return from(user).pipe(
      map(({ data }) => {
        if (!data.user) return null;
        return {
          uid: data.user.id,
          userName: data.user.email || ''
        };
      })
    );
  }

}

