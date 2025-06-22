import {Component, Inject, OnInit} from '@angular/core';
import {NewItemComponent} from '../../share/components/new-item/new-item.component';
import {HeaderComponent} from '../../share/components/header/header.component';
import {FilterComponent} from '../../share/components/filter/filter.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {MuseumSupabaseService} from '../../core/services/museum-supabase.service';
import {Museum, MuseumInterface} from '../../core/intefaces/museum.interface';
import {NewsSupabaseService} from '../../core/services/news-supabase.service';
import {New, NewsInterface} from '../../core/intefaces/news.interface';
import {log} from 'node:util';

@Component({
  selector: 'app-new',
  imports: [
    NewItemComponent,
    HeaderComponent,
    FilterComponent,
    NgForOf
  ],
  templateUrl: './new.component.html',
  standalone: true,
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit{
  constructor(
    private router: Router,
    @Inject(MuseumSupabaseService) private museumService : MuseumInterface,
    @Inject(NewsSupabaseService) private  newsService: NewsInterface
  ) {}
  museums: Museum[] = [];
  selectedMuseum:string[] = [];
  news: New[] = []
  filteredNews: New[] = []

  ngOnInit(): void {
    this.loadMuseums();
    this.loadNews()
  }

  onChangeMuseumCheckboxes(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const museumId = checkbox.value;

    if (checkbox.checked) {
      if (!this.selectedMuseum.includes(museumId)) {
        this.selectedMuseum.push(museumId);
      }
    } else {
      this.selectedMuseum = this.selectedMuseum.filter(id => id !== museumId);
    }
    this.filterNewsBySelectedMuseums();
  }

  private loadMuseums() {
    this.museumService.getMuseum().subscribe((museums) =>{
      this.museums = museums.slice().sort((a,b) => a.name.localeCompare(b.name))
      this.selectedMuseum = this.museums.length > 0 ? [this.museums[0].id] : []
    })
  }

  private loadNews() {
    this.newsService.getNew().subscribe({
      next: news =>{
        this.news = news
        this.filterNewsBySelectedMuseums()
      },
      error: err =>  console.log(err)
    })
  }

  addNew() {
    this.router.navigate(['/crud-news'])
  }

  filterExposures(trim: string) {
    this.filteredNews = this.news.filter(news => {
      const matchesName = news.title.toLowerCase().includes(trim.toLowerCase());
      const matchesMuseum = this.selectedMuseum.length === 0 || this.selectedMuseum.includes(news.museum_id!);
      return matchesName && matchesMuseum;
    });
  }

  private filterNewsBySelectedMuseums() {
    if (this.selectedMuseum.length === 0) {
      this.filteredNews = this.news;
    } else {
      this.filteredNews = this.news.filter(news =>
        this.selectedMuseum.includes(news.museum_id!) || !news.museum_id
      );
    }
  }
}
