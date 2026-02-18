export interface Equipment {
    name: string;
    slot: 'Weapon' | 'Armor' | 'Accessory';
    description?: string;
    statBonuses: {
        strength?: number;
        arcane?: number;
        endurance?: number;
        speed?: number;
        luck?: number;
        // Percent modifiers (applied to the total stat after flats)
        strengthPercent?: number;
        arcanePercent?: number;
        endurancePercent?: number;
        speedPercent?: number;
        luckPercent?: number;
        critChance?: number;
        critDamage?: number;
        hpBonus?: number;
        hpRegen?: number;
        energyRegen?: number;
        physicalDefense?: number;
        magicDefense?: number;
    };
    passiveEffects?: string[];
}

export const EQUIPMENT: Equipment[] = [
    // --- WEAPONS ---
    // Swords
    {
        name: 'Rusty Sword',
        slot: 'Weapon',
        description: 'A worn blade, better than nothing.',
        statBonuses: { strength: 1 }
    },
    {
        name: 'Iron Sword',
        slot: 'Weapon',
        description: 'Standard issue infantry sword.',
        statBonuses: { strength: 3 }
    },
    {
        name: 'Broad Sword',
        slot: 'Weapon',
        description: 'A heavy blade favored by warriors.',
        statBonuses: { strength: 5, endurance: 2 }
    },
    {
        name: 'Darkblood Sword',
        slot: 'Weapon',
        description: 'Forged from cursed metal.',
        statBonuses: { strength: 8, arcane: 3 },
        passiveEffects: ['Applies debuffs back to attacker']
    },
    {
        name: 'Sun Sword',
        slot: 'Weapon',
        description: 'Radiates the power of the sun.',
        statBonuses: { strength: 10, arcane: 5, hpRegen: 1 },
        passiveEffects: ['Light Element Damage']
    },
    // Spears
    {
        name: 'Old Spear',
        slot: 'Weapon',
        description: 'A simple wooden spear with a metal tip.',
        statBonuses: { strength: 1, speed: 1 }
    },
    {
        name: 'Iron Spear',
        slot: 'Weapon',
        description: 'Reliable reach weapon.',
        statBonuses: { strength: 3, speed: 2 }
    },
    {
        name: 'Vastayan Spear',
        slot: 'Weapon',
        description: 'An ancient spear with shifting properties.',
        statBonuses: { strength: 5, speed: 5, luck: 5 },
        passiveEffects: ['Effect changes based on highest stat']
    },
    // Daggers
    {
        name: 'Iron Dagger',
        slot: 'Weapon',
        description: 'Quick and deadly.',
        statBonuses: { speed: 3, critChance: 5 }
    },
    {
        name: 'Cursed Dagger',
        slot: 'Weapon',
        description: 'Drips with malicious energy.',
        statBonuses: { speed: 8, arcane: 4, critChance: 10 },
        passiveEffects: ['Curse on hit', 'Atk Speed boost on kill']
    },
    {
        name: 'Ice Dagger',
        slot: 'Weapon',
        description: 'Cold to the touch.',
        statBonuses: { speed: 6, arcane: 4 },
        passiveEffects: ['Chance to freeze target']
    },
    // Fists
    {
        name: 'Ferrus Cestus',
        slot: 'Weapon',
        description: 'Iron knuckles for brawling.',
        statBonuses: { strength: 2, endurance: 1 }
    },
    {
        name: 'Dragonbone Gauntlets',
        slot: 'Weapon',
        description: 'Crafted from the bones of a drake.',
        statBonuses: { strength: 12, endurance: 5, speed: -2 },
        passiveEffects: ['Bonus dmg vs Burning enemies']
    },
    {
        name: 'Darkblood Cestus',
        slot: 'Weapon',
        description: 'Spiked gauntlets that thirst for blood.',
        statBonuses: { strength: 10, luck: 5 },
        passiveEffects: ['Reflects debuffs']
    },
    // Staves
    {
        name: 'Wooden Staff',
        slot: 'Weapon',
        description: 'A simple conduit for magic.',
        statBonuses: { arcane: 2 }
    },
    {
        name: 'Tainted Staff',
        slot: 'Weapon',
        description: 'Corrupted by dark magic.',
        statBonuses: { arcane: 8, luck: 3 },
        passiveEffects: ['Inflicts Curse on debuffed foes']
    },
    {
        name: 'Sunstaff',
        slot: 'Weapon',
        description: 'Channels the holy light.',
        statBonuses: { arcane: 12, hpRegen: 2 },
        passiveEffects: ['Boosts Holy Arts']
    },
    // Shields
    {
        name: 'Iron Shield',
        slot: 'Weapon',
        description: 'Basic protection.',
        statBonuses: { endurance: 5, physicalDefense: 5 }
    },
    {
        name: 'Slime Buckler',
        slot: 'Weapon',
        description: 'Sticky surface traps weapons.',
        statBonuses: { endurance: 8 },
        passiveEffects: ['Weakens attackers']
    },
    {
        name: 'Ice Shield',
        slot: 'Weapon',
        description: 'Freezes incoming attacks.',
        statBonuses: { endurance: 10, magicDefense: 5 },
        passiveEffects: ['Chills attackers']
    },

    // --- ARMOR ---
    {
        name: 'Traveler Tunic',
        slot: 'Armor',
        description: 'Simple clothes for the road.',
        statBonuses: { endurance: 1, speed: 1 }
    },
    {
        name: 'Heavy Plate',
        slot: 'Armor',
        description: 'Thick metal plating.',
        statBonuses: { endurance: 10, physicalDefense: 10, speed: -2 }
    },
    {
        name: 'Arcane Robes',
        slot: 'Armor',
        description: 'Woven with mana threads.',
        statBonuses: { arcane: 5, magicDefense: 10, hpBonus: 15 }
    },
    {
        name: 'Shadow Cloak',
        slot: 'Armor',
        description: 'Melts into the darkness.',
        statBonuses: { speed: 8, luck: 4, physicalDefense: 2 }
    },
    {
        name: 'Paladin Cuirass',
        slot: 'Armor',
        description: 'Holy armor meant for Saints.',
        statBonuses: { endurance: 12, arcane: 5, hpBonus: 50, physicalDefense: 15 }
    },
    {
        name: 'Rogue Hunter',
        slot: 'Armor',
        description: 'Lightweight armor for stalking prey.',
        statBonuses: { speed: 10, luck: 5, hpBonus: 20 }
    },
    {
        name: 'Wandering Practitioner',
        slot: 'Armor',
        description: 'Flexible gi for martial artists.',
        // Grants flat Strength plus a 10% increase to total Strength
        statBonuses: { strength: 10, speed: 5, hpBonus: 30, strengthPercent: 10 }
    },

    // --- ACCESSORIES (GEARS) ---
    {
        name: 'Luck Charm',
        slot: 'Accessory',
        description: 'A simple trinket.',
        statBonuses: { luck: 5 }
    },
    {
        name: 'Vitality Ring',
        slot: 'Accessory',
        description: 'Pulses with life energy.',
        statBonuses: { hpBonus: 20, hpRegen: 1 }
    },
    {
        name: 'Ring of Power',
        slot: 'Accessory',
        description: 'Surges with raw strength.',
        statBonuses: { strength: 4, arcane: 4 }
    },
    {
        name: 'Golden Amulet',
        slot: 'Accessory',
        description: 'Shiny and valuable.',
        statBonuses: { luck: 10, critDamage: 10 }
    },
    {
        name: 'Rotten Amulet',
        slot: 'Accessory',
        description: 'Smells of decay.',
        statBonuses: { arcane: 5, luck: -2, energyRegen: 1 }
    },
    // Boss Drops / High Tier
    {
        name: 'Dragon Memoir',
        slot: 'Accessory',
        description: 'A relic of a slain dragon.',
        statBonuses: { strength: 8, endurance: 5 },
        passiveEffects: ['Inflicts Bleed & Fractured on strike']
    },
    {
        name: 'Narthana\'s Leaf',
        slot: 'Accessory',
        description: 'A leaf from the world tree.',
        statBonuses: { arcane: 8, hpRegen: 3, energyRegen: 2 },
        passiveEffects: ['Greatly boosts healing']
    },
    {
        name: 'Imperial Headband',
        slot: 'Accessory',
        description: 'Worn by summoners of old.',
        statBonuses: { arcane: 5, endurance: 3 },
        passiveEffects: ['Summon detonation causes Stun/Weaken']
    },
    {
        name: 'Shard of Blight',
        slot: 'Accessory',
        description: 'Corrupted crystal shard.',
        statBonuses: { physicalDefense: 15, strength: 5 },
        passiveEffects: ['+25% Dark Element Damage']
    },
    {
        name: 'Ring of the Gelat',
        slot: 'Accessory',
        description: 'Jiggly and translucent.',
        statBonuses: { hpBonus: 50, physicalDefense: 5 },
        passiveEffects: ['Summons a Slime companion']
    },
    {
        name: 'Ring of the Vampire',
        slot: 'Accessory',
        description: 'Thirsts for life.',
        statBonuses: { speed: 5, hpRegen: 2 },
        passiveEffects: ['Heals on Bleed ticks']
    },
    {
        name: 'Crystal Sphere',
        slot: 'Accessory',
        description: 'Perfectly round and clear.',
        // Crystal Sphere grants crit chance but should NOT increase ranged/magic damage.
        // Removed `arcane: 2` so it no longer boosts ranged damage through ARC.
        statBonuses: { critChance: 5 },
        passiveEffects: ['Removes Crit Fatigue']
    },
    {
        name: 'Grain of Balance',
        slot: 'Accessory',
        description: 'A mystical scale.',
        statBonuses: { strength: 3, arcane: 3, endurance: 3, speed: 3, luck: 3 },
        passiveEffects: ['Reduces highest stat to boost others']
    }
];
