import {Component, OnInit} from '@angular/core';
import {Skill, SKILLS_DATA} from './home-skills-data';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-home-skills',
  imports: [
    TranslatePipe
  ],
  templateUrl: './home-skills.html',
  styleUrl: './home-skills.css'
})
export class HomeSkills implements OnInit{


  skills = SKILLS_DATA;
  lessSkills: Skill[] = [];

  showAllSkills = false;

  ngOnInit(){
    this.lessSkills = this.skills.slice(0,3);
  }

  // Développer la compétence
  expandSkill(skill: Skill) {
    skill.expanded = true;
    // Démarrer l’animation de l’aiguille après un court délai
    setTimeout(() => {
      skill.needleActive = true;
    }, 100);
  }

  // Réduire la compétence
  collapseSkill(skill: Skill) {
    skill.needleActive = false;
    setTimeout(() => {
      skill.expanded = false;
    }, 600); // délai pour laisser l’aiguille revenir
  }

  onDisplaySkills(): void {

    this.showAllSkills = !this.showAllSkills;
    if(this.showAllSkills) {
      this.lessSkills = this.skills;
    }else {
      this.lessSkills = this.skills.slice(0,3);
    }

  }

}
