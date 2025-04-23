import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {Exposition, ExpositionInterface} from '../intefaces/exposition-interface';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ExpositionService implements ExpositionInterface {
  private table = 'exhibition';


  getExpositions(): Observable<Exposition[]> {
    return from(
      supabase
        .from(this.table)
        .select('*')
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exposition[];
      })
    );
  }

  getExpositionById(id: string): Observable<Exposition> {
    return from(
      supabase
        .from(this.table)
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exposition;
      })
    );
  }

  addExposition(exposition: Exposition): Observable<Exposition> {
    return from(
      supabase
        .from(this.table)
        .insert(exposition)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exposition;
      })
    );
  }

  updateExposition(id: string, exposition: Partial<Exposition>): Observable<void> {
    return from(
      supabase
        .from(this.table)
        .update(exposition)
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }

  deleteExposition(id: string): Observable<void> {
    return from(
      supabase
        .from(this.table)
        .delete()
        .eq('id', id)
    ).pipe(
      map(({ error }) => {
        if (error) throw error;
      })
    );
  }
}
