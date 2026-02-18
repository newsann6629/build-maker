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

    // Apply percent modifiers (if any) to totals
    const strPercent = (classBonuses.strengthPercent || 0) + (equipBonuses.strengthPercent || 0);
    const arcPercent = (classBonuses.arcanePercent || 0) + (equipBonuses.arcanePercent || 0);
    const effectiveStr = totalStr * (1 + strPercent / 100);
    const effectiveArc = totalArc * (1 + arcPercent / 100);

    // Tuned multipliers (per-point) to match in-game numbers
    // STR -> use 25/18 (~1.388888...) so STR 9 -> +12.5% => 112.5%
    // ARC -> use 7/5 (1.4) so ARC 10 -> +14.0% => 114.0%
    const STR_DMG_PER_POINT = 25 / 18;
    const ARC_DMG_PER_POINT = 7 / 5;

    return {
        // 100 base HP + 5 HP per Endurance + flat bonuses
        health: 100 + (totalEnd * 5) + (classBonuses.hpBonus || 0) + (equipBonuses.hpBonus || 0),

        // Physical and Magic/Ranged damage should start at 100% and add scaling
        physicalDamage: 100 + (effectiveStr * STR_DMG_PER_POINT),

        // Magic/Range damage scales with ARC
        magicDamage: 100 + (effectiveArc * ARC_DMG_PER_POINT),

        // Crit chance scaling per LCK: tuned so LCK 205 -> ~78.31% from luck alone
        // then equipment/class flat % bonuses are added on top (e.g. +5% from gear)
        // => use 0.382% per LCK point
        critChance: (totalLuck * 0.382) + (classBonuses.critChance || 0) + (equipBonuses.critChance || 0),

        // Crit damage: base multiplier closer to in-game baseline (1.75x)
        // Per-LCK scaling tuned so LCK 205 -> ~2.26x total (without extra critDamage% items)
        // per-point increment ~= (2.26 - 1.75) / 205 ~= 0.0024878
        critDamage: 1.75 + (totalLuck * 0.0024878) + (((classBonuses.critDamage || 0) + (equipBonuses.critDamage || 0)) / 100),

        // New Stats
        hpRegen: (classBonuses.hpRegen || 0) + (equipBonuses.hpRegen || 0),
        energyRegen: (classBonuses.energyRegen || 0) + (equipBonuses.energyRegen || 0),
        physicalDefense: (classBonuses.physicalDefense || 0) + (equipBonuses.physicalDefense || 0),
        magicDefense: (classBonuses.magicDefense || 0) + (equipBonuses.magicDefense || 0)
    };
};
