import { AppSuitability, ISPData, SEOLandingPageData, AdUnitConfig, TechLibraryAnalysis, ServerLocation } from '../types';

export const SERVERS: ServerLocation[] = [
  { id: 'auto', name: 'الخادم الأقرب تلقائياً (Anycast Edge)', country: 'Global Edge', flag: '⚡', city: 'Auto Detect', host: 'edge.speedtest.net', distance: '< 15 ms' },
  { id: 'riyadh', name: 'الرياض (Saudi Telecom / Zain Hub)', country: 'السعودية', flag: '🇸🇦', city: 'Riyadh', host: 'sa-edge.speedtest.net', distance: '18 ms' },
  { id: 'dubai', name: 'دبي (UAE Equinix Edge)', country: 'الإمارات', flag: '🇦🇪', city: 'Dubai', host: 'ae-edge.speedtest.net', distance: '28 ms' },
  { id: 'cairo', name: 'القاهرة (Telecom Egypt Hub)', country: 'مصر', flag: '🇪🇬', city: 'Cairo', host: 'eg-edge.speedtest.net', distance: '35 ms' },
  { id: 'frankfurt', name: 'فرانكفورت (DE-CIX Europe Core)', country: 'ألمانيا', flag: '🇩🇪', city: 'Frankfurt', host: 'fra-edge.speedtest.net', distance: '65 ms' },
  { id: 'london', name: 'لندن (LINX UK IXP)', country: 'بريطانيا', flag: '🇬🇧', city: 'London', host: 'lon-edge.speedtest.net', distance: '72 ms' },
];

export const APP_SUITABILITIES: AppSuitability[] = [
  {
    id: 'pubg',
    name: 'PUBG Mobile & Free Fire',
    nameAr: 'ببجي موبايل وفري فاير',
    iconName: 'Gamepad2',
    category: 'gaming',
    minDownload: 10,
    minUpload: 5,
    maxPing: 45,
    maxJitter: 8,
    description: 'Competitive mobile battle royale requiring ultra-low latency & zero packet jitter.',
    descriptionAr: 'تتطلب ألعاب الباتل رويال سرعة استجابة فائقة (بينج أقل من 45ms) وثبات تام لتجنب التقطيع في المواجهات.'
  },
  {
    id: 'warzone',
    name: 'Call of Duty Warzone / Apex',
    nameAr: 'كول أوف ديوتي / إيبكس ليجندز',
    iconName: 'Crosshair',
    category: 'gaming',
    minDownload: 25,
    minUpload: 10,
    maxPing: 35,
    maxJitter: 5,
    description: 'Fast-paced FPS shooting requiring low jitter and fast tickrate response.',
    descriptionAr: 'تتطلب ألعاب إطلاق النار على الكونسول والـ PC بينج منخفض جداً لتسجيل الطلقات بدقة فورية دون Lag.'
  },
  {
    id: 'ea-fc',
    name: 'EA SPORTS FC 24/25 (FIFA)',
    nameAr: 'فيفا / إي إيه إف سي (EA FC)',
    iconName: 'Trophy',
    category: 'gaming',
    minDownload: 15,
    minUpload: 5,
    maxPing: 30,
    maxJitter: 6,
    description: 'Requires low input delay and zero packet loss for smooth Ultimate Team online matches.',
    descriptionAr: 'مباريات ألتيميت تيم تتأثر بشدة بالبينج والـ Jitter، يلزم بينج مستقر لتفادي ثقل حركة اللاعبين (Delay).'
  },
  {
    id: 'netflix4k',
    name: 'Netflix & Shahid 4K Ultra HD',
    nameAr: 'نتفلكس وشاهد بدقة 4K HDR',
    iconName: 'Tv',
    category: 'streaming',
    minDownload: 25,
    minUpload: 3,
    maxPing: 120,
    maxJitter: 30,
    description: 'Seamless 4K HDR streaming with Dolby Vision and multi-device playback.',
    descriptionAr: 'بث سلس للأفلام والمسلسلات بجودة 4K وفائق الوضوح دون أي توقف مؤقت للتحميل (Buffering).'
  },
  {
    id: 'youtube8k',
    name: 'YouTube 4K/8K 60FPS',
    nameAr: 'يوتيوب 4K/8K بمعدل 60 إطار',
    iconName: 'PlaySquare',
    category: 'streaming',
    minDownload: 40,
    minUpload: 5,
    maxPing: 100,
    maxJitter: 25,
    description: 'High bitrate smooth video streaming without dynamic downscaling.',
    descriptionAr: 'مشاهدة مقاطع الفيديو فائقة الدقة بـ 60 إطاراً في الثانية دون انخفاض تلقائي في الجودة.'
  },
  {
    id: 'zoom',
    name: 'Zoom & Teams 1080p Calls',
    nameAr: 'مكالمات زوم وتيمز HD واجتماعات',
    iconName: 'Video',
    category: 'work',
    minDownload: 10,
    minUpload: 8,
    maxPing: 60,
    maxJitter: 12,
    description: 'Crystal clear video conferencing, screen sharing, and interactive remote collaboration.',
    descriptionAr: 'صوت وصورة عاليي النقاء مع مشاركة الشاشة دون تشويش أو تقطع في البث المزدوج (صوت وفيديو).'
  },
  {
    id: 'geforce_now',
    name: 'Cloud Gaming (GeForce NOW / xCloud)',
    nameAr: 'الألعاب السحابية (GeForce NOW)',
    iconName: 'CloudLightning',
    category: 'gaming',
    minDownload: 50,
    minUpload: 15,
    maxPing: 25,
    maxJitter: 4,
    description: 'Real-time 1080p/4K 120FPS cloud gaming streaming directly from cloud rigs.',
    descriptionAr: 'الألعاب السحابية تستهلك معدل نقل بيانات مرتفع وتتطلب أقل تأخير ممكن لنقل ضغطات الأزرار فوراً.'
  },
  {
    id: 'browsing',
    name: 'Web Browsing & Social Media',
    nameAr: 'تصفح السوشيال ميديا والتسوق',
    iconName: 'Globe',
    category: 'browsing',
    minDownload: 5,
    minUpload: 2,
    maxPing: 150,
    maxJitter: 40,
    description: 'General browsing, TikTok, Instagram Reels, and downloading standard files.',
    descriptionAr: 'تصفح فوري لمواقع الأخبار، مشاهدة ريلز تيك توك وإنستغرام، وتحميل الملفات العادية بسرعة.'
  }
];

export const ISP_DATABASE: ISPData[] = [
  {
    id: 'stc',
    name: 'STC (Saudi Telecom)',
    nameAr: 'إس تي سي (الاتصالات السعودية)',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    logoColor: '#4f008c',
    avgDownload: 142.5,
    avgUpload: 48.2,
    avgPing: 14,
    rating: 4.6,
    totalVotes: 14230,
    technologies: ['5G Ultra', 'FTTH فايبر', '4G LTE Plus', 'شريحة إلكترونية eSIM'],
    pros: ['تغطية 5G هي الأوسع في المملكة', 'بينج ممتاز لخوادم الخليج وأوروبا', 'خدمة دعم فني سريعة عبر تطبيق Mystc'],
    cons: ['الأسعار مرتفعة نسبياً مقارنة بالمنافسين', 'سياسة الاستخدام العادل على بعض باقات التجوال']
  },
  {
    id: 'zain_sa',
    name: 'Zain KSA',
    nameAr: 'زين السعودية',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    logoColor: '#00b5af',
    avgDownload: 128.8,
    avgUpload: 39.4,
    avgPing: 18,
    rating: 4.3,
    totalVotes: 11450,
    technologies: ['5G Advanced', 'راوتر منزلي 5G', 'فايبر FTTH', 'VoLTE'],
    pros: ['عروض وباقات أسعار تنافسية ممتازة', 'سرعات تحميل 5G قوية في المدن الرئيسية', 'راوترات 5G منزلية سهلة التثبيت'],
    cons: ['تذبذب التغطية في بعض المناطق النائية أو داخل العوازل', 'ارتفاع البينج في بعض ألعاب الـ FPS مقارنة بالفايبر']
  },
  {
    id: 'mobily',
    name: 'Mobily',
    nameAr: 'موبايلي',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    logoColor: '#0066a1',
    avgDownload: 119.3,
    avgUpload: 34.1,
    avgPing: 19,
    rating: 4.2,
    totalVotes: 9820,
    technologies: ['5G Plus', 'الياف ضوئية eLife', '4G LTE', 'باقات البيانات اللامحدودة'],
    pros: ['شبكة ألياف eLife ذات ثبات فائق', 'باقات بيانات مسبقة الدفع مرنة جداً', 'استقرار ممتاز في مكالمات الفيديو والأعمال'],
    cons: ['تغطية الفايبر لم تشمل جميع الأحياء الجديدة بعد', 'سرعة الرفع (Upload) على الجيل الرابع تحتاج تحسين']
  },
  {
    id: 'we_egypt',
    name: 'Telecom Egypt (WE)',
    nameAr: 'المصرية للاتصالات (وي WE)',
    country: 'Egypt',
    countryAr: 'مصر',
    logoColor: '#6f2c91',
    avgDownload: 54.6,
    avgUpload: 12.8,
    avgPing: 28,
    rating: 3.9,
    totalVotes: 24500,
    technologies: ['VDSL أرضي', 'فايبر FTTH', '4G Mobile Data', 'باقات سوبر وميجا'],
    pros: ['المزود الرئيسي للبنية التحتية وكابلات الإنترنت الدولية في مصر', 'تغطية واسعة تشمل معظم محافظات مصر', 'خدمة محفظة WE Pay المدمجة'],
    cons: ['سعات التحميل المحدودة (Quota) ونفاد الباقة سريعاً', 'سرعة الرفع لا تزال منخفضة مقارنة بسرعة التنزيل']
  },
  {
    id: 'vodafone_eg',
    name: 'Vodafone Egypt',
    nameAr: 'فودافون مصر',
    country: 'Egypt',
    countryAr: 'مصر',
    logoColor: '#e60000',
    avgDownload: 42.1,
    avgUpload: 14.5,
    avgPing: 31,
    rating: 4.1,
    totalVotes: 18900,
    technologies: ['4G Plus', 'ADSL / VDSL', 'راوتر هوائي 4G بدون خط أرضي', 'خدمات الأعمال'],
    pros: ['شبكة محمول قوية واستقرار عالٍ في المكالمات والبيانات', 'عروض تجديد ومكافآت مستمرة عبر تطبيق أنا فودافون', 'خدمة عملاء راقية'],
    cons: ['أسعار باقات الراوتر الهوائي مرتفعة مع سعات محدودة', 'تأثر السرعة في أوقات الذروة المسائية']
  },
  {
    id: 'orange_eg',
    name: 'Orange Egypt',
    nameAr: 'أورنج مصر',
    country: 'Egypt',
    countryAr: 'مصر',
    logoColor: '#ff7900',
    avgDownload: 46.8,
    avgUpload: 13.9,
    avgPing: 29,
    rating: 4.0,
    totalVotes: 12700,
    technologies: ['4.5G Speed', 'VDSL منزلي', 'Orange Home DSL', 'Triple Play في الكومباوندات'],
    pros: ['سرعات 4G متميزة ومستقرة في الأماكن المزدحمة', 'شبكة ألياف ضوئية متطورة في المدن الذكية والكمبوندات', 'تطبيق My Orange سهل وسلس'],
    cons: ['تغطية 4G قد تضعف في بعض القرى الفرعية', 'سعة الجيجات الشهرية تستهلك سريعاً لمستخدمي الفيديو']
  },
  {
    id: 'etisalat_uae',
    name: 'e& (Etisalat by e&)',
    nameAr: 'اتصالات الإمارات (e&)',
    country: 'UAE',
    countryAr: 'الإمارات العربية المتحدة',
    logoColor: '#719e19',
    avgDownload: 285.4,
    avgUpload: 92.6,
    avgPing: 8,
    rating: 4.8,
    totalVotes: 16200,
    technologies: ['5G Standalone', '10Gbps FTTH Fiber', 'eLife TV', 'Smart Home Network'],
    pros: ['من أسرع شبكات الإنترنت في العالم باعتراف Ookla', 'بينج فائق الانخفاض مثالي للألعاب والبث المباشر', 'بنية ألياف ضوئية بنسبة 99% في الدولة'],
    cons: ['تكلفة الاشتراكات الشهرية مرتفعة نسبياً مقارنة بالدول المجاورة']
  },
  {
    id: 'ooredoo_qatar',
    name: 'Ooredoo Qatar',
    nameAr: 'أوريدو قطر',
    country: 'Qatar',
    countryAr: 'قطر',
    logoColor: '#ed1c24',
    avgDownload: 260.1,
    avgUpload: 88.0,
    avgPing: 9,
    rating: 4.7,
    totalVotes: 8900,
    technologies: ['5G Supernet', 'Ooredoo ONE Fiber', 'Wi-Fi 6 Mesh', '4K TV'],
    pros: ['سرعات 5G هائلة وتغطية شاملة للمدن والملاعب والمناطق البحرية', 'ثبات خطوط الفايبر المنزلية بنسبة 99.9%', 'دعم فني وتطبيقات ذكية سريعة'],
    cons: ['باقات التجوال الدولي مرتفعة التكلفة']
  }
];

export const SEO_LANDING_PAGES: SEOLandingPageData[] = [
  {
    slug: 'speed-test-stc',
    keyword: 'قياس سرعة نت STC',
    keywordAr: 'قياس سرعة نت STC السعودية (فايبر و 5G)',
    title: 'قياس سرعة نت STC بدقة عالية 2026 | فحص سرعة الاتصالات السعودية 5G و فايبر',
    metaDesc: 'أدق أداة مجانية لقياس سرعة نت STC فايبر وشريحة 5G و 4G في السعودية. افحص سرعة التنزيل والرفع والبينج الحقيقي لخوادم stc بنقرة واحدة.',
    h1: 'قياس سرعة نت STC (الاتصالات السعودية) - فحص مجاني فوري',
    ispFocus: 'stc',
    technology: '5G & Fiber',
    region: 'السعودية (KSA)',
    searchVolumeEstimated: '110,000+ بحث شهرياً',
    difficulty: 'Medium',
    contentAr: 'تعتبر شركة الاتصالات السعودية (stc) المشغل الأكبر لشبكات الجيل الخامس والألياف الضوئية في المملكة. يتيح لك هذا الاختبار فحص سرعة باقة بيتي فايبر وشريحة 5G المفوترة ومسبقة الدفع بدقة متناهية، مع كشف قيمة البينج (Ping) الفعلي الموجه لأقرب برج اتصال stc.',
    faqs: [
      {
        question: 'كيف أحصل على قياس دقيق لسرعة نت STC الفايبر؟',
        answer: 'للحصول على أدق نتيجة، يُفضل توصيل جهاز الكمبيوتر عبر كيبل إيثرنت (Cat6 أو أعلى) مباشرة بالراوتر، وفصل أي تحميل نشط أو أجهزة أخرى تشاهد مقاطع 4K.'
      },
      {
        question: 'ما هو البينج المثالي لشبكة STC في ألعاب ببجي وفيفا؟',
        answer: 'البينج الممتاز على شبكة STC داخل السعودية يتراوح بين 8 إلى 20 ميلي ثانية لخوادم الرياض والخليج، وبين 50 إلى 75 ميلي ثانية لخوادم أوروبا.'
      },
      {
        question: 'ماذا أفعل إذا كانت سرعة STC أقل من الباقة المشترك بها؟',
        answer: 'أعد تشغيل الراوتر لمدة دقيقة، تأكد من الاتصال بتردد 5GHz بدلاً من 2.4GHz، وإذا استمرت المشكلة افتح بلاغاً عبر تطبيق Mystc أو اتصل على 900.'
      }
    ]
  },
  {
    slug: 'speed-test-zain',
    keyword: 'قياس سرعة نت زين',
    keywordAr: 'قياس سرعة نت زين Zain 5G و 4G',
    title: 'قياس سرعة نت زين Zain بدقة 2026 | فحص سرعة راوتر وشريحة زين 5G',
    metaDesc: 'اختبار دقيق وفوري لقياس سرعة نت زين السعودية والكويت والأردن. افحص سرعة الداونلود والأبلود والبينج لراوتر زين 5G المنزلي وشريحة البيانات مجاناً.',
    h1: 'قياس سرعة نت زين Zain - فحص سرعة الراوتر والبيانات 5G',
    ispFocus: 'zain_sa',
    technology: '5G Home Router',
    region: 'السعودية والخليج',
    searchVolumeEstimated: '85,000+ بحث شهرياً',
    difficulty: 'Medium',
    contentAr: 'تشتهر شبكة زين (Zain) بحلول الراوتر المنزلي 5G والسرعات التنافسية. تساعدك أداة القياس هذه على معرفة قوة الإشارة وسرعة التنزيل اللحظية والتأكد من عدم وجود اختناق في الشبكة (Throttling) خلال ساعات الذروة.',
    faqs: [
      {
        question: 'كيف أرفع سرعة راوتر زين 5G المنزلي؟',
        answer: 'قم بتغيير مكان الراوتر وضعه بجوار نافذة تطل على اتجاه برج زين، وتجنب وضعه بجانب الميكروويف أو الأجهزة المعدنية العازلة.'
      },
      {
        question: 'ما هو الفرق بين سرعة التنزيل والرفع في شبكة زين؟',
        answer: 'سرعة التنزيل (Download) مسؤولة عن فتح المواقع وتحميل الملفات ومشاهدة الفيديو، بينما الرفع (Upload) مسؤول عن إرسال الرسائل وبث الفيديو ولعب الألعاب.'
      }
    ]
  },
  {
    slug: 'speed-test-mobily',
    keyword: 'قياس سرعة نت موبايلي',
    keywordAr: 'قياس سرعة نت موبايلي Mobily eLife و 5G',
    title: 'قياس سرعة نت موبايلي Mobily فايبر و 5G | فحص فوري ومجاني 2026',
    metaDesc: 'افحص سرعة إنترنت موبايلي elife فايبر وشريحة بيانات موبايلي 5G. أداة قياس سرعة الاتصال بالخادم الأقرب بدقة ميجابت في الثانية.',
    h1: 'قياس سرعة إنترنت موبايلي Mobily - اختبار السرعة والبينج',
    ispFocus: 'mobily',
    technology: 'eLife Fiber & 5G',
    region: 'السعودية (KSA)',
    searchVolumeEstimated: '65,000+ بحث شهرياً',
    difficulty: 'Medium',
    contentAr: 'سواء كنت مشتركاً في باقات موبايلي إي لايف eLife للألياف الضوئية أو باقات راوتر موبايلي 5G، يمنحك هذا المقياس تقريراً شاملاً عن كفاءة الخط وسرعة استجابة الخوادم المحلية والدولية.',
    faqs: [
      {
        question: 'كيف أعرف سرعة باقة موبايلي إي لايف الحقيقية؟',
        answer: 'افصل كافة أجهزة الهواتف والتلفزيونات المتصلة بالواي فاي، وقم بإجراء الاختبار من جهاز متصل سلكياً للحصول على السرعة الكاملة للباقة.'
      }
    ]
  },
  {
    slug: 'speed-test-we-egypt',
    keyword: 'قياس سرعة نت وي WE',
    keywordAr: 'قياس سرعة النت WE مصر (المصرية للاتصالات)',
    title: 'قياس سرعة نت WE وي المصرية للاتصالات 2026 | فحص سرعة الراوتر والخط الأرضي',
    metaDesc: 'أسهل وأسرع مقياس لسرعة نت وي WE مصر VDSL والراوتر الهوائي والمحمول. اعرف سرعتك الحقيقية بالميجابايت والبينج واستهلاك الجيجابايت مجاناً.',
    h1: 'قياس سرعة النت WE وي (المصرية للاتصالات) - فحص الخط الأرضي',
    ispFocus: 'we_egypt',
    technology: 'VDSL & FTTH',
    region: 'مصر (Egypt)',
    searchVolumeEstimated: '190,000+ بحث شهرياً',
    difficulty: 'Hard',
    contentAr: 'تعد المصرية للاتصالات (WE) أكبر مزود لخدمات الإنترنت المنزلي VDSL والخطوط الأرضية في مصر. اختبر كفاءة خطك الآن وتأكد من وصول السرعة المتعاقد عليها (30 ميجا أو 70 ميجا أو 100 ميجا أو 200 ميجا) قبل وبعد تطبيق سياسة الاستخدام العادل.',
    faqs: [
      {
        question: 'ليه سرعة نت وي بتنزل لـ 256 كيلوبت أو 1 ميجا فجأة؟',
        answer: 'يحدث ذلك عند نفاد سعة الجيجابايت الشهرية (الكوتة)، حيث يتم خفض السرعة تلقائياً حتى موعد التجديد أو شراء باقة إضافية.'
      },
      {
        question: 'إزاي أعرف أقصى سرعة يتحملها خط التليفون الأرضي في وي؟',
        answer: 'ادخل على صفحة الراوتر (192.168.1.1) وتفقد خانة Max Rate في بيانات خط الـ DSL لتعرف أقصى سرعة يدعمها السنترال ونوع السلك.'
      }
    ]
  },
  {
    slug: 'speed-test-5g',
    keyword: 'Speed Test 5G فحص سرعة الجيل الخامس',
    keywordAr: 'قياس سرعة نت 5G الحقيقية في كل الدول',
    title: '5G Speed Test 2026 | فحص سرعة شبكات الجيل الخامس بدقة فائقة 1Gbps+',
    metaDesc: 'أداة قياس سرعة 5G فائقة الأداء قادرة على فحص سرعات تصل إلى 2.5 جيجابت في الثانية. افحص البينج والجيتر وتحمل البث فائق الدقة.',
    h1: '5G Speed Test - قياس سرعة شبكات الجيل الخامس والألياف الضوئية',
    technology: '5G NR Standalone',
    region: 'عالمي وعربي (Global & Arab)',
    searchVolumeEstimated: '220,000+ بحث شهرياً',
    difficulty: 'Hard',
    contentAr: 'تتطلب شبكات الجيل الخامس (5G) وخوادم الألياف الضوئية سريعة التدفق محرك فحص متقدم يعتمد على الـ Multi-Threaded Chunks لاختبار السرعات التي تتجاوز 1000 ميجابت في الثانية دون خنق المتصفح.',
    faqs: [
      {
        question: 'ما هي السرعة المتوسطة الطبيعية لشبكات 5G؟',
        answer: 'تتراوح سرعات 5G الحقيقية في الوطن العربي والعالم بين 150 إلى 650 ميجابت في الثانية للتنزيل، وبين 30 إلى 120 ميجابت للرفع، بحسب المسافة من البرج والتردد المستخدم.'
      }
    ]
  },
  {
    slug: 'ping-test-gaming',
    keyword: 'قياس البينج للألعاب وفحص الـ Lag',
    keywordAr: 'فحص البينج الحقيقي لألعاب ببجي وفيفا وكود',
    title: 'فحص البينج Ping Test للألعاب أونلاين 2026 | كشف الـ Lag والـ Jitter',
    metaDesc: 'افحص البينج الحقيقي لخطك واكتشف هل إنترنتك مناسب لألعاب ببجي وفيفا وكول أوف ديوتي وفورتنايت. احسب التذبذب Jitter وفقدان الحزم Packet Loss مجاناً.',
    h1: 'مقياس البينج وجودة الخط للألعاب أونلاين (Gaming Ping Test)',
    technology: 'Gaming Network',
    region: 'عالمي',
    searchVolumeEstimated: '70,000+ بحث شهرياً',
    difficulty: 'Medium',
    contentAr: 'السرعة العالية بالميجابت وحدها لا تكفي للألعاب التنافسية؛ المعيار الحقيقي هو زمن الاستجابة (Latency) واستقرار حزم البيانات (Jitter). اختبر جودة اتصالك بخوادم الألعاب العالمية الآن.',
    faqs: [
      {
        question: 'ما هو الـ Jitter ولماذا يسبب تقطيعاً في الألعاب حتى لو البينج منخفض؟',
        answer: 'الـ Jitter هو مقدار التذبذب في زمن وصول الحزم؛ إذا كان البينج يقفز بين 20ms و 100ms فستشعر بـ Stuttering وتجمد مفاجئ حتى لو كان متوسط البينج جيداً.'
      }
    ]
  }
];

export const ADSENSE_BLUEPRINT: AdUnitConfig[] = [
  {
    id: 'top-leaderboard',
    name: 'Top Responsive Leaderboard',
    nameAr: 'بانر علوي متجاوب (أعلى الصفحة)',
    dimensions: '728x90 (Desktop) / 320x50 (Mobile)',
    placement: 'Above main speedometer container',
    placementAr: 'أعلى مساحة الفحص ومباشرة تحت القائمة العلوية',
    purpose: 'Viewable on page load with instant impressions before test initiation',
    ctrEstimate: '1.2% - 2.1%',
    rpmEstimate: '$4.50 - $9.00',
    policyNotes: 'Keep 40px margin from navigation. Do not use sticky overlay that blocks UI elements.',
    policyNotesAr: 'مطابق لسياسات جوجل: يبعد مسافة كافية عن القوائم ولا يحجب أي زر تفاعلي.',
    clsProtection: 'min-height: 90px reserved with CSS skeleton placeholder'
  },
  {
    id: 'under-speedometer',
    name: 'Speedometer Wait Interstitial / In-Focus Box',
    nameAr: 'وحدة الانتظار الإعلانية (تحت عداد السرعة)',
    dimensions: '336x280 Large Rectangle / 300x250 Medium',
    placement: 'Directly below the live dynamic gauge needle',
    placementAr: 'تحت العداد مباشرة في بؤرة تركيز عين الزائر أثناء الـ 15 ثانية للقياس',
    purpose: 'Highest dwell time & viewability. User stares at gauge for 15-20 seconds during test.',
    ctrEstimate: '3.4% - 5.2%',
    rpmEstimate: '$12.00 - $22.00',
    policyNotes: 'MUST NOT place directly overlapping the "Start" button to prevent accidental clicks.',
    policyNotesAr: 'أعلى وحدة في العائد (Highest RPM): المشاهد يركز في هذه المنطقة طوال مدة الفحص. يلزم وضع مسافة آمنة 100px عن زر البدء لتجنب النقرات غير المقصودة.',
    clsProtection: 'min-height: 280px reserved fixed container'
  },
  {
    id: 'post-result-native',
    name: 'Post-Result In-Feed Recommendation Unit',
    nameAr: 'إعلان ناتيف مدمج بين نتائج التحليل والألعاب',
    dimensions: 'Native Fluid Responsive',
    placement: 'Between Speedometer and Game Suitability Matrix',
    placementAr: 'بين نتائج السرعة التفصيلية وجدول ملاءمة الألعاب وتوصيات المزودين',
    purpose: 'High engagement when user scrolls to see if their connection runs PUBG or 4K.',
    ctrEstimate: '2.8% - 4.1%',
    rpmEstimate: '$8.00 - $15.00',
    policyNotes: 'Clearly marked with "إعلان / Advertisement" badge above the unit.',
    policyNotesAr: 'مطابق بنسبة 100%: مميز بوضوح بشارة "إعلان" لتفادي الخلط بين الإعلان ومحتوى الموقع.',
    clsProtection: 'min-height: 250px container'
  },
  {
    id: 'sticky-footer-anchor',
    name: 'AdSense Anchor / Sticky Bottom Banner',
    nameAr: 'الإعلان اللاصق السفلي (Sticky Anchor Ad)',
    dimensions: '320x50 / 728x90 Anchor with Collapse toggle',
    placement: 'Fixed at bottom of screen with close button',
    placementAr: 'شريط ثابت أسفل الشاشة متوافق مع الموبايل والديسكتوب',
    purpose: 'Persistent visibility across all scroll depths as users read FAQs and ISP guides.',
    ctrEstimate: '1.8% - 2.9%',
    rpmEstimate: '$6.00 - $11.00',
    policyNotes: 'Auto-handled by AdSense Anchor feature or custom compliant container with dismiss button.',
    policyNotesAr: 'مدعوم رسمياً من أدسنس عبر Anchor Ads مع زر إغلاق ولا يحجب شريط التنقل.',
    clsProtection: 'padding-bottom: 70px on body container'
  },
  {
    id: 'sidebar-halfpage',
    name: 'Right Sidebar Skyscraper (Desktop)',
    nameAr: 'سكاي سكريبر جانبي للديسكتوب (300x600)',
    dimensions: '300x600 Half-Page Ad / 160x600 Skyscraper',
    placement: 'Sticky right-side column during scrolling',
    placementAr: 'العمود الجانبي الأيمن للشاشات الكبيرة أثناء قراءة مقالات ومقارنات المزودين',
    purpose: 'High brand CPM format with prolonged in-viewport time.',
    ctrEstimate: '1.5% - 2.6%',
    rpmEstimate: '$9.00 - $18.00',
    policyNotes: 'Hidden on mobile screens to maintain speed and Core Web Vitals score.',
    policyNotesAr: 'يختفي تلقائياً على شاشات الجوال لتسريع تحميل الصفحة واجتياز اختبارات Core Web Vitals.',
    clsProtection: 'w-[300px] h-[600px] reserved layout slot'
  }
];

export const TECH_LIBRARIES_ANALYSIS: TechLibraryAnalysis[] = [
  {
    name: 'LibreSpeed (HTML5 / JS / Web Workers)',
    license: 'LGPL-3.0 (مجاني ومفتوح المصدر 100%)',
    stars: '6.8k+ GitHub Stars',
    pros: [
      'يعمل بالكامل داخل المتصفح بدون أي فلاش أو جافا',
      'يدعم Web Workers لقياس دقيق دون تجميد واجهة المستخدم',
      'خفيف جداً (حجم الملف أقل من 35KB)',
      'سيرفرات خفيفة جداً تعمل على PHP أو Go أو Node.js أو Cloudflare Workers'
    ],
    cons: [
      'يتطلب ضبط إعدادات CORS بدقة إذا كانت خوادم القياس على نطاقات متعددة'
    ],
    bandwidthCostScore: 'فائقة التوفير (A+): يمكن تشغيله على خوادم مجانية مثل Cloudflare Pages + Workers',
    recommendedRole: 'الخيار المثالي والأنسب لموقع تجاري مجاني منخفض التكلفة.'
  },
  {
    name: 'Speedtest.js (Fetch & Stream API)',
    license: 'MIT License (مفتوح المصدر بالكامل)',
    stars: '2.1k+ GitHub Stars',
    pros: [
      'يعتمد على ReadableStream API لقياس سرعة التدفق في الزمن الحقيقي',
      'سهل التضمين والدمج مع React / Next.js / Vue',
      'يدعم قياس الـ Jitter و Bufferbloat بدقة'
    ],
    cons: [
      'يتطلب متصفحات حديثة تدعم Fetch Streams'
    ],
    bandwidthCostScore: 'ممتاز (A): استهلاك باندويث منظم بحسب سرعة العميل',
    recommendedRole: 'الخيار الأسهل للتطوير العصري مع React و Tailwind.'
  },
  {
    name: 'Cloudflare Speed Test SDK / Edge Ping',
    license: 'Cloudflare Free Tier APIs',
    stars: 'Global Enterprise Grade',
    pros: [
      'استغلال أكثر من 300 مركز بيانات لـ Cloudflare حول العالم مجاناً',
      'قياس دقيق لزمن الاستجابة (Edge Latency) لكل قارات العالم',
      'توفير 100% من تكاليف السيرفر والباندويث'
    ],
    cons: [
      'مقيد بشروط استخدام شبكة Cloudflare المجانية'
    ],
    bandwidthCostScore: 'تكلفة $0.00 تماماً (Zero Server Cost)',
    recommendedRole: 'الأفضل لتقليل تكلفة الاستضافة الشهرية إلى صفر دولار.'
  },
  {
    name: 'OpenSpeedTest (HTML5 Network Engine)',
    license: 'Open-Source & Self-Hosted',
    stars: '3.4k+ GitHub Stars',
    pros: [
      'يعمل حتى على شبكات الـ LAN الداخلية وبدون إنترنت خارجي',
      'أداء عالي جداً مع شبكات الـ 10Gbps'
    ],
    cons: [
      'التصميم الافتراضي كلاسيكي ويحتاج إعادة بناء كاملة للواجهة لتناسب AdSense'
    ],
    bandwidthCostScore: 'جيد جداً (B+)',
    recommendedRole: 'رائع كخادم مساعد للقياسات العالية.'
  }
];
