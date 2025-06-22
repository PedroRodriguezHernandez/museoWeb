import {Component, ElementRef, HostListener, Inject, OnInit, signal, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {CUDPublishComponent} from '../../share/modals/cud-publish/cud-publish.component';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Exposure, ExposureInterface} from '../../core/intefaces/exposure.interface';
import {ExposureSupabaseService} from '../../core/services/exposure-supabase.service';
import {ExposureItemComponent} from '../../share/components/exposure-item/exposure-item.component';
import {FilterComponent} from '../../share/components/filter/filter.component';
import {MuseumSupabaseService} from '../../core/services/museum-supabase.service';
import {Museum, MuseumInterface} from '../../core/intefaces/museum.interface';
import {ExposureListComponent} from '../../share/components/exposure-list/exposure-list.component';

@Component({
  selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FilterComponent,
    ExposureListComponent,
    ExposureListComponent
  ],
  templateUrl: './content-list.component.html',
  standalone: true,
  styleUrl: './content-list.component.scss'
})

export class ContentListComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(ExposureSupabaseService) private exposure : ExposureInterface,
    @Inject(MuseumSupabaseService) private museumService : MuseumInterface,
  ) {}

  submit: boolean = false;

  filteredExposures: Exposure[] = [];
  exposures: Exposure[] = [];
  museums: Museum[] = [];
  selectedMuseum:string[] = [];


  protected addExposure: Boolean = false;

  form = new FormGroup({
    exposure: new FormControl("", [Validators.required]),
    selectedMuseumId: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.loadMuseums();
    this.loadExposures();
  }

  addItem() {
    this.addExposure = true
  }
  closeForm() {
    this.submit = false
    this.addExposure = false
  }

  onExposureDeleted($event: string) {
    this.loadExposures();
  }

  addNewExposure() {
    this.submit = true
    if(this.form.valid){
      this.exposure.createExposures(<string>this.form.value.exposure,<string>this.form.value.selectedMuseumId)
        .subscribe({
          next: () =>{
            this.loadExposures()
            this.closeForm()
          }
        })
    }
  }

  filterExposures(trim: string) {
    this.filteredExposures = this.exposures.filter(exposure => {
      const matchesName = exposure.name.toLowerCase().includes(trim.toLowerCase());
      const matchesMuseum = this.selectedMuseum.length === 0 || this.selectedMuseum.includes(exposure.museum_id!);
      return matchesName && matchesMuseum;
    });
  }


  private loadMuseums() {
    this.museumService.getMuseum().subscribe((museums) =>{
      this.museums = museums.slice().sort((a,b) => a.name.localeCompare(b.name))
      this.selectedMuseum = this.museums.length > 0 ? [this.museums[0].id] : []
    })
  }

  loadExposures() {
    this.exposure.getExposures().subscribe((exposures) => {
      this.exposures = exposures;
      this.filterExposuresBySelectedMuseums();
    });
  }

  filterExposuresBySelectedMuseums() {
    if (this.selectedMuseum.length === 0) {
      this.filteredExposures = this.exposures;
    } else {
      this.filteredExposures = this.exposures.filter(exposure =>
        this.selectedMuseum.includes(exposure.museum_id!)
      );
    }
  }
  onChangeMuseumCheckboxes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const museumId = checkbox.value;

    if (checkbox.checked) {
      if (!this.selectedMuseum.includes(museumId)) {
        this.selectedMuseum.push(museumId);
      }
    } else {
      this.selectedMuseum = this.selectedMuseum.filter(id => id !== museumId);
    }

    this.filterExposuresBySelectedMuseums();
  }

}
