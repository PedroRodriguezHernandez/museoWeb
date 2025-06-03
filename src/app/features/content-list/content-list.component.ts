import {Component, Inject, OnInit, signal} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgForOf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {CUDPublishComponent} from '../../share/modals/cud-publish/cud-publish.component';
import {Router} from '@angular/router';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';
import {Exposition, ExpositionInterface} from '../../core/intefaces/exposition-interface';
import {SearchComponent} from '../../share/components/search/search.component';

@Component({
    selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    ItemListComponent,
    CUDPublishComponent,
    SearchComponent
  ],
    templateUrl: './content-list.component.html',
    standalone: true,
    styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(ExpositionService) private exhibitions : ExpositionInterface
  ) {}

  expositions: Exposition[] = [];
  filteredExhibition: Exposition[] = [];

  ngOnInit(): void {
    this.exhibitions.getExpositions().subscribe({
      next: (expositions) => {
        this.expositions = expositions;
        this.filteredExhibition = this.expositions
        console.log(this.filteredExhibition)
      },
      error: (err) => {
        console.error('Error al obtener las exposiciones:', err);
      }
    });
  }

  addItem() {
    this.router.navigate(['/crud-publish'])
  }
}
