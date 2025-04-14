import {Observable} from 'rxjs';

export interface User{
  id: string;
  name: string;
  userName: string;
  userLevel: number;
  endDate?: Date;
  startDate?: Date;
  enable: boolean;
}

export interface UserInterface {
  getUsers(): Observable<User[]>;
  addUser(user: User): Observable<User>;
  updateUser(user: User): Observable<User>;
  removeUser(user: User): Observable<User>;
}
