import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // AI Connection & Speed Diagnostic Endpoint
  app.post('/api/ai/diagnose', async (req, res) => {
    try {
      const { download, upload, ping, jitter, isp, bufferbloat, serverCity } = req.body;

      const ai = getAIClient();
      const prompt = `أنت خبير واستشاري شبكات واتصالات ذكي ومحترف (Network & ISP Optimization Expert).
قام المستخدم بإجراء فحص لسرعة اتصاله بالإنترنت وكانت النتائج كالتالي:
- سرعة التنزيل (Download): ${download || 0} Mbps
- سرعة الرفع (Upload): ${upload || 0} Mbps
- زمن الاستجابة (Ping): ${ping || 0} ms
- التذبذب (Jitter): ${jitter || 0} ms
- مؤشر الـ Bufferbloat: ${bufferbloat || 'N/A'}
- مزود الخدمة (ISP): ${isp || 'غير محدد'}
- موقع خادم الفحص: ${serverCity || 'غير محدد'}

المطلوب منك تقديم تحليل ذكي ودقيق وممتع باللغة العربية:
1. **تقييم شامل ومباشر للاتصال:** (ممتاز / جيد جداً / متوسط / بحاجة لتحسين) مع شرح مبسط لما تعنيه هذه الأرقام للاستخدام اليومي.
2. **تحليل أداء الألعاب والبث المباشر (Gaming & Streaming):** (ببجي، فيفا، كول أوف ديوتي، ديسكورد، يوتيوب 4K/8K) مع نصيحة لتقليل اللاج (Lag) وتخفيض البينج.
3. **نصائح وحلول عملية فورية:** 3 إلى 4 خطوات قابلة للتطبيق (مثل تحسين الـ DNS كـ 1.1.1.1، استخدام كابل Ethernet، تعديل قنوات الـ 5GHz في الراوتر، أو تفعيل SQM / QoS للتحكم في Bufferbloat).
4. **تقييم مزود الخدمة والترقية المقترحة:** رأيك في أداء هذا المزود وما إذا كانت هناك حاجة للترقية لباقة ألياف ضوئية (Fiber).

اجعل الأسلوب تفاعلياً، منظماً بنقاط واضحة وأيقونات مناسبة وممتعاً للقراءة.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      const diagnosis = response.text || 'تعذر استخراج التحليل الذكي في الوقت الحالي.';
      res.json({ success: true, diagnosis });
    } catch (error: any) {
      console.error('Error running Gemini diagnosis:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'حدث خطأ أثناء معالجة تحليل الذكاء الاصطناعي',
      });
    }
  });

  // AI AdSense & Monetization Advisor Endpoint
  app.post('/api/ai/adsense-advisor', async (req, res) => {
    try {
      const { monthlyVisitors, country, audienceType } = req.body;

      const ai = getAIClient();
      const prompt = `أنت خبير ومستشار معتمد في تحقيق الدخل الرقمي و Google AdSense و Programmatic Advertising لمواقع قياس السرعة وأدوات الويب (Web Tools & Utilities).
بيانات الموقع:
- الزيارات الشهرية المتوقعة: ${monthlyVisitors || 50000} زيارة
- الجمهور الجغرافي المستهدف: ${country || 'الشرق الأوسط والخليج ومصر'}
- نوع الجمهور: ${audienceType || 'لاعبين، مستخدمي هواتف 5G، وباحثين عن قياس السرعة'}

قدم خطة استشارية ذكية باللغة العربية تشمل:
1. **توقعات الـ RPM والعائد الشهري:** مع شرح لأفضل وحدات AdSense المقترحة (العداد، النافذة الناتيف، الإعلان اللاصق السفلي).
2. **استراتيجية رفع الـ CTR بدون مخالفة سياسات جوجل:** نصائح لحماية الحساب من النقرات غير الشرعية وزيادة الرؤية (Viewability > 85%).
3. **أفكار لزيادة وقت بقاء الزائر (Dwell Time):** أفكار محتوى وأدوات إضافية لتشجيع الزائر على قضاء أكثر من دقيقتين في الموقع.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
      });

      const advice = response.text || 'تعذر استخراج التوصيات.';
      res.json({ success: true, advice });
    } catch (error: any) {
      console.error('Error generating AdSense advice:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'حدث خطأ أثناء الاتصال بنموذج الذكاء الاصطناعي',
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NetSpeed PRO Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
