import {Observable} from 'rxjs';

export interface Offer{
  id?: string;
  name: string;
  price: number;
  age?: number;
  startDate: Date;
  endDate?: Date;
}

export interface OfferInterface {
  getOffers(): Observable<Offer[]>;
  getOfferById(id: string): Observable<Offer>;
  createOffer(offer:Offer): Observable<Offer>;
  deleteOffer(id: string): Observable<void>;
}
