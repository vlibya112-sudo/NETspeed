import React, { useState } from 'react';
import { 
  Sparkles, 
  Bot, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Wifi, 
  Gamepad2, 
  Zap, 
  RefreshCw, 
  Copy, 
  Check, 
  ShieldAlert, 
  HelpCircle,
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { SpeedResult, ServerLocation } from '../types';

interface AIDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SpeedResult | null;
  server: ServerLocation;
  accentColor: string;
}

export const AIDiagnosticModal: React.FC<AIDiagnosticModalProps> = ({
  isOpen,
  onClose,
  result,
  server,
  accentColor,
}) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunDiagnosis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          download: result?.downloadSpeed || 145.8,
          upload: result?.uploadSpeed || 42.5,
          ping: result?.ping || 14,
          jitter: result?.jitter || 2.4,
          bufferbloat: result?.bufferbloatGrade || 'A',
          isp: result?.isp || 'Saudi Telecom Company (STC 5G)',
          serverCity: server.city || 'الرياض (Riyadh)',
        }),
      });

      const data = await response.json();
      if (data.success && data.diagnosis) {
        setAnalysis(data.diagnosis);
      } else {
        setError(data.error || 'حدث خطأ أثناء إجراء التشخيص الذكي.');
      }
    } catch (err: any) {
      setError(err.message || 'تعذر الاتصال بخادم الذكاء الاصطناعي.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!analysis) return;
    navigator.clipboard.writeText(analysis);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in" dir="rtl">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #6366f1)` }}
            >
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">
                  محلل الاتصال الذكي (Gemini AI Diagnostics)
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  مدعوم بـ Gemini 3.7
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                استشارة فورية لتشخيص الخط، تحسين البينج للألعاب، وحل مشاكل الـ Bufferbloat
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Stats Summary Pills */}
        <div className="px-5 py-3 bg-slate-100/60 dark:bg-slate-800/60 border-b border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">البيانات المحللة:</span>
          <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            تنزيل: <strong>{result ? result.downloadSpeed.toFixed(1) : '145.8'} Mbps</strong>
          </span>
          <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            رفع: <strong>{result ? result.uploadSpeed.toFixed(1) : '42.5'} Mbps</strong>
          </span>
          <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            بينج: <strong>{result ? result.ping.toFixed(0) : '14'} ms</strong>
          </span>
          <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            المزود: <strong>{result ? result.isp : 'STC'}</strong>
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {!analysis && !loading && !error && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center border border-indigo-100 dark:border-indigo-900/50">
                <Bot className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  جاهز لتحليل نتائج اتصالك بالذكاء الاصطناعي
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  سيقوم Gemini بتحليل دقيق لمعاملات السرعة والاستجابة وتزويدك بنصائح عملية مخصصة لشبكتك المنزلية، تحسين تجربة الألعاب (ببجي/فيفا)، وتقييم باقتك.
                </p>
              </div>
              <button
                onClick={handleRunDiagnosis}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-white font-bold text-sm transition shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #6366f1)`,
                  boxShadow: `0 8px 20px -4px ${accentColor}50`
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>تشغيل التشخيص الذكي الآن</span>
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12 space-y-4">
              <div className="relative w-14 h-14 mx-auto">
                <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-slate-700 animate-spin border-t-indigo-500" />
                <Bot className="w-6 h-6 absolute inset-0 m-auto text-indigo-500" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-slate-700 dark:text-slate-200">
                  جارٍ تحليل سرعة الخط ومعاملات الاستجابة عبر Gemini...
                </p>
                <p className="text-xs text-slate-400">
                  نقوم بفحص ملاءمة الخط للألعاب وتحديد حلول تقليل التذبذب وBufferbloat
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>تنبيه أثناء الاتصال</span>
              </div>
              <p>{error}</p>
              <button
                onClick={handleRunDiagnosis}
                className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-900/50 hover:bg-rose-200 font-bold text-rose-700 dark:text-rose-200 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> إعادة المحاولة
              </button>
            </div>
          )}

          {analysis && (
            <div className="space-y-4 animate-fade-in">
              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 text-slate-800 dark:text-slate-200 text-xs leading-relaxed whitespace-pre-line">
                {analysis}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ!' : 'نسخ التحليل'}</span>
                  </button>
                  <button
                    onClick={handleRunDiagnosis}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة التحليل</span>
                  </button>
                </div>

                <span className="text-[11px] text-slate-400">
                  تم التوليد بواسطة Gemini 3.7 Flash
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>نصيحة: ربط الجهاز عبر كيبل LAN يخفض البينج بنسبة تصل إلى 40%</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
