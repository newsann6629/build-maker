"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Shield, Zap, Sparkles, Heart, Activity, Dice5, Target } from 'lucide-react';
import { CLASSES, GameClass } from '@/data/classes';
import { EQUIPMENT, Equipment } from '@/data/equipment';
import { calculateStats, BaseStats } from '@/data/formulas';

import { useTheme } from '@/components/ThemeContext';

export default function BuildMaker() {
  const { theme, toggleTheme } = useTheme();

  // Base Stats State
  const [baseStats, setBaseStats] = useState<BaseStats>({
    strength: 0,
    arcane: 0,
    endurance: 0,
    speed: 0,
    luck: 0
  });

  // Selection State
  const [selectedClass, setSelectedClass] = useState<GameClass>(CLASSES[0]);
  const [weapon, setWeapon] = useState<Equipment | null>(null);
  const [armor, setArmor] = useState<Equipment | null>(null);
  const [accessories, setAccessories] = useState<(Equipment | null)[]>([null, null, null, null]);

  // Derived Selection Logic
  const classBonuses = useMemo(() => {
    return {
      strength: selectedClass.statBonuses.strength || 0,
      arcane: selectedClass.statBonuses.arcane || 0,
      endurance: selectedClass.statBonuses.endurance || 0,
      speed: selectedClass.statBonuses.speed || 0,
      luck: selectedClass.statBonuses.luck || 0,
    };
  }, [selectedClass]);

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

  const finalStats = useMemo(() => {
    return calculateStats(baseStats, classBonuses, equipBonuses);
  }, [baseStats, classBonuses, equipBonuses]);

  const handleStatChange = (stat: keyof BaseStats, value: string) => {
    const num = Math.max(0, parseInt(value) || 0);
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
      {/* Premium Header */}
      <header className="mb-16 text-center relative pointer-events-none">
        {/* Toggle Switch */}
        <div className="absolute top-0 right-0 pointer-events-auto">
          <button
            onClick={toggleTheme}
            className="relative group flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
          >
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${theme === 'orderly' ? 'text-blue-400' : 'text-gray-500'}`}>Orderly</span>
            <div className="w-12 h-6 rounded-full bg-black/50 border border-white/10 relative p-1">
              <motion.div
                className={`w-4 h-4 rounded-full shadow-lg ${theme === 'orderly' ? 'bg-blue-400 shadow-blue-500/50' : 'bg-red-500 shadow-red-500/50'}`}
                animate={{ x: theme === 'orderly' ? 0 : 22 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
            <span className={`text-xs font-bold tracking-widest uppercase transition-colors ${theme === 'chaotic' ? 'text-red-500' : 'text-gray-500'}`}>Chaotic</span>
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 blur-[100px] rounded-full -z-10 transition-colors duration-1000"
          style={{ backgroundColor: theme === 'orderly' ? 'var(--color-arcane-glow)' : 'rgba(239, 68, 68, 0.1)' }} />
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-bold gold-text mb-6 tracking-tighter drop-shadow-2xl">
            Arcane Build Maker
          </h1>
          <div className="flex items-center justify-center gap-4 text-white/40 font-light tracking-[0.2em] uppercase text-xs md:text-sm">
            <span className="w-8 h-[1px] bg-white/10" />
            Forge Your Destiny • Arcanes Lineage
            <span className="w-8 h-[1px] bg-white/10" />
          </div>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Interface: Left Column */}
        <div className="lg:col-span-8 space-y-10">

          {/* Base Stats Section */}
          <section className="magic-card magic-card-hover border-white/[0.03]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Activity className="text-yellow-500 w-6 h-6" />
                <span className="translate-y-0.5">คุณลักษณะพื้นฐาน</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Base Attributes</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {Object.keys(baseStats).map((stat) => (
                <div key={stat} className="group flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.15em] flex items-center gap-1.5 px-1">
                    {statIcons[stat]}
                    {stat}
                  </label>
                  <input
                    type="number"
                    value={baseStats[stat as keyof BaseStats]}
                    onChange={(e) => handleStatChange(stat as keyof BaseStats, e.target.value)}
                    className="premium-input text-lg font-semibold group-hover:border-white/20"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Specialization Section */}
          <section className="magic-card magic-card-hover border-white/[0.03]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Sparkles className="text-purple-400 w-6 h-6" />
                <span className="translate-y-0.5">สายอาชีพอาคม</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Specialization</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {CLASSES.map((cls) => (
                <button
                  key={cls.name}
                  onClick={() => setSelectedClass(cls)}
                  className={`relative p-5 rounded-2xl border transition-all duration-500 group overflow-hidden ${selectedClass.name === cls.name
                    ? 'border-yellow-500/50 bg-yellow-500/5'
                    : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                >
                  {selectedClass.name === cls.name && (
                    <motion.div layoutId="class-glow" className="absolute inset-0 bg-yellow-500/5 blur-xl -z-10" />
                  )}
                  <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 transition-colors ${selectedClass.name === cls.name ? 'text-yellow-500' : 'text-white/30'
                    }`}>
                    {cls.type}
                  </div>
                  <div className={`text-sm font-bold transition-all ${selectedClass.name === cls.name ? 'text-white scale-105' : 'text-white/70'
                    }`}>
                    {cls.name}
                  </div>
                </button>
              ))}
            </div>
            <motion.p
              key={selectedClass.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-white/40 text-sm leading-relaxed border-l-2 border-yellow-500/30 pl-4 italic font-prompt"
            >
              {selectedClass.description}
            </motion.p>
          </section>

          {/* Arsenal Section */}
          <section className="magic-card magic-card-hover border-white/[0.03]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-maitree font-bold text-white flex items-center gap-3">
                <Sword className="text-blue-400 w-6 h-6" />
                <span className="translate-y-0.5">คลังศาสตรา</span>
              </h2>
              <span className="text-white/20 text-xs font-mono tracking-widest uppercase">Arsenal & Relics</span>
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
          <section className="magic-card !p-0 overflow-hidden border-yellow-500/20 stat-glow-orange">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6">
              <h2 className="text-2xl font-maitree font-black text-black flex items-center gap-2">
                <Target className="w-6 h-6" />
                <span className="translate-y-0.5">ผลลัพธ์อาวุธยุทโธปกรณ์</span>
              </h2>
              <p className="text-black/60 text-[10px] font-bold uppercase tracking-widest mt-1">Final Build Output</p>
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
                value={finalStats.physicalDamage.toFixed(1)}
                icon={<Sword className="text-orange-400" />}
                sublabel="ATK"
                glowClass="stat-glow-orange"
              />
              <StatDisplay
                label="Etheric Power"
                value={finalStats.magicDamage.toFixed(1)}
                icon={<Sparkles className="text-blue-400" />}
                sublabel="MAG"
                glowClass="stat-glow-blue"
              />
              <div className="grid grid-cols-2 gap-4">
                <StatDisplay
                  label="Critical Fate"
                  value={`${finalStats.critChance.toFixed(1)}%`}
                  icon={<Target className="text-green-400" />}
                  sublabel="CRI"
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
                  บันทึกประวัติการสร้างอาวุธ
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
      className={`${compact ? 'p-3' : 'p-5'} rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-between transition-all duration-300 hover:bg-white/[0.07] hover:border-white/10 ${glowClass}`}
    >
      <div className="flex items-center gap-3">
        <div className={`${compact ? 'p-2' : 'p-3'} bg-white/[0.04] rounded-xl border border-white/5`}>
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
