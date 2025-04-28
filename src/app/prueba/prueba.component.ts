import {Component, OnInit} from '@angular/core';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';
import {ExpositionService} from '../core/services/exhibicion-supabase.service';
import {Exposition} from '../core/intefaces/exposition-interface';
import {supabase} from '../core/services/supabase.service';
import {StorageSupabaseService} from '../core/services/storage-supabase.service';
import {subscribe} from 'node:diagnostics_channel';
import {log} from 'node:util';
import {finalize} from 'rxjs';
import {File} from 'node:buffer';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html',
  standalone: true,
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent implements OnInit{
  private file: File | any = null;
  private ejemplo: string = "";
  constructor(
    protected auth : AuthSupabaseService,
    protected exhibition: ExpositionService,
    protected storage: StorageSupabaseService,
  ) {  }



  async showExhibitions() {

    await supabase.storage.from('image-exhibiton')
      .remove(['prueba.png'])



  }
  async ngOnInit(){
    await this.auth.logout()
    await this.auth.login("admin@admin.com", "admin")
  }

  onFileSelected(event: Event) {
    const fileInput: HTMLInputElement = event.target as HTMLInputElement;
    if (fileInput.files){
      this.file = fileInput.files.item(0);
    }
  }


}
