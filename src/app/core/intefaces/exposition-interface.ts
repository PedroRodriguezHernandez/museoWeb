import {Observable} from 'rxjs';

export interface Exposition {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string;
  QRUrl?: string;
  enable: boolean;
  views?: number;
}
export interface ExpositionInterface {
  getExpositions(): Observable<Exposition[]>;
  getExpositionById(id: string): Observable<Exposition>;
  addExposition(exposition: Exposition): Observable<Exposition>;
  updateExposition(id: string, exposition: Partial<Exposition>): Observable<Exposition>;
  deleteExposition(id: string): Observable<void>;
}
