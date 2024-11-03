import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startRatingProm',
  standalone: true
})
export class StartRatingPromPipe implements PipeTransform {

 
  transform(rating: number): string {
    const fullStars = Math.floor(rating); // Número de estrellas completas
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Media estrella si el decimal es 0.5 o más
    const emptyStars = 5 - fullStars - halfStar; // Estrellas vacías


    const fullStarIcon = '<i class="bi bi-star-fill yellow-star"></i>';
    const halfStarIcon = '<i class="bi bi-star-half yellow-star"></i>';
    const emptyStarIcon = '<i class="bi bi-star yellow-star"></i>';

    return fullStarIcon.repeat(fullStars) +
           halfStarIcon.repeat(halfStar) +
           emptyStarIcon.repeat(emptyStars) + 
           ' ' + rating.toFixed(1);
  }
}
