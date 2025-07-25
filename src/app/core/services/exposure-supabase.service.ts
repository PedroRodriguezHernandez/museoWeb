import { Injectable } from '@angular/core';
import {Exposure, ExposureInterface} from '../intefaces/exposure.interface';
import {defer, from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';



@Injectable({
  providedIn: 'root'
})
export class ExposureSupabaseService implements ExposureInterface{
  deleteExposureByName(name: string): Observable<void> {
    return from(
      (async () => {
        const { data, error } = await supabase
          .from('exposure')
          .delete()
          .eq('name', name)
        if (error) {
          throw error;
        }
      })()
    );
  }

  getExposuresByNames(names: string[]): Observable<Exposure[]> {
    return from(
      supabase
        .from('exposure')
        .select('*')
        .in('name', names)
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exposure[];
      })
    );
  }


  getExposureByName(name: string): Observable<Exposure> {
    return from(
      supabase
        .from('exposure')
        .select('*')
        .eq('name', name)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Exposure;
      })
    );
  }

  getExposures(): Observable<Exposure[]> {
    return defer(async () =>{
      const {data:exposure, error} = await supabase
        .from('exposure')
        .select('*')

      if (error){
        throw error
      }
      return exposure as Exposure[]
    });
  }

  createExposures(name: string, museum_id:string): Observable<Exposure> {
    return from(
      (async() =>{
        const {data, error} = await supabase
            .from('exposure')
            .insert([{
              name: name,
              museum_id: museum_id
            }])
            .select()

          if (error){
            throw error
          }

          return data?.[0] as Exposure
      })()
    );
  }

}
