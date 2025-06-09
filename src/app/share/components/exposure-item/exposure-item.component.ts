import {Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Exposure, ExposureInterface} from '../../../core/intefaces/exposure-interface';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {ExpositionService} from '../../../core/services/exhibicion-supabase.service';
import {Exhibition, ExpositionInterface} from '../../../core/intefaces/exposition-interface';
import {ExposureSupabaseService} from '../../../core/services/exposure-supabase.service';
import {DataTransferService} from '../../../core/services/transfer-data.service';

@Component({
  selector: 'app-exposure-item',
  imports: [
    NgForOf,
  ],
  templateUrl: './exposure-item.component.html',
  standalone: true,
  styleUrl: './exposure-item.component.scss'
})
export class ExposureItemComponent implements OnChanges{

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService,
  @Inject(ExpositionService) private exhibition : ExpositionInterface,
    @Inject(ExposureSupabaseService) private exposureService : ExposureInterface,
  ) {}

  @Output() exposureDeleted = new EventEmitter<string>();
  @Input() exposure: Exposure = {name:"prove", list:[]}
  protected name: String = "prove"
  private exhibitions_id: string[]  = []
  protected exhibitions: Exhibition[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.name = this.exposure.name
    this.exhibitions_id = this.exposure.list
      ? Object.values(this.exposure.list) as string[]
      : [];
    this.loadExhibitions()
  }

  private loadExhibitions() {
    if (this.exhibitions_id.length > 0){
      console.log(this.exhibitions_id)
      this.exhibition.getExpositionsByIds(this.exhibitions_id).subscribe({
        next:(exhibitions) => {
          this.exhibitions = exhibitions
        },
        error: (err) => {
          console.error('Error to obtain exhibitions:', err);
        }
      })
    }
  }

  delete() {
    if (this.exhibitions_id.length == 0){
      this.exposureService.deleteExposureByName(this.exposure.name).subscribe({
        next: () => {
          this.exposureDeleted.emit(this.exposure.name);
        },
        error: (err) => {
          alert('Error deleting exposure: ' + err.message);
        }
      });
    } else {
      alert("Is not possible delete a exposure with exhibitions!");
    }
  }

  goToExhibitions() {
    this.dataTransferService.setDataList(this.exhibitions)
    this.dataTransferService.setData(this.exposure)
    this.router.navigate(['/exhibition-list'])
  }
}
