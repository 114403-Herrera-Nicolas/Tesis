import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CabinService } from '../../../services/cabin/Cabin.service';
import { YearReservationSummaryDTO } from '../../../models/YearReservationSummaryDTO';
import { BarController, CategoryScale, Chart, LinearScale, registerables } from 'chart.js';
Chart.register(...registerables); // Registro de todos los elementos
Chart.register(BarController, CategoryScale, LinearScale); // Registro específico del controlador de barras


@Component({
  selector: 'app-report-by-year',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './report-by-year.component.html',
  styleUrl: './report-by-year.component.css'
})
export class ReportByYearComponent {
  data:YearReservationSummaryDTO[]=[];
  year:number=2024;
  public barChart: any;
  public billedChart: any;
  constructor(private cabinService:CabinService){

  }
  ngOnInit(){
    this.UpdateInfo();
  }
  UpdateInfo() {
    this.cabinService.getCabinsReportsByYear(this.year).subscribe(data=>{
      this.data = data;
      
      this.createChart();
      this.createBilledChart();
    })
  }
  

  
// Función para generar colores aleatorios
private getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

private createChart() {
  if (this.barChart) {
    this.barChart.destroy();
  }

  // Agrupar los datos por mes
  const groupedData = this.data.reduce((acc, item) => {
      const monthKey = `${item.month}-${item.year}`;
      if (!acc[monthKey]) {
          acc[monthKey] = {};
      }
      if (!acc[monthKey][item.cabinName]) {
          acc[monthKey][item.cabinName] = {
              reservationCount: 0,
              totalBilled: 0,
          };
      }
      acc[monthKey][item.cabinName].reservationCount += item.reservationCount;
      acc[monthKey][item.cabinName].totalBilled += item.totalBilled;
      return acc;
  }, {});

  // Obtener los meses y cabañas
  const months = Object.keys(groupedData);
  const cabinNames = [...new Set(this.data.map(item => item.cabinName))];

  // Preparar los datos para el gráfico
  const reservationCounts = cabinNames.map(cabinName => 
      months.map(month => groupedData[month][cabinName]?.reservationCount || 0)
  );

  const totalBilleds = cabinNames.map(cabinName => 
      months.map(month => groupedData[month][cabinName]?.totalBilled || 0)
  );

  // Crear el gráfico
  this.barChart = new Chart('reservationChart', {
      type: 'bar',
      data: {
          labels: months,
          datasets: [
              ...cabinNames.map((cabinName, index) => ({
                  label: cabinName,
                  data: reservationCounts[index],
                  backgroundColor: `rgba(${index * 50 % 255}, 192, 192, 0.2)`,
                  borderColor: `rgba(${index * 50 % 255}, 192, 192, 1)`,
                  borderWidth: 1,
              }))
          ],
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1,
                  },
              },
          },
      },
  });
}

private createBilledChart() {
  if (this.billedChart) {
    this.billedChart.destroy();
  }

  // Agrupar los datos por mes
  const groupedData = this.data.reduce((acc, item) => {
      const monthKey = `${item.month}-${item.year}`;
      if (!acc[monthKey]) {
          acc[monthKey] = {};
      }
      if (!acc[monthKey][item.cabinName]) {
          acc[monthKey][item.cabinName] = {
              reservationCount: 0,
              totalBilled: 0,
          };
      }
      acc[monthKey][item.cabinName].reservationCount += item.reservationCount;
      acc[monthKey][item.cabinName].totalBilled += item.totalBilled;
      return acc;
  }, {});

  // Obtener los meses y cabañas
  const months = Object.keys(groupedData);
  const cabinNames = [...new Set(this.data.map(item => item.cabinName))];

  // Preparar los datos para el gráfico
  const reservationCounts = cabinNames.map(cabinName => 
      months.map(month => groupedData[month][cabinName]?.reservationCount || 0)
  );

  const totalBilleds = cabinNames.map(cabinName => 
      months.map(month => groupedData[month][cabinName]?.totalBilled || 0)
  );

  // Crear el gráfico
  this.billedChart = new Chart('billedChart', {
      type: 'bar',
      data: {
          labels: months,
          datasets: [
              ...cabinNames.map((cabinName, index) => ({
                  label: cabinName,
                  data: totalBilleds[index],
                  backgroundColor: `rgba(${index * 50 % 255}, 192, 192, 0.2)`,
                  borderColor: `rgba(${index * 50 % 255}, 192, 192, 1)`,
                  borderWidth: 1,
              }))
          ],
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1,
                  },
              },
          },
      },
  });
}


  ngOnDestroy(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
    if (this.billedChart) {
      this.billedChart.destroy();
    }
  }
}
