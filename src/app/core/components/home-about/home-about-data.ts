export interface FlipItem {
  title: string;
  period: string;
  icon: string;
  fullDescription: string;
  flipped: boolean;
}

export const FLIP_TITLE ="FLIP.title";
export const FLIP_SUBTITLE ="FLIP.subtitle";
export const FLIP_ACTION ="FLIP.action";
export const FLIP_DATA: FlipItem[] = [
  {
    title: "FLIP.DATA.flip1.title",
    period: "FLIP.DATA.flip1.period",
    icon: "fas fa-school",
    fullDescription:
      "FLIP.DATA.flip1.fullDescription",
    flipped: false
  },

  {
    title: "FLIP.DATA.flip2.title",
    period: "FLIP.DATA.flip2.period",
    icon: "fas fa-square-root-alt",
    fullDescription:
      "FLIP.DATA.flip2.fullDescription",
    flipped: false
  },

  {
    title: "FLIP.DATA.flip3.title",
    period: "FLIP.DATA.flip3.period",
    icon: "fas fa-chalkboard-teacher",
    fullDescription:
      "FLIP.DATA.flip3.fullDescription",
    flipped: false
  },

  {
    title: "FLIP.DATA.flip4.title",
    period: "FLIP.DATA.flip4.period",
    icon: "fas fa-lightbulb",
    fullDescription:
      "FLIP.DATA.flip4.fullDescription",
    flipped: false
  },

  {
    title: "FLIP.DATA.flip5.title",
    period: "FLIP.DATA.flip5.period",
    icon: "fas fa-briefcase",
    fullDescription:
      "FLIP.DATA.flip5.fullDescription",
    flipped: false
  },

  {
    title: "FLIP.DATA.flip6.title",
    period: "FLIP.DATA.flip6.period",
    icon: "fas fa-graduation-cap",
    fullDescription:
      "FLIP.DATA.flip6.fullDescription",
    flipped: false
  },

  /*{
    title: "FLIP.DATA.flip7.title",
    period: "FLIP.DATA.flip7.period",
    icon: "fas fa-rocket",
    fullDescription:
      "FLIP.DATA.flip7.fullDescription",
    flipped: false
  }*/
];

