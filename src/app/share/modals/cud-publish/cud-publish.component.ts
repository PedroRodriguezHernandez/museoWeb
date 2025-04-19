import {Component, Input} from '@angular/core';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-cud-publish',
  imports: [
    QuillEditorComponent,
    ReactiveFormsModule
  ],
    templateUrl: './cud-publish.component.html',
    standalone: true,
    styleUrl: './cud-publish.component.scss'
})
export class CUDPublishComponent {
  constructor(private router: Router) {};
  imageSrc: string = './assets/images/picture-gallery-interface-icon-vector.jpg';

  form = new FormGroup({
    title : new FormControl("",[Validators.required]),
    image: new FormControl("",[Validators.required]),
    description: new FormControl("",[Validators.required])
  });

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file: File = input?.files[0];
      const localUrl = URL.createObjectURL(file);

      this.imageSrc = localUrl;
      this.form.get('image')?.setValue(localUrl);
    }
  }

  exit() {
    this.router.navigate(['/content-list']);
  }

  save() {
    if (this.form.valid){
      this.exit();
    }
  }
}
