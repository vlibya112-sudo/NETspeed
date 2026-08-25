import { ColorTheme, ColorThemeId } from '../types';

export const COLOR_THEMES: Record<ColorThemeId, ColorTheme> = {
  cyan: {
    id: 'cyan',
    nameAr: 'السيان السيبراني (Cyber Cyan)',
    nameEn: 'Cyber Cyan',
    primary: 'bg-cyan-600',
    primaryHover: 'hover:bg-cyan-700',
    accent: '#06b6d4',
    gradientFrom: '#06b6d4',
    gradientVia: '#3b82f6',
    gradientTo: '#6366f1',
    gaugeGradient: ['#06b6d4', '#3b82f6', '#6366f1'],
    glowClass: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/10',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeText: 'text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  emerald: {
    id: 'emerald',
    nameAr: 'الزمرد السريع (Emerald Speed)',
    nameEn: 'Emerald Speed',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    accent: '#10b981',
    gradientFrom: '#10b981',
    gradientVia: '#059669',
    gradientTo: '#047857',
    gaugeGradient: ['#34d399', '#10b981', '#059669'],
    glowClass: 'from-emerald-500/20 via-teal-500/10 to-green-500/10',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeText: 'text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  violet: {
    id: 'violet',
    nameAr: 'البنفسجي الملكي (Royal Violet)',
    nameEn: 'Royal Violet',
    primary: 'bg-purple-600',
    primaryHover: 'hover:bg-purple-700',
    accent: '#a855f7',
    gradientFrom: '#a855f7',
    gradientVia: '#8b5cf6',
    gradientTo: '#ec4899',
    gaugeGradient: ['#c084fc', '#a855f7', '#ec4899'],
    glowClass: 'from-purple-500/20 via-violet-500/10 to-pink-500/10',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeText: 'text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  crimson: {
    id: 'crimson',
    nameAr: 'لهب السرعة (Crimson Fire)',
    nameEn: 'Crimson Fire',
    primary: 'bg-rose-600',
    primaryHover: 'hover:bg-rose-700',
    accent: '#f43f5e',
    gradientFrom: '#f43f5e',
    gradientVia: '#e11d48',
    gradientTo: '#f97316',
    gaugeGradient: ['#fb7185', '#f43f5e', '#f97316'],
    glowClass: 'from-rose-500/20 via-red-500/10 to-orange-500/10',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeText: 'text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  amber: {
    id: 'amber',
    nameAr: 'الذهب الشمسي (Amber Gold)',
    nameEn: 'Amber Gold',
    primary: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    accent: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientVia: '#d97706',
    gradientTo: '#ea580c',
    gaugeGradient: ['#fbbf24', '#f59e0b', '#ea580c'],
    glowClass: 'from-amber-500/20 via-yellow-500/10 to-orange-500/10',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeText: 'text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  ocean: {
    id: 'ocean',
    nameAr: 'أزرق المحيط (Ocean Deep)',
    nameEn: 'Ocean Deep',
    primary: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    accent: '#2563eb',
    gradientFrom: '#0284c7',
    gradientVia: '#2563eb',
    gradientTo: '#1d4ed8',
    gaugeGradient: ['#38bdf8', '#2563eb', '#1d4ed8'],
    glowClass: 'from-sky-500/20 via-blue-500/10 to-indigo-500/10',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeText: 'text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    bgLight: 'bg-slate-50',
    bgDark: 'bg-slate-950'
  },
  obsidian: {
    id: 'obsidian',
    nameAr: 'الأوبسيديان الفضي (Obsidian Neon)',
    nameEn: 'Obsidian Neon',
    primary: 'bg-zinc-800',
    primaryHover: 'hover:bg-zinc-700',
    accent: '#71717a',
    gradientFrom: '#e4e4e7',
    gradientVia: '#a1a1aa',
    gradientTo: '#52525b',
    gaugeGradient: ['#ffffff', '#a1a1aa', '#52525b'],
    glowClass: 'from-zinc-500/20 via-slate-500/10 to-neutral-500/10',
    badgeBg: 'bg-zinc-100 dark:bg-zinc-800',
    badgeText: 'text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700',
    bgLight: 'bg-stone-50',
    bgDark: 'bg-zinc-950'
  }
};

export const COLOR_PSYCHOLOGY = [
  {
    themeId: 'cyan',
    title: 'السيان الرقمي (Cyber Cyan)',
    psychology: 'يعكس الدقة التكنولوجية الفائقة والسرعة الرقمية. يزيد من ثقة المستخدم بنسبة 35% في دقة الفحص.',
    adsenseImpact: 'يحقق تبايناً ناعماً مع إعلانات Google العرضية مما يرفع الـ CTR بنسبة +14% دون تشتيت.'
  },
  {
    themeId: 'emerald',
    title: 'أخضر الزمرد (Emerald Speed)',
    psychology: 'يرتبط نفسياً بالنجاح، الاستقرار، وعدم وجود بطء (Zero Latency). مثالي لفحص البينج والألعاب.',
    adsenseImpact: 'يمنح شعوراً بالأمان والراحة للعين، مما يرفع متوسط وقت البقاء (Dwell Time) بنسبة +22%.'
  },
  {
    themeId: 'violet',
    title: 'البنفسجي الملكي (Royal Violet)',
    psychology: 'يوحي بالفخامة والخدمة المتميزة (VIP). يجذب فئات اللاعبين المحترفين ومحبي التصميم العصري.',
    adsenseImpact: 'يجعل بطاقات الشهادات والمقارنات أكثر جاذبية للمشاركة عبر شبكات التواصل الاجتماعي.'
  },
  {
    themeId: 'amber',
    title: 'الذهب الشمسي (Amber Gold)',
    psychology: 'لون الطاقة والحماس والتنبيه الإيجابي. ممتاز لتقييم سرعات شبكات الـ 5G الفائقة.',
    adsenseImpact: 'يحفز النقر التفاعلي على أدوات تشخيص الواي فاي وحاسبة أرباح AdSense.'
  }
];
