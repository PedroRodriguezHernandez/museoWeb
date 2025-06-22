import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';
import {Exhibition, ExpositionInterface} from '../../core/intefaces/exposition.interface';
import {ExposureSupabaseService} from '../../core/services/exposure-supabase.service';
import {Exposure, ExposureInterface} from '../../core/intefaces/exposure.interface';
import {DataTransferService} from '../../core/services/transfer-data.service';
import {ExposureItemComponent} from '../../share/components/exposure-item/exposure-item.component';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgForOf, NgIf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {FilterComponent} from '../../share/components/filter/filter.component';
import {MuseumSupabaseService} from '../../core/services/museum-supabase.service';
import {MuseumInterface} from '../../core/intefaces/museum.interface';

@Component({
  selector: 'app-exhibition-list',
  imports: [
    NgForOf,
    ItemListComponent,
    FilterComponent
  ],
  templateUrl: './exhibition-list.component.html',
  standalone: true,
  styleUrl: './exhibition-list.component.scss'
})
export class ExhibitionListComponent  implements OnInit{
  constructor(
    private router: Router,
    @Inject(ExpositionService) private exhibitionService : ExpositionInterface,
    private dataTransferService: DataTransferService
  ) {}

  protected exhibitions : Exhibition[] = []
  protected filterExhibition: Exhibition[] = []
  protected exposure : Exposure = {name: "", list: []}
  async ngOnInit() {
    if (this.dataTransferService.getDataList().length != 0) {
      this.exhibitions = this.dataTransferService.getDataList();
      this.filterExhibition = this.exhibitions
    }
    if (this.dataTransferService.getData()) {
      this.exposure = this.dataTransferService.getData();
    } else {
      this.router.navigate(['/content-list'])
    }
  }
  addItem() {
    this.dataTransferService.clearData()
    this.router.navigate(['/crud-publish',this.exposure.name]);
  }

  goBack() {
    this.dataTransferService.clearData()
    this.router.navigate(["/content-list"])
  }

  filterExhibitions(term: string) {
    this.filterExhibition =
      this.exhibitions.filter(exhibition =>
        exhibition.title.toLowerCase().includes(term.toLowerCase())
    )
  }
}
