import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CabinService } from '../services/cabin/Cabin.service';



@Component({
  selector: 'app-cabin-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cabin-search.component.html',
  styleUrl: './cabin-search.component.css'
})
export class CabinSearchComponent {
  constructor(private cabinService: CabinService) { }
  isScreenLarge: boolean = true;

  

 
onSubmit(form: NgForm) {
 
    this.cabinService.setLocation(form.value.destination);
  this.cabinService.setCapacity(form.value.capacity);
  this.cabinService.setName(form.value.name);
  this.cabinService.setPriceRange(0, form.value.maxPrice);
  console.log(form.value.maxPrice);
  this.cabinService.searchCabins().subscribe(c=>console.log(c));
}

ngOnInit(): void {
  // Verificar el tamaño de la pantalla al cargar la página
  this.checkScreenSize();
}

@HostListener('window:resize', ['$event'])
onResize(event: Event): void {
  this.checkScreenSize();  // Detecta los cambios de tamaño en la pantalla
}

checkScreenSize(): void {
  const mediaQuery = window.matchMedia('(min-width: 768px)');
  this.isScreenLarge = mediaQuery.matches;
}

}
