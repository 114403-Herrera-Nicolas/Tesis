import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservationState',
  standalone: true
})
export class ReservationStatePipe implements PipeTransform {

    transform(value: string): any {
    let statusText = '';
    let pillClass = '';

    switch (value) {
      case 'PENDING':
        statusText = 'Pendiente';
        pillClass = 'badge-warning';  // Amarillo
        break;
      case 'CANCELLED':
        statusText = 'Cancelado';
        pillClass = 'badge-danger';   // Rojo
        break;
      case 'COMPLETED':
        statusText = 'Completado';
        pillClass = 'badge-success';  // Verde
        break;
      case 'REFUNDED':
        statusText = 'Reembolsado';
        pillClass = 'badge-info';     // Azul
        break;
      default:
        statusText = value;
        pillClass = 'badge-secondary'; // Gris por defecto
    }

    return `${statusText}`;
  }

}
