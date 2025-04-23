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
export class PruebaComponent implements OnInit {
  constructor(
    protected auth : AuthSupabaseService,
    protected exhibition: ExpositionService
  ) {  }

  ngOnInit(): void {
    this.auth.login('admin@admin.com', 'admin').subscribe({
      next: user => console.log('Login OK:', user),
      error: err => console.error('Login ERROR:', err)
    });


    const newExposition: Exposition = {
      id: '',
      title: 'loremIpsum',
      description: 'UloremIpsum',
      imageUrl: 'loremIpsum',
      QRUrl: 'loremIpsum',
      enable: true,
    };


   // this.exhibition.addExposition(newExposition);
  }

  showExhibitions() {
    this.exhibition.getExpositions().subscribe({
      next: (expositions) => {
        console.log('Exposiciones obtenidas:', expositions);
        // Aquí puedes asignar las exposiciones a una variable o manejar la respuesta
      },
      error: (err) => {
        console.error('Error al obtener las exposiciones:', err);
      }
    });
  }

}
