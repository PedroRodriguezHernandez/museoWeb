import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Exposition} from '../../../core/intefaces/exposition-interface';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import DOMPurify from 'dompurify';
import {NgStyle} from '@angular/common';
import {DataTransferService} from '../../../core/services/transfer-data.service';

@Component({
    selector: 'app-item-list',
  imports: [
    NgStyle
  ],
    templateUrl: './item-list.component.html',
    standalone: true,
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit{

  constructor(
    private router: Router,
    protected transferService: DataTransferService
    ) { }

  @Input() exhibition!: Exposition;

  protected title: string = '';
  protected description: SafeHtml = '';
  protected image: string = '';
  protected  condition: boolean = false;



  editItem() {
    this.transferService.setData(this.exhibition);
    this.router.navigate(['/crud-publish'])
  }

  ngOnInit(): void {
    this.title = this.exhibition.title;
    this.image = <string>this.exhibition.imageUrl;
    const textRaw = this.exhibition.description || '';
    this.description = DOMPurify.sanitize(textRaw.replaceAll('&nbsp;',' '), {RETURN_TRUSTED_TYPE: true});
    this.condition = this.exhibition.enable;
  }
}
