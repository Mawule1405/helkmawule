import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './core/components/header/header.component';
import {Item} from './core/models/item.interface';
import {Footer} from './core/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'helou komlan mawule portfolio'
  items: Item[] = [
    {
      index: "home",
      label: "NAV.HOME",
      icon: "home",
      isActive: true,
    },
    {
      index: "projects",
      label: "NAV.PROJECTS",
      icon: "folder-open",
      isActive: false,
    },
    {
      index: "about",
      label: "NAV.ABOUT",
      icon: "person",
      isActive: false,
    },
    {
      index: "skills",
      label: "NAV.SKILLS",
      icon: "briefcase",
      isActive: false,
    },

    {
      index: "contact",
      label: "NAV.CONTACT",
      icon: "phone",
      isActive: false,
    }
  ];

  onNavigate($event: string) {
    this.items.forEach((item: any) => { // J'utilise 'any' car la structure 'Item' n'est pas définie
      if(item.index === $event) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });

    // Application du scroll
    let element = document.getElementById($event + "Id");

    // *** COMPLÉTION ***
    if (element) {
      // Utilisation de scrollIntoView pour un défilement natif et fluide
      element.scrollIntoView({
        behavior: 'smooth', // Rend le défilement progressif
        block: 'start'      // Assure que l'élément est positionné au début de la fenêtre
      });
    }
  }
}
