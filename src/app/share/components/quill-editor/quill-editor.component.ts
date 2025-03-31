import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {QuillModule} from 'ngx-quill';
import {FormsModule} from '@angular/forms';
import 'quill/dist/quill.snow.css';
@Component({
  selector: 'app-quill-editor',
  imports: [QuillModule, FormsModule],
  templateUrl: './quill-editor.component.html',
  standalone: true,
  styleUrl: './quill-editor.component.scss'
})
export class QuillEditorComponent{
  @Input() editorContent:string = '';

  // Configuración del toolbar
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }]
    ]
  };

}
