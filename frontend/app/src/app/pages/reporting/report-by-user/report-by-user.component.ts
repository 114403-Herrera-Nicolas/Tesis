import { Component } from '@angular/core';
import { CabinService } from '../../../services/cabin/Cabin.service';
import { UserReservationSummaryDTO } from '../../../models/UserReservationSummaryDTO';
import { BarController, CategoryScale, Chart, LinearScale, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables); // Registro de todos los elementos
Chart.register(BarController, CategoryScale, LinearScale); // Registro específico del controlador de barras

@Component({
  selector: 'app-report-by-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-by-user.component.html',
  styleUrl: './report-by-user.component.css'
})
export class ReportByUserComponent {
  data:UserReservationSummaryDTO[]=[]
  public barChart: any;
  public totalChart: any;
  public totalChartPie: any;
  startDate?: string= null;
 endDate?: string= null;

  constructor(private cabinService:CabinService){

  }
  updateInfo() {
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.totalChart) {
      this.totalChart.destroy();
    }
    if (this.totalChartPie) {
      this.totalChartPie.destroy();}

    this.cabinService.getCabinsReportsByUsers(this.startDate,this.endDate).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.createChart();
      this.createTotalChart();
      this.createTotalChartPie();
    })
    
  }

  ngOnInit(){
    this.cabinService.getCabinsReportsByUsers().subscribe(data => {
      this.data=data;
      this.createChart();
      this.createTotalChart();
      this.createTotalChartPie();
    })
  }
  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy(); 
    }
    if (this.totalChart) {
      this.totalChart.destroy();
    }
    if (this.totalChartPie) {
      this.totalChartPie.destroy();
    }
  }

  private createChart() {
    if (this.barChart) {
      this.barChart.destroy(); 
    }
    const cabinNames = this.data.map(item => item.firstName +' '+ item.lastName);
    const totalReservations = this.data.map(item => item.reservationCount);
    

    this.barChart = new Chart('userReservationCount', {
      type: 'bar',
      data: {
        labels: cabinNames,
        datasets: [
          {
            label: 'Total Reservas',
            data: totalReservations,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }
          
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,

            }
          },
        },
      },
    });
  }

  private createTotalChart() {
    if (this.totalChart) {
      this.totalChart.destroy();
    }
    const cabinNames = this.data.map(item => item.firstName +' '+ item.lastName);
    const totalReservations = this.data.map(item => item.totalSpent);
    

    this.totalChart = new Chart('userReservationTotal', {
      type: 'bar',
      data: {
        labels: cabinNames,
        datasets: [
          {
            label: 'Total Gastado',
            data: totalReservations,
            backgroundColor: 'rgba(0, 128, 0, 0.4)',
            borderColor: 'rgba(0, 128, 0, 1)',       
            borderWidth: 1,
          }
          
          
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,

            }
          },
        },
      },
    });
  }
  private createTotalChartPie() {
    const cabinNames = this.data.map(item => item.firstName +' '+ item.lastName);
    const totalReservations = this.data.map(item => item.totalSpent);
    if (this.totalChartPie) {
      this.totalChartPie.destroy();
    }

    this.totalChartPie = new Chart('userReservationTotalPie', {
      type: 'pie',
      data: {
        labels: cabinNames,
        datasets: [
          {
            label: 'Total Gastado',
            data: totalReservations,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: 'rgba(255, 255, 255, 1)',       
            borderWidth: 1,
          }
          
          
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,

            }
          },
        },
      },
    });
  }
}
