import { Injectable } from '@angular/core';
import {AuthInterface, AuthUser} from '../intefaces/auth-interface';
import {catchError, from, map, Observable, throwError} from 'rxjs';
import {supabase} from './supabase.service';


@Injectable({
  providedIn: 'root'
})
export class AuthSupabaseService implements AuthInterface {
  changePassword(newPassword: string): Observable<void> {
    return from(
      supabase.auth.updateUser({password:newPassword}).then(({error})=>{
        if(error) throw error;
      })
    );
  }

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

  signUpWithPassword(email: string, password: string) {
    return from(
      supabase.auth.signUp({
        email,
        password,
      })
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error;
        }
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

  signInWithMagicLink(email: string, name:string): Observable<void> {
    return   from(supabase.auth.signInWithOtp({ email,
      options:{
        emailRedirectTo: "http://localhost:4200/signup",
        data: {name:name}
      },
    })).pipe(
      map(({ error }) => {
        if (error) {
          throw error
        };
        return;
      }),
      catchError((err) => throwError(() => err))
    );
  }

}

