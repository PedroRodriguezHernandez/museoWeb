import {Component, Inject, Input, OnInit} from '@angular/core';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ExpositionService} from '../../../core/services/exhibicion-supabase.service';
import {Exposition, ExpositionInterface} from '../../../core/intefaces/exposition-interface';
import {NgIf} from '@angular/common';
import {DataTransferService} from '../../../core/services/transfer-data.service';


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
    @Inject(ExpositionService) private exhibitionInterface : ExpositionInterface
  ) {};

  protected isSidebarOpen: boolean = false;
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

  ngOnInit() {
    if(this.transferData.getData() != null) {
      this.exhibition = this.transferData.getData();
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
      this.exhibition.imageUrl = <string> this.form.value.image;
      this.exhibition.enable = false

      if(this.exhibition.id){
        this.exhibitionInterface.updateExposition(this.exhibition.id,this.exhibition)
      }else{
        this.exhibitionInterface.addExposition(this.exhibition)
      }
      this.transferData.clearData();
      this.exit();
    } else{
      alert("Uncompleted fields");
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  deleteExhibition() {
    if (this.exhibition.id != null) {
      this.exhibitionInterface.deleteExposition(this.exhibition.id);
      this.exit();
    }else {
      console.error("Is not possible delete this exposition");
    }
  }
}
