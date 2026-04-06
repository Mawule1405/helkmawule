import { Component } from '@angular/core';
import {HeaderComponent} from "../../core/components/header/header.component";
import {Item} from '../../core/models/item.interface';
import {Presentation} from '../../core/components/presentation/presentation';
import {HomeAbout} from '../../core/components/home-about/home-about';
import {HomeSkills} from '../../core/components/home-skills/home-skills';
import {HomeProjects} from '../../core/components/home-projects/home-projects';

@Component({
  selector: 'app-home',
  imports: [
    Presentation,
    HomeAbout,
    HomeSkills,
    HomeProjects
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
