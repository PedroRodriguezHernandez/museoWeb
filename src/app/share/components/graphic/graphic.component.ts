import {Component, Input, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic',
  standalone: true,
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.scss',
  imports: [],
})
export class GraphicComponent implements OnChanges, AfterViewInit {
  @Input() data: { title: string, data: number }[] = [];

  public chart: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    }
  }

  createChart() {
    const labels = this.data.map(dt => dt.title);
    const values = this.data.map(dt => dt.data);

    const canvas = document.getElementById('Chart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: '#3C6373',
            label: 'Interactions'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2.5,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
