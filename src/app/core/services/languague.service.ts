import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  // Utilisation de inject() pour l'approche Standalone
  private translate = inject(TranslateService);

  private currentLanguageSubject: BehaviorSubject<string>;
  public currentLanguage$: Observable<string>;

  private availableLanguages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  constructor() {
    // Initialisation de la langue
    const savedLanguage = this.getSavedLanguage();
    this.currentLanguageSubject = new BehaviorSubject<string>(savedLanguage);
    this.currentLanguage$ = this.currentLanguageSubject.asObservable();

    this.initializeLanguage();
  }

  // --- Initialisation et Langue par Défaut / de Repli ---

  private initializeLanguage(): void {
    const initialLang = this.currentLanguageSubject.value;

    // 1. addLangs est correct pour ajouter les langues supportées.
    this.translate.addLangs(this.availableLanguages.map(lang => lang.code));

    // 2. CORRECTION: Remplacer setDefaultLang() par setFallbackLang() (dépréciation)
    this.translate.setFallbackLang('fr').subscribe();

    // 3. Définir la langue initiale (qui est 'fr' si aucune n'est trouvée/sauvée)
    this.translate.use(initialLang);
  }

  private getSavedLanguage(): string {
    const saved = localStorage.getItem('userLanguage');

    // CORRECTION: getBrowserLang() est maintenant la méthode préférée
    const browserLang = this.translate.getBrowserLang();

    const supportedCodes = this.availableLanguages.map(lang => lang.code);

    if (saved && supportedCodes.includes(saved)) {
      return saved;
    }

    if (browserLang && supportedCodes.includes(browserLang)) {
      return browserLang;
    }

    return 'fr'; // Langue de repli par défaut si rien n'est trouvé
  }

  // --- Méthodes Publiques pour la Gestion de la Langue ---

  setLanguage(langCode: string): void {
    const supportedCodes = this.availableLanguages.map(lang => lang.code);

    if (supportedCodes.includes(langCode)) {
      // .use() charge la nouvelle langue
      this.translate.use(langCode);

      localStorage.setItem('userLanguage', langCode);
      this.currentLanguageSubject.next(langCode);

      console.log(`Langue changée: ${langCode}`);
    } else {
      console.warn(`Langue non supportée: ${langCode}`);
    }
  }

  getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
    // Alternativement, on pourrait utiliser: return this.translate.getCurrentLang();
  }

  getAvailableLanguages(): any[] {
    return this.availableLanguages;
  }

  // --- Méthodes d'Accès à la Traduction ---

  // Méthode pour obtenir la traduction instantanément (synchrone)
  instant(key: string | string[], params?: any): string | any {
    // Le type de retour peut être une chaîne ou un objet de chaînes si on passe un tableau de clés
    return this.translate.instant(key, params);
  }

  // Méthode pour obtenir la traduction de manière asynchrone (Observable qui émet une fois)
  get(key: string | string[], params?: any): Observable<string | any> {
    return this.translate.get(key, params);
  }
}
