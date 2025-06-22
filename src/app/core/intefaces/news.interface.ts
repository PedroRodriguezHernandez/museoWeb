import {Observable} from 'rxjs';

export interface New{
  id?:string,
  title: string,
  body: string,
  museum_id?:string,
  start_date:Date,
  end_date?:Date
}
export interface NewsInterface {
  getNew(): Observable<New[]>;
  getNewById(id:string): Observable<New>;
  updateNew(id:string, newNews: Partial<New>): Observable<New>;
  deleteNew(id:string): Observable<void>;
  addNew(newNew:New): Observable<New>
}
