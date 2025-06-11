import {Observable} from 'rxjs';

export interface Exposure{
  name: string,
  list?: string[],
  total_view?: number,
  daily_total_view?: Record<string, any>
}
export interface ExposureInterface {
  createExposures(name: string): Observable<Exposure>;
  getExposures():Observable<Exposure[]>;
  getExposureByName(name:string):Observable<Exposure>;
  deleteExposureByName(name:string):Observable<void>;
  getExposuresByNames(names:string[]):Observable<Exposure[]>
}
