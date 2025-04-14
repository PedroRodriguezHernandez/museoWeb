import {Observable} from 'rxjs';

export interface AuthUser{
  uid: string;
  userName: string;
}
export interface AuthInterface {
  login(user: string, password:string): Observable<AuthUser>;
  logout(): void;
  getCurrentUser(): Observable<AuthUser | null>;
}
