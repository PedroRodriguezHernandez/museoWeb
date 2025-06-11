import {Observable} from 'rxjs';

export interface Museum{
  date:Date,
  maximum_capacity:number,
  current_capacity:number
}
export interface MuseumInterface {
  getMuseum():Observable<Museum[]>;
}
