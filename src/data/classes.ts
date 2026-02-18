export interface GameClass {
  name: string;
  type: 'Base' | 'Super' | 'Sub' | 'Ultra';
  path?: 'Orderly' | 'Chaotic' | 'Neutral';
  statBonuses: {
    strength?: number;
    arcane?: number;
    endurance?: number;
    speed?: number;
    luck?: number;
    [key: string]: number | undefined;
  };
  description: string;
}

export const CLASSES: GameClass[] = [
  // --- BASE CLASSES ---
  {
    name: 'Martial Artist',
    type: 'Base',
    path: 'Neutral',
    statBonuses: { strength: 2, endurance: 2 },
    description: 'Specializes in close-range combat with fist weapons. Disciplined and tough.'
  },
  {
    name: 'Thief',
    type: 'Base',
    path: 'Neutral',
    statBonuses: { speed: 3, luck: 1 },
    description: 'Fast and sneaky, excels at inflicting status effects and critical hits.'
  },
  {
    name: 'Slayer',
    type: 'Base',
    path: 'Neutral',
    statBonuses: { strength: 1, speed: 2, arcane: 1 },
    description: 'Agile fighter specializing in spears and burst damage through combos.'
  },
  {
    name: 'Warrior',
    type: 'Base',
    path: 'Neutral',
    statBonuses: { strength: 3, endurance: 1 },
    description: 'Strong sword proficient class with high defense and parrying capability.'
  },
  {
    name: 'Mage',
    type: 'Base',
    path: 'Neutral',
    statBonuses: { arcane: 4 },
    description: 'Uses staves as a conduit for powerful magical spells and elemental control.'
  },

  // --- SUPER CLASSES (ORDERLY) ---
  {
    name: 'Saint',
    type: 'Super',
    path: 'Orderly',
    statBonuses: { arcane: 10, endurance: 5, hpRegen: 2 },
    description: 'A holy conduit of light, healing allies and smiting the wicked.'
  },
  {
    name: 'Elementalist',
    type: 'Super',
    path: 'Orderly',
    statBonuses: { arcane: 12, speed: 3 },
    description: 'Master of fire, ice, and lightning magic. Deals massive AoE damage.'
  },
  {
    name: 'Paladin',
    type: 'Super',
    path: 'Orderly',
    statBonuses: { strength: 8, endurance: 8, physicalDefense: 10 },
    description: 'A holy warrior clad in heavy armor. The ultimate tank.'
  },
  {
    name: 'Blade Dancer',
    type: 'Super',
    path: 'Orderly',
    statBonuses: { speed: 12, strength: 4 },
    description: 'Graceful and deadly, weaving through attacks with incredible speed.'
  },

  // --- SUPER CLASSES (CHAOTIC) ---
  {
    name: 'Necromancer',
    type: 'Super',
    path: 'Chaotic',
    statBonuses: { arcane: 10, luck: 5, energyRegen: 1 },
    description: 'Commands the dead and uses life force as a weapon.'
  },
  {
    name: 'Dark Wraith',
    type: 'Super',
    path: 'Chaotic',
    statBonuses: { arcane: 8, luck: 7, critChance: 10 },
    description: 'A chaotic assassin who strikes from the shadows with cursed energy.'
  },
  {
    name: 'Berserker',
    type: 'Super',
    path: 'Chaotic',
    statBonuses: { strength: 12, endurance: 3, hpBonus: 50 },
    description: 'A raging warrior who trades defense for overwhelming power.'
  },
  {
    name: 'Assassin',
    type: 'Super',
    path: 'Chaotic',
    statBonuses: { speed: 10, luck: 5, critDamage: 0.5 },
    description: 'Lethal specialist focusing on instant kills and poison.'
  },

  // --- SUB CLASSES ---
  {
    name: 'Alchemist',
    type: 'Sub',
    path: 'Neutral',
    statBonuses: { arcane: 3, luck: 3 },
    description: 'Brews potions to buff allies or harm enemies.'
  },
  {
    name: 'Beastmaster',
    type: 'Sub',
    path: 'Neutral',
    statBonuses: { strength: 2, endurance: 2, speed: 2 },
    description: 'Commands tamed beasts to fight alongside them.'
  },
  {
    name: 'Musician',
    type: 'Sub',
    path: 'Neutral',
    statBonuses: { arcane: 2, speed: 2, energyRegen: 1 },
    description: 'Plays songs that inspire allies and demoralize foes.'
  }
];
