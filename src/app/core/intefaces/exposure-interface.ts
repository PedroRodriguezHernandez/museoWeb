import {Observable} from 'rxjs';

export interface Exposure{
  name: string,
  list?: string[],
  museum_id?:string
}
export interface ExposureInterface {
  createExposures(name: string,museum_id:string): Observable<Exposure>;
  getExposures():Observable<Exposure[]>;
  getExposureByName(name:string):Observable<Exposure>;
  deleteExposureByName(name:string):Observable<void>;
  getExposuresByNames(names:string[]):Observable<Exposure[]>
}
