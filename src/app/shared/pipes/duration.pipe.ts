import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {

  private static toHoursAndMinutes(mins: number): number[] {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return [ hours, minutes ];
  }

  transform(mins: number): string {
    const [ hours, minutes ] = DurationPipe.toHoursAndMinutes(mins);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  }

}
