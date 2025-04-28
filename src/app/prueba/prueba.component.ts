import {Component, OnInit} from '@angular/core';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';
import {ExpositionService} from '../core/services/exhibicion-supabase.service';
import {Exposition} from '../core/intefaces/exposition-interface';
import {supabase} from '../core/services/supabase.service';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html',
  standalone: true,
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent{
  private file: File | any = null;
  constructor(
    protected auth : AuthSupabaseService,
    protected exhibition: ExpositionService,
    //protected storage: StorageSupabaseService
  ) {  }


  async  showExhibitions() {
   //const path = `${this.file.name}`;
    // console.log( await supabase.storage.from('image-exhibiton').getPublicUrl("Macintosh.png"))
   //console.log( await supabase.storage.from('image-exhibiton').upload(path,this.file))
   console.log( await supabase.storage
      .from('image-exhibiton')
      .remove(['61978104997570c2109bbaf1_charco_la_mareta-o9ut3nx4kjsisd83d3zf7esjffle3svqwo4nuuwb2s.jpeg']))

  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files){
      this.file = fileInput.files.item(0);
    }
  }
}
