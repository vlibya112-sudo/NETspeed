import React from 'react';
import { Gauge, ShieldCheck, Heart, Sparkles, Globe, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onSelectView: (view: 'test' | 'dwell' | 'adsense' | 'seo' | 'study') => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 mt-20 pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-black text-base">
              <div className="w-8 h-8 rounded-lg bg-cyan-600 flex items-center justify-center text-white">
                <Gauge className="w-4 h-4" />
              </div>
              <span>NetSpeed PRO</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              المنصة العربية والعالمية الأولى لقياس سرعة الإنترنت بدقة عالية مع تحليل كامل لملاءمة الألعاب والبث ومقارنة مزودي الاتصالات.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>متوافق 100% مع معايير Google Publisher & Core Web Vitals</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">أدوات الفحص والتحليل</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectView('test')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  فحص سرعة الإنترنت 5G & Fiber
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('dwell')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  اختبار البينج لألعاب ببجي وفيفا وكود
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('dwell')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  مسرّع وتشخيص الواي فاي (Wi-Fi Booster)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('dwell')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  مقارنة شركات الاتصالات العربية
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: SEO Pages & Networks */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">صفحات قياس سرعة المزودين</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectView('seo')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  قياس سرعة نت STC السعودية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('seo')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  قياس سرعة نت زين Zain 5G
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('seo')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  قياس سرعة موبايلي إي لايف Mobily
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('seo')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  قياس سرعة نت وي WE مصر VDSL
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Feasibility & AdSense Blueprint */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">دراسة الجدوى والاستثمار</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectView('study')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  خطة السيرفر المجاني ($0 Serverless Stack)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('adsense')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  خريطة توزيع إعلانات AdSense وحاسبة العائد
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('study')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  استراتيجية مضاعفة الـ Dwell Time لـ 3 دقائق
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectView('study')}
                  className="hover:text-cyan-400 transition cursor-pointer"
                >
                  خطة تصدر السيو (Programmatic SEO)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 NetSpeed Pro. جميع الحقوق محفوظة • مشروع مفتوح المصدر بتكلفة استضافة صفرية.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 transition cursor-pointer">سياسة الخصوصية (Privacy Policy)</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition cursor-pointer">شروط الاستخدام (Terms)</span>
            <span>•</span>
            <span className="hover:text-slate-400 transition cursor-pointer">ملفات الكوكيز وإعلانات Google</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
