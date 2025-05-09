import {Observable} from 'rxjs';

export interface User{
  id?: string;
  name: string;
  email: string;
  rol: string;
  end_date?: Date;
  start_date: Date;
  enable?: boolean;
}

export interface UserInterface {
  getUserByID(id: string): Observable<User>;
  getUsers(): Observable<User[]>;
  updateUser(user: User): Observable<User>;
  removeUser(id: string): Observable<void>;
}
