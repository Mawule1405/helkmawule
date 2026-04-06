interface Project {
  id: string; // ID unique pour l'ancre (e.g., 'project-1')
  num: number;
  name: string;
  description: string;
  photoUrl: string;
  objective: string;
  indicator: string;
  technologies?: string
  color: string; // Couleur d'arrière-plan pour la carte (optionnel)
}
