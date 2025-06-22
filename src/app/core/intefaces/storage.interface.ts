import {Observable} from 'rxjs';

export interface StorageInterface {
  uploadFile(bucket: string, file:File): Observable<string>;
  getFile(bucket: string, path:string): Observable<string>;
  deleteFile(bucket: string, path:string): Observable<void>;
}
