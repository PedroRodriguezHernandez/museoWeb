import {Observable} from 'rxjs';

export interface StorageInterface {
  uploadFile(path:string, fileUrl:string): Observable<string>;
  getFile(path:string): Observable<string>;
  deleteFile(path:string): Observable<void>;
}
