import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  HostListener,
  ElementRef,
  AfterViewInit,
  inject,
  Output, EventEmitter
} from '@angular/core';
import { Router,  } from '@angular/router';
import { Subject, } from 'rxjs';

import { Item } from '../../models/item.interface';
import {DeviceDetectorService} from '../../services/device-detector.service';
import {LanguageService} from '../../services/languague.service';
import {TranslatePipe} from '@ngx-translate/core';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    TranslatePipe

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input() items: Item[]=[]
  @Input() isDarkTheme = false;

  @Input()logo : string = "assets/images/logo-taurus.png";
  @Input() appName = "TAURUS"

  @Output() onNavigate = new EventEmitter<string>();

  deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  isMobile = false;

  private languageService = inject(LanguageService);
  private router= inject(Router)
  private elementRef: ElementRef = inject(ElementRef);
  private deviceService: DeviceDetectorService = inject(DeviceDetectorService);

  languages: any[] = [];
  currentLang: string = '';

  // Gestion des événements
  private destroy$ = new Subject<void>();
  // États d'animation
  isLogoAnimating = false;



  ngOnInit(): void {

    //First control of device
    this.updateDevice();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setTimeout(() => this.updateDevice(), 100); // debounce léger
      });
    }

    //Initialization of the interface language
    this.languages = this.languageService.getAvailableLanguages();
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang;
    });

  }

  ngAfterViewInit(): void {
    // Animation du logo au chargement
    setTimeout(() => {
      this.isLogoAnimating = true;
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Gestion du scroll pour l'effet sticky
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const header = this.elementRef.nativeElement.querySelector('header');
    if (header) {
      const scrolled = window.scrollY > 0;
      header.classList.toggle('scrolled', scrolled);
    }
  }


  private updateDevice() {
    this.deviceType = this.deviceService.getDeviceType();
    this.isMobile = this.deviceService.isMobile();
    console.log('Device:', this.deviceType);
  }


  onLanguageChange(): void {
    // Déterminer la langue opposée à la langue actuelle
    const newLangCode = this.currentLang === 'fr' ? 'en' : 'fr';

    // Appeler le service avec le nouveau code
    console.log(`Tentative de changement vers : ${newLangCode}`);
    this.languageService.setLanguage(newLangCode);

  }


  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('dark-mode', this.isDarkTheme);
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  navigateTo(index: string) {
    this.onNavigate.emit(index);
  }
}
