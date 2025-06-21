import {Observable} from 'rxjs';

export interface MuseumDaily{
  id:string,
  date:Date,
  capacity:number,
  museum_id?:string
}
export interface MuseumDailyInterface {
  getMuseumDaily():Observable<MuseumDaily[]>;
  getMuseumDailyByMuseum(museum_id:string):Observable<MuseumDaily[]>;
}
