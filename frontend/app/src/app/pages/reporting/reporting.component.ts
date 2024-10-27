import { Component } from '@angular/core';
import { ReservationsForCabinComponent } from "./ReservationsForCabin/ReservationsForCabin.component";
import { TotalBilledForCabinComponent } from "./total-billed-for-cabin/total-billed-for-cabin.component";
import html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [ReservationsForCabinComponent, TotalBilledForCabinComponent],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {

  public downloadPDF(): void {
    const element = document.getElementById('reportContent');
    const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
    const options = {
      margin: 1,
      filename: `reporte-de-cabañas-${formattedDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(options).save();
  }
}
