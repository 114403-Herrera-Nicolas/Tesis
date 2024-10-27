import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables, BarController, CategoryScale, LinearScale, PieController, ArcElement } from 'chart.js';
import { CabinReport } from '../../../models/CabinReport';
import { CabinService } from '../../../services/cabin/Cabin.service';

Chart.register(...registerables); // Registro de todos los elementos
Chart.register(BarController, CategoryScale, LinearScale, PieController, ArcElement); // Registro de controladores específicos

@Component({
  selector: 'app-total-billed-for-cabin',
  standalone: true,
  imports: [],
  templateUrl: './total-billed-for-cabin.component.html',
  styleUrls: ['./total-billed-for-cabin.component.css']
})
export class TotalBilledForCabinComponent implements OnInit, OnDestroy {
  public data: CabinReport[] = [];
  public barChart: any;
  public pieChart: any;

  constructor(private cabinService: CabinService) {}

  ngOnInit(): void {
    this.cabinService.getCabinsReports().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.createCharts();
    });
  }

  ngOnDestroy(): void {
    if (this.barChart) this.barChart.destroy();
    if (this.pieChart) this.pieChart.destroy();
  }

  private createCharts() {
    const cabinNames = this.data.map(item => item.cabinName);
    const totalBilled = this.data.map(item => item.totalBilled);

    // Gráfico de Barras
    this.barChart = new Chart('billedBarChart', {
      type: 'bar',
      data: {
        labels: cabinNames,
        datasets: [
          {
            label: 'Total Facturado',
            data: totalBilled,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    });

    // Gráfico de Pie
    this.pieChart = new Chart('billedPieChart', {
      type: 'pie',
      data: {
        labels: cabinNames,
        datasets: [
          {
            label: 'Total Facturado',
            data: totalBilled,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
