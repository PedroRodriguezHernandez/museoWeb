import {Component, Inject, OnInit} from '@angular/core';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExpositionService} from '../../../core/services/exhibicion-supabase.service';
import {Exhibition, ExpositionInterface} from '../../../core/intefaces/exposition-interface';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {DataTransferService} from '../../../core/services/transfer-data.service';
import {StorageSupabaseService} from '../../../core/services/storage-supabase.service';
import {StorageInterface} from '../../../core/intefaces/storage-interface';
import QRCode from 'qrcode';
import {DynamicTagsComponent} from '../../components/dynamic-tags/dynamic-tags.component';
import {ExposureInterface} from '../../../core/intefaces/exposure-interface';
import {ExposureSupabaseService} from '../../../core/services/exposure-supabase.service';


@Component({
    selector: 'app-cud-publish',
  imports: [
    CommonModule,
    QuillEditorComponent,
    ReactiveFormsModule,
    NgIf,
    DynamicTagsComponent,
    NgForOf
  ],
    templateUrl: './cud-publish.component.html',
    standalone: true,
    styleUrl: './cud-publish.component.scss'
})
export class CUDPublishComponent implements OnInit{
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private transferData : DataTransferService,
    @Inject(ExpositionService) private exhibitionInterface : ExpositionInterface,
    @Inject(StorageSupabaseService) private storageInterface : StorageInterface,
    @Inject(ExposureSupabaseService) private exposure : ExposureInterface,
  ) {};
  protected previewUrl: string | null = null;
  protected isSidebarOpen: boolean = false;
  exposuresOptions: string[] = [];
  protected defaultExposure: string = "";
  private file: File | any = null;
  protected exhibition : Exhibition = {
    title: "",
    description:"",
    image_url:'./assets/images/picture-gallery-interface-icon-vector.jpg',
    exposure: '',
    tags: {},
    enable:false
  }

  form  = new FormGroup({
    title : new FormControl(this.exhibition.title,[Validators.required]),
    image: new FormControl(this.exhibition.image_url,[Validators.required]),
    description: new FormControl(this.exhibition.description,[Validators.required]),
    exposure: new FormControl(this.exhibition.exposure, [Validators.required]),
  });

  async ngOnInit() {

    this.loadExposures()
    this.activeRouter.params.subscribe(params => {
      this.defaultExposure = params['exposure'] || '';
    });

    if(this.defaultExposure == ''){
      this.getData()
    }
  }

  exit() {
    this.transferData.clearData();
    this.router.navigate(['/content-list']);
  }


  save() {
    if (this.form.valid){
      this.exhibition.title = <string> this.form.value.title;
      this.exhibition.exposure = <string> this.form.value.exposure;
      this.exhibition.description = <string> this.form.value.description;
      this.exhibition.enable = this.exhibition.enable ? this.exhibition.enable : false;

      if(this.exhibition.id){
        if (this.exhibition.image_url != this.form.value.image && this.file){
          this.storageInterface.deleteFile('image-exhibiton', this.exhibition.image_url!.split('/').pop()!)
            .subscribe({
              next: () =>{
                this.storageInterface.uploadFile('image-exhibiton', this.file)
                  .subscribe({
                    next : (url) => {
                      this.exhibition.image_url = url;
                      this.updateExhibition()
                    },
                    error: err => console.log(err)
                  });
              }
            })
        }else {
          this.updateExhibition();
        }
      }else{
        this.storageInterface.uploadFile('image-exhibiton', this.file)
          .subscribe({
            next : url => {
              this.exhibition.image_url = url;
              this.exhibitionInterface.addExposition(this.exhibition)
                .subscribe({
                  next: () =>{
                    this.exit();
                  }
                });
            }
          });
      }
    } else{
      alert("Uncompleted fields");
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  deleteExhibition() {
    if (this.exhibition.id != null) {
      if (confirm("Are you sure you want to delete this exhibition?")) {
        this.storageInterface.deleteFile('image-exhibiton', this.exhibition.image_url!.split('/').pop()!).subscribe({
          next: () => {
            this.exhibitionInterface.deleteExposition(this.exhibition.id!);
            this.exit();
          },
          error: err => console.log(err)
        });
      }
    } else {
      console.error("Is not possible delete this exhibition");
    }
  }

  setImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files.item(0);
      this.previewUrl = URL.createObjectURL(this.file);
    }
  }

  setPublish() {
    if(this.exhibition.enable){
      if (confirm("This exhibition is already publish, do you want to change it?")){
        this.exhibition.enable = false;
        this.save()
      }
    }else {
      if (confirm("Do you want to publish this exhibition?")){
        this.exhibition.enable = true;
        this.save()
      }
    }
  }

  private updateExhibition(){
    this.exhibitionInterface.updateExposition(this.exhibition.id!,this.exhibition)
      .subscribe({
        next: () =>{
          this.exit();
        }
      });
  }

  async downloadQR() {
    if (this.exhibition.id && this.exhibition.enable){
      const filename: string = this.exhibition.title;
      const content: string =  this.exhibition.id;

      try {
        const qrDataUrl = await QRCode.toDataURL(content.toString(), {
          errorCorrectionLevel: 'H',
          margin: 2,
          width: 300,
        })
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

      } catch (err) {
        console.error(err);
      }
    }else{
      alert("The action could not be processed. Check that it is saved and published.")
    }
  }


  onTagsChanged(tags: Record<string, any>) {
    this.exhibition.tags = tags;
  }
  private loadExposures() {
    this.exposure.getExposures().subscribe((exposures) => {
      const names = exposures.map(e => e.name);
      this.exposuresOptions = names;
    });
  }

  private async getData() {
    if(this.transferData.getData() != null) {
      this.exhibition = await this.transferData.getData();
      this.form.patchValue({
        title: this.exhibition.title,
        description: this.exhibition.image_url,
        exposure: this.exhibition.exposure,
        image: this.exhibition.description
      });
    }
  }
}
