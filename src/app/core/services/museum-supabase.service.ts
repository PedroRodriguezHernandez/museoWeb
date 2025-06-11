import { Injectable } from '@angular/core';
import {Museum, MuseumInterface} from '../intefaces/museum-interface';
import {defer, Observable} from 'rxjs';
import {supabase} from './supabase.service';
import {Exhibition} from '../intefaces/exposition-interface';

@Injectable({
  providedIn: 'root'
})
export class MuseumSupabaseService implements MuseumInterface{
  getMuseum(): Observable<Museum[]> {
    return defer(async () => {
      const { data: museum, error } = await supabase
        .from('museum')
        .select('*');

      if (error) {
        throw error;
      }
      return museum as Museum[];
    });
  }

}
