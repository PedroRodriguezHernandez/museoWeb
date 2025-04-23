import {Component, Inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgForOf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {CUDPublishComponent} from '../../share/modals/cud-publish/cud-publish.component';
import {Router} from '@angular/router';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';
import {Exposition, ExpositionInterface} from '../../core/intefaces/exposition-interface';

@Component({
    selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    ItemListComponent,
    CUDPublishComponent
  ],
    templateUrl: './content-list.component.html',
    standalone: true,
    styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit{

  expositions: Exposition[] = [];
  constructor(
    private router: Router,
    @Inject(ExpositionService) private exhibitions : ExpositionInterface

  ) {}

  ngOnInit(): void {
    this.exhibitions.getExpositions().subscribe({
      next: (expositions) => {
        console.log('Exposiciones obtenidas:', expositions);
        this.expositions = expositions;
        for(const  expo of this.expositions){
          console.log(expo)
        }
      },
      error: (err) => {
        console.error('Error al obtener las exposiciones:', err);
      }
    });


  }

  array = Array.from({length:5});

  addItem() {
    this.router.navigate(['/crud-publish'])
  }
}
