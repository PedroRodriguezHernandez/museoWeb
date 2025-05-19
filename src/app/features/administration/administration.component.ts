import {Component, Inject, OnInit} from '@angular/core';
import {HeaderComponent} from '../../share/components/header/header.component';
import {BaseChartDirective} from 'ng2-charts';
import {GraphicComponent} from '../../share/components/graphic/graphic.component';
import {Exposition, ExpositionInterface} from '../../core/intefaces/exposition-interface';
import {ExpositionService} from '../../core/services/exhibicion-supabase.service';

@Component({
  selector: 'app-administration',
  imports: [
    HeaderComponent,
    BaseChartDirective,
    GraphicComponent,
  ],
  templateUrl: './administration.component.html',
  standalone: true,
  styleUrl: './administration.component.scss'
})

export class AdministrationComponent implements OnInit{

  data: {title:string, data:number}[]= [
    {title:"LoremIpsum", data:8},
    {title:"LoremIpsum", data:9},
    {title:"LoremIpsum", data:10}
  ]

  private exhibitions!: Exposition[];
  constructor(
    @Inject(ExpositionService) protected expositionInterface: ExpositionInterface
  ) {
  }

   ngOnInit(): void {
    this.expositionInterface.getExpositions().subscribe(
      {
        next: value => {
          this.exhibitions = value;
          this.cleanData()
        }
      }
    )
  }


  private cleanData() {
    this.data = this.exhibitions.map(dt => ({
      title: dt.title!,
      data: dt.views!
    }));

    console.log(this.data)
  }
}
