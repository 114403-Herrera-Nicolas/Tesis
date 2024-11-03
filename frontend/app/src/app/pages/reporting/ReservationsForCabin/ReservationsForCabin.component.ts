import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables, BarController, CategoryScale, LinearScale } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CabinService } from '../../../services/cabin/Cabin.service';
import { CabinReport } from '../../../models/CabinReport';
import { TotalBilledForCabinComponent } from "../total-billed-for-cabin/total-billed-for-cabin.component";
import { FormsModule } from '@angular/forms';

Chart.register(...registerables); // Registro de todos los elementos
Chart.register(BarController, CategoryScale, LinearScale); // Registro específico del controlador de barras

@Component({
  selector: 'app-ReservationsForCabin',
  standalone: true,
  imports: [TotalBilledForCabinComponent,FormsModule],
  templateUrl: './ReservationsForCabin.component.html',
  styleUrls: ['./ReservationsForCabin.component.css']
})
export class ReservationsForCabinComponent implements OnInit, OnDestroy {

 startDate?: string= null;
 endDate?: string= null;
  
  public data:CabinReport[] = [];

  public barChart: any;
  constructor(private cabinService:CabinService) { }
  updateInfo() {
    if (this.barChart) {
      this.barChart.destroy();
    }
    this.cabinService.getCabinsReports(this.startDate,this.endDate).subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.createChart();
    })
    
  }
  ngOnInit(): void {
    this.cabinService.getCabinsReports().subscribe(data => {
      this.data = data;
      console.log(this.data);
      this.createChart();
    })
    
  }

  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
  }

  private createChart() {
    const cabinNames = this.data.map(item => item.cabinName);
    const totalReservations = this.data.map(item => item.totalReservations);
    const total = this.data.map(item => item.totalBilled);

    this.barChart = new Chart('reservationChart', {
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
}
