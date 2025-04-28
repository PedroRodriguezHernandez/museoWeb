import { Injectable } from '@angular/core';
import {StorageInterface} from '../intefaces/storage-interface';
import {catchError, from, map, Observable, of, switchMap, throwError} from 'rxjs';
import {supabase} from './supabase.service';
import {response} from 'express';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {File} from 'node:buffer';

@Injectable({
  providedIn: 'root'
})
export class StorageSupabaseService implements StorageInterface{


  getFile(bucket: string, path: string): Observable<string> {
    return new Observable<string>( (observer) => {
      try {
        const response = supabase.storage.from(bucket).getPublicUrl(path);
        observer.next(response.data.publicUrl);
        observer.complete();
      }  catch (error){
        console.log(error)
      }
    });
  }

  deleteFile(bucket: string, path: string): Observable<void> {
    return from(
      supabase.storage
        .from(bucket)
        .remove([path])
    ).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return;
      }),
      catchError(err => throwError(() => new Error('Delete file failed: ' + err.message)))
    );
  }

  uploadFile(bucket: string, file: File): Observable<string> {
    return from(
      (async () => {
        const filePath = `${Math.random()}.${file.name}`;
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath,file);

        if (error) {
          throw error;
        }

        return filePath; // Devuelves el path una vez se sube el archivo
      })()
    );
  }
}

