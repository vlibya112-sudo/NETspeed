import React, { useState } from 'react';
import { Share2, Download, Copy, Check, Sparkles, ShieldCheck, Award, ArrowDown, ArrowUp, Activity } from 'lucide-react';
import { SpeedResult } from '../types';

interface SpeedCertificateProps {
  result: SpeedResult;
  onClose: () => void;
}

export const SpeedCertificate: React.FC<SpeedCertificateProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const text = `🚀 فحص سرعة الإنترنت عبر NetSpeed Pro:\n📥 التنزيل: ${result.download} Mbps\n📤 الرفع: ${result.upload} Mbps\n⚡ البينج: ${result.ping} ms\n🌐 المزود: ${result.isp}\n🏆 التقييم: ${result.bufferbloatScore}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`سرعة خطي الحالية 🚀\n📥 تنزيل: ${result.download} Mbps | 📤 رفع: ${result.upload} Mbps | ⚡ بينج: ${result.ping} ms عبر NetSpeed Pro`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`سرعة خطي عبر NetSpeed Pro 🚀:\nتنزيل: ${result.download} Mbps | رفع: ${result.upload} Mbps | بينج: ${result.ping} ms`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              شهادة وبطاقة قياس السرعة الرسمية (Speed Badge)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Certificate Visual Card Preview */}
        <div
          id="speed-certificate-badge"
          className="relative rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/30 shadow-xl overflow-hidden space-y-4"
        >
          {/* Subtle watermarks and ornaments */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Header of Badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black tracking-wider uppercase text-cyan-300">
                  NetSpeed Pro Certified
                </div>
                <div className="text-[10px] text-slate-400">{result.timestamp} • {result.location}</div>
              </div>
            </div>

            <div className="px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GRADE {result.bufferbloatScore}</span>
            </div>
          </div>

          {/* Main Numbers */}
          <div className="grid grid-cols-2 gap-4 py-2 text-center">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1 text-[11px] text-cyan-400 mb-0.5">
                <ArrowDown className="w-3.5 h-3.5" />
                <span>سرعة التنزيل (Download)</span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {result.download}
                <span className="text-xs text-slate-400 font-sans mr-1">Mbps</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1 text-[11px] text-purple-400 mb-0.5">
                <ArrowUp className="w-3.5 h-3.5" />
                <span>سرعة الرفع (Upload)</span>
              </div>
              <div className="text-3xl font-black font-mono text-white tracking-tight">
                {result.upload}
                <span className="text-xs text-slate-400 font-sans mr-1">Mbps</span>
              </div>
            </div>
          </div>

          {/* Sub Stats Footer */}
          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-1.5 font-mono">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span>البينج: {result.ping}ms</span>
              <span className="text-slate-500">•</span>
              <span>الجيتر: {result.jitter}ms</span>
            </div>
            <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
              {result.isp}
            </div>
          </div>
        </div>

        {/* Social Share & Copy Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            id="btn-copy-certificate-text"
            onClick={handleCopyText}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'تم النسخ!' : 'نسخ النتيجة'}</span>
          </button>

          <button
            id="btn-share-twitter"
            onClick={handleShareTwitter}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>نشر على X</span>
          </button>

          <button
            id="btn-share-whatsapp"
            onClick={handleShareWhatsApp}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </button>
        </div>
      </div>
    </div>
  );
};
