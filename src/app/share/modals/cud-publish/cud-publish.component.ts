import { Component } from '@angular/core';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';

@Component({
    selector: 'app-cud-publish',
  imports: [
    QuillEditorComponent
  ],
    templateUrl: './cud-publish.component.html',
    standalone: true,
    styleUrl: './cud-publish.component.scss'
})
export class CUDPublishComponent {
  initialContent: string= '<p> Esto es una prueba </p>';

}
