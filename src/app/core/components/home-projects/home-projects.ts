import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import {TruncateTextPipe} from '../../pipes/troncate.pipe';
import {NgClass} from '@angular/common';
import {PROJECT_DATA, PROJECT_SUBTITLE, PROJECT_TITLE} from './home-projects-data';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {LanguageService} from '../../services/languague.service';
import {MultiBadgePipe} from '../../pipes/multi-badge.pipe';

@Component({
  selector: 'app-home-projects',
  imports: [
    NgClass,
    TranslatePipe,
    MultiBadgePipe
  ],
  templateUrl: './home-projects.html',
  styleUrl: './home-projects.css'
})
export class HomeProjects implements  OnInit{

  protected readonly PROJECT_TITLE = PROJECT_TITLE;
  protected readonly PROJECT_SUBTITLE = PROJECT_SUBTITLE;
  projects = signal<Project[]>(PROJECT_DATA);
  activeSection = signal<string | null>(null);

  subProjects: Project[] = [];
  showAllProjects: boolean = false;

  private readonly HEADER_OFFSET = 80 + 5;

  btnShowAllText = "PROJECTS.showAll"
  btnShowPartText = "PROJECTS.showPart"


  ngOnInit() {
    this.subProjects = this.projects().slice(0,3)
  }

  getIndicatorClass(indicator: Project['indicator']): string {
    switch (indicator) {
      case 'Professionnel': return 'professional';
      case 'Personnel': return 'personal';
      case 'Académique': return 'academic';
      default: return '';
    }
  }

  ngAfterViewInit() {
    this.checkActiveSection();
  }

  /**
   * Listens to the window scroll event and triggers the active section check.
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkActiveSection();
  }

  /**
   * Determines which section is currently visible at the top of the viewport.
   */
  checkActiveSection() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let currentSectionId: string | null = null;

    // Itérer sur les projets en sens inverse (du bas vers le haut)
    const projects = this.projects();
    for (let i = projects.length - 1; i >= 0; i--) {
      const project = projects[i];

      // Utiliser document.getElementById pour trouver l'élément par son ID
      const element = document.getElementById(project.id);

      if (element) {
        // Check si le haut de la section est au-dessus de la ligne de déclenchement (scroll + offset)
        if (scrollPosition + this.HEADER_OFFSET >= element.offsetTop) {
          currentSectionId = project.id;
          break; // Section active trouvée
        }
      }
    }

    // Mise à jour du signal
    if (this.activeSection() !== currentSectionId) {
      this.activeSection.set(currentSectionId);
    }
  }

  /**
   * Handles explicit clicks on the navigation links.
   */
  scrollToSection(id: string): void {
    // Vérifier si l'ID est une ancre générale (#projects) ou spécifique
    const elementId = id === 'projects' ? this.projects()[0]?.id : id;

    const element = document.getElementById(elementId!);
    if (element) {
      // Met l'état actif immédiatement (facultatif mais donne un feedback rapide)
      this.activeSection.set(elementId!);

      // Défilement natif fluide
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }


  showAllProjectsAction() {
    this.showAllProjects = !this.showAllProjects;
    if(this.showAllProjects) {
      this.subProjects = this.projects().slice(0,3);
    }else {
      this.subProjects = this.projects();
    }
  }
}
