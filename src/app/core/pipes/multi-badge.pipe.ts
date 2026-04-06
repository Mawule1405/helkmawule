import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: "multiBadgePipe",
  standalone: true
})
export class MultiBadgePipe implements PipeTransform {
  transform(value: string | null | undefined): string[] {
    if (!value) return [];

    // On split par '&', puis on utilise trim() pour enlever les espaces inutiles
    // et filter pour ignorer les entrées vides (ex: "Mot1 && Mot2")
    return value.split('&')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
}
