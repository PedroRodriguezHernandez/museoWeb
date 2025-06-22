import { Injectable } from '@angular/core';
import {User, UserInterface} from '../intefaces/user.interface';
import {catchError, defer, from, map, Observable, throwError} from 'rxjs';
import {supabase} from './supabase.service';


@Injectable({
  providedIn: 'root'
})
export class UserSupabaseService implements UserInterface{

  getUsers(): Observable<User[]> {
    return defer( async()=> {
      const {data: user, error} = await supabase
        .from("users")
        .select("*")
      if (error) {
        throw error;
      }
      return user as User[];
    });
  }

  removeUser(id: string): Observable<void> {
    return from(
      (async () =>{
        const { data, error } = await supabase
          .from('users')
          .delete()
          .eq('id', id)
        if (error) {
          throw error;
        }
      })()
    );
  }

  updateUser(user: User): Observable<User> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('users')
          .update({
            rol: user.rol,
            end_date: user.end_date,
            start_date: user.start_date,
            enable: user.enable
          })
          .eq('id', user.id ? user.id : "")
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as User;
      })()
    );
  }

  getUserByID(id: string): Observable<User> {
    return from(
      supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({data, error}) => {
        if (error) throw error;
        return data as User;
      })
    );
  }

}
