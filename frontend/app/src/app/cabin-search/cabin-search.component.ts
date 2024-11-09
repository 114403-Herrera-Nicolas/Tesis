import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CabinService } from '../services/cabin/Cabin.service';
import { NgbTypeaheadModule, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, map, Observable } from 'rxjs';



@Component({
  selector: 'app-cabin-search',
  standalone: true,
  imports: [FormsModule,NgbTypeaheadModule],
  templateUrl: './cabin-search.component.html',
  styleUrl: './cabin-search.component.css'
})
export class CabinSearchComponent {
  model: string;
  destinations: string[] = [
    'Sierras de Córdoba','valle de Anisacate','Villa La Bolsa','Carlos paz'
  ];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      map(term => this.destinations.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1))
    );

  formatter = (x: string) => x;


  onSelect(event: NgbTypeaheadSelectItemEvent) {
    console.log('Item seleccionado:', event.item);
  }


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
