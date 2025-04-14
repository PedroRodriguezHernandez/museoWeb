import {Observable} from 'rxjs';

export interface Offer{
  id: string;
  name: string;
  price: number;
  Age: number;
  startDate?: Date;
  endDate?: Date;
}

export interface OfferInterface {
  getOffers(): Observable<Offer[]>;
  createOffer(offer:Offer): Observable<Offer>;
  deleteOffer(id: string): Observable<void>;
}
