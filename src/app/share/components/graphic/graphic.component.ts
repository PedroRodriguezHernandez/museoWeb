import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {ChartDataNormalized, ChartDataNormalizedMulti} from '../../../core/utils/graphic-normalizer';

Chart.register(...registerables);

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
  standalone: true
})
export class GraphicComponent implements OnChanges, AfterViewInit {
  @Input() chartData!: ChartDataNormalized | ChartDataNormalizedMulti;
  @Input() type: 'bar' | 'line' = 'bar';


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
    const canvas = document.getElementById('Chart') as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const labels = this.chartData.labels;

    const datasets = 'datasets' in this.chartData
      ? this.chartData.datasets // multi-line
      : [{
        data: this.chartData.values,
        label: 'Data',
        backgroundColor: '#3C6373'
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
        }
      }
    });
  }

}
