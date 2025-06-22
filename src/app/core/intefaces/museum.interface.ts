import {Observable} from 'rxjs';

export interface Museum{
  id:string,
  name:string,
  maximum_capacity:number,
}
export interface MuseumInterface {
  getMuseum():Observable<Museum[]>;
}
