import { Injectable } from '@angular/core';
import {Offer, OfferInterface} from '../intefaces/offer.interface';
import {defer, from, map, Observable} from 'rxjs';
import {supabase} from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class OfferSupabaseService implements OfferInterface{
  getOfferById(id : string): Observable<Offer> {
    return from(
      supabase
        .from('offer')
        .select('*')
        .eq('id', id)
        .single()
    ).pipe(
      map(({data, error}) => {
        if (error) throw error;
        return data as Offer;
      })
    );
  }
  createOffer(offer: Offer): Observable<Offer> {
    return from(
      (async () =>{
        const {data , error} = await supabase
          .from('offer')
          .insert([{
            name: offer.name,
            price: offer.price,
            age: offer.age,
            start_date: offer.start_date,
            end_date: offer.end_date,
            museum_id:offer.museum_id
          }])
          .select();

        if (error){
          throw error;
        }

        return data?.[0] as Offer;
      })()
    );
  }

  deleteOffer(id: string): Observable<void> {
    return from(
      (async () =>{
        const { data, error } = await supabase
          .from('offer')
          .delete()
          .eq('id', id)
        if (error) {
          throw error;
        }
      })()
    );
  }

  getOffers(): Observable<Offer[]> {
    return defer(async () => {
        const {data: offer, error} = await supabase
          .from('offer')
          .select('*')
        if (error){
          throw error;
        }
        return offer as Offer[]
      });
  }

}
