import {Observable} from 'rxjs';

export interface Tickets{
  id:string,
  buy_at:Date,
  day_for:Date,
  age?:string,
  name:string,
  price:number,
  offer_id:number,
  museum_id?:string

}
export interface TicketsInterface {
  getTickets():Observable<Tickets[]>;
  getTicketsById(id:string):Observable<Tickets>
}

