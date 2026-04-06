import {
  Pipe,
  PipeTransform
} from '@angular/core';

// ----------------------------------------------------------------------
// 1. DÉFINITION DU PIPE DE TRONCATURE
// Ce pipe limite le texte d'entrée à une longueur spécifiée.
// ----------------------------------------------------------------------
@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  /**
   * Tronque le texte si sa longueur dépasse la limite spécifiée.
   * @param value Le texte à tronquer.
   * @param limit La longueur maximale du texte avant troncature (par défaut: 150).
   * @returns Le texte tronqué suivi de '...' ou le texte original.
   */
  transform(value: string, limit: number = 150): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
