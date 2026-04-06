import { AfterViewInit, Component, computed, ElementRef, signal, ViewChild, OnDestroy, inject } from '@angular/core';
import { FLIP_ACTION, FLIP_DATA, FLIP_SUBTITLE, FLIP_TITLE, FlipItem } from './home-about-data';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PROJECT_SUBTITLE, PROJECT_TITLE } from '../home-projects/home-projects-data';

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.html',
  styleUrl: './home-about.css',
  imports: [
    TranslatePipe
  ],
  standalone: true
})
export class HomeAbout implements AfterViewInit, OnDestroy {
  // Référence à l'élément de défilement du DOM
  @ViewChild('scrollContainer') scrollContainerRef!: ElementRef<HTMLElement>;

  flipItems: FlipItem[] = FLIP_DATA;

  // Signaux pour suivre l'état de défilement
  private currentScrollLeft = signal(0);
  private scrollWidth = signal(0);
  private clientWidth = signal(0);
  private currentIndex = signal(0);
  private autoScrollInterval: any = null;
  private isAutoScrolling = signal(true);

  // Injection du service de traduction
  private translate = inject(TranslateService);

  // Valeur calculée pour désactiver le bouton "Précédent"
  canScrollLeft = computed(() => this.currentScrollLeft() > 10);

  // Valeur calculée pour désactiver le bouton "Suivant"
  canScrollRight = computed(() => {
    return this.currentScrollLeft() + this.clientWidth() < this.scrollWidth() - 10;
  });

  // Taille de défilement (largeur d'une carte + le gap de 30px)
  private SCROLL_AMOUNT = 300;
  private AUTO_SCROLL_DELAY = 20000; // 4 secondes

  ngAfterViewInit() {
    this.updateDimensions();
    this.startAutoScroll();
    this.updateScrollIndicator();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
  }

  // Écoute l'événement 'scroll' du wrapper
  onScroll() {
    this.currentScrollLeft.set(this.scrollContainerRef.nativeElement.scrollLeft);
    this.updateDimensions();
    this.updateCurrentIndex();
    this.updateScrollIndicator();
  }

  // Met à jour la largeur totale et la largeur visible
  private updateDimensions() {
    const container = this.scrollContainerRef.nativeElement;
    this.scrollWidth.set(container.scrollWidth);
    this.clientWidth.set(container.clientWidth);
  }

  // Met à jour l'index courant basé sur la position de défilement
  private updateCurrentIndex() {
    const scrollLeft = this.currentScrollLeft();
    const cardWidth = this.SCROLL_AMOUNT;
    const newIndex = Math.round(scrollLeft / cardWidth);
    this.currentIndex.set(Math.max(0, Math.min(newIndex, this.flipItems.length - 1)));
  }

  // Met à jour l'indicateur de défilement
  private updateScrollIndicator() {
    const container = this.scrollContainerRef.nativeElement;
    const canScroll = container.scrollWidth > container.clientWidth;
    container.classList.toggle('scrollable', canScroll);
  }

  // Défilement vers la droite
  scrollRight() {
    this.stopAutoScroll();
    const container = this.scrollContainerRef.nativeElement;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScrollLeft = Math.min(this.currentScrollLeft() + this.SCROLL_AMOUNT, maxScroll);

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(() => this.startAutoScroll(), 5000);
  }

  // Défilement vers la gauche
  scrollLeft() {
    this.stopAutoScroll();
    const container = this.scrollContainerRef.nativeElement;
    const newScrollLeft = Math.max(this.currentScrollLeft() - this.SCROLL_AMOUNT, 0);

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    setTimeout(() => this.startAutoScroll(), 5000);
  }

  // Défilement vers un index spécifique
  scrollToIndex(index: number) {
    this.stopAutoScroll();
    const container = this.scrollContainerRef.nativeElement;
    const scrollLeft = index * this.SCROLL_AMOUNT;

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });

    this.currentIndex.set(index);
    setTimeout(() => this.startAutoScroll(), 5000);
  }

  // Défilement automatique
  private startAutoScroll() {
    if (this.autoScrollInterval) {
      this.stopAutoScroll();
    }

    this.autoScrollInterval = setInterval(() => {
      if (this.isAutoScrolling() && this.canScrollRight()) {
        this.scrollRight();
      } else if (this.isAutoScrolling() && !this.canScrollRight()) {
        // Retour au début si on est à la fin
        this.scrollToIndex(0);
      }
    }, this.AUTO_SCROLL_DELAY);
  }

  private stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  // Basculer le défilement automatique
  toggleAutoScroll() {
    this.isAutoScrolling.set(!this.isAutoScrolling());
    if (this.isAutoScrolling()) {
      this.startAutoScroll();
    } else {
      this.stopAutoScroll();
    }
  }

  toggleFlip(index: number) {
    this.flipItems[index].flipped = !this.flipItems[index].flipped;
  }

  // Méthode de navigation originale
  onNavigate(event: Event) {
    // Optionnel : logique de tracking
  }

  protected readonly FLIP_TITLE = FLIP_TITLE;
  protected readonly FLIP_SUBTITLE = FLIP_SUBTITLE;
  protected readonly FLIP_ACTION = FLIP_ACTION;

  // Exposer les signaux pour le template
  getCurrentIndex = this.currentIndex;
  getIsAutoScrolling = this.isAutoScrolling;
}
