import { Injectable } from '@angular/core';
import {New, NewsInterface} from '../intefaces/news.interface';
import {from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class NewsSupabaseService implements NewsInterface {
  deleteNew(id: string): Observable<void> {
    return from(
      supabase.from('news')
        .delete()
        .eq('id', id)
    ).pipe(
      map(({error}) => {
        if (error) throw error
        return;
      })
    );
  }

  getNew(): Observable<New[]> {
    return from(
      supabase.from('news')
        .select('*')
        .order('start_date', { ascending: false })
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as New[];
      })
    );
  }

  getNewById(id: string): Observable<New> {
    return from(
      supabase.from('news')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as New;
      })
    );
  }

  updateNew(id: string, newNews: Partial<New>): Observable<New> {
    return from(
      supabase.from('news')
        .update([newNews])
        .eq('id', id)
        .select()
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as New;
      })
    );
  }
  addNew(newNew: New): Observable<New> {
    return from(
      supabase.from('news')
        .insert([newNew])
        .select()
        .single()
    ).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        return response.data as New;
      })
    );
  }
}
