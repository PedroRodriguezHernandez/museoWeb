import {Observable} from 'rxjs';

export interface Exhibition {
  id?: string;
  title: string;
  description: string;
  image_url?: string;
  QRUrl?: string;
  enable: boolean;
  views?: number;
  exposure: string;
  tags?: Record<string, any>;
  daily_views?: Record<string, any>;

}
export interface ExpositionInterface {
  getExpositions(): Observable<Exhibition[]>;
  getExpositionById(id: string): Observable<Exhibition>;
  addExposition(exposition: Exhibition): Observable<Exhibition>;
  updateExposition(id: string, exposition: Partial<Exhibition>): Observable<Exhibition>;
  getExpositionsByIds(ids:string[]):Observable<Exhibition[]>;
  deleteExposition(id: string): Observable<void>;
}
