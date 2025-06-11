import {AfterViewInit, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic-simple',
  imports: [],
  templateUrl: './graphic-simple.component.html',
  standalone: true,
  styleUrl: './graphic-simple.component.scss'
})
export class GraphicSimpleComponent implements OnChanges, AfterViewInit {

@Input() chartData!: { label: string; data: number; }[];
@Input() type: 'bar' | 'line' = 'line';

public chart:any
  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['chartData'] || changes['type']) && !changes['chartData']?.firstChange) {
    if (this.chart) {
      this.chart.destroy();
    }
    this.createChart();
  }
}

private createChart() {
    const canvas = document.getElementById('Chart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !this.chartData) return;

    const sortedData = [...this.chartData].sort((a, b) =>
      new Date(a.label).getTime() - new Date(b.label).getTime()
    );

    const labels = sortedData.map(item => item.label);
    const values = sortedData.map(item => item.data);

    const datasets = [{
      data: values,
      label: 'Visits',
      backgroundColor: this.type === 'bar' ? '#3C6373' : 'transparent',
      borderColor: this.type === 'line' ? '#3C6373' : 'transparent',
      borderWidth: 2,
      fill: false,
      tension: 0.3
    }];

    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Visits'
            }
          }
        }
      }
    });
  }
}
