// service/device-detector.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Retourne le type d'appareil
   */
  getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    if (!isPlatformBrowser(this.platformId)) {
      return 'desktop'; // SSR: on suppose desktop par défaut
    }

    const width = window.innerWidth;

    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Raccourcis pratiques
   */
  isMobile(): boolean {
    return this.getDeviceType() === 'mobile';
  }

  isTablet(): boolean {
    return this.getDeviceType() === 'tablet';
  }

  isDesktop(): boolean {
    return this.getDeviceType() === 'desktop';
  }
}
