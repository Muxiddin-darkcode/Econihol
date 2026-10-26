import {
  AchievementBadge,
  AuditLogItem,
  Lesson,
  PracticalTask,
  ResearchStudy,
  StudyParticipant,
  TaskSubmission,
  User,
  WasteItem
} from '../types/index.ts';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-std-1',
    username: 'ali_valiyev',
    displayName: 'Ali Valiyev',
    role: 'student',
    gradeLevel: 3,
    className: '3-«A» sinf',
    schoolName: "Toshkent shahar 110-umumiy o‘rta ta’lim maktabi",
    avatar: '👦🏻',
    stars: 125,
    completedLessonsCount: 6,
    studentId: 'UZ-EDU-2024-84920',
    shift: '1-smena',
    advisorName: 'Dilnoza Karimova'
  },
  {
    id: 'u-tch-1',
    username: 'dilnoza_ustoz',
    displayName: 'Dilnoza Karimova',
    role: 'teacher',
    schoolName: "Toshkent shahar 110-umumiy o‘rta ta’lim maktabi",
    avatar: '👩🏻‍🏫',
    position: "Boshlang‘ich sinf oliy toifali o‘qituvchisi",
    assignedClasses: ['1-A', '2-B', '3-A', '4-A']
  },
  {
    id: 'u-res-1',
    username: 'prof_rustamov',
    displayName: 'Dr. Rustam Zokirov',
    role: 'researcher',
    schoolName: "Nizomiy nomidagi TDPU & MMTB Ilmiy Kengashi",
    avatar: '👨🏻‍🔬',
    position: "Pedagogika fanlari doktori, professor"
  },
  {
    id: 'u-adm-1',
    username: 'admin_said',
    displayName: 'Saidbek Adminov',
    role: 'admin',
    schoolName: "110-sonli maktab ma’muriyati",
    avatar: '🛡️',
    position: "O‘quv ishlari bo‘yicha direktor o‘rinbosari (O‘IBDO‘)"
  },
  {
    id: 'u-par-1',
    username: 'malika_ona',
    displayName: 'Malika Valiyeva (Ota-ona)',
    role: 'parent',
    schoolName: "Toshkent shahar 110-umumiy o‘rta ta’lim maktabi",
    avatar: '👩🏻',
    advisorName: 'Dilnoza Karimova'
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  // 1-sinf
  {
    id: 'les-1-1',
    gradeLevel: 1,
    topicCode: 'TAB-1-01',
    title: 'Tirik va Jonsiz Tabiat Mo‘jizalari',
    subject: 'Tabiiy fanlar',
    durationMinutes: 20,
    coverEmoji: '🌱',
    themeColor: 'from-emerald-500 to-green-600',
    summary: 'Atrofimizdagi narsalarni tirik va jonsiz tabiat guruhlariga ajratishni o‘rganamiz.',
    objectives: [
      'Tirik tabiat a’zolari (o‘simliklar, hayvonlar, inson) xususiyatlarini bilish',
      'Jonsiz tabiat narsalarini (tosh, suv, havo, quyosh) ajrata olish',
      'Tabiatga mehr bilan munosabatda bo‘lishni tushunish'
    ],
    storyContent: `Atrofimizga qarasak, ajoyib tabiatni ko‘ramiz. Daraxtlar, chiroyli gullar, chumchuqlar va mushukchalar — bular tirik tabiatdir! Ular nafas oladi, oziqlanadi va o‘sadi. 

Quyosh nuri, tiniq suv, toshlar va tuproq esa jonsiz tabiatga kiradi. Jonsiz tabiat bo‘lmasa, tirik mavjudotlar yashay olmaydi. Shuning uchun biz tabiatning har bir zarrasini e’zozlashimiz kerak!`,
    glossary: [
      { term: 'Tirik tabiat', definition: 'O‘sadigan, nafas oladigan va oziqlanadigan mavjudotlar (o‘simlik, hayvon, inson).' },
      { term: 'Jonsiz tabiat', definition: 'O‘smaydigan, lekin tirik mavjudotlarga hayot baxsh etadigan narsalar (quyosh, suv, tosh).' }
    ],
    reflectionQuestion: 'Siz uyingizda yoki maktab hovlisida qaysi tirik va jonsiz tabiat a’zolarini ko‘rasiz?',
    interactiveCheck: {
      question: 'Quyidagilardan qaysi biri TIRIK tabiatga misol bo‘ladi?',
      options: ['Oqayotgan buloq suvi', 'Chiroyli kapalak', 'Katta yaltiroq tosh', 'Oltinrang qum'],
      correctIndex: 1,
      explanation: 'Kapalak tirik mavjudotdir: u oziqlanadi, harakatlanadi va ko‘payadi.'
    },
    status: 'published',
    author: 'N. Sodiqova (Boshlang‘ich sinf metodisti)',
    expertReviewer: 'Dots. K. Alimov (Biologiya fanlari nomzodi)',
    version: '1.2'
  },
  {
    id: 'les-1-2',
    gradeLevel: 1,
    topicCode: 'TAB-1-02',
    title: 'Suv — Hayot Manbai: Bir Tomchining Qadri',
    subject: 'Tabiiy fanlar',
    durationMinutes: 20,
    coverEmoji: '💧',
    themeColor: 'from-blue-500 to-cyan-600',
    summary: 'Suv qayerdan kelishi va uni nima uchun har bir tomchisini tejash kerakligini bilib olamiz.',
    objectives: [
      'Suv barcha tirik mavjudotlar uchun zarurligini anglash',
      'Tish tozalash va qo‘l yuvish paytida suvni oqizib qo‘ymaslik odatini o‘rganish',
      'Isrof bo‘layotgan suvni ko‘rganda jo‘mrakni yopish'
    ],
    storyContent: `Tasavvur qiling, o‘rmondagi kichik kiyikcha chanqab qoldi. U toza soy bo‘yiga borib muzdek suv ichdi va quvnoq sakrab ketdi. Suv bo‘lmasa na o‘simliklar unadi, na odamlar va hayvonlar yashay oladi.

Lekin dunyoda toza ichimlik suvi juda oz! Agar biz tishlarimizni yuvayotganda jo‘mrakni ochiq qoldirsak, bir necha paqir toza suv bekorga oqib ketadi. Biz kichik bo‘lsak ham, suvni tejab tabiatga yordam bera olamiz!`,
    glossary: [
      { term: 'Ichimlik suvi', definition: 'Inson va tirik organizmlar iste’mol qilishi uchun xavfsiz va toza chuchuk suv.' },
      { term: 'Tejamkorlik', definition: 'Tabiiy boyliklarni isrof qilmasdan, faqat kerakli miqdorda ishlatish.' }
    ],
    reflectionQuestion: 'Tishlaringizni yuvayotganda suv jo‘mragini ochiq qoldirasizmi yoki stakanchadan foydalanasizmi?',
    interactiveCheck: {
      question: 'Suvni tejash uchun qaysi ishni qilish eng to‘g‘ri?',
      options: [
        'Jo‘mrakni ochib qo‘yib xonani aylanib kelish',
        'Tish yuvayotganda maxsus stakanchaga suv quyib olish',
        'Gulga har kuni keragidan ortiqcha suv quyib ko‘lmak qilish',
        'Mashinani jo‘mrakka ulangan shlang bilan uzoq yuvish'
      ],
      correctIndex: 1,
      explanation: 'Stakanchada suv ishlatilganda jo‘mrakdan bekorga litrlab toza suv oqib ketmaydi.'
    },
    status: 'published',
    author: 'Z. Qosimova',
    expertReviewer: 'Prof. T. Ernazarov',
    version: '1.1'
  },

  // 2-sinf
  {
    id: 'les-2-1',
    gradeLevel: 2,
    topicCode: 'TAB-2-01',
    title: 'Chiqindilarni Ajratish — Sayyoramiz Najoti',
    subject: 'Tabiiy fanlar',
    durationMinutes: 25,
    coverEmoji: '♻️',
    themeColor: 'from-amber-500 to-emerald-600',
    summary: 'Chiqindilarni saralash (qog‘oz, plastik, oziq-ovqat, shisha) va ularning tabiatdagi zarari.',
    objectives: [
      'Turli chiqindilarning tabiatda chirish muddatini bilish',
      'Plastik, qog‘oz, shisha va organik chiqindilarni alohida idishlarga saralashni o‘rganish',
      'Qayta ishlashning (recycling) tabiatga foydasini tushunish'
    ],
    storyContent: `Har kuni uylarimizdan va maktablardan ko‘plab chiqindi chiqadi. Agar barcha axlat bitta joyga aralashtirib tashlansa, shahar chetlarida baland axlat tog‘lari paydo bo‘ladi.

Bilasizmi, bitta plastik idish tabiatda 400 yildan ortiq saqlanadi! Olma po‘chog‘i esa bir-ikki oyda chirib, tuproqqa ozuqa bo‘ladi. Agar biz chiqindilarni alohida rangli qutilarga saralasak:
- Sariq quti: Plastik
- Moviy quti: Qog‘oz
- Yashil quti: Shisha
- Jigarrang quti: Organik chiqindi
Unda zavodlar ularni qayta ishlab yangi daftarlar, qutilar va buyumlar yasashi mumkin!`,
    glossary: [
      { term: 'Qayta ishlash', definition: 'Ishlatilgan narsalardan (qog‘oz, plastik) yana yangi mahsulot tayyorlash.' },
      { term: 'Organik chiqindi', definition: 'Oziq-ovqat qoldiqlari, meva-sabzavot po‘choqlari, barglar.' }
    ],
    reflectionQuestion: 'Sizning uyingizda plastik butilkalar qayerga tashlanadi?',
    interactiveCheck: {
      question: 'Plastik idish tabiatda qancha vaqt parchalanmasdan yotishi mumkin?',
      options: ['1 hafta', '3 oy', '400 yildan ortiq', '1 yil'],
      correctIndex: 2,
      explanation: 'Plastik juda chidamli sun’iy modda bo‘lib, tabiatda yuzlab yillar davomida tuproq va suvni zararlaydi.'
    },
    status: 'published',
    author: 'N. Sodiqova',
    expertReviewer: 'Dots. K. Alimov',
    version: '2.0'
  },
  {
    id: 'les-2-2',
    gradeLevel: 2,
    topicCode: 'TAB-2-02',
    title: 'Jonajon O‘lkamiz Fasllari va Daraxtlar',
    subject: 'Tabiiy fanlar',
    durationMinutes: 25,
    coverEmoji: '🌳',
    themeColor: 'from-green-600 to-teal-700',
    summary: 'Daraxtlar havoni qanday tozalaydi? Kislorod va fotosintezning mo‘jizasi.',
    objectives: [
      'Daraxtlar biz nafas oladigan toza kislorod ishlab chiqarishini bilish',
      'Ko‘kalamzorlashtirish va daraxt ekish ahamiyatini his qilish',
      'Daraxt shoxlarini sindirmaslik qoidasiga amal qilish'
    ],
    storyContent: `Daraxtlar — ona sayyoramizning eng mehribon o‘pkalari! Ular mashinalar va zavodlardan chiqadigan zaharli tutunni o‘z barglari orqali yutadi va biz uchun shifobaxsh toza havoni — kislorodni sovg‘a qiladi.

Katta bir terak yoki chinor daraxti bir kunda uch kishi uchun yetadigan toza havo beradi. Shuning uchun bobolarimiz "Bitta daraxt kessang, o‘nta ko‘chat ek" deb bejiz aytishmagan.`,
    glossary: [
      { term: 'Kislorod', definition: 'Tirik mavjudotlar nafas olishi uchun zarur bo‘lgan toza gaz.' },
      { term: 'Ko‘kalamzor', definition: 'Daraxtlar, butalar va gullar ekilgan yashil maydon.' }
    ],
    reflectionQuestion: 'Siz hech qachon o‘z qo‘lingiz bilan ko‘chat yoki gul ekkanmisiz?',
    interactiveCheck: {
      question: 'Daraxtlar havoni qanday qilib tozalaydi?',
      options: [
        'Changni supurgi bilan tozalab beradi',
        'Zaharli gazlarni yutib, toza kislorod ajratadi',
        'Faqat shamol esganda ishlaydi',
        'Daraxtlar havo tozalashga yordam bermaydi'
      ],
      correctIndex: 1,
      explanation: 'Daraxtlar fotosintez jarayoni orqali karbonat angidridni yutib, kislorod ishlab chiqaradi.'
    },
    status: 'published',
    author: 'Z. Qosimova',
    expertReviewer: 'Prof. T. Ernazarov',
    version: '1.0'
  },

  // 3-sinf
  {
    id: 'les-3-1',
    gradeLevel: 3,
    topicCode: 'TAB-3-01',
    title: 'Ekologik Muvozanat va Oziq Zanjiri',
    subject: 'Tabiiy fanlar',
    durationMinutes: 30,
    coverEmoji: '🦅',
    coverImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    themeColor: 'from-teal-600 to-indigo-700',
    summary: 'Tabiatdagi o‘zaro bog‘liqlik: quyosh nuri, o‘tlar, kemiruvchilar va yirtqich qushlar.',
    objectives: [
      'Tabiatdagi barcha jonzotlar bir-biri bilan uzviy bog‘liqligini tushunish',
      'Oziq zanjirining buzilishi ekologik falokatga olib kelishini anglash',
      'Hasharotlar va mayda jonzotlarni asrash madaniyatini shakllantirish'
    ],
    storyContent: `Tabiatda tasodifiy hech narsa yo‘q! Barcha mavjudotlar xuddi zanjir xalqalaridek bir-biriga bog‘langan.

Keling, oddiy zanjirni ko‘rib chiqaylik:
1. Quyosh nuri ostida yashil maysa o‘sadi.
2. Maysani chigirtka va quyon yeydi.
3. Chigirtkani qushlar, quyonni tulki ovlaydi.
4. Agar insonlar dorilar sepib barcha hasharotlarni yo‘q qilsa, qushlar och qoladi, daraxtlarga zarar yetadi.

Tabiatning har bir bo‘g‘ini muhim!`,
    glossary: [
      { term: 'Oziq zanjiri', definition: 'Jonivorlarning oziqlanishi bo‘yicha ketma-ket joylashgan o‘zaro bog‘liqligi.' },
      { term: 'Ekologik muvozanat', definition: 'Tabiatdagi barcha tirik va jonsiz unsurlarning uyg‘un, tinch holati.' }
    ],
    reflectionQuestion: 'Agar tabiatdagi barcha chumolilar yo‘qolib ketsa, o‘rmonga nima bo‘lishi mumkin?',
    interactiveCheck: {
      question: 'Oziq zanjirida eng birinchi bo‘g‘inda kim turadi?',
      options: ['Bo‘ri yoki sher', 'Yashil o‘simliklar va o‘tlar', 'Burgut', 'Ilon'],
      correctIndex: 1,
      explanation: 'Yashil o‘simliklar Quyosh nuridan foydalanib o‘ziga ozuqa tayyorlaydigan ishlab chiqaruvchilardir.'
    },
    status: 'published',
    author: 'D. Karimova',
    expertReviewer: 'Dots. K. Alimov',
    version: '1.5'
  },
  {
    id: 'les-3-2',
    gradeLevel: 3,
    topicCode: 'TAB-3-02',
    title: 'Tuproq — Nonimiz Beshigi: Uni Zaharli Moddalardan Asraylik',
    subject: 'Tabiiy fanlar',
    durationMinutes: 30,
    coverEmoji: '🌾',
    coverImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80',
    themeColor: 'from-amber-700 to-yellow-800',
    summary: 'Tuproqning unumdor qatlami qanday hosil bo‘ladi va batareyalar uni qanday zaharalaydi.',
    objectives: [
      '1 santimetr unumdor tuproq hosil bo‘lishi uchun yuzlab yillar kerakligini bilish',
      'Eski batareyalarni oddiy axlatga tashlamaslik qoidasini o‘rganish',
      'Tuproqni toza saqlash orqali toza meva-sabzavotlar yetishtirilishini tushunish'
    ],
    storyContent: `Biz yeydigan mazali qovunlar, qip-qizil olmalar va nonimiz tuproqda yetishadi. 1 santimetr qalinlikdagi unumdor tuproq paydo bo‘lishi uchun tabiat 100 yildan 400 yilgacha mehnat qiladi!

Lekin agar bitta ishlatilgan kichik barmoq batareyani erga tashlab yuborsak, undagi og‘ir metallar 20 kvadrat metr tuproqni va 400 litr yerosti suvini zaharlashi mumkin! Xavfli chiqindilarni alohida qutiga topshirish har bir ongli o‘quvchining burchidir.`,
    glossary: [
      { term: 'Unumdor tuproq', definition: 'O‘simliklar yaxshi hosil berishi uchun qulay ozuqaga boy qatlam.' },
      { term: 'Xavfli chiqindi', definition: 'Batareyalar, simobli termometr va dorilar singari tabiatni kuchli zaharlaydigan moddalar.' }
    ],
    reflectionQuestion: 'Ishlatilgan batareyalarni maxsus qabul qilish qutisiga tashlaganmisiz?',
    interactiveCheck: {
      question: 'Eski batareyani oddiy axlat chelagiga tashlash nega qat’iyan man etiladi?',
      options: [
        'U idishda ko‘p joy egallaydi',
        'Tarkibidagi og‘ir metallar tuproq va yerosti suvlarini zaharli qiladi',
        'U axlat mashinasini to‘xtatib qo‘yadi',
        'U darhol havoga uchib ketadi'
      ],
      correctIndex: 1,
      explanation: 'Batareyada simob, qo‘rg‘oshin va kislotalar bo‘lib, ular tuproq va suvni uzoq muddatga zaharlaydi.'
    },
    status: 'published',
    author: 'D. Karimova',
    expertReviewer: 'Prof. T. Ernazarov',
    version: '1.3'
  },

  // 4-sinf
  {
    id: 'les-4-1',
    gradeLevel: 4,
    topicCode: 'TAB-4-01',
    title: 'Orol Fojiasi Saboqlari va Mahalliy Ekologik Muammolar',
    subject: 'Tabiiy fanlar',
    durationMinutes: 35,
    coverEmoji: '🏜️',
    themeColor: 'from-orange-600 to-rose-700',
    summary: 'Orol dengizining qurishi, tuzli bo‘ronlar va suv havzalarini saqlab qolish yo‘llari.',
    objectives: [
      'Orol dengizining qurish sabablarini (Amudaryo va Sirdaryodan keragidan ortiqcha suv olish) o‘rganish',
      'Mahalliy ekologik muammolarni aniqlash va jamoaviy yechim taklif qilish',
      'Yashil kamar (saksovulzorlar) barpo etishning ahamiyatini tushunish'
    ],
    storyContent: `Bir paytlar Orol dengizi dunyodagi to‘rtinchi eng katta ko‘l bo‘lgan. U yerda ulkan kemalar suzgan, shirin baliqlar ovlangan. Ammo insonlar paxta va ekinlarni sug‘orish uchun daryolardan haddan tashqari ko‘p suv oldilar. Natijada Orol dengizi chekindi va uning o‘rnida "Orolqum" sahrosi paydo bo‘ldi.

Bugungi kunda O‘zbekiston olimlari va xalqi Orol tubiga millionlab saksovul ko‘chatlarini ekib, tuzli qumlar ko‘tarilishining oldini olmoqda. Bu bizga tabiat resurslaridan faqat oqilona va me’yorida foydalanish kerakligini o‘rgatadi!`,
    glossary: [
      { term: 'Orolqum', definition: 'Qurigan Orol dengizi o‘rnida paydo bo‘lgan 5 million gektarlik qum-tuz sahrosi.' },
      { term: 'Saksovul', definition: 'Qurg‘oqchilikka chidamli, ildizi bilan qumni mahkam ushlab turadigan cho‘l o‘simligi.' }
    ],
    reflectionQuestion: 'O‘z mahallangizda qanday ekologik muammo bor va uni hal qilishda qanday hissa qo‘sha olasiz?',
    interactiveCheck: {
      question: 'Orol dengizining qurigan tubiga saksovul ekishdan asosiy maqsad nima?',
      options: [
        'Shahar qurish uchun joy tayyorlash',
        'Tuzli qum bo‘ronlarining havoga ko‘tarilishini to‘xtatish',
        'Kemalar harakatlanishiga yo‘l ochish',
        'Quyosh nurini to‘sish'
      ],
      correctIndex: 1,
      explanation: 'Saksovul o‘zining baquvvat ildizlari bilan qum va zaharli tuzlarni ushlab, shamol uchirib ketishidan saqlaydi.'
    },
    status: 'published',
    author: 'D. Karimova',
    expertReviewer: 'Prof. T. Ernazarov',
    version: '2.1'
  },
  {
    id: 'les-4-2',
    gradeLevel: 4,
    topicCode: 'TAB-4-02',
    title: 'Qayta Tiklanuvchi Energiya: Quyosh va Shamol Quvvati',
    subject: 'Tabiiy fanlar',
    durationMinutes: 35,
    coverEmoji: '☀️',
    themeColor: 'from-amber-500 to-cyan-700',
    summary: 'Ko‘mir va gaz o‘rniga Quyosh batareyalari hamda shamol generatorlaridan foydalanish.',
    objectives: [
      'Qazilma yoqilg‘ilar havoni ifloslantirishini va tugab qolishini tushunish',
      'Quyoshli O‘zbekistonda yashil energiya imkoniyatlarini o‘rganish',
      'Kundalik hayotda elektr energiyasini tejash madaniyatini shakllantirish'
    ],
    storyContent: `O‘zbekistonimiz yiliga 300 kundan ortiq quyoshli kunlarga boy! Quyosh panellari tomga o‘rnatilsa, hech qanday tutunsiz, havoni bulg‘amasdan toza elektr energiyasi ishlab chiqaradi.

Biz esa xonadan chiqayotganda chiroqni o‘chirish, televizor va kompyuterni bekorga yoqib qo‘ymaslik orqali ko‘mir va gaz yoqilishini kamaytiramiz. Toza havo — barchamizning sog‘lig‘imizdir!`,
    glossary: [
      { term: 'Yashil energiya', definition: 'Tabiatga zaharli tutun chiqarmaydigan (quyosh, shamol, suv) qayta tiklanuvchi quvvat.' },
      { term: 'Energiya tejamkorligi', definition: 'Elektr energiyasidan oqilona foydalanish va isrofgarchilikka yo‘l qo‘ymaslik.' }
    ],
    reflectionQuestion: 'Uyingizda xonadan chiqayotganda chiroqni o‘chirishni unutmaysizmi?',
    interactiveCheck: {
      question: 'Quyidagilardan qaysi biri ekologik toza va qayta tiklanuvchi energiya manbai?',
      options: ['Qora ko‘mir yoqish', 'Quyosh paneli', 'Neft mahsulotlari', 'Dizel generatori'],
      correctIndex: 1,
      explanation: 'Quyosh nuri cheksiz va tabiatni zarracha ifloslantirmaydigan yashil energiya manbaidir.'
    },
    status: 'published',
    author: 'N. Sodiqova',
    expertReviewer: 'Dots. K. Alimov',
    version: '1.4'
  }
];

export const WASTE_GAME_ITEMS: WasteItem[] = [
  {
    id: 'w-1',
    name: 'Plastic Bottle',
    nameUz: 'Plastik suv idishi',
    category: 'plastic',
    emoji: '🧴',
    imageUrl: 'https://images.unsplash.com/photo-1562077772-3ab121863414?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '450 yil',
    tipUz: 'Plastik idishni siqib, qopqog‘ini yopib sariq idishga tashlang.'
  },
  {
    id: 'w-2',
    name: 'Apple Core',
    nameUz: 'Olma po‘chog‘i va meva qoldig‘i',
    category: 'organic',
    emoji: '🍏',
    imageUrl: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '1-2 oy',
    tipUz: 'Organik chiqindilar tuproqda tez chiriydi va o‘simliklar uchun ajoyib kompost o‘g‘itga aylanadi.'
  },
  {
    id: 'w-3',
    name: 'Old Newspaper',
    nameUz: 'Eski gazeta va daftarlar',
    category: 'paper',
    emoji: '📰',
    imageUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '2-6 oy',
    tipUz: '60 kg eski qog‘oz bitta katta daraxtni kesilishdan saqlab qoladi!'
  },
  {
    id: 'w-4',
    name: 'Glass Jar',
    nameUz: 'Shisha banka va butilka',
    category: 'glass',
    emoji: '🫙',
    imageUrl: 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '1000+ yil',
    tipUz: 'Shishani cheksiz marta qayta eritib yangi idishlar yasash mumkin.'
  },
  {
    id: 'w-5',
    name: 'AA Battery',
    nameUz: 'Ishlatilgan barmoq batareya',
    category: 'hazardous',
    emoji: '🔋',
    imageUrl: 'https://images.unsplash.com/photo-1619725002198-6a689b72f41d?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '100+ yil (tuproqni zaharlaydi)',
    tipUz: 'Batareyani hech qachon oddiy axlatga tashlamang! Maxsus xavfli chiqindi qutisiga bering.'
  },
  {
    id: 'w-6',
    name: 'Plastic Bag',
    nameUz: 'Plastik polietilen paket',
    category: 'plastic',
    emoji: '🛍️',
    imageUrl: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '100-200 yil',
    tipUz: 'Do‘konga borganingizda matoli xarid xaltasidan foydalanish tabiatni asraydi.'
  },
  {
    id: 'w-7',
    name: 'Banana Peel',
    nameUz: 'Banan po‘sti',
    category: 'organic',
    emoji: '🍌',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '1 oy',
    tipUz: 'Oziq-ovqat qoldiqlarini alohida yashil idishga saralang.'
  },
  {
    id: 'w-8',
    name: 'Cardboard Box',
    nameUz: 'Karton quti va o‘ram',
    category: 'paper',
    emoji: '📦',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=500&q=80',
    decompositionYears: '3 oy',
    tipUz: 'Kartonni buklab, qog‘oz yig‘uvchi maxsus ko‘k idishga joylang.'
  }
];

export const PRACTICAL_TASKS: PracticalTask[] = [
  {
    id: 'task-1',
    gradeLevel: 1,
    title: 'Xonadonda Suv Posboni: Jo‘mraklar Taftishi',
    category: 'Suvni tejash',
    shortDesc: 'Uyingizdagi suv jo‘mraklari tomchilab oqmayotganini tekshiring va tish tozalaganda stakandan foydalaning.',
    instructions: [
      'Ota-onangiz bilan birga oshxona va yuvinish xonasidagi jo‘mraklarni ko‘zdan kechiring.',
      'Agar jo‘mrak tomchilab turgan bo‘lsa, uni mahkam yoping yoki kattalarga tuzatishni ayting.',
      'Tish yuvayotganingizda stakanga suv quyib ishlatishni odat qiling.',
      'Bajarilgan ish bo‘yicha qisqa hisobot yozing yoki rasmini yuklang.'
    ],
    verificationType: 'photo_or_notes',
    rubricCriteria: 'Jo‘mraklar tekshirilganligi, stakandan foydalanish ko‘nikmasi va oilaga tushuntirganligi.',
    dueDays: 5
  },
  {
    id: 'task-2',
    gradeLevel: 2,
    title: 'Xonaki O‘simlik Parvarishi va Kundaligi',
    category: 'O‘simliklar olami',
    shortDesc: 'Sinfdagi yoki uyingizdagi bitta gulga 5 kun mehr bilan qarab, barglarini changdan tozalang va sug‘oring.',
    instructions: [
      'Bitta xonaki o‘simlikni tanlang va unga nom bering.',
      'Har kuni tuprog‘ini tekshiring (qurigan bo‘lsa me’yorida suv quying).',
      'Yumshoq latta bilan barglaridagi changni ehtiyotkorlik bilan arting.',
      'O‘simlikning holatidagi o‘zgarishlarni kundalikka yozib boring.'
    ],
    verificationType: 'journal',
    rubricCriteria: 'Parvarishning muntazamligi, to‘g‘ri sug‘orish va mehrli munosabatning namoyon bo‘lishi.',
    dueDays: 7
  },
  {
    id: 'task-3',
    gradeLevel: 3,
    title: 'Sinfdagi Bir Kunlik Chiqindi Auditi',
    category: 'Chiqindilarni boshqarish',
    shortDesc: 'Sinfingizda bir kun davomida eng ko‘p qaysi chiqindi (qog‘oz, plastik, qalam qirindisi) hosil bo‘lishini hisoblang.',
    instructions: [
      'Darsdan so‘ng sinf axlat qutisini sinf sardori va o‘qituvchi bilan birgalikda kuzating.',
      'Qog‘oz parchalari va qalam qirindilari alohida to‘planganini tekshiring.',
      'Chiqindini kamaytirish bo‘yicha sinfdoshlaringizga 2 ta taklif tayyorlang.',
      'Xulosalaringizni platformaga yozib qoldiring.'
    ],
    verificationType: 'checklist',
    rubricCriteria: 'Kuzatuv aniqligi, sabab-oqibatni tushuntirish va taklifning hayotiyligi.',
    dueDays: 4
  },
  {
    id: 'task-4',
    gradeLevel: 4,
    title: 'Ikkinchi Hayot: Plastik Idishdan Foydali Buyum',
    category: 'Qayta foydalanish (Upcycling)',
    shortDesc: 'Tashlab yuboriladigan plastik butilka yoki karton qutidan qalamdon, gul tuvak yoki qushlar uchun donxona yasang.',
    instructions: [
      'Ishlatilgan toza plastik butilka yoki qutini toping.',
      'Qushlar uchun donxona yoki stol usti qalamdoni yasash rejasini chizing.',
      'Kattalar yordamida kesib, chiroyli bezating.',
      'Yasagan ijodiy ishingiz haqida hikoya qilib yozing va fotosuratini taqdim eting.'
    ],
    verificationType: 'photo_or_notes',
    rubricCriteria: 'Ijodkorlik, qayta foydalanish maqsadining aniqligi va ekologik tushuntirish.',
    dueDays: 7
  }
];

export const INITIAL_SUBMISSIONS: TaskSubmission[] = [
  {
    id: 'sub-101',
    taskId: 'task-1',
    taskTitle: 'Xonadonda Suv Posboni: Jo‘mraklar Taftishi',
    studentId: 'u-std-1',
    studentName: 'Ali Valiyev',
    className: '3-A sinf',
    submittedAt: 'Bugun, 14:20',
    notes: 'Bugun oshxonamizdagi jo‘mrakni tekshirdim. U tomchilab turgan ekan, dadam bilan birga rezinachasini almashtirdik. Endi tish yuvayotganda doim ko‘k stakanchadan foydalanyapman!',
    evidenceType: 'Izoh va fotosurat',
    evidenceUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80',
    status: 'graded',
    score: 3,
    rubricLevel: "3 — Qo'llaydi va izohlaydi",
    feedback: 'Barakalla, Ali! Jo‘mrakni tuzatishda qatnashganing va tish yuvishda stakanni qo‘llayotganing ajoyib ekologik odatdir.',
    gradedBy: 'Dilnoza Karimova'
  },
  {
    id: 'sub-102',
    taskId: 'task-3',
    taskTitle: 'Sinfdagi Bir Kunlik Chiqindi Auditi',
    studentId: 'u-std-1',
    studentName: 'Ali Valiyev',
    className: '3-A sinf',
    submittedAt: 'Bugun, 16:45',
    notes: 'Sinfimizda bugun 24 dona qog‘oz parchasi va 8 dona bo‘sh sharbat qutisi chiqdi. Biz partadoshim Sardor bilan qog‘ozlarni alohida qutiga to‘pladik.',
    evidenceType: 'Kuzatuv hisoboti',
    status: 'pending'
  },
  {
    id: 'sub-103',
    taskId: 'task-2',
    taskTitle: 'Xonaki O‘simlik Parvarishi va Kundaligi',
    studentId: 'u-std-2',
    studentName: 'Madina Olimova',
    className: '3-A sinf',
    submittedAt: 'Kecha, 18:10',
    notes: 'Binafsha gulimga har kuni qarab turdim. Tuprog‘i quriganda yarim stakan suv quydim, barglarini artdim. Gulim yangi kurtak ochdi!',
    evidenceType: 'Kundalik daftari',
    status: 'graded',
    score: 2,
    rubricLevel: '2 — Mustaqil bajaradi',
    feedback: 'Juda yaxshi, Madina! Gul parvarishini to‘g‘ri bajargansan.',
    gradedBy: 'Dilnoza Karimova'
  }
];

export const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'b-1',
    code: 'WATER_SAVER_1',
    title: 'Suv Do‘sti',
    description: 'Suvni tejash bo‘yicha 1-darsni tamomladi va stakan ishlatish odatini o‘rgandi.',
    category: 'water',
    tier: 'bronze',
    icon: '💧',
    earned: true,
    earnedAt: '2026-10-14',
    currentProgress: 1,
    targetProgress: 1,
    unit: 'dars',
    starReward: 20,
    actionTargetView: 'student-lessons',
    actionLabelUz: 'Darsni ko‘rish',
    ecoLoreUz: 'Tish tozalaganda stakandan foydalanish har safar 15 litr toza ichimlik suvini tejalishiga yordam beradi.'
  },
  {
    id: 'b-2',
    code: 'WATER_GUARDIAN_2',
    title: 'Kran Nazoratchisi',
    description: 'Suvni tejash posboni o‘yinida 50 litrdan ortiq suvni isrof bo‘lishdan asrab qoldi.',
    category: 'water',
    tier: 'silver',
    icon: '🚰',
    earned: false,
    currentProgress: 35,
    targetProgress: 50,
    unit: 'litr',
    starReward: 35,
    actionTargetView: 'student-games',
    actionLabelUz: 'O‘yinni o‘ynash',
    ecoLoreUz: 'Tomchilab oqayotgan bitta jo‘mrak kuniga 30 litr, bir oyda esa butun boshli hovuz toza suvni isrof qiladi.'
  },
  {
    id: 'b-3',
    code: 'RECYCLE_NOVICE',
    title: 'Saralash Shogirdi',
    description: 'Chiqindilarni saralash ustaxonasida kamida 5 ta chiqindini to‘g‘ri idishga joyladi.',
    category: 'waste',
    tier: 'bronze',
    icon: '📦',
    earned: true,
    earnedAt: '2026-10-15',
    currentProgress: 5,
    targetProgress: 5,
    unit: 'chiqindi',
    starReward: 20,
    actionTargetView: 'student-games',
    actionLabelUz: 'Saralash o‘yini',
    ecoLoreUz: 'Chiqindilarni boshlang‘ich sinfdanoq saralash shahar atrofidagi axlat poligonlarini 60% ga qisqartiradi.'
  },
  {
    id: 'b-4',
    code: 'RECYCLE_MASTER',
    title: 'Saralash Ustasi',
    description: 'Chiqindilarni 5 xil rangli qutilarga xatosiz joylab, ketma-ketlik rekordini o‘rnatdi.',
    category: 'waste',
    tier: 'gold',
    icon: '♻️',
    earned: true,
    earnedAt: '2026-10-16',
    currentProgress: 8,
    targetProgress: 8,
    unit: 'to‘g‘ri javob',
    starReward: 50,
    actionTargetView: 'student-games',
    actionLabelUz: 'Saralash ustaxonasi',
    ecoLoreUz: '1 tonna qayta ishlangan qog‘oz 17 ta yirik daraxtni kesilishdan asrab qoladi va havoni toza saqlaydi.'
  },
  {
    id: 'b-5',
    code: 'BATTERY_HERO',
    title: 'Tuproq Himoyachisi',
    description: 'Xavfli chiqindilar (batareyalar) va unumdor tuproq darslarini muvaffaqiyatli topshirdi.',
    category: 'waste',
    tier: 'silver',
    icon: '🔋',
    earned: false,
    currentProgress: 1,
    targetProgress: 2,
    unit: 'dars',
    starReward: 30,
    actionTargetView: 'student-lessons',
    actionLabelUz: 'Tuproq darsiga o‘tish',
    ecoLoreUz: 'Bitta barmoq batareya 20 kvadrat metr tuproqni va 400 litr yerosti suvini og‘ir metallar bilan zaharlaydi.'
  },
  {
    id: 'b-6',
    code: 'GREEN_FRIEND',
    title: 'Ko‘kalamzor Do‘sti',
    description: 'O‘simliklar va daraxtlar haqidagi 2 ta darsni a’lo bahoga o‘zlashtirdi.',
    category: 'plants',
    tier: 'bronze',
    icon: '🌱',
    earned: true,
    earnedAt: '2026-10-17',
    currentProgress: 2,
    targetProgress: 2,
    unit: 'dars',
    starReward: 25,
    actionTargetView: 'student-lessons',
    actionLabelUz: 'Darslarni ko‘rish',
    ecoLoreUz: 'Bitta katta chinor daraxti bir kunda uch kishi uchun yetarli bo‘lgan toza kislorod ishlab chiqaradi.'
  },
  {
    id: 'b-7',
    code: 'LITTLE_GARDENER',
    title: 'Kichik Bog‘bon',
    description: 'Virtual Tabiat Bog‘ida 6 ta go‘zal gul ekdi va o‘simliklarni muntazam parvarishladi.',
    category: 'plants',
    tier: 'silver',
    icon: '🌸',
    earned: false,
    currentProgress: 4,
    targetProgress: 6,
    unit: 'gul ekildi',
    starReward: 35,
    actionTargetView: 'student-games',
    actionLabelUz: 'Virtual bog‘ga o‘tish',
    ecoLoreUz: 'Gullar va o‘simliklar nafaqat ko‘zni quvontiradi, balki chang zarrachalarini yutib havoni namlantiradi.'
  },
  {
    id: 'b-8',
    code: 'FOOD_CHAIN_EXPERT',
    title: 'Oziq Zanjiri Bilimdoni',
    description: 'Ekologik oziq zanjiri o‘yinida quyoshdan burgutgacha barcha xalqalarni to‘g‘ri tikladi.',
    category: 'plants',
    tier: 'gold',
    icon: '🦅',
    earned: true,
    earnedAt: '2026-10-18',
    currentProgress: 5,
    targetProgress: 5,
    unit: 'bo‘g‘in',
    starReward: 40,
    actionTargetView: 'student-games',
    actionLabelUz: 'Oziq zanjiri o‘yini',
    ecoLoreUz: 'Tabiatdagi har bir jonzot muhim; hatto eng kichik hasharot yo‘qolsa ham butun oziq zanjiri uzilishi mumkin.'
  },
  {
    id: 'b-9',
    code: 'SOLAR_CHAMPION',
    title: 'Yashil Energiya Do‘sti',
    description: 'Quyosh va shamol energiyasidan foydalanish hamda elektrni tejash amaliyotini bajardi.',
    category: 'planet',
    tier: 'silver',
    icon: '☀️',
    earned: false,
    currentProgress: 1,
    targetProgress: 2,
    unit: 'topshiriq',
    starReward: 35,
    actionTargetView: 'student-tasks',
    actionLabelUz: 'Vazifaga o‘tish',
    ecoLoreUz: 'O‘zbekistonda yiliga 300 kundan ortiq quyosh charaqlaydi; yashil quvvat havoni tutunlardan tozalaydi.'
  },
  {
    id: 'b-10',
    code: 'ECO_RESEARCHER',
    title: 'Yosh Ilmiy Tadqiqotchi',
    description: 'Ekologik madaniyat diagnostika so‘rovnomasini to‘liq va vijdonan topshirdi.',
    category: 'habits',
    tier: 'gold',
    icon: '🔍',
    earned: true,
    earnedAt: '2026-10-18',
    currentProgress: 1,
    targetProgress: 1,
    unit: 'test',
    starReward: 45,
    actionTargetView: 'student-progress',
    actionLabelUz: 'Diagnostikani ko‘rish',
    ecoLoreUz: 'O‘z bilim va odatlarini xolisona tahlil qilish insonning ongli ekologik madaniyatini belgilaydi.'
  },
  {
    id: 'b-11',
    code: 'HABIT_STREAK',
    title: 'Muntazam Odatlar Posboni',
    description: 'Kundalik ekologik odatlarni (chiroq o‘chirish, jo‘mrakni yopish) 5 kun davomida bajardi.',
    category: 'habits',
    tier: 'silver',
    icon: '🔥',
    earned: false,
    currentProgress: 3,
    targetProgress: 5,
    unit: 'kun ketma-ket',
    starReward: 30,
    actionTargetView: 'student-home',
    actionLabelUz: 'Bugungi odatni bajarish',
    ecoLoreUz: 'Kichik kundalik odatlar birlashib, sayyoramizni asrab qoluvchi ulkan umummilliy madaniyatga aylanadi.'
  },
  {
    id: 'b-12',
    code: 'EARTH_CHAMPION',
    title: 'Oliy Sayyora Qahramoni',
    description: 'Barcha 4 o‘lchov (bilim, munosabat, amaliy ko‘nikma, xulq-atvor) bo‘yicha 85+ indeksga yetdi.',
    category: 'planet',
    tier: 'emerald',
    icon: '🌍',
    earned: false,
    currentProgress: 85,
    targetProgress: 90,
    unit: 'indeks bali',
    starReward: 100,
    actionTargetView: 'student-progress',
    actionLabelUz: 'Indeksni oshirish',
    ecoLoreUz: 'Oliy darajadagi ekologik madaniyat — tabiatga mehr va uning boyliklarini kelajak avlodga bus-butun qoldirishdir!'
  }
];

export const RESEARCH_STUDY: ResearchStudy = {
  id: 'study-2026-uz',
  title: "Boshlang'ich sinf (1-4) o'quvchilarida Tabiiy fanlar orqali ekologik madaniyatni rivojlantirish samaradorligi",
  protocolVersion: 'PROT-ECO-2026-v2',
  approvedDate: '2026-09-01',
  targetGrades: '1-, 2-, 3- va 4-sinflar',
  sampleSize: 120,
  experimentalCount: 60,
  controlCount: 60,
  status: 'active',
  hypothesis: 'Interaktiv ekologik platforma va amaliy vazifalar qo‘llanilganda o‘quvchilarning ekologik madaniyat indeksi nazorat guruhiga nisbatan sezilarli darajada (d >= 0.70) yuqori bo‘ladi.',
  t0Date: '2026-09-10 (Boshlang‘ich o‘lchov)',
  t1Date: '2026-10-15 (Oraliq/Yakuniy o‘lchov)'
};

// Realistic mock participants data for scientific evaluation
export const MOCK_PARTICIPANTS: StudyParticipant[] = [
  // Experimental Group (60 total in real stats, here sample representative 10)
  { participantCode: 'EXP-101', groupType: 'experimental', gradeLevel: 3, t0Knowledge: 45, t0Attitude: 50, t0Skill: 35, t0Behavior: 40, t1Knowledge: 85, t1Attitude: 90, t1Skill: 80, t1Behavior: 85, overallT0: 42.5, overallT1: 85.0 },
  { participantCode: 'EXP-102', groupType: 'experimental', gradeLevel: 3, t0Knowledge: 50, t0Attitude: 55, t0Skill: 40, t0Behavior: 45, t1Knowledge: 90, t1Attitude: 85, t1Skill: 85, t1Behavior: 90, overallT0: 47.5, overallT1: 87.5 },
  { participantCode: 'EXP-103', groupType: 'experimental', gradeLevel: 3, t0Knowledge: 40, t0Attitude: 45, t0Skill: 30, t0Behavior: 35, t1Knowledge: 80, t1Attitude: 80, t1Skill: 75, t1Behavior: 80, overallT0: 37.5, overallT1: 78.8 },
  { participantCode: 'EXP-104', groupType: 'experimental', gradeLevel: 3, t0Knowledge: 60, t0Attitude: 65, t0Skill: 50, t0Behavior: 55, t1Knowledge: 95, t1Attitude: 95, t1Skill: 90, t1Behavior: 90, overallT0: 57.5, overallT1: 92.5 },
  { participantCode: 'EXP-105', groupType: 'experimental', gradeLevel: 3, t0Knowledge: 35, t0Attitude: 40, t0Skill: 25, t0Behavior: 30, t1Knowledge: 75, t1Attitude: 80, t1Skill: 70, t1Behavior: 75, overallT0: 32.5, overallT1: 75.0 },
  { participantCode: 'EXP-106', groupType: 'experimental', gradeLevel: 2, t0Knowledge: 45, t0Attitude: 50, t0Skill: 40, t0Behavior: 40, t1Knowledge: 85, t1Attitude: 85, t1Skill: 80, t1Behavior: 80, overallT0: 43.8, overallT1: 82.5 },
  { participantCode: 'EXP-107', groupType: 'experimental', gradeLevel: 2, t0Knowledge: 55, t0Attitude: 60, t0Skill: 45, t0Behavior: 50, t1Knowledge: 90, t1Attitude: 90, t1Skill: 85, t1Behavior: 85, overallT0: 52.5, overallT1: 87.5 },
  { participantCode: 'EXP-108', groupType: 'experimental', gradeLevel: 4, t0Knowledge: 50, t0Attitude: 55, t0Skill: 40, t0Behavior: 45, t1Knowledge: 90, t1Attitude: 95, t1Skill: 85, t1Behavior: 90, overallT0: 47.5, overallT1: 90.0 },

  // Control Group (Traditional lessons without interactive digital platform)
  { participantCode: 'CTRL-201', groupType: 'control', gradeLevel: 3, t0Knowledge: 45, t0Attitude: 50, t0Skill: 35, t0Behavior: 40, t1Knowledge: 55, t1Attitude: 55, t1Skill: 40, t1Behavior: 45, overallT0: 42.5, overallT1: 48.8 },
  { participantCode: 'CTRL-202', groupType: 'control', gradeLevel: 3, t0Knowledge: 50, t0Attitude: 50, t0Skill: 40, t0Behavior: 45, t1Knowledge: 60, t1Attitude: 55, t1Skill: 45, t1Behavior: 50, overallT0: 46.3, overallT1: 52.5 },
  { participantCode: 'CTRL-203', groupType: 'control', gradeLevel: 3, t0Knowledge: 40, t0Attitude: 45, t0Skill: 30, t0Behavior: 35, t1Knowledge: 50, t1Attitude: 50, t1Skill: 35, t1Behavior: 40, overallT0: 37.5, overallT1: 43.8 },
  { participantCode: 'CTRL-204', groupType: 'control', gradeLevel: 3, t0Knowledge: 60, t0Attitude: 60, t0Skill: 50, t0Behavior: 50, t1Knowledge: 65, t1Attitude: 65, t1Skill: 55, t1Behavior: 55, overallT0: 55.0, overallT1: 60.0 },
  { participantCode: 'CTRL-205', groupType: 'control', gradeLevel: 3, t0Knowledge: 35, t0Attitude: 40, t0Skill: 30, t0Behavior: 30, t1Knowledge: 45, t1Attitude: 45, t1Skill: 35, t1Behavior: 35, overallT0: 33.8, overallT1: 40.0 },
  { participantCode: 'CTRL-206', groupType: 'control', gradeLevel: 2, t0Knowledge: 45, t0Attitude: 50, t0Skill: 40, t0Behavior: 40, t1Knowledge: 55, t1Attitude: 55, t1Skill: 45, t1Behavior: 45, overallT0: 43.8, overallT1: 50.0 },
  { participantCode: 'CTRL-207', groupType: 'control', gradeLevel: 2, t0Knowledge: 50, t0Attitude: 55, t0Skill: 45, t0Behavior: 45, t1Knowledge: 60, t1Attitude: 60, t1Skill: 50, t1Behavior: 50, overallT0: 48.8, overallT1: 55.0 },
  { participantCode: 'CTRL-208', groupType: 'control', gradeLevel: 4, t0Knowledge: 55, t0Attitude: 55, t0Skill: 45, t0Behavior: 45, t1Knowledge: 65, t1Attitude: 65, t1Skill: 50, t1Behavior: 50, overallT0: 50.0, overallT1: 57.5 }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-001',
    actorName: 'Dilnoza Karimova',
    actorRole: 'teacher',
    action: 'TOPIC_ASSIGNMENT',
    resourceType: 'assignment',
    resourceId: 'task-1',
    eventTime: '2026-10-18 14:05:12',
    result: 'SUCCESS',
    details: '3-A sinfiga "Xonadonda Suv Posboni" topshirig‘i biriktirildi.'
  },
  {
    id: 'log-002',
    actorName: 'Ali Valiyev',
    actorRole: 'student',
    action: 'SUBMISSION_CREATE',
    resourceType: 'submission',
    resourceId: 'sub-101',
    eventTime: '2026-10-18 14:20:45',
    result: 'SUCCESS',
    details: 'Vazifa hisoboti va fotosurat dalili yuborildi.'
  },
  {
    id: 'log-003',
    actorName: 'Dilnoza Karimova',
    actorRole: 'teacher',
    action: 'RUBRIC_SCORE',
    resourceType: 'submission',
    resourceId: 'sub-101',
    eventTime: '2026-10-18 15:10:02',
    result: 'SUCCESS',
    details: 'Rubrika bo‘yicha 3 ball qo‘yildi (Qo‘llaydi va izohlaydi).'
  },
  {
    id: 'log-004',
    actorName: 'AI Safety Guard',
    actorRole: 'admin',
    action: 'PROMPT_FILTER',
    resourceType: 'ai_session',
    resourceId: 'sess-849',
    eventTime: '2026-10-18 15:35:19',
    result: 'FLAGGED',
    details: 'O‘quvchi telefon raqami yozishga uringanda xavfsizlik filtri to‘xtatdi.'
  },
  {
    id: 'log-005',
    actorName: 'Dr. Rustam Zokirov',
    actorRole: 'researcher',
    action: 'EXPORT_DATASET',
    resourceType: 'research_export',
    resourceId: 'exp-2026-10',
    eventTime: '2026-10-18 16:00:44',
    result: 'SUCCESS',
    details: 'Pseudonimlashtirilgan T0/T1 tadqiqot ma’lumotlari CSV formatida yuklab olindi.'
  }
];

export const PRESET_STUDENT_AI_QUESTIONS = [
  "Nega kuz faslida daraxtlarning barglari sarg‘ayadi? 🍂",
  "Plastik butilka tabiatda qancha vaqt parchalanmaydi? 🧴",
  "Uydagi suvni tejash uchun nima qilishim mumkin? 💧",
  "Orol dengiziga nima bo‘lgan va uni qanday qutqaryapmiz? 🏜️",
  "Eski batareyalarni nega oddiy axlatga tashlash xavfli? 🔋"
];
