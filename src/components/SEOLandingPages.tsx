import React, { useState } from 'react';
import { 
  Search, 
  Globe, 
  Code2, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  FileText, 
  ExternalLink 
} from 'lucide-react';
import { SEO_LANDING_PAGES } from '../data/mockData';
import { SEOLandingPageData } from '../types';

export const SEOLandingPages: React.FC = () => {
  const [selectedPage, setSelectedPage] = useState<SEOLandingPageData>(SEO_LANDING_PAGES[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showJsonLd, setShowJsonLd] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // Generate real Schema.org JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": selectedPage.title,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "14250",
          "bestRating": "5"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": selectedPage.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
          <Search className="w-3.5 h-3.5" />
          <span>استراتيجية تصدر محركات البحث (SEO & Topical Authority)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          هيكلية صفحات الهبوط الفرعية لاستهداف الكلمات المفتاحية لمزودي الخدمة
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          كيف نحصد مئات آلاف الزيارات المجانية شهرياً من بحث جوجل لكلمات مثل "قياس سرعة نت زين" و "قياس سرعة STC" و "فحص سرعة وي".
        </p>
      </div>

      {/* Selector of Target SEO Keywords */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {SEO_LANDING_PAGES.map((page) => (
          <button
            key={page.slug}
            id={`btn-seo-page-${page.slug}`}
            onClick={() => {
              setSelectedPage(page);
              setOpenFaqIndex(0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedPage.slug === page.slug
                ? 'bg-cyan-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            <span>{page.keyword}</span>
            <span className="text-[10px] opacity-80">({page.searchVolumeEstimated.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Selected Page Simulation Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Google SERP Preview & Schema Inspector */}
        <div className="space-y-4 lg:col-span-1">
          {/* SERP Simulator */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1">
                <Search className="w-3.5 h-3.5 text-cyan-500" /> معاينة شكل النتيجة في جوجل (SERP Preview)
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                الترتيب #1
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850/70 border border-slate-100 dark:border-slate-800 space-y-1.5 text-right font-sans">
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 truncate dir-ltr">
                https://netspeed.pro/{selectedPage.slug}
              </div>
              <div className="text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline leading-snug cursor-pointer">
                {selectedPage.title}
              </div>
              {/* Star Rating Rich Snippet */}
              <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold">
                <div className="flex text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-slate-600 dark:text-slate-400 text-[10px]">4.9 (14,250 تقييم) • مجاني</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                {selectedPage.metaDesc}
              </p>
            </div>
          </div>

          {/* Keyword Metrics Card */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 text-xs">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-cyan-500" /> بيانات الكلمة المفتاحية المستهدفة
            </div>
            <div className="space-y-1 text-slate-600 dark:text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>حجم البحث التقديري:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{selectedPage.searchVolumeEstimated}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                <span>صعوبة المنافسة (KD):</span>
                <span className="font-bold text-amber-600">{selectedPage.difficulty}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>المنطقة الجغرافية:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{selectedPage.region}</span>
              </div>
            </div>
          </div>

          {/* Schema JSON-LD Trigger */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <button
              id="btn-toggle-jsonld"
              onClick={() => setShowJsonLd(!showJsonLd)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-cyan-600 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-purple-500" /> كود Schema.org JSON-LD المدمج
              </span>
              {showJsonLd ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showJsonLd && (
              <pre className="p-3 rounded-xl bg-slate-950 text-cyan-400 font-mono text-[10px] overflow-x-auto max-h-48 dir-ltr">
                {JSON.stringify(schemaJson, null, 2)}
              </pre>
            )}
          </div>
        </div>

        {/* Right Column: Actual Landing Page Layout Content Preview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span>الرئيسية</span>
              <span>/</span>
              <span>قياس سرعة الإنترنت</span>
              <span>/</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{selectedPage.keyword}</span>
            </div>

            {/* H1 Title */}
            <div>
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                {selectedPage.h1}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                اختبار فوري معتمد متوافق مع كافة راوترات وشبكات الجيل الخامس والألياف الضوئية.
              </p>
            </div>

            {/* In-Content Speed Test CTA Anchor */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-200 dark:border-cyan-800/60 flex items-center justify-between gap-4">
              <div>
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  فحص سرعة {selectedPage.keyword} الآن
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  انقر لبدء قياس خوادم {selectedPage.region} دون استهلاك باقتك
                </div>
              </div>
              <a
                href="#speedometer-section"
                className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition shadow-xs whitespace-nowrap"
              >
                ابدأ الاختبار
              </a>
            </div>

            {/* High Topical Authority SEO Content Paragraphs */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>{selectedPage.contentAr}</p>
            </div>

            {/* Rich FAQs (Featured Snippets Dominance) */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>الأسئلة الشائعة حول {selectedPage.keyword} (FAQ Schema)</span>
              </h3>

              <div className="space-y-2">
                {selectedPage.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/50 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-3.5 text-right flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-4 h-4 text-cyan-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="p-3.5 pt-0 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programmatic SEO Strategy Blueprint */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white border border-indigo-500/30 space-y-4">
        <h3 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span>خطة السيو البرمجي (Programmatic SEO) لتوليد 500+ صفحة هبوط آلية</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          عبر بناء قالب ديناميكي يدمج <strong>[اسم المزود]</strong> + <strong>[المدينة / الدولة]</strong> + <strong>[نوع الشبكة: فايبر / 5G / 4G]</strong>، يمكن إنشاء مصفوفة ضخمة من صفحات الهبوط مثل:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-cyan-300">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">قياس سرعة نت STC الرياض</div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">قياس سرعة زين جدة 5G</div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">فحص سرعة وي WE الإسكندرية</div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/10">Speed Test Dubai Etisalat</div>
        </div>
      </div>
    </div>
  );
};
