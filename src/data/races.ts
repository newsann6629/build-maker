// ================================
// TYPES
// ================================

export interface StatBlock {
  STR?: number
  ARC?: number
  END?: number
  LCK?: number
  SPD?: number
}

export interface RaceModifier {
  // เพิ่ม stat point ตอนเริ่ม / ตอนจบ build
  extraStatPoints?: number

  // แปลงค่า stat -> โบนัส
  speedToCrit?: number     // x SPD => +crit%
  arcToDamage?: number     // x ARC => +magic dmg%

  // โบนัสตรง
  bonusCritChance?: number
  bonusDamagePercent?: number
  bonusDefensePercent?: number
  bonusHPRegen?: number

  // flag พิเศษไว้ใช้ logic ภายหลัง
  tags?: string[]
}

export interface Race {
  name: string
  baseStats: StatBlock
  description: string
  modifiers?: RaceModifier
}

// ================================
// DATA
// ================================

export const RACES: Race[] = [

  // ========================
  // COMMON
  // ========================

  {
    name: "Estella",
    baseStats: { STR:2, ARC:2, END:2, LCK:1, SPD:1 },
    description: "Enduring fighter with defensive scaling.",
    modifiers: {
      bonusDefensePercent: 10,
      bonusHPRegen: 50,
      tags: ["defensive-proc"]
    }
  },

  {
    name: "Stultus",
    baseStats: { STR:2, ARC:1, END:1, LCK:1, SPD:3 },
    description: "Speed converts into critical chance.",
    modifiers: {
      speedToCrit: 0.1, // 10 SPD = 1% crit
      tags: ["speed-scaling"]
    }
  },

  {
    name: "Nisse",
    baseStats: { STR:1, ARC:3, END:1, LCK:2, SPD:1 },
    description: "Arcane focused energy manipulation.",
    modifiers: {
      arcToDamage: 0.15,
      tags: ["caster"]
    }
  },

  {
    name: "Vastayan",
    baseStats: { STR:1, ARC:2, END:1, LCK:1, SPD:3 },
    description: "Affinity enhanced spirit race.",
    modifiers: {
      bonusDamagePercent: 10,
      tags: ["summon-affinity"]
    }
  },

  {
    name: "Veneri",
    baseStats: { STR:2, ARC:1, END:2, LCK:2, SPD:2 },
    description: "Gold-scaling opportunist.",
    modifiers: {
      bonusDamagePercent: 20,
      tags: ["economy-scale"]
    }
  },

  {
    name: "Drauga",
    baseStats: { STR:1, ARC:2, END:2, LCK:2, SPD:2 },
    description: "Crit lifesteal and kill scaling.",
    modifiers: {
      bonusCritChance: 5,
      tags: ["lifesteal"]
    }
  },

  {
    name: "Corvolus",
    baseStats: { STR:1, ARC:4, END:1, LCK:2, SPD:2 },
    description: "Magic amplification specialist.",
    modifiers: {
      arcToDamage: 0.30,
      tags: ["holy-dark-boost"]
    }
  },

  {
    name: "Daminos",
    baseStats: { STR:1, ARC:2, END:3, LCK:1, SPD:3 },
    description: "Survivability focused lineage.",
    modifiers: {
      bonusHPRegen: 5,
      tags: ["extra-life"]
    }
  },

  {
    name: "Dullahan",
    baseStats: { STR:3, ARC:2, END:4, LCK:2, SPD:1 },
    description: "High stat scaling over levels.",
    modifiers: {
      extraStatPoints: 3,
      tags: ["late-scaling"]
    }
  },

  {
    name: "Vydeer",
    baseStats: { STR:1, ARC:1, END:3, LCK:2, SPD:2 },
    description: "Crit stacking dodge specialist.",
    modifiers: {
      bonusCritChance: 15,
      tags: ["sense-stack"]
    }
  },

  {
    name: "Boreas",
    baseStats: { STR:3, ARC:3, END:4, LCK:1, SPD:1 },
    description: "Ice damage stacking race.",
    modifiers: {
      bonusDamagePercent: 20,
      bonusDefensePercent: 20,
      tags: ["ice-stack"]
    }
  },

  // ========================
  // OBTAINABLE / RARE
  // ========================

  {
    name: "Lentum",
    baseStats: { STR:3, ARC:3, END:1, LCK:1, SPD:2 },
    description: "Slime interaction and regen bonuses.",
    modifiers: {
      bonusHPRegen: 2,
      tags: ["utility"]
    }
  },

  {
    name: "Amorus",
    baseStats: { STR:3, ARC:3, END:2, LCK:1, SPD:1 },
    description: "Hex resistant hybrid attacker.",
    modifiers: {
      bonusDamagePercent: 15,
      tags: ["hex-resist"]
    }
  },

  {
    name: "Sheea",
    baseStats: { STR:3, ARC:3, END:1, LCK:1, SPD:2 },
    description: "Cooldown efficiency race.",
    modifiers: {
      extraStatPoints: 1,
      tags: ["cooldown-reduction"]
    }
  },

  {
    name: "Inferion",
    baseStats: { STR:3, ARC:1, END:4, LCK:1, SPD:1 },
    description: "Fire empowerment lineage.",
    modifiers: {
      bonusDamagePercent: 15,
      bonusDefensePercent: 5,
      tags: ["burn-scaling"]
    }
  }

]
