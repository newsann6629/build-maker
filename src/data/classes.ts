export type Path = 'Orderly' | 'Neutral' | 'Chaotic'
export type ClassType = 'Base' | 'Super' | 'Sub'

export interface GameClass {
  name: string
  type: ClassType
  path?: Path
  derivedFrom?: string[]
  description: string
  statBonuses: Partial<Record<string, number>>
}

export const CLASSES: GameClass[] = [

  // =========================
  // BASE
  // =========================
  { name: 'Warrior', type: 'Base', description: 'Frontline physical combatant.', statBonuses: {} },
  { name: 'Thief', type: 'Base', description: 'Fast and precise striker.', statBonuses: {} },
  { name: 'Slayer', type: 'Base', description: 'Balanced offensive fighter.', statBonuses: {} },
  { name: 'Martial Artist', type: 'Base', description: 'Unarmed combat specialist.', statBonuses: {} },
  { name: 'Wizard', type: 'Base', description: 'Arcane spellcaster.', statBonuses: {} },

  // =========================
  // SUPER
  // =========================

  // Warrior
  { name: 'Paladin', type: 'Super', path: 'Orderly', derivedFrom: ['Warrior'], description: 'Holy armored knight.', statBonuses: {} },
  { name: 'blade dancer', type: 'Super', path: 'Neutral', derivedFrom: ['Warrior'], description: 'blade dancer.', statBonuses: {} },
  { name: 'Berserker', type: 'Super', path: 'Chaotic', derivedFrom: ['Warrior'], description: 'Frenzied warrior.', statBonuses: {} },

  // Thief
  { name: 'Ranger', type: 'Super', path: 'Orderly', derivedFrom: ['Thief'], description: 'Skirmisher and ranged hunter.', statBonuses: {} },
  { name: 'Rogue', type: 'Super', path: 'Neutral', derivedFrom: ['Thief'], description: 'Tactical stealth fighter.', statBonuses: {} },
  { name: 'Assassin', type: 'Super', path: 'Chaotic', derivedFrom: ['Thief'], description: 'Lethal executioner.', statBonuses: {} },

  // Slayer
  { name: 'Saint', type: 'Super', path: 'Orderly', derivedFrom: ['Slayer'], description: 'Divine empowered combatant.', statBonuses: {} },
  { name: 'Lancer', type: 'Super', path: 'Neutral', derivedFrom: ['Slayer'], description: 'Polearm specialist focused on reach and control.', statBonuses: {} },
  { name: 'Impaler', type: 'Super', path: 'Chaotic', derivedFrom: ['Slayer'], description: 'Piercing offense specialist.', statBonuses: {} },

  // Martial Artist
  { name: 'Monk', type: 'Super', path: 'Orderly', derivedFrom: ['Martial Artist'], description: 'Disciplined chi user.', statBonuses: {} },
  { name: 'Brawler', type: 'Super', path: 'Neutral', derivedFrom: ['Martial Artist'], description: 'Close-quarters bruiser emphasizing raw output.', statBonuses: {} },
  { name: 'Darkwraith', type: 'Super', path: 'Chaotic', derivedFrom: ['Martial Artist'], description: 'Shadow infused fighter.', statBonuses: {} },

  // Wizard
  { name: 'Elementalist', type: 'Super', path: 'Orderly', derivedFrom: ['Wizard'], description: 'Elemental spell master.', statBonuses: {} },
  { name: 'Hexer', type: 'Super', path: 'Neutral', derivedFrom: ['Wizard'], description: 'Curse and hex specialist that manipulates debuffs.', statBonuses: {} },
  { name: 'Necromancer', type: 'Super', path: 'Chaotic', derivedFrom: ['Wizard'], description: 'Commander of the dead.', statBonuses: {} },

  // =========================
  // SUBCLASSES (Updated)
  // =========================
  { name: 'Bard', type: 'Sub', description: 'Support via musical buffs.', statBonuses: {} },
  { name: 'Beastmaster', type: 'Sub', description: 'Fights alongside beasts.', statBonuses: {} },
  { name: 'Alchemist', type: 'Sub', description: 'Potion crafting specialist.', statBonuses: {} },
  { name: 'Blacksmith', type: 'Sub', description: 'Equipment crafting expert.', statBonuses: {} },
  { name: 'Miner', type: 'Sub', description: 'Resource gathering expert.', statBonuses: {} },

]
