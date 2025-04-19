import {Component, OnInit} from '@angular/core';
import {AuthSupabaseService} from '../core/services/auth-supabase.service';

@Component({
  selector: 'app-prueba',
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent implements OnInit {
  constructor(protected auth : AuthSupabaseService) {  }

  ngOnInit(): void {
    this.auth.login('admin@admin.com', 'admin').subscribe({
      next: user => console.log('Login OK:', user),
      error: err => console.error('Login ERROR:', err)
    });
    }

}
