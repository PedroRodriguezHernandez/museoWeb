import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface RawData {
  date: string;
  [category: string]: number | string;
}

@Component({
  selector: 'app-graphic-multi-category',
  imports: [],
  templateUrl: './graphic-multi-category.component.html',
  standalone: true,
  styleUrl: './graphic-multi-category.component.scss'
})
export class GraphicMultiCategoryComponent implements OnChanges, AfterViewInit {
  @Input() data!: { labels: string[]; categories: Record<string, number[]> };
  @Input() type: 'bar' | 'line' = 'line';
  @Input() idCanva :string = "MultiCanvas"
  @Input() label: string = "";

  private chart?: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes['data'] || changes['type']) && !changes['data']?.firstChange) {
      if (this.chart) {
        this.chart.destroy();
      }
      this.createChart();
    }
  }

  private createChart() {
    this.destroyChart();

    const canvas = document.getElementById(this.idCanva) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !this.data) return;


    const labels = this.data.labels;
    const categories = Object.keys(this.data.categories)

    const datasets = categories.map((category, i) => {
      const dataPoints = this.data.categories[category];
      const color = this.generateRandomColor();
      return {
        label: category,
        data: dataPoints,
        backgroundColor: this.type === 'bar' ? color : 'transparent',
        borderColor: this.type === 'line' ? color : color,
        borderWidth: 2,
        fill: false,
        tension: 0.3,
      };
    });

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
          legend: { display: true }
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
              text: this.label
            }
          }
        }
      }
    });
  }

  private generateRandomColor(): string {
    const r = Math.floor(Math.random() * 200);
    const g = Math.floor(Math.random() * 200);
    const b = Math.floor(Math.random() * 200);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  destroyChart() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
