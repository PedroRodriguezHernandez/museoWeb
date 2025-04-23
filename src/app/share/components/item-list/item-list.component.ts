import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Exposition} from '../../../core/intefaces/exposition-interface';

@Component({
    selector: 'app-item-list',
    imports: [],
    templateUrl: './item-list.component.html',
    standalone: true,
    styleUrl: './item-list.component.scss'
})
export class ItemListComponent implements OnInit{

  constructor(private router: Router) { }

  @Input() exhibition!: Exposition;

  protected title: string = '';
  protected description: string = '';
  private image: string = '';



  editItem() {
    this.router.navigate(['/crud-publish'])
  }

  ngOnInit(): void {
    this.title = this.exhibition.title;
    this.image = <string>this.exhibition.imageUrl;
    this.description = this.exhibition.description;
  }
}
