import { Component } from '@angular/core';
import { CabinService } from '../services/cabin/Cabin.service';
import { Cabin } from '../models/Cabin';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReservationsForCabinComponent } from "../pages/reporting/ReservationsForCabin/ReservationsForCabin.component";
import { StartRatingPromPipe } from '../pipes/start-rating-prom.pipe';


declare const bootstrap: any;
@Component({
  selector: 'app-cabin-list',
  standalone: true,
  imports: [StartRatingPromPipe,CurrencyPipe, CommonModule, RouterLink, TruncatePipe, NgbPaginationModule, ReservationsForCabinComponent],
  templateUrl: './cabin-list.component.html',
  styleUrl: './cabin-list.component.css',
})
export class CabinListComponent {
  cabins: Cabin[] = [];
  baseUrl: string = environment.urlApi;
  initialized: boolean = false;
  displayedCabins = [];
  currentPage = 1;
  itemsPerPage = 5;
  
 
    updateDisplayedCabins(): void {
      // Ordenar las cabañas por la propiedad 'rating' en orden descendente
      const sortedCabins = [...this.cabins].sort((a, b) => b.rating - a.rating);
    
      // Calcular el índice de inicio para la página actual y tomar los elementos de la página
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.displayedCabins = sortedCabins.slice(startIndex, startIndex + this.itemsPerPage);
    }
    
  

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateDisplayedCabins();
  }
  ngOnInit(): void {
     // Suscribirse a los cambios en la lista de cabañas
     this.cabinService.getCabins().subscribe((data: Cabin[]) => {
      this.cabins = data;
      this.updateDisplayedCabins();
    });
    this.cabinService.searchCabins().subscribe();
    this.updateDisplayedCabins();
  }
  constructor(private cabinService: CabinService) {}

  initTooltips() {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
  }
  
  ngAfterViewChecked() {
    if (!this.initialized) {
      setTimeout(() => {
        this.initTooltips();
        this.initialized = true;
      }, 1000);
    }
  }
}
