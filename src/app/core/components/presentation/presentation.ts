import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {PRESENTATION_DATA} from './presentation.data';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/languague.service';

@Component({
  selector: 'app-presentation',
  imports: [
    TranslatePipe
  ],
  templateUrl: './presentation.html',
  styleUrl: './presentation.css'
})
export class Presentation implements OnInit , OnDestroy {

  private languageService = inject(LanguageService);
  private translate = inject(TranslateService);

  data = PRESENTATION_DATA;

  animatedName = '';
  animatedDescription = '';
  private nameAnimationInterval: any;
  private descAnimationInterval: any;

  // Texte complet à animer
  fullName = '';
  fullDescription = '';



  ngOnInit() {
    this.startAnimations();
  }

  ngOnDestroy() {
    this.stopAnimations();
  }

  private startAnimations() {
    // Obtenir les textes traduits
    this.getTranslatedTexts().then(() => {
      // Démarrer l'animation du nom après un court délai
      setTimeout(() => {
        this.animateName();
      }, 1000);

      // Démarrer l'animation de la description après l'animation du nom
      setTimeout(() => {
        this.animateDescription();
      }, 3000);
    });
  }

  private async getTranslatedTexts() {
    // Obtenir les textes traduits de manière synchrone
    this.fullName = await this.translate.get(this.data.NAME).toPromise();
    this.fullDescription = await this.translate.get(this.data.DESCRIPTION).toPromise();
  }

  private animateName() {
    let currentIndex = 0;

    this.stopNameAnimation(); // Arrêter toute animation précédente

    this.nameAnimationInterval = setInterval(() => {
      if (currentIndex <= this.fullName.length) {
        this.animatedName = this.fullName.substring(0, currentIndex);
        currentIndex++;
      } else {
        this.stopNameAnimation();
        // Redémarrer l'animation après une pause
        setTimeout(() => {
          this.animateName();
        }, 20000);
      }
    }, 100); // Vitesse de frappe (100ms par caractère)
  }

  private animateDescription() {
    let currentIndex = 0;

    this.stopDescAnimation(); // Arrêter toute animation précédente

    this.descAnimationInterval = setInterval(() => {
      if (currentIndex <= this.fullDescription.length) {
        this.animatedDescription = this.fullDescription.substring(0, currentIndex);
        currentIndex++;
      } else {
        this.stopDescAnimation();
        // Redémarrer l'animation après une pause plus longue
        setTimeout(() => {
          this.animateDescription();
        }, 8000);
      }
    }, 30); // Vitesse plus rapide pour la description (30ms par caractère)
  }

  private stopNameAnimation() {
    if (this.nameAnimationInterval) {
      clearInterval(this.nameAnimationInterval);
      this.nameAnimationInterval = null;
    }
  }

  private stopDescAnimation() {
    if (this.descAnimationInterval) {
      clearInterval(this.descAnimationInterval);
      this.descAnimationInterval = null;
    }
  }

  private stopAnimations() {
    this.stopNameAnimation();
    this.stopDescAnimation();
  }

  // Pour éviter le comportement par défaut si besoin
  onNavigate(section: string): void {
    // Optionnel : logique pour tracking ou smooth scroll
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
