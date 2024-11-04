import { Component } from '@angular/core';
import { ReservationsForCabinComponent } from "./ReservationsForCabin/ReservationsForCabin.component";
import { TotalBilledForCabinComponent } from "./total-billed-for-cabin/total-billed-for-cabin.component";
import html2pdf from 'html2pdf.js';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reporting',
  standalone: true,
  imports: [ReservationsForCabinComponent, TotalBilledForCabinComponent,RouterOutlet,RouterLink],
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent {
  currentUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtener la URL completa actual
    this.currentUrl = this.router.url;
    
    
    // También puedes suscribirte a cambios de URL
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
      console.log('URL actualizada:', this.currentUrl);
    });
  }



  public downloadPDF(): void {
    const element = document.getElementById('reportContent');
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    const options = {
      margin: 1,
      filename: `reporte-de-cabañas-${formattedDate}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' },
      pagebreak: { mode: ['css', 'avoid-all'] }
    };
  
    html2pdf().from(element).set(options).save();
  }
  
}
