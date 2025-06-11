import {Observable} from 'rxjs';

export interface Exposure{
  name: string,
  list?: string[]
}
export interface ExposureInterface {
  createExposures(name: string): Observable<Exposure>;
  getExposures():Observable<Exposure[]>;
  getExposureByName(name:string):Observable<Exposure>;
  deleteExposureByName(name:string):Observable<void>;
  getExposuresByNames(names:string[]):Observable<Exposure[]>
}
