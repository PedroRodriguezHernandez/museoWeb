import { Injectable } from '@angular/core';
import {MuseumDaily, MuseumDailyInterface} from '../intefaces/museum_daily_capacity.interface';
import {defer, Observable} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MuseumDailyCapacitySupabaseService implements MuseumDailyInterface{


  getMuseumDaily(): Observable<MuseumDaily[]> {
    return defer(async () => {
      const { data: museum, error } = await supabase
        .from('museum_daily_capacity')
        .select('*');

      if (error) {
        throw error;
      }
      return museum as MuseumDaily[];
    });
  }

  getMuseumDailyByMuseum(museum_id: string): Observable<MuseumDaily[]> {
    return defer(async () => {
      const { data: museum, error } = await supabase
        .from('museum_daily_capacity')
        .select('*')
        .eq('museum_id', museum_id);
      if (error) {
        throw error;
      }
      return museum as MuseumDaily[];
    });
  }

}
