import {Observable} from 'rxjs';

export interface AuthUser{
  uid: string;
  userName: string;
}
export interface AuthInterface {
  login(user: string, password:string): Observable<AuthUser>;
  logout(): void;
  getCurrentUser(): Observable<AuthUser | null>;
  changePassword(newPassword: string): Observable<void>;
  signUpWithPassword(email:string, password:string):Observable<void>;
  signInWithMagicLink(email: string, name: string): Observable<void>;
}


