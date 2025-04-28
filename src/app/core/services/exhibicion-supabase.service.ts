import { Injectable } from '@angular/core';
import {Observable, from, defer} from 'rxjs';
import { map } from 'rxjs/operators';
import {Exposition, ExpositionInterface} from '../intefaces/exposition-interface';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ExpositionService implements ExpositionInterface {

  getExpositions(): Observable<Exposition[]> {
    return defer(async () => {
      const { data: exhibition, error } = await supabase
        .from('exhibition')
        .select('*');

      if (error) {
        throw error;
      }
      return exhibition as Exposition[];
    });
  }


  getExpositionById(id: string): Observable<Exposition> {
    return from(
      supabase
        .from('exhibition')
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
      (async () => {
        const { data, error } = await supabase
          .from('exhibition')
          .insert([
            {
              title: exposition.title,
              description: exposition.description,
              imageUrl: exposition.imageUrl,
              enable: exposition.enable
            }
          ])
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as Exposition;
      })()
    );
  }


  updateExposition(id: string, exposition: Partial<Exposition>): Observable<Exposition> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('exhibition')
          .update({
            title: exposition.title,
            description: exposition.description,
            imageUrl: exposition.imageUrl,
            enable: exposition.enable
          })
          .eq('id', id)
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as Exposition;
      })()
    );
  }


  deleteExposition(id: string): Observable<void> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('exhibition')
          .delete()
          .eq('id', id)
        if (error) {
          throw error;
        }
      })()
    );
  }
}
