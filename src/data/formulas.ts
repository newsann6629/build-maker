export interface BaseStats {
    strength: number;
    arcane: number;
    endurance: number;
    speed: number;
    luck: number;
}

export interface CalculatedStats {
    health: number;
    physicalDamage: number;
    magicDamage: number;
    critChance: number;
    critDamage: number;
    hpRegen: number;
    energyRegen: number;
    physicalDefense: number;
    magicDefense: number;
}

export const calculateStats = (
    base: BaseStats,
    classBonuses: BaseStats & { [key: string]: number | undefined },
    equipBonuses: BaseStats & { [key: string]: number | undefined }
): CalculatedStats => {
    const totalStr = base.strength + (classBonuses.strength || 0) + (equipBonuses.strength || 0);
    const totalArc = base.arcane + (classBonuses.arcane || 0) + (equipBonuses.arcane || 0);
    const totalEnd = base.endurance + (classBonuses.endurance || 0) + (equipBonuses.endurance || 0);
    const totalLuck = base.luck + (classBonuses.luck || 0) + (equipBonuses.luck || 0);
    const totalSpeed = base.speed + (classBonuses.speed || 0) + (equipBonuses.speed || 0);

    return {
        // 100 base HP + 5 HP per Endurance + flat bonuses
        health: 100 + (totalEnd * 5) + (classBonuses.hpBonus || 0) + (equipBonuses.hpBonus || 0),

        // Physical damage scales with STR (approximate multiplier)
        physicalDamage: 10 + (totalStr * 2.5),

        // Magic/Range damage scales with ARC
        magicDamage: 10 + (totalArc * 2.5),

        // Luck gives ~0.44% crit chance per point
        critChance: (totalLuck * 0.44) + (classBonuses.critChance || 0) + (equipBonuses.critChance || 0),

        // Luck gives ~0.02x crit multiplier per point, base is 1.5x
        critDamage: 1.5 + (totalLuck * 0.02) + (((classBonuses.critDamage || 0) + (equipBonuses.critDamage || 0)) / 100),

        // New Stats
        hpRegen: (classBonuses.hpRegen || 0) + (equipBonuses.hpRegen || 0),
        energyRegen: (classBonuses.energyRegen || 0) + (equipBonuses.energyRegen || 0),
        physicalDefense: (classBonuses.physicalDefense || 0) + (equipBonuses.physicalDefense || 0),
        magicDefense: (classBonuses.magicDefense || 0) + (equipBonuses.magicDefense || 0)
    };
};
