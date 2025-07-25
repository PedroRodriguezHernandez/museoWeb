import {Observable} from 'rxjs';

export interface Offer{
  id?: string;
  name: string;
  price: number;
  age?: string;
  start_date: Date;
  end_date?: Date;
  museum_id:string
}

export interface OfferInterface {
  getOffers(): Observable<Offer[]>;
  getOfferById(id: string): Observable<Offer>;
  createOffer(offer:Offer): Observable<Offer>;
  deleteOffer(id: string): Observable<void>;
}
