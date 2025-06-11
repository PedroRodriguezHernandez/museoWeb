import {User} from '../intefaces/user-interface';
import {Tickets} from '../intefaces/tickets-interface';
import {Exhibition} from '../intefaces/exposition-interface';
import {Museum} from '../intefaces/museum-interface';
import {Exposure} from '../intefaces/exposure-interface';

export class DataNormalizer {
  private exposures: Exposure[];
  private tickets: Tickets[];
  private exhibitions: Exhibition[];
  private museums: Museum[];

  constructor(
    exposures: Exposure[],
    tickets: Tickets[],
    exhibitions: Exhibition[],
    museums: Museum[]
  ) {
    this.exposures = exposures;
    this.tickets = tickets;
    this.exhibitions = exhibitions;
    this.museums = museums;
  }

  getMuseumFlow(){
    return this.museums.map(entry =>({
      date:entry.date.toISOString().split('T')[0],
      visits: entry.current_capacity,
    }))
  }
}
