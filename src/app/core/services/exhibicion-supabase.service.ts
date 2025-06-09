import { Injectable } from '@angular/core';
import {Observable, from, defer} from 'rxjs';
import { map } from 'rxjs/operators';
import {Exhibition, ExpositionInterface} from '../intefaces/exposition-interface';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class ExpositionService implements ExpositionInterface {

  getExpositions(): Observable<Exhibition[]> {
    return defer(async () => {
      const { data: exhibition, error } = await supabase
        .from('exhibition')
        .select('*');

      if (error) {
        throw error;
      }
      return exhibition as Exhibition[];
    });
  }


  getExpositionById(id: string): Observable<Exhibition> {
    return from(
      supabase
        .from('exhibition')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exhibition;
      })
    );
  }

  getExpositionsByIds(ids:string[]){
    return from(
      supabase
        .from('exhibition')
        .select('*')
        .in('id', ids)
    ).pipe(
      map(({ data, error }) => {
        if (error) {
          throw error
        }
        return data as Exhibition[];
      })
    );
  }

  addExposition(exposition: Exhibition): Observable<Exhibition> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('exhibition')
          .insert([
            {
              title: exposition.title,
              description: exposition.description,
              image_url: exposition.image_url,
              exposure: exposition.exposure,
              enable: exposition.enable,
              tags: exposition.tags
            }
          ])
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as Exhibition;
      })()
    );
  }


  updateExposition(id: string, exposition: Partial<Exhibition>): Observable<Exhibition> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('exhibition')
          .update({
            title: exposition.title,
            description: exposition.description,
            image_url: exposition.image_url,
            exposure: exposition.exposure,
            enable: exposition.enable,
            tags: exposition.tags
          })
          .eq('id', id)
          .select();

        if (error) {
          throw error;
        }

        return data?.[0] as Exhibition;
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
