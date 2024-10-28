import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'starRating',
  standalone: true
})
export class StarRatingPipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {}

  transform(rating: number): SafeHtml {

    const normalizedRating = Math.max(1, Math.min(rating, 5));

    const stars = Array.from({ length: 5 }, (_, i) => 
      `<i class="bi bi-star-fill ${i < normalizedRating ? 'yellow-star' : 'gray-star'}"></i>`
    ).join('');

    const result = `<div class="d-flex flex-row">${stars}</div>`;

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

}
