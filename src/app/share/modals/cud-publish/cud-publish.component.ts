import {Component, Inject, OnInit} from '@angular/core';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExpositionService} from '../../../core/services/exhibicion-supabase.service';
import {Exposition, ExpositionInterface} from '../../../core/intefaces/exposition-interface';
import {NgIf} from '@angular/common';
import {DataTransferService} from '../../../core/services/transfer-data.service';
import {StorageSupabaseService} from '../../../core/services/storage-supabase.service';
import {StorageInterface} from '../../../core/intefaces/storage-interface';


@Component({
    selector: 'app-cud-publish',
  imports: [
    QuillEditorComponent,
    ReactiveFormsModule,
    NgIf
  ],
    templateUrl: './cud-publish.component.html',
    standalone: true,
    styleUrl: './cud-publish.component.scss'
})
export class CUDPublishComponent implements OnInit{
  constructor(
    private router: Router,
    private transferData : DataTransferService,
    @Inject(ExpositionService) private exhibitionInterface : ExpositionInterface,
    @Inject(StorageSupabaseService) private storageInterface : StorageInterface,
  ) {};
  protected previewUrl: string | null = null;
  protected isSidebarOpen: boolean = false;
  private file: File | any = null;
  protected exhibition : Exposition = {
    title: "",
    description:"",
    imageUrl:'./assets/images/picture-gallery-interface-icon-vector.jpg',
    enable:false
  }
  form  = new FormGroup({
    title : new FormControl(this.exhibition.title,[Validators.required]),
    image: new FormControl(this.exhibition.imageUrl,[Validators.required]),
    description: new FormControl(this.exhibition.description,[Validators.required])
  });

  async ngOnInit() {
    if(this.transferData.getData() != null) {
      this.exhibition = await this.transferData.getData();
      this.form.patchValue({
        title: this.exhibition.title,
        description: this.exhibition.imageUrl,
        image: this.exhibition.description
      });
    }

  }

  exit() {
    this.transferData.clearData();
    this.router.navigate(['/content-list']);
  }


  save() {
    if (this.form.valid){
      this.exhibition.title = <string> this.form.value.title;
      this.exhibition.description = <string> this.form.value.description;
      this.exhibition.enable = false

      if(this.exhibition.id){
        if (this.exhibition.imageUrl != this.form.value.image && this.file){
          this.storageInterface.deleteFile('image-exhibiton', this.exhibition.imageUrl!.split('/').pop()!)
            .subscribe({
              next: () =>{
                this.storageInterface.uploadFile('image-exhibiton', this.file)
                  .subscribe({
                    next : (url) => {
                      this.exhibition.imageUrl = url;
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
              this.exhibition.imageUrl = url;
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
        this.storageInterface.deleteFile('image-exhibiton', this.exhibition.imageUrl!.split('/').pop()!).subscribe({
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
        this.updateExhibition();
      }
    }else {
      if (confirm("Do you want to publish this exhibition?")){
        this.exhibition.enable = true;
        this.updateExhibition();
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
}
