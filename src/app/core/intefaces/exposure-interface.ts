import {Observable} from 'rxjs';

export interface Exposure{
  name: string,
  list?: string[]
}
export interface ExposureInterface {
  getExposures():Observable<Exposure[]>;
  getExposureByName(name:string):Observable<Exposure>;
  deleteExposureByName(name:string):Observable<void>;
}
