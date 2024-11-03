import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {

  transform(date: Date | string): string {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMs = now.getTime() - commentDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 1) return 'hace unos momentos';
    if (diffInMinutes < 60) return `hace ${diffInMinutes} minuto${diffInMinutes === 1 ? '' : 's'}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `hace ${diffInHours} hora${diffInHours === 1 ? '' : 's'}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `hace ${diffInDays} día${diffInDays === 1 ? '' : 's'}`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `hace ${diffInMonths} mes${diffInMonths === 1 ? '' : 'es'}`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `hace ${diffInYears} año${diffInYears === 1 ? '' : 's'}`;
  }

}
