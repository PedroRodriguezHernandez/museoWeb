import {Component, Inject, OnInit} from '@angular/core';
import {DynamicTagsComponent} from '../../components/dynamic-tags/dynamic-tags.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {QuillEditorComponent} from '../../components/quill-editor/quill-editor.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {New, NewsInterface} from '../../../core/intefaces/news.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsSupabaseService} from '../../../core/services/news-supabase.service';
import {Museum, MuseumInterface} from '../../../core/intefaces/museum.interface';
import {MuseumSupabaseService} from '../../../core/services/museum-supabase.service';

@Component({
  selector: 'app-crud-news',
  imports: [
    NgIf,
    QuillEditorComponent,
    ReactiveFormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './crud-news.component.html',
  standalone: true,
  styleUrl: './crud-news.component.scss'
})
export class CrudNewsComponent implements OnInit{

  protected museums: Museum[] = []
  protected newId : string = ''
  protected new! : New;
  protected submit = false
  protected isSidebarOpen: boolean = false;

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    @Inject(NewsSupabaseService) private newService: NewsInterface,
    @Inject(MuseumSupabaseService) private museumService: MuseumInterface,
  ) {};

  form = new FormGroup({
    title: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    museum: new FormControl("", []),
    from: new FormControl("", Validators.required),
    to: new FormControl("")
  });

  ngOnInit(): void {
    this.loadMuseum()
    this.activeRouter.queryParams.subscribe( params =>{
      this.newId = params['news'] || ''
      if (this.newId != ''){
        this.loadNews(this.newId)
      }
    })
  }

  private loadNews(newId: string) {
     this.newService.getNewById(newId).subscribe(news=>{
       this.new = news
       this.form.patchValue({
         title: this.new.title,
         description: this.new.body,
         museum: this.new.museum_id ? this.new.museum_id : "",
         from: this.new.start_date.toString(),
         to: this.new.end_date ?  this.new.end_date.toString() : undefined
       })
    })
  }

  private loadMuseum() {
    this.museumService.getMuseum().subscribe( museums =>{
      this.museums = museums
    })
  }

  protected exit() {
    this.router.navigate(['/news-list']);
  }

  protected saves() {
    this.submit = true
    if(this.form.valid){
      if (this.new && this.new.id){
        const newItem: New = {
          title: this.form.value.title!,
          body: this.form.value.description!,
          museum_id: this.form.value.museum ? this.form.value.museum : undefined,
          start_date: new Date(this.form.value.from!),
          end_date: this.form.value.to ? new Date(this.form.value.to) : undefined
        };

        this.newService.updateNew(this.new.id,newItem).subscribe({
          next: () =>{
            this.exit()
          },
          error: err => console.log(err)
        })
      }else{
        this.createNews()
      }
    }else{
      alert("Uncompleted fields");
    }

  }

  private createNews() {
    const newItem: New = {
      title: this.form.value.title!,
      body: this.form.value.description!,
      museum_id: this.form.value.museum!,
      start_date: new Date(this.form.value.from!),
      end_date: this.form.value.to ? new Date(this.form.value.to) : undefined
    };
    this.new = newItem
    this.newService.addNew(this.new).subscribe({
      next: () => {
        this.exit()
      },
      error: err => console.log(err)
    })
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  deleteNew() {
    if (this.new && this.new.id){
      if (confirm('Are you sure you want to delete this news?')) {
        this.newService.deleteNew(this.new.id).subscribe(() => {
          this.exit()
        })
      }
    }else{
      alert("It is not possible to perform this action")
    }
  }
}
