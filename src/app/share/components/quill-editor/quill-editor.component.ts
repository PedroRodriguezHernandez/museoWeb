import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {QuillModule} from 'ngx-quill';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'quill/dist/quill.snow.css';
@Component({
  selector: 'app-quill-editor',
  imports: [QuillModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quill-editor.component.html',
  standalone: true,
  styleUrl: './quill-editor.component.scss'
})
export class QuillEditorComponent{
  @Input() content:string = '';
  @Input() control!: FormControl;

  // Configuración del toolbar
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }]
    ]
  };

}
