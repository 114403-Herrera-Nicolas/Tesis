import { Component } from '@angular/core';
import { CabinService } from '../services/cabin/Cabin.service';
import { Cabin } from '../models/Cabin';
import { environment } from '../../environments/environment';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TruncatePipe } from '../truncate.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


declare const bootstrap: any;
@Component({
  selector: 'app-cabin-list',
  standalone: true,
  imports: [CurrencyPipe, CommonModule,RouterLink,TruncatePipe,NgbPaginationModule],
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
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedCabins = this.cabins.slice(startIndex, startIndex + this.itemsPerPage);
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
