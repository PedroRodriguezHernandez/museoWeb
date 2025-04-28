import { Injectable } from '@angular/core';
import {StorageInterface} from '../intefaces/storage-interface';
import {from, iif, Observable} from 'rxjs';
import {supabase} from './supabase.service';
import {File} from 'node:buffer';

@Injectable({
  providedIn: 'root'
})
export class StorageSupabaseService implements StorageInterface {
  uploadFile(bucket: string, file: File | any): Observable<string> {
    const filePath = `${Math.random()%10000000}_${file.name}`;
    return new Observable<string>((observer) => {
      supabase.storage
        .from(bucket)
        .upload(filePath, file)
        .then( ({error}) => {
          if (error){
            observer.error(error);
          }else {
            this.getFile(bucket,filePath).subscribe({
              next: publishUrl =>{
                observer.next(publishUrl)
              }
            })

            observer.complete();
          }
        })

    });
  }

  getFile(bucket: string, path: string): Observable<string> {
    return new Observable<string>((observer) => {
      const {data}  = supabase.storage.from(bucket).getPublicUrl(path)
      observer.next(data.publicUrl);
      observer.complete();
    });
  }

  deleteFile(bucket: string, path: string): Observable<void> {
    return new Observable((observer) => {
      supabase.storage.from(bucket).remove([path])
        .then(({error}) => {
        if (error) {
          observer.error(error);
        }else {
          observer.next();
          observer.complete();
        }
      }).catch((err) => {
        observer.error(err);
      })
    });
  }
}

