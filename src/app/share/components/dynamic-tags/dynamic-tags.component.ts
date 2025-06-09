import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-dynamic-tags',
  imports: [
    FormsModule,
    JsonPipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './dynamic-tags.component.html',
  standalone: true,
  styleUrl: './dynamic-tags.component.scss'
})
export class DynamicTagsComponent implements OnChanges {

  @Input() tags: Record<string, any> = {};
  @Output() tagsChanged = new EventEmitter<Record<string, any>>();

  tagList: { key: string; value: string }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    const inputTags = this.tags || {};
    this.tagList = Object.entries(inputTags).map(([key, value]) => ({
      key,
      value: value ?? '',
    }));

    if (this.tagList.length === 0) {
      this.tagList.push({ key: '', value: '' });
    }
  }

  addTag(index: number) {
    const tag = this.tagList[index];
    if (!tag.key) return;

    const exists = this.tagList.some((t, i) => i !== index && t.key === tag.key);
    if (exists) return;

    this.tagList.push({ key: '', value: '' });
  }

  updateTag(index: number, field: 'key' | 'value', value: string) {
    this.tagList[index][field] = value;
  }

  removeTag(index: number) {
    this.tagList.splice(index, 1);
    this.emitTags();
  }

  public emitTags() {
    const updatedTags: Record<string, any> = {};
    for (const tag of this.tagList) {
      if (tag.key) updatedTags[tag.key] = tag.value;
    }
    this.tagsChanged.emit(updatedTags);
  }

  trackByIndex(index: number): number {
    return index;
  }
}
