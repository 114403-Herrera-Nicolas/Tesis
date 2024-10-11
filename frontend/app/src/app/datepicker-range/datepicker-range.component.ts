import { CommonModule, JsonPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-range',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule, FormsModule, JsonPipe],
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css']
})
export class DatepickerRangeComponent {
  calendar = inject(NgbCalendar);

  hoveredDate: NgbDateStruct | null = null;
  fromDate: NgbDateStruct = null;
  toDate: NgbDateStruct | null = null; // Cambiar el tipo a nullable
  
  @Output() fromDateChange = new EventEmitter<NgbDateStruct>();
  @Output() toDateChange = new EventEmitter<NgbDateStruct>();
  @Output() daysSelected = new EventEmitter<number>(); // Output para emitir la cantidad de días seleccionados

  @Input() disabledDays: { year: number, month: number, day: number }[] = [];
  @Input() disabledDatePicker: boolean;
  @Input() displayMonths: number;

  today = new Date();
  currentDate: NgbDate = new NgbDate(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());

  isDisabled = (date: NgbDateStruct): boolean => {
    const ngbDate = new NgbDate(date.year, date.month, date.day);

    if (ngbDate.before(this.currentDate)) {
      return true;
    }

    return this.disabledDays.some(d => d.year === date.year && d.month === date.month && d.day === date.day);
  };

  hasDisabledDatesInRange(fromDate: NgbDateStruct, toDate: NgbDateStruct): boolean {
    let from = new NgbDate(fromDate.year, fromDate.month, fromDate.day);
    let to = new NgbDate(toDate.year, toDate.month, toDate.day);

    while (from.before(to) || from.equals(to)) {
      const dateStruct = {
        year: from.year,
        month: from.month,
        day: from.day
      };

      if (this.isDisabled(dateStruct)) {
        return true;
      }

      from = new NgbDate(from.year, from.month, from.day + 1);
    }

    return false;
  }

  onDateSelection(date: NgbDateStruct) {
    if (this.disabledDatePicker) {
      return;
    }
    const ngbDate = new NgbDate(date.year, date.month, date.day);

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
	  this.calculateDays();
    } else if (this.fromDate && !this.toDate && ngbDate.after(new NgbDate(this.fromDate.year, this.fromDate.month, this.fromDate.day))) {
      if (!this.hasDisabledDatesInRange(this.fromDate, date)) {
        this.toDate = date;
        this.calculateDays(); // Calcular días cuando se seleccionan ambas fechas
      } else {
        alert('No puedes seleccionar un rango que incluya fechas deshabilitadas.');
        this.fromDate = null;
        this.toDate = null;
		this.calculateDays();
      }
    } else {
      this.toDate = null;
      this.fromDate = date; // Reiniciar selección si se vuelve a seleccionar
	  this.calculateDays();
    }

    this.fromDateChange.emit(this.fromDate);
    this.toDateChange.emit(this.toDate);
  }

  // Calcular el número de días entre fromDate y toDate
  calculateDays() {
    let diffDays = 0; // Inicializar a 0

    if (this.fromDate) {
      // Si toDate es null, significa que solo se ha seleccionado una noche
      if (!this.toDate) {
        diffDays = 1; // Solo una noche
      } else {
        const fromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
        const toDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);

        const diffTime = toDate.getTime() - fromDate.getTime();
        diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Incluir la fecha de inicio
      }

      this.daysSelected.emit(diffDays); // Emitir la cantidad de días seleccionados
    }else{
		this.daysSelected.emit(diffDays);
	}
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
