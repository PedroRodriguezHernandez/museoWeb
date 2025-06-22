import { Injectable } from '@angular/core';
import {Tickets, TicketsInterface} from '../intefaces/tickets.interface';
import {defer, from, Observable} from 'rxjs';
import {supabase} from './supabase.service';
import {Offer} from '../intefaces/offer.interface';
import {map} from 'rxjs/operators';
import {Exhibition} from '../intefaces/exposition.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketsSupabaseService  implements  TicketsInterface{
  getTickets(): Observable<Tickets[]> {
    return defer(async () => {
      const {data: tickets, error} = await supabase
        .from('tickets')
        .select('*')
      if (error){
        throw error;
      }
      return tickets as Tickets[]
    });
  }

  getTicketsById(id:string): Observable<Tickets> {
    return from(
      supabase
        .from('tickets')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return data as Tickets;
      })
    );
  }

}
