"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Zap, Sparkles, Heart, Activity, Dice5, Target } from 'lucide-react';
import { CLASSES, GameClass } from '@/data/classes';
import { EQUIPMENT, Equipment } from '@/data/equipment';
import { calculateStats, BaseStats } from '@/data/formulas';
import { RACES, Race } from '@/data/races';

import { useTheme } from '@/components/ThemeContext';

export default function BuildMaker() {
  const { theme, toggleTheme } = useTheme();


  // Race State
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);

  // Base Stats State (user input, not including race base)
  const [baseStats, setBaseStats] = useState<BaseStats>({
    strength: 0,
    arcane: 0,
    endurance: 0,
    speed: 0,
    luck: 0
  });

  // Class Progression State
  const [baseClass, setBaseClass] = useState<GameClass | null>(null);
  const [classPath, setClassPath] =
    useState<'Orderly' | 'Neutral' | 'Chaotic'>('Orderly');
  const [superClass, setSuperClass] = useState<GameClass | null>(null);
  const [subClass, setSubClass] = useState<GameClass | null>(null);

  const [weapon, setWeapon] = useState<Equipment | null>(null);
  const [armor, setArmor] = useState<Equipment | null>(null);
  const [accessories, setAccessories] = useState<(Equipment | null)[]>([null, null, null, null]);

  // Derived Selection Logic
  const classBonuses = useMemo(() => {
    const bonuses = {
      strength: 0, arcane: 0, endurance: 0, speed: 0, luck: 0,
      hpBonus: 0, hpRegen: 0, energyRegen: 0, physicalDefense: 0, magicDefense: 0,
      critChance: 0, critDamage: 0
    };

    const activeClasses = [baseClass, superClass, subClass].filter(Boolean) as GameClass[];

    activeClasses.forEach(cls => {
      bonuses.strength += cls.statBonuses.strength || 0;
      bonuses.arcane += cls.statBonuses.arcane || 0;
      bonuses.endurance += cls.statBonuses.endurance || 0;
      bonuses.speed += cls.statBonuses.speed || 0;
      bonuses.luck += cls.statBonuses.luck || 0;

      // Advanced Stats from Classes
      bonuses.hpBonus += cls.statBonuses.hpBonus || 0;
      bonuses.hpRegen += cls.statBonuses.hpRegen || 0;
      bonuses.energyRegen += cls.statBonuses.energyRegen || 0;
      bonuses.physicalDefense += cls.statBonuses.physicalDefense || 0;
      bonuses.magicDefense += cls.statBonuses.magicDefense || 0;
      bonuses.critChance += cls.statBonuses.critChance || 0;
      bonuses.critDamage += cls.statBonuses.critDamage || 0;
    });

    return bonuses;
  }, [baseClass, superClass, subClass]);

  const equipBonuses = useMemo(() => {
    const bonuses: { [key: string]: number } = {
      strength: 0, arcane: 0, endurance: 0, speed: 0, luck: 0,
      critChance: 0, critDamage: 0, hpBonus: 0,
      hpRegen: 0, energyRegen: 0, physicalDefense: 0, magicDefense: 0
    };

    // Combine all equipment including the 4 accessories
    const allEquip = [weapon, armor, ...accessories];

    allEquip.forEach(item => {
      if (item) {
        bonuses.strength += item.statBonuses.strength || 0;
        bonuses.arcane += item.statBonuses.arcane || 0;
        bonuses.endurance += item.statBonuses.endurance || 0;
        bonuses.speed += item.statBonuses.speed || 0;
        bonuses.luck += item.statBonuses.luck || 0;
        bonuses.critChance += item.statBonuses.critChance || 0;
        bonuses.critDamage += item.statBonuses.critDamage || 0;
        bonuses.hpBonus += item.statBonuses.hpBonus || 0;

        bonuses.hpRegen += item.statBonuses.hpRegen || 0;
        bonuses.energyRegen += item.statBonuses.energyRegen || 0;
        bonuses.physicalDefense += item.statBonuses.physicalDefense || 0;
        bonuses.magicDefense += item.statBonuses.magicDefense || 0;
      }
    });
    return bonuses as BaseStats & { [key: string]: number };
  }, [weapon, armor, accessories]);


  // Game base stat (0 for all, only race and user points)
  const GAME_BASE_STAT = { strength: 0, arcane: 0, endurance: 0, speed: 0, luck: 0 };

  // Level / scaling constants (used for race per-5-level scaling)
  const LEVEL_CAP = 40; // used only for race scaling increments; kept configurable
  const POINTS_PER_LEVEL = 5;
  const raceScaleIncrements = Math.floor(LEVEL_CAP / 5); // +1 every 5 levels

  // Combine: game base + race + user
  const combinedBaseStats = useMemo(() => {
    if (!selectedRace) return { ...GAME_BASE_STAT };

    return {
      strength: GAME_BASE_STAT.strength + (selectedRace.baseStats.STR || 0) + raceScaleIncrements + (baseStats.strength || 0),
      arcane: GAME_BASE_STAT.arcane + (selectedRace.baseStats.ARC || 0) + raceScaleIncrements + (baseStats.arcane || 0),
      endurance: GAME_BASE_STAT.endurance + (selectedRace.baseStats.END || 0) + raceScaleIncrements + (baseStats.endurance || 0),
      speed: GAME_BASE_STAT.speed + (selectedRace.baseStats.SPD || 0) + raceScaleIncrements + (baseStats.speed || 0),
      luck: GAME_BASE_STAT.luck + (selectedRace.baseStats.LCK || 0) + raceScaleIncrements + (baseStats.luck || 0),
    };
  }, [baseStats, selectedRace, raceScaleIncrements]);

  const finalStats = useMemo(() => {
    // Always start with these base stats, then add on top
    const base = {
      health: 55,
      physicalDamage: 100,
      magicDamage: 100,
      critChance: 25,
      critDamage: 1.75,
      hpRegen: 0,
      energyRegen: 0,
      physicalDefense: 0,
      magicDefense: 0
    };
    const stats = calculateStats(combinedBaseStats, classBonuses, equipBonuses);
    // Merge calculated stats with game base values.
    // Ensure base crit chance is always included in the final displayed crit chance
    return {
      health: stats.health !== 100 + 0*5 ? stats.health : base.health,
      physicalDamage: typeof stats.physicalDamage === 'number' ? stats.physicalDamage : base.physicalDamage,
      magicDamage: typeof stats.magicDamage === 'number' ? stats.magicDamage : base.magicDamage,
      critChance: stats.critChance !== 0 ? stats.critChance : base.critChance,
      critDamage: stats.critDamage || base.critDamage,
      hpRegen: stats.hpRegen,
      energyRegen: stats.energyRegen,
      physicalDefense: stats.physicalDefense,
      magicDefense: stats.magicDefense
    };
  }, [combinedBaseStats, classBonuses, equipBonuses]);



  // Stat cap logic (level cap and points per level declared earlier)
  const raceBonus = selectedRace?.modifiers?.extraStatPoints || 0;
  // Start at level 1 and gain points on each level-up: (LEVEL_CAP - 1) * POINTS_PER_LEVEL
  const STAT_CAP = ((LEVEL_CAP - 1) * POINTS_PER_LEVEL) + raceBonus; // e.g., 195 + bonus
  const totalStatPoints = Object.values(baseStats).reduce((a, b) => a + (b || 0), 0);
  const remainingPoints = STAT_CAP - totalStatPoints;

  const handleStatChange = (stat: keyof BaseStats, value: string) => {
    let num = Math.max(0, parseInt(value) || 0);
    // Clamp so total does not exceed cap
    const otherTotal = totalStatPoints - (baseStats[stat] || 0);
    if (otherTotal + num > STAT_CAP) {
      num = Math.max(0, STAT_CAP - otherTotal);
    }
    setBaseStats(prev => ({ ...prev, [stat]: num }));
  };

  const statIcons: Record<string, React.ReactNode> = {
    strength: <Sword className="w-4 h-4" />,
    arcane: <Sparkles className="w-4 h-4" />,
    endurance: <Shield className="w-4 h-4" />,
    speed: <Zap className="w-4 h-4" />,
    luck: <Dice5 className="w-4 h-4" />
  };

  return (
        <main className="min-h-screen p-4 md:p-12 max-w-7xl mx-auto selection:bg-yellow-500/30 transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Race Selection Section */}
          <section className="magic-card magic-card-hover border-white/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Sparkles className="text-blue-400 w-6 h-6" />
                <span className="translate-y-0.5">เลือกเผ่า (Race)</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Race</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {RACES.map((race) => (
                <button
                  key={race.name}
                  className={`px-4 py-2 rounded-lg border font-bold text-white transition-all duration-200 text-sm ${selectedRace?.name === race.name ? 'border-yellow-400 bg-yellow-500/10 shadow-lg' : 'border-white/10 bg-white/5 hover:border-yellow-400'}`}
                  onClick={() => setSelectedRace(race)}
                  type="button"
                >
                  {race.name}
                </button>
              ))}
            </div>
            {selectedRace && (
              <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-bold text-yellow-400 text-lg mb-1">{selectedRace.name}</div>
                <div className="text-white/80 text-sm mb-2">{selectedRace.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {Object.entries(selectedRace.baseStats).map(([stat, val]) => (
                    <span key={stat} className="px-2 py-0.5 rounded bg-white/10 text-[10px] text-white/60 font-bold uppercase">{stat}: {val}</span>
                  ))}
                </div>
                {selectedRace.modifiers && (
                  <div className="mt-1 text-xs text-white/60">
                    <b>Ability:</b> {Object.entries(selectedRace.modifiers).filter(([k]) => k !== 'tags').map(([k, v]) => `${k}: ${v}`).join(', ')}
                    {selectedRace.modifiers.tags && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedRace.modifiers.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-blue-500/20 text-[10px] text-blue-200 font-bold uppercase">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Base Stats Section */}
          <section className="magic-card magic-card-hover border-white/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Activity className="text-yellow-500 w-6 h-6" />
                <span className="translate-y-0.5">Base Attributes</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Base Stats</span>
            </div>

            <div className="mb-2 text-xs text-yellow-400 font-bold text-right">
              แต้มอัพทั้งหมด: {STAT_CAP} (เลเวล {LEVEL_CAP} x {POINTS_PER_LEVEL} + เผ่า {raceBonus > 0 ? `+${raceBonus}` : ''})<br />
              เหลือแต้มอัพ: {remainingPoints}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 py-2">
              {Object.keys(baseStats).map((stat) => {
                const key = stat as keyof BaseStats;
                const raceKeyMap: Record<keyof BaseStats, keyof import('../data/races').StatBlock> = {
                  strength: 'STR', arcane: 'ARC', endurance: 'END', speed: 'SPD', luck: 'LCK'
                };
                const raceVal = selectedRace ? ((selectedRace.baseStats[raceKeyMap[key]] || 0) + raceScaleIncrements) : 0;
                // Show total including class and equipment bonuses so UI matches displayed final stats
                const totalVal = (combinedBaseStats[key as keyof typeof combinedBaseStats] ?? 0) + (classBonuses[key as keyof typeof classBonuses] || 0) + (equipBonuses[key as keyof typeof equipBonuses] || 0);
                return (
                  <div key={stat} className="group flex flex-col items-center gap-3 p-4 bg-white/2 bg-opacity-2 rounded-2xl border border-white/5">
                    <label className="text-[11px] text-center font-bold text-white/40 uppercase tracking-[0.12em] flex items-center gap-2">
                      {statIcons[stat]}
                      {stat}
                    </label>
                    <div className="relative w-28 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/5">
                      <input
                        type="number"
                        value={baseStats[key]}
                        onChange={(e) => handleStatChange(key, e.target.value)}
                        className="bg-transparent text-2xl font-bold text-white text-center w-full h-full focus:outline-none"
                        placeholder="0"
                        min={0}
                        max={baseStats[key] + remainingPoints}
                      />
                    </div>
                    <div className="text-xs text-white/50 text-center">
                      <div>Race: <span className="font-semibold text-white/80">{raceVal}</span></div>
                      <div>Total: <span className="font-semibold text-white/80">{totalVal}</span></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Class Progression Section */}
          <section className="magic-card magic-card-hover border-white/3 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Sparkles className="text-purple-400 w-6 h-6" />
                <span className="translate-y-0.5">เส้นทางอาชีพ</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Class Progression</span>
            </div>

            {/* 1. Base Class Selection */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">1</span>
                Base Class
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {CLASSES.filter(c => c.type === 'Base').map((cls) => (
                  <button
                    key={cls.name}
                    onClick={() => setBaseClass(cls)}
                    className={`relative p-4 rounded-xl border transition-all duration-300 group overflow-hidden text-left ${baseClass?.name === cls.name
                      ? 'border-yellow-500/50 bg-yellow-500/10'
                      : 'border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20'
                      }`}
                  >
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${baseClass?.name === cls.name ? 'text-yellow-500' : 'text-white/30'
                      }`}>
                      Base
                    </div>
                    <div className={`font-bold transition-all ${baseClass?.name === cls.name ? 'text-white' : 'text-white/70'
                      }`}>
                      {cls.name}
                    </div>
                    {baseClass?.name === cls.name && (
                      <motion.div layoutId="base-glow" className="absolute inset-0 bg-yellow-500/5 blur-md -z-10" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Path chooser removed — Super classes display directly from selected Base */}


            {/* 3. Super Class Selection */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">3</span>
                Super Class
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {CLASSES.filter(c =>
                  c.type === 'Super' &&
                  baseClass && c.derivedFrom?.includes(baseClass.name)
                ).map((cls) => {
                  const path = (cls.path || 'Neutral') as 'Orderly' | 'Neutral' | 'Chaotic';
                  const active = superClass?.name === cls.name;
                  const pathActiveClass = path === 'Orderly'
                    ? 'border-blue-400/50 bg-blue-500/10'
                    : path === 'Chaotic'
                      ? 'border-red-500/50 bg-red-500/10'
                      : 'border-yellow-400/50 bg-yellow-500/10';
                  const headerTextClass = path === 'Orderly' ? 'text-blue-400' : path === 'Chaotic' ? 'text-red-400' : 'text-yellow-400';

                  return (
                    <button
                      key={cls.name}
                      onClick={() => { setSuperClass(cls); setClassPath(path); }}
                      className={`relative p-4 rounded-xl border transition-all duration-300 group overflow-hidden text-left ${active ? pathActiveClass : 'border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20'}`}
                    >
                      <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${active ? headerTextClass : 'text-white/30'}`}>
                        Super
                      </div>
                      <div className={`font-bold transition-all ${active ? 'text-white' : 'text-white/70'}`}>
                        {cls.name}
                      </div>
                    </button>
                  );
                })}
                {CLASSES.filter(c =>
                  c.type === 'Super' &&
                  baseClass && c.derivedFrom?.includes(baseClass.name)
                ).length === 0 && (
                    <div className="col-span-2 lg:col-span-4 text-center py-8 text-white/20 text-sm border border-dashed border-white/10 rounded-xl">
                      No compatible Super Classes found for {baseClass?.name}
                    </div>
                  )}
              </div>
            </div>

            {/* 4. Sub Class Selection */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs text-white">4</span>
                Sub Class (Optional)
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {CLASSES.filter(c => c.type === 'Sub').map((cls) => (
                  <button
                    key={cls.name}
                    onClick={() => setSubClass(subClass?.name === cls.name ? null : cls)}
                    className={`relative p-4 rounded-xl border transition-all duration-300 group overflow-hidden text-left ${subClass?.name === cls.name
                      ? 'border-green-400/50 bg-green-500/10'
                      : 'border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/20'
                      }`}
                  >
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${subClass?.name === cls.name ? 'text-green-400' : 'text-white/30'
                      }`}>
                      Sub
                    </div>
                    <div className={`font-bold transition-all ${subClass?.name === cls.name ? 'text-white' : 'text-white/70'
                      }`}>
                      {cls.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
              {baseClass && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-sm border-l-2 border-yellow-500/30 pl-4">
                  <span className="text-yellow-500 font-bold block text-xs uppercase tracking-widest mb-1">{baseClass.name}</span>
                  {baseClass.description}
                </motion.p>
              )}
              {superClass && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-white/40 text-sm border-l-2 pl-4 ${classPath === 'Orderly' ? 'border-blue-500/30' : classPath === 'Chaotic' ? 'border-red-500/30' : 'border-yellow-500/30'}`}>
                  <span className={`font-bold block text-xs uppercase tracking-widest mb-1 ${classPath === 'Orderly' ? 'text-blue-400' : classPath === 'Chaotic' ? 'text-red-400' : 'text-yellow-400'}`}>{superClass.name}</span>
                  {superClass.description}
                </motion.p>
              )}
              {subClass && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white/40 text-sm border-l-2 border-green-500/30 pl-4">
                  <span className="text-green-500 font-bold block text-xs uppercase tracking-widest mb-1">{subClass.name}</span>
                  {subClass.description}
                </motion.p>
              )}
            </div>

          </section>

          {/* Arsenal Section */}
          <section className="magic-card magic-card-hover border-white/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Sword className="text-blue-400 w-6 h-6" />
                <span className="translate-y-0.5">Arsenal & Relics</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Weapons & Gear</span>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weapon Slot */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] px-1">Weapon</label>
                  <div className="relative group">
                    <select
                      className="premium-input appearance-none cursor-pointer pr-10 group-hover:border-white/20"
                      onChange={(e) => {
                        const item = EQUIPMENT.find(i => i.name === e.target.value);
                        setWeapon(item || null);
                      }}
                      value={weapon?.name || ""}
                    >
                      <option value="" className="bg-zinc-900">None</option>
                      {EQUIPMENT.filter(e => e.slot === 'Weapon').map(item => (
                        <option key={item.name} value={item.name} className="bg-zinc-900">{item.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-white/40 transition-colors">
                      <Sword className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Armor Slot */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] px-1">Armor</label>
                  <div className="relative group">
                    <select
                      className="premium-input appearance-none cursor-pointer pr-10 group-hover:border-white/20"
                      onChange={(e) => {
                        const item = EQUIPMENT.find(i => i.name === e.target.value);
                        setArmor(item || null);
                      }}
                      value={armor?.name || ""}
                    >
                      <option value="" className="bg-zinc-900">None</option>
                      {EQUIPMENT.filter(e => e.slot === 'Armor').map(item => (
                        <option key={item.name} value={item.name} className="bg-zinc-900">{item.name}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-white/40 transition-colors">
                      <Shield className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessory Slots (4) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                {[0, 1, 2, 3].map((index) => (
                  <div key={`acc-${index}`} className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] px-1">Gear Slot {index + 1}</label>
                    <div className="relative group">
                      <select
                        className="premium-input appearance-none cursor-pointer pr-10 group-hover:border-white/20"
                        onChange={(e) => {
                          const item = EQUIPMENT.find(i => i.name === e.target.value);
                          const newAcc = [...accessories];
                          newAcc[index] = item || null;
                          setAccessories(newAcc);
                        }}
                        value={accessories[index]?.name || ""}
                      >
                        <option value="" className="bg-zinc-900">Empty Slot</option>
                        {EQUIPMENT.filter(e => e.slot === 'Accessory').map(item => (
                          <option key={item.name} value={item.name} className="bg-zinc-900">{item.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 group-hover:text-white/40 transition-colors">
                        <Dice5 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Status Scroll: Right Column */}
        <div className="lg:col-span-4 lg:sticky lg:top-12 h-fit space-y-8">
          <section className="magic-card p-0! overflow-hidden border-yellow-500/20 stat-glow-orange">
            <div className="bg-linear-to-br from-yellow-500 to-yellow-600 p-6">
              <h2 className="text-2xl font-maitree font-black text-black flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span className="translate-y-0.5">Final Build Output</span>
              </h2>
              <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest mt-1">Total Stats Calculation</p>
            </div>

            <div className="p-8 space-y-6">
              <StatDisplay
                label="Max Vitality"
                value={Math.round(finalStats.health)}
                icon={<Heart className="text-red-500" />}
                sublabel="HP"
                glowClass="stat-glow-red"
              />
              <StatDisplay
                label="Physical Force"
                value={finalStats.physicalDamage.toFixed(1) + '%'}
                icon={<Sword className="text-orange-400" />}
                sublabel="ATK%"
                glowClass="stat-glow-orange"
              />
              <StatDisplay
                label="Ranged Damage"
                value={finalStats.magicDamage.toFixed(1) + '%'}
                icon={<Sparkles className="text-blue-400" />}
                sublabel="RNG%"
                glowClass="stat-glow-blue"
              />
              <div className="grid grid-cols-2 gap-4">
                <StatDisplay
                  label="Critical Fate"
                  value={`${finalStats.critChance.toFixed(1)}%`}
                  icon={<Target className="text-green-400" />}
                  sublabel="CRI%"
                  glowClass="stat-glow-green"
                  compact
                />
                <StatDisplay
                  label="Divine Multiplier"
                  value={`${finalStats.critDamage.toFixed(2)}x`}
                  icon={<Dice5 className="text-emerald-400" />}
                  sublabel="MULT"
                  glowClass="stat-glow-emerald"
                  compact
                />
              </div>

              {/* Advanced Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <StatDisplay
                  label="Phys Defense"
                  value={finalStats.physicalDefense}
                  icon={<Shield className="text-gray-400" />}
                  sublabel="DEF"
                  glowClass=""
                  compact
                />
                <StatDisplay
                  label="Magic Resist"
                  value={finalStats.magicDefense}
                  icon={<Shield className="text-purple-400" />}
                  sublabel="RES"
                  glowClass=""
                  compact
                />
                <StatDisplay
                  label="HP Regen"
                  value={finalStats.hpRegen}
                  icon={<Activity className="text-red-400" />}
                  sublabel="HPR"
                  glowClass=""
                  compact
                />
                <StatDisplay
                  label="Energy Regen"
                  value={finalStats.energyRegen}
                  icon={<Zap className="text-yellow-400" />}
                  sublabel="ENR"
                  glowClass=""
                  compact
                />
              </div>

              {/* Passive Effects List */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Passive Effects</h3>
                <div className="space-y-2">
                  {[weapon, armor, ...accessories].flatMap(i => i?.passiveEffects || []).map((effect, idx) => (
                    <div key={idx} className="text-xs text-white/80 bg-white/5 px-3 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-arcane-gold" />
                      {effect}
                    </div>
                  ))}
                  {[weapon, armor, ...accessories].every(i => !i?.passiveEffects) && (
                    <div className="text-xs text-white/20 italic">No passive effects active</div>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block">Attribute Total</span>
                    <span className="text-4xl font-maitree font-bold gold-text">
                      {Object.values(baseStats).reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block">Status</span>
                    <span className="text-sm font-bold text-arcane-gold px-3 py-1 bg-yellow-500/5 rounded-full border border-yellow-500/20">
                      Transcended
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="btn-magic btn-magic-gold w-full py-4 text-base font-maitree font-bold"
                >
                  Save Build Snapshot
                </button>
              </div>
            </div>
          </section>

          <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] py-4">
            © 2026 Arcane Lineage Build Maker
          </p>
        </div>
      </div>
    </main>
  );
}

function StatDisplay({ label, value, icon, sublabel, glowClass, compact }: { label: string, value: string | number, icon: React.ReactNode, sublabel: string, glowClass: string, compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`${compact ? 'p-3' : 'p-5'} rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between transition-all duration-300 hover:bg-white/7 hover:border-white/10 ${glowClass}`}
    >
      <div className="flex items-center gap-3">
        <div className={`${compact ? 'p-2' : 'p-3'} bg-white/4 rounded-xl border border-white/5`}>
          {icon}
        </div>
        {!compact && (
          <div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-0.5">{label}</span>
            <span className="text-xs font-bold text-white/50">{sublabel}</span>
          </div>
        )}
      </div>
      <div className="text-right">
        {compact && <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest block mb-0.5">{sublabel}</span>}
        <span className={`${compact ? 'text-lg' : 'text-2xl'} font-bold font-prompt text-white tabular-nums`}>{value}</span>
      </div>
    </motion.div>
  );
}
