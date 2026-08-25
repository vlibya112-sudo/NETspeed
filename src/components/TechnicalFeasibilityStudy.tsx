import React, { useState } from 'react';
import { 
  BookOpen, 
  Server, 
  DollarSign, 
  Clock, 
  Search, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Code2, 
  Zap, 
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { TECH_LIBRARIES_ANALYSIS } from '../data/mockData';

export const TechnicalFeasibilityStudy: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'stack' | 'adsense' | 'dwell' | 'seo' | 'launch'>('stack');

  return (
    <div className="w-full space-y-8">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
          <BookOpen className="w-4 h-4" />
          <span>دراسة الجدوى الفنية والتجارية وخطة العمل المتكاملة 2026</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-black text-white leading-snug">
          مشروع منصة قياس سرعة الإنترنت المجانية: هندسة تقليل التكلفة ومضاعفة أرباح AdSense والسيو
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          دليل تنفيذي شامل يغطي أفضل المكتبات البرمجية مفتوحة المصدر، معمارية السيرفر المجاني (Zero-Cost Serverless)، استراتيجية أماكن الإعلانات عالية العائد، وأدوات زيادة وقت البقاء إلى أكثر من دقيقتين ونصف، وهيكلية تصدر محركات البحث.
        </p>

        {/* Quick Highlights Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400">تكلفة الاستضافة الشهرية</div>
            <div className="text-lg font-black font-mono text-emerald-400">$0.00 / شهر</div>
            <div className="text-[10px] text-slate-500">Cloudflare Pages + Workers</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400">متوسط وقت البقاء (Dwell Time)</div>
            <div className="text-lg font-black font-mono text-cyan-400">2:45 دقيقة</div>
            <div className="text-[10px] text-slate-500">بفضل أدوات الألعاب والمقارنات</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400">معدل العائد (RPM الخليج)</div>
            <div className="text-lg font-black font-mono text-amber-400">$12 - $18</div>
            <div className="text-[10px] text-slate-500">لوحدة الانتظار + Sticky</div>
          </div>
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-slate-400">سرعة التحميل (PageSpeed)</div>
            <div className="text-lg font-black font-mono text-purple-400">98 / 100</div>
            <div className="text-[10px] text-slate-500">صفر استهلاك للسيرفر الرئيسي</div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs for Study Sections */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {[
          { id: 'stack', label: '1. التقنيات والتكلفة ($0 Hosting)', icon: Server },
          { id: 'adsense', label: '2. خطة توزيع إعلانات AdSense', icon: DollarSign },
          { id: 'dwell', label: '3. ميزات مضاعفة وقت البقاء', icon: Clock },
          { id: 'seo', label: '4. معمارية السيو وصفحات الهبوط', icon: Search },
          { id: 'launch', label: '5. خارطة طريق الإطلاق والنمو', icon: Zap }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === tab.id
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: TECH STACK & HOSTING COST */}
      {activeSection === 'stack' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-500" />
              <span>أفضل المكتبات البرمجية مفتوحة المصدر (Client-Side Speedtest)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              لتخفيض تكلفة الاستضافة إلى الصفر أو بضعة دولارات، يجب أن يعتمد فحص السرعة على <strong>جهة العميل (Client-side)</strong> بحيث يقوم المتصفح بتحميل بايتات صغيرة من أقرب خادم كاش (CDN) دون معالجة مكلفة في سيرفر الموقع الأساسي.
            </p>

            {/* Analysis Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {TECH_LIBRARIES_ANALYSIS.map((lib, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {lib.name}
                      </h3>
                      <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">{lib.license}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                      {lib.stars}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {lib.pros.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-100 dark:border-cyan-900/50 text-[11px] text-cyan-800 dark:text-cyan-200">
                    <strong>الخلاصة والتوصية:</strong> {lib.recommendedRole}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zero-Cost Serverless Blueprint */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-500" />
              <span>معمارية الاستضافة بتكلفة $0.00 (Zero-Cost Server Architecture)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm text-cyan-600">
                  1. الواجهة الأمامية (Frontend)
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  استضافة React / Vite على <strong>Cloudflare Pages</strong> أو <strong>Vercel</strong> مجاناً مع باندويث غير محدود وشبكة توزيع عالمية (CDN).
                </p>
                <div className="text-[11px] font-bold text-emerald-600 font-mono">التكلفة: $0.00 / شهر</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm text-cyan-600">
                  2. نقاط نهاية القياس (Test Endpoints)
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  استخدام <strong>Cloudflare Workers</strong> لتوليد بايتات عشوائية (Random Payload Chunks) للداونلود واستقبالها للأبلود دون الحاجة لسيرفر VPS ضخم.
                </p>
                <div className="text-[11px] font-bold text-emerald-600 font-mono">التكلفة: $0.00 (100k طلب يومياً)</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white text-sm text-cyan-600">
                  3. حماية الترافيك و SSL
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  تفعيل Cloudflare DDoS Protection و Brotli Compression و Early Hints لتخفيض زمن أول بايت (TTFB) لأقل من 30ms.
                </p>
                <div className="text-[11px] font-bold text-emerald-600 font-mono">التكلفة: $0.00 مجاناً</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ADSENSE STRATEGY */}
      {activeSection === 'adsense' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span>تكتيك استغلال نافذة الـ 15 ثانية (The 15-Second Test Window Strategy)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              عندما ينقر الزائر على "ابدأ الفحص"، يتجمد انتباهه بالكامل على الشاشة لمدة 15 إلى 20 ثانية لمتابعة عقرب السرعة. هذه أعلى فرصة بصرية (Ad Viewability Rate) في عالم الويب (تتجاوز 90%).
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>كيف نصمم مساحة الفحص دون كسر سياسات جوجل أدسنس؟</span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 leading-relaxed pr-2">
                <li><strong>وحدة أسفل العداد (336x280 Large Rectangle):</strong> توضع أسفل مؤشرات التنزيل والرفع بمسافة آمنة (لا تقل عن 100px) عن زر الفحص لمنع النقرات الخاطئة (Accidental Clicks).</li>
                <li><strong>حجز المساحة الثابتة (CLS Reservation):</strong> يمنع قفز العداد لأعلى أو لأسفل عند اكتمال تحميل الإعلان مما يحمي تقييم تجربة المستخدم.</li>
                <li><strong>التجديد الذكي للإعلان (Active-View Refresh):</strong> بعد انتهاء الفحص وظهور نتيجة الألعاب، يمكن تجديد الوحدة الإعلانية بشكل متوافق تماماً مع Google Publisher Policies لرفع الـ Impressions.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: DWELL TIME ENHANCERS */}
      {activeSection === 'dwell' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-500" />
              <span>ميزات رفع وقت البقاء (Dwell Time) من 15 ثانية إلى 3 دقائق</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              محركات البحث وأدسنس يفضلان المواقع التي يقضي فيها الزائر وقتاً طويلاً. هذه هي الميزات الـ 4 السحرية التي تجعل الزائر يتفاعل بعد ظهور السرعة:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 text-cyan-600">
                  <Sparkles className="w-4 h-4" /> 1. مصفوفة توافق الألعاب (Gaming Matrix)
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  تحويل الأرقام الجافة إلى إجابة فورية: "هل خطي يشغل ببجي بدون لاج؟ هل مناسب لفيفا و 4K نتفلكس؟" الزائر يقضي 45 ثانية يقرأ تفاصيل كل لعبة.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 text-cyan-600">
                  <ShieldCheck className="w-4 h-4" /> 2. شهادة وبطاقة السرعة القابلة للمشاركة
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  توليد بطاقة رقمية بـ Grade A+ يمكن للزائر نسخها أو مشاركتها على تويتر وواتساب للتفاخر بسرعته أو الشكوى من ضعف مزود الخدمة، مما يجلب زواراً جدد مجاناً.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 text-cyan-600">
                  <TrendingUp className="w-4 h-4" /> 3. مراجعات وتصويت مزودي الخدمة
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  مقارنة حية بين STC وزين وموبايلي و WE مع إمكانية كتابة تقييم الزائر، مما يحفز المشاركة ويزيد من وقت التصفح.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2 text-cyan-600">
                  <Zap className="w-4 h-4" /> 4. أداة فحص وتسريع الواي فاي التفاعلية
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  قائمة تحقق تفاعلية (Checklist) تتيح للزائر تجربة خطوات مثل تغيير الـ DNS إلى 1.1.1.1 واختبار سرعة خطه مجدداً لملاحظة الفرق.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: SEO ARCHITECTURE */}
      {activeSection === 'seo' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-500" />
              <span>هندسة السيو وتصدر نتائج البحث الأولى (Topical Authority)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              كيف ننافس المواقع القديمة ونتصدر كلمات مثل "قياس سرعة نت زين" و "قياس سرعة STC"؟
            </p>

            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  1. صفحات هبوط مخصصة لكل مزود (Targeted Landing Pages)
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  بدلاً من الاعتماد على صفحة رئيسية واحدة فقط، نقوم بإنشاء صفحات مخصصة مثل <code>/speed-test-stc</code> و <code>/speed-test-zain</code> مع محتوى متخصص ونصائح فريدة لكل شبكة.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  2. الاستحواذ على الـ Featured Snippets عبر FAQ Schema
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  تضمين الأسئلة التي يبحث عنها المستخدمون في جوجل (مثل "كيف أرفع سرعة راوتر زين 5G؟") مع كود JSON-LD مهيكل يجعل جوجل يضع موقعنا في صندوق الإجابة الفورية #0.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  3. سرعة Core Web Vitals خارقة
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  المواقع القديمة مليئة بالفلاش والسكربتات الثقيلة. موقعنا الخفيف المبني بـ React و Tailwind و Web Workers يحقق درجة 95+ في Google Lighthouse مما يمنحه دفعة ترتيب فورية.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: LAUNCH ROADMAP */}
      {activeSection === 'launch' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-500" />
              <span>خارطة طريق الإطلاق من اليوم الأول حتى $3,000+ شهرياً</span>
            </h2>

            <div className="relative border-r-2 border-cyan-500/30 pr-6 space-y-6 text-xs">
              <div className="relative">
                <div className="absolute -right-[31px] top-0 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-cyan-100 dark:ring-cyan-950" />
                <div className="font-bold text-slate-900 dark:text-white text-sm">الأسبوع 1: النشر والتأهيل لـ AdSense</div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  نشر الموقع على نطاق مميز (مثل netspeed.pro أو speedcheck.me) وإضافة مقالات توعوية وصفحات سياسة الخصوصية ومن نحن والشروط للقبول الفوري في Google AdSense.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -right-[31px] top-0 w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-950" />
                <div className="font-bold text-slate-900 dark:text-white text-sm">الشهر 1 - 2: بناء السيو والباك لينك</div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  نشر الموقع في منتديات التقنية العربية (البوابة الرقمية، تيك كرانش، مجموعات فيسبوك للألعاب) لنيل أول 50,000 زائر شهرياً وبناء الثقة في خوارزميات جوجل.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -right-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                <div className="font-bold text-slate-900 dark:text-white text-sm">الشهر 3 - 6: التوسع والربحية الثابتة</div>
                <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  تصدر الكلمات الرئيسية في السعودية ومصر والإمارات، وتحقيق أكثر من 300,000 زائر شهرياً مع أرباح أدسنس تتجاوز $2,500 إلى $5,000 شهرياً بتكلفة خوادم $0.00.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
