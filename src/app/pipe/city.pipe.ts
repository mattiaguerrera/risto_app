import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getCity'})
export class CityPipe implements PipeTransform {
  transform(value: string): string {
    var val = value.split(',').pop()?.replace('Italy', '');
    return val!; 
  }
}