import { Pipe, PipeTransform } from '@angular/core';
import { ARRAY_VALUE_MIN, ARRAY_VALUE_MAX } from '../constants';

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {
  transform(value: number): string {
    const MAX_HSL_VALUE = 360;
    
    const scaledValue = this.scale(value, ARRAY_VALUE_MIN, ARRAY_VALUE_MAX, 0, MAX_HSL_VALUE);
    const hslString = `hsl(${scaledValue}, 80%, 50%)`;
    return hslString;
    // return `hsl(240, 100%, ${value}%)`;
  }

  // Scale number from range A to range B
  scale(value: number, A1: number, A2: number, B1: number, B2: number): number {
    return (value - A1) * (B2 - B1) / (A2 - A1) + A1;
  }
}