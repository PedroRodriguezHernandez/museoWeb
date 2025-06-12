import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
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
  @Input() label:string = 'visits'
  @Input() idCanva :string = "Canvas"

  public chart:any
  private resizeObserver!: ResizeObserver;

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
    this.destroyChart();
    const canvas = document.getElementById(this.idCanva) as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !this.chartData) return;

    const sortedData = [...this.chartData].sort((a, b) =>
      new Date(a.label).getTime() - new Date(b.label).getTime()
    );

    const labels = sortedData.map(item => item.label);
    const values = sortedData.map(item => item.data);

    const datasets = [{
      data: values,
      label: this.label,
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
              text: this.label
            }
          }
        }
      }
    });
    this.resizeObserver = new ResizeObserver(() => {
      this.chart?.resize();
    });
    this.resizeObserver.observe(canvas);

  }
  destroyChart() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
