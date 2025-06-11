import {Component, ElementRef, HostListener, Inject, OnInit, signal, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ItemListComponent} from '../../share/components/item-list/item-list.component';
import {CUDPublishComponent} from '../../share/modals/cud-publish/cud-publish.component';
import {Router} from '@angular/router';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';
import {Exhibition, ExpositionInterface} from '../../core/intefaces/exposition-interface';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Exposure, ExposureInterface} from '../../core/intefaces/exposure-interface';
import {ExposureSupabaseService} from '../../core/services/exposure-supabase.service';
import {ExposureItemComponent} from '../../share/components/exposure-item/exposure-item.component';
import {DataTransferService} from '../../core/services/transfer-data.service';

@Component({
  selector: 'app-content-list',
  imports: [
    HeaderComponent,
    NgForOf,
    ItemListComponent,
    CUDPublishComponent,
    FormsModule,
    NgIf,
    ExposureItemComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './content-list.component.html',
  standalone: true,
  styleUrl: './content-list.component.scss'
})

export class ContentListComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(ExposureSupabaseService) private exposure : ExposureInterface
  ) {}

  @ViewChild('dropdownRef') dropdownRef!: ElementRef;
  submit: boolean = false;

  exposures: Exposure[] = [];
  dropdownOpen = false;
  selectedExposures: string[] = ['All'];
  exposuresOptions: string[] = [];
  protected addExposure: Boolean = false;

  form = new FormGroup({
    exposure: new FormControl("", [Validators.required])
  })

  ngOnInit(): void {
    this.loadExposures();
  }

  addItem() {
    this.addExposure = true
  }
  closeForm() {
    this.submit = false
    this.addExposure = false
  }

  private loadExposures() {
    this.exposure.getExposures().subscribe((exposures) => {
      this.exposures  = exposures
      const names = exposures.map(e => e.name);
      this.exposuresOptions = names;
    });
  }


  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.dropdownOpen && this.dropdownRef && !this.dropdownRef.nativeElement.contains(targetElement)) {
      this.dropdownOpen = false;
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleSelection(value: string) {
    if (value === 'All') {
      if (this.selectedExposures.includes('All')) {
        this.selectedExposures = [];
      } else {
        this.selectedExposures = ['All'];
      }
    } else {
      if (this.selectedExposures.includes(value)) {
        this.selectedExposures = this.selectedExposures.filter(v => v !== value);
      } else {
        this.selectedExposures = this.selectedExposures.filter(v => v !== 'All');
        this.selectedExposures.push(value);
      }
    }
  }
  isSelected(value: string): boolean {
    return this.selectedExposures.includes(value);
  }

  onExposureDeleted(deletedName: string) {
    this.loadExposures();
  }


  addNewExposure() {
    this.submit = true
    if(this.form.valid){
      this.exposure.createExposures(<string>this.form.value.exposure)
        .subscribe({
          next: () =>{
            this.loadExposures()
            this.closeForm()
          }
        })
    }
  }
}
