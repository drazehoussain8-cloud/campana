(function () {
"use strict";

/* ================= إعدادات المطعم (غيّر هنا فقط) ================= */
var CFG = {
  phone: "+212655585131",
  phoneShow: "+212 655-585131",
  wa: "212655585131",
  email: "lecampanachezfatima@gmail.com",
  lat: 31.5170171,
  lng: -9.7652129,
  logo: "img/logo.svg",          // اللوغو العريض على شكل لافتة (الهيدر والفوتر)
  faviconPng: "img/favicon.png", // أيقونة مربعة لتبويب المتصفح
  price: "",            // سعر قائمة اليوم، مثال: "120 DH" (اتركه فارغاً ليختفي)
  demo: true,           // اجعله false بعد موافقة صاحب المطعم لإخفاء شارة النسخة التجريبية
  // صور المعرض بالترتيب: الشرفة، المحيط، الأطباق، العصائر، الداخل، تفاصيل
  // مثال: [{src:"img/terrace.jpg"},{src:"img/view.jpg"}, ...]
  // الصور مربوطة مباشرة من Tripadvisor للمعاينة فقط. استبدلها بصور المطعم الأصلية قبل النشر
  images: [
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/fa/e2/26/caption.jpg?w=1000&h=-1&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/7f/6d/47/decouvrez-notre-specialites.jpg?w=900&h=-1&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/fa/e2/25/caption.jpg?w=900&h=-1&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/20/e2/c0/caption.jpg?w=900&h=-1&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/78/f7/c9/caption.jpg?w=900&h=-1&s=1"},
    {src:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/7f/6d/4b/decouvrez-notre-specialites.jpg?w=900&h=-1&s=1"}
  ]
};
// ساعات العمل (بتوقيت المغرب). الأحد=0 ... السبت=6. null = مغلق
var HOURS = {0:[660,1050],1:null,2:[660,1050],3:[660,1050],4:[660,1050],5:[660,1050],6:[660,1050]};
/* ================================================================= */

var ICONS = {
  home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5"/>',
  utensils:'<path d="M4 3v7a3 3 0 0 0 3 3v8"/><path d="M7 3v7"/><path d="M10 3v7a3 3 0 0 1-3 3"/><path d="M18 21V3c-2.5 1.5-4 4.5-4 8v2h4"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="1.7"/><path d="m21 15-4.5-4.5L6 21"/>',
  heart:'<path d="M12 21s-7.5-4.6-9.3-9.2C1.4 8.3 3.5 5 6.8 5c2 0 3.5 1.1 5.2 3 1.7-1.9 3.2-3 5.2-3 3.3 0 5.4 3.3 4.1 6.8C19.5 16.4 12 21 12 21z"/>',
  phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  chat:'<path d="M21 11.5a8.4 8.4 0 0 1-12.3 7.4L3 20l1.2-5.3A8.4 8.4 0 1 1 21 11.5z"/>',
  pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  leaf:'<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 22c0-4 3-7 9-9"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  waves:'<path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 14c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/><path d="M2 20c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2"/>',
  star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  wifi:'<path d="M2 8.8a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r=".6"/>',
  cash:'<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/>',
  users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6"/>',
  calendar:'<rect x="3" y="4.5" width="18" height="16.5" rx="2"/><path d="M8 2.5v4M16 2.5v4M3 10h18"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  nav:'<path d="m3 11 18-8-8 18-2-8z"/>',
  cup:'<path d="M5 8h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M8 2.5v2M12 2.5v2"/>',
  bell:'<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10.5 21a2 2 0 0 0 3 0"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  up:'<path d="M12 19V5M6 11l6-6 6 6"/>',
  salad:'<path d="M3 12h18a9 9 0 0 1-18 0z"/><path d="M8 12c0-3 1.5-5 4-6 0 3 1 5 4 6"/>'
};

var I18N = {
fr:{
 t_home:"Campana Chez Fati · Restaurant face à l'océan à Essaouira",
 d_home:"Cuisine marocaine et méditerranéenne saine, terrasse vue mer à Bab Doukala, Essaouira. Menu du jour, options végétariennes, réservation WhatsApp.",
 t_menu:"Menu · Campana Chez Fati",d_menu:"Menu du jour, spécialités et jus frais à Campana Chez Fati, Essaouira.",
 t_gallery:"Galerie · Campana Chez Fati",d_gallery:"Photos de la terrasse, de la vue et des plats de Campana Chez Fati.",
 t_about:"Notre histoire · Campana Chez Fati",d_about:"Cuisine locale, bio et zéro déchet, par Chef Fatima à Essaouira.",
 t_contact:"Contact & réservation · Campana Chez Fati",d_contact:"Horaires, adresse à Bab Doukala, téléphone, WhatsApp et réservation.",
 brand_sub:"Cuisine saine · Vue sur l'océan",
 nav_home:"Accueil",nav_menu:"Menu",nav_gallery:"Galerie",nav_about:"À propos",nav_contact:"Contact",
 hero_eyebrow:"Essaouira · Bab Doukala",hero_title:"Une table face à l'océan",
 hero_sub:"Cuisine marocaine et méditerranéenne, fraîche et faite maison, servie sur une terrasse à deux pas des remparts.",
 cta_reserve:"Réserver sur WhatsApp",cta_menu:"Voir le menu",
 rate:"4,9 / 5 sur Tripadvisor · 22 avis",open_now:"Ouvert maintenant",closed_now:"Fermé actuellement",
 hl1_t:"Terrasse vue mer",hl1_d:"Déjeunez face à l'océan, avec des tables à l'ombre.",
 hl2_t:"Menu du jour",hl2_d:"Entrée, plat et dessert : un menu différent chaque jour.",
 hl3_t:"Bio & zéro déchet",hl3_d:"Légumes de la région, sans plastique, sans gaspillage.",
 hl4_t:"Végétarien friendly",hl4_d:"Des plats végétariens originaux et pleins de saveurs.",
 visit_t:"Passez nous voir",hours_short:"Du mardi au dimanche · 11h00 – 17h30",closed_mon:"Fermé le lundi",
 cta_t:"Une table vous attend",cta_d:"Réservez en quelques secondes sur WhatsApp.",
 menu_t:"Notre carte",menu_d:"Une cuisine simple, fraîche et généreuse, imaginée par Chef Fatima.",
 set_t:"Le menu du jour",set_d:"Chaque jour, un nouveau menu selon le marché et la saison.",
 c1:"Entrée",c2:"Plat",c3:"Dessert",per:"par personne",
 spec_t:"Coups de cœur de nos invités",
 sp1_t:"Tajine végétarien",sp1_d:"Servi le vendredi.",
 sp2_t:"Couscous à la farine de cactus",sp2_d:"Une alternative surprenante au couscous traditionnel.",
 sp3_t:"Croquettes de poisson",sp3_d:"Légères et parfumées.",
 sp4_t:"Crêpes au beurre d'amande",sp4_d:"Pour finir tout en douceur.",
 sp5_t:"Jus frais maison",sp5_d:"Fruits frais pressés sur place.",
 note_menu:"Les plats varient selon les jours et les produits disponibles.",cash:"Paiement en espèces uniquement.",
 gal_t:"Galerie",gal_d:"Un avant-goût de l'ambiance et de la cuisine.",
 cap1:"Campana",cap2:"Les plats de Chef Fatima",cap3:"Plats du jour",cap4:"Boissons",cap5:"Intérieur",cap6:"Spécialités",
 ab_t:"Notre histoire",ab_d:"Une cuisine faite avec amour, au bord de l'Atlantique.",
 ab_p1:"Campana Chez Fati est un petit restaurant familial niché près de Bab Doukala, à Essaouira. Dirigé par Chef Fatima et son équipe, il propose une cuisine marocaine et méditerranéenne saine et créative.",
 ab_p2:"Ici, on cuisine avec des légumes de la région, on évite le plastique et on limite le gaspillage. Résultat : des plats simples, colorés et pleins de goût, à savourer avec la brise de l'océan.",
 v1_t:"Local & bio",v1_d:"Légumes régionaux et produits frais choisis avec soin.",
 v2_t:"Zéro déchet",v2_d:"Pas de gobelets en plastique, pas de serviettes en papier.",
 v3_t:"Accueil chaleureux",v3_d:"On vous reçoit comme à la maison.",
 feat_t:"Bon à savoir",
 f1:"Cuisine marocaine & méditerranéenne",f2:"Végétarien friendly",f3:"Terrasse extérieure",f4:"Wi‑Fi gratuit",f5:"Réservation possible",f6:"Espèces uniquement",f7:"Ambiance familiale",f8:"Service à table",
 ct_t:"Contact & accès",ct_d:"À Bab Doukala, juste à l'extérieur de la médina, face à l'océan.",
 call:"Appeler",wa_l:"WhatsApp",mail_l:"Email",addr_l:"Adresse",addr_v:"Bab Doukala, Essaouira 44000, Maroc",addr_h:"Face à l'océan, juste à l'extérieur des remparts.",
 hrs_l:"Horaires d'ouverture",closed:"Fermé",dir:"Itinéraire",
 res_t:"Réserver une table",fn:"Nom",fd:"Date",ft:"Heure",fg:"Personnes",send:"Envoyer sur WhatsApp",
 res_n:"Votre demande s'ouvre dans WhatsApp ; le restaurant confirme par message.",
 wa_hello:"Bonjour, je souhaite réserver une table chez Campana Chez Fati.",
 wa_form:"Bonjour, je souhaite réserver une table.\nNom : {n}\nDate : {d}\nHeure : {t}\nPersonnes : {g}",
 foot_t:"Restaurant face à l'océan · Bab Doukala, Essaouira",foot_demo:"Aperçu de design",rights:"© 2026 Campana Chez Fati",
 foot_about:"Cuisine saine, produits locaux et vue sur l'océan, à Bab Doukala, Essaouira.",foot_nav:"Navigation",foot_contact:"Contact",foot_hours:"Horaires",foot_top:"Haut de page",
 d0:"Dimanche",d1:"Lundi",d2:"Mardi",d3:"Mercredi",d4:"Jeudi",d5:"Vendredi",d6:"Samedi"
},
en:{
 t_home:"Campana Chez Fati · Ocean-view restaurant in Essaouira",
 d_home:"Healthy Moroccan and Mediterranean cooking on an ocean-view terrace at Bab Doukala, Essaouira. Menu of the day, vegetarian options, WhatsApp booking.",
 t_menu:"Menu · Campana Chez Fati",d_menu:"Menu of the day, specialties and fresh juices at Campana Chez Fati, Essaouira.",
 t_gallery:"Gallery · Campana Chez Fati",d_gallery:"Photos of the terrace, the view and the dishes at Campana Chez Fati.",
 t_about:"Our story · Campana Chez Fati",d_about:"Local, organic, zero-waste cooking by Chef Fatima in Essaouira.",
 t_contact:"Contact & booking · Campana Chez Fati",d_contact:"Opening hours, address at Bab Doukala, phone, WhatsApp and table booking.",
 brand_sub:"Healthy cuisine · Ocean view",
 nav_home:"Home",nav_menu:"Menu",nav_gallery:"Gallery",nav_about:"About",nav_contact:"Contact",
 hero_eyebrow:"Essaouira · Bab Doukala",hero_title:"A table facing the ocean",
 hero_sub:"Fresh, homemade Moroccan and Mediterranean cooking, served on a terrace steps from the medina walls.",
 cta_reserve:"Book on WhatsApp",cta_menu:"See the menu",
 rate:"4.9 / 5 on Tripadvisor · 22 reviews",open_now:"Open now",closed_now:"Closed now",
 hl1_t:"Ocean-view terrace",hl1_d:"Lunch facing the sea, with tables in the shade.",
 hl2_t:"Menu of the day",hl2_d:"Starter, main and dessert, different every day.",
 hl3_t:"Organic & zero waste",hl3_d:"Regional vegetables, no plastic, no waste.",
 hl4_t:"Vegetarian friendly",hl4_d:"Original vegetarian dishes full of flavour.",
 visit_t:"Come and visit",hours_short:"Tuesday to Sunday · 11:00 – 17:30",closed_mon:"Closed on Mondays",
 cta_t:"A table is waiting for you",cta_d:"Book in seconds on WhatsApp.",
 menu_t:"Our menu",menu_d:"Simple, fresh and generous cooking by Chef Fatima.",
 set_t:"Menu of the day",set_d:"A new menu every day, built around the market and the season.",
 c1:"Starter",c2:"Main",c3:"Dessert",per:"per person",
 spec_t:"Guest favourites",
 sp1_t:"Vegetarian tagine",sp1_d:"Served on Fridays.",
 sp2_t:"Cactus-flour couscous",sp2_d:"A surprising twist on traditional couscous.",
 sp3_t:"Fish cakes",sp3_d:"Light and fragrant.",
 sp4_t:"Almond-butter crêpes",sp4_d:"A gentle way to finish.",
 sp5_t:"Homemade fresh juices",sp5_d:"Fresh fruit pressed on the spot.",
 note_menu:"Dishes change from day to day depending on available produce.",cash:"Cash only.",
 gal_t:"Gallery",gal_d:"A taste of the atmosphere and the food.",
 cap1:"Campana",cap2:"Chef Fatima's dishes",cap3:"Dishes of the day",cap4:"Drinks",cap5:"Inside",cap6:"Specialties",
 ab_t:"Our story",ab_d:"Food made with love on the Atlantic coast.",
 ab_p1:"Campana Chez Fati is a small family restaurant tucked near Bab Doukala in Essaouira. Run by Chef Fatima and her team, it offers healthy, creative Moroccan and Mediterranean cooking.",
 ab_p2:"Here we cook with regional vegetables, avoid plastic and limit waste. The result: simple, colourful, flavourful dishes to enjoy with the ocean breeze.",
 v1_t:"Local & organic",v1_d:"Regional vegetables and fresh produce, chosen with care.",
 v2_t:"Zero waste",v2_d:"No plastic cups, no paper napkins.",
 v3_t:"Warm welcome",v3_d:"We receive you like family.",
 feat_t:"Good to know",
 f1:"Moroccan & Mediterranean cuisine",f2:"Vegetarian friendly",f3:"Outdoor seating",f4:"Free Wi‑Fi",f5:"Reservations accepted",f6:"Cash only",f7:"Family-style atmosphere",f8:"Table service",
 ct_t:"Contact & directions",ct_d:"At Bab Doukala, just outside the medina, facing the ocean.",
 call:"Call",wa_l:"WhatsApp",mail_l:"Email",addr_l:"Address",addr_v:"Bab Doukala, Essaouira 44000, Morocco",addr_h:"Facing the ocean, just outside the walls.",
 hrs_l:"Opening hours",closed:"Closed",dir:"Get directions",
 res_t:"Book a table",fn:"Name",fd:"Date",ft:"Time",fg:"Guests",send:"Send on WhatsApp",
 res_n:"Your request opens in WhatsApp; the restaurant confirms by message.",
 wa_hello:"Hello, I'd like to book a table at Campana Chez Fati.",
 wa_form:"Hello, I'd like to book a table.\nName: {n}\nDate: {d}\nTime: {t}\nGuests: {g}",
 foot_t:"Ocean-view restaurant · Bab Doukala, Essaouira",foot_demo:"Design preview",rights:"© 2026 Campana Chez Fati",
 foot_about:"Healthy cuisine, local produce and an ocean view, at Bab Doukala, Essaouira.",foot_nav:"Navigation",foot_contact:"Contact",foot_hours:"Opening hours",foot_top:"Back to top",
 d0:"Sunday",d1:"Monday",d2:"Tuesday",d3:"Wednesday",d4:"Thursday",d5:"Friday",d6:"Saturday"
},
ar:{
 t_home:"كامبانا شيز فاطي · مطعم بإطلالة على المحيط في الصويرة",
 d_home:"مطبخ مغربي ومتوسطي صحي على شرفة تطل على المحيط عند باب دكالة بالصويرة. قائمة اليوم، أطباق نباتية، وحجز عبر واتساب.",
 t_menu:"القائمة · كامبانا شيز فاطي",d_menu:"قائمة اليوم والأطباق المميزة والعصائر الطازجة في كامبانا شيز فاطي بالصويرة.",
 t_gallery:"المعرض · كامبانا شيز فاطي",d_gallery:"صور الشرفة والإطلالة وأطباق كامبانا شيز فاطي.",
 t_about:"قصتنا · كامبانا شيز فاطي",d_about:"مطبخ محلي وعضوي وبدون نفايات من إعداد الشيف فاطمة في الصويرة.",
 t_contact:"التواصل والحجز · كامبانا شيز فاطي",d_contact:"ساعات العمل والعنوان عند باب دكالة والهاتف وواتساب وحجز الطاولات.",
 brand_sub:"مطبخ صحي · إطلالة على المحيط",
 nav_home:"الرئيسية",nav_menu:"القائمة",nav_gallery:"المعرض",nav_about:"عنّا",nav_contact:"تواصل",
 hero_eyebrow:"الصويرة · باب دكالة",hero_title:"مائدة تطل على المحيط",
 hero_sub:"مطبخ مغربي ومتوسطي طازج ومنزلي، يُقدَّم على شرفة قرب أسوار المدينة العتيقة.",
 cta_reserve:"احجز عبر واتساب",cta_menu:"شاهد القائمة",
 rate:"4.9 من 5 على Tripadvisor · 22 تقييماً",open_now:"مفتوح الآن",closed_now:"مغلق حالياً",
 hl1_t:"شرفة بإطلالة بحرية",hl1_d:"تناول غداءك أمام المحيط، مع طاولات في الظل.",
 hl2_t:"قائمة اليوم",hl2_d:"مقبلات وطبق رئيسي وحلوى، بقائمة مختلفة كل يوم.",
 hl3_t:"عضوي وبدون نفايات",hl3_d:"خضروات من المنطقة، بلا بلاستيك وبلا هدر.",
 hl4_t:"مناسب للنباتيين",hl4_d:"أطباق نباتية مبتكرة ومليئة بالنكهة.",
 visit_t:"زورونا",hours_short:"من الثلاثاء إلى الأحد · 11:00 – 17:30",closed_mon:"مغلق يوم الاثنين",
 cta_t:"طاولتك في انتظارك",cta_d:"احجز في ثوانٍ عبر واتساب.",
 menu_t:"قائمتنا",menu_d:"مطبخ بسيط وطازج وسخي، من إبداع الشيف فاطمة.",
 set_t:"قائمة اليوم",set_d:"كل يوم قائمة جديدة حسب السوق والموسم.",
 c1:"مقبلات",c2:"الطبق الرئيسي",c3:"حلوى",per:"للشخص",
 spec_t:"أطباق أحبّها ضيوفنا",
 sp1_t:"طاجين نباتي",sp1_d:"يُقدَّم يوم الجمعة.",
 sp2_t:"كسكس بدقيق الصبار",sp2_d:"بديل مفاجئ للكسكس التقليدي.",
 sp3_t:"كفتة السمك",sp3_d:"خفيفة وعطرة.",
 sp4_t:"كريب بزبدة اللوز",sp4_d:"لختام حلو ولطيف.",
 sp5_t:"عصائر طبيعية منزلية",sp5_d:"فواكه طازجة تُعصر في المكان.",
 note_menu:"تختلف الأطباق حسب اليوم والمنتجات المتوفرة.",cash:"الدفع نقداً فقط.",
 gal_t:"المعرض",gal_d:"لمحة عن الأجواء والمطبخ.",
 cap1:"كامبانا",cap2:"أطباق الشيف فاطمة",cap3:"أطباق اليوم",cap4:"المشروبات",cap5:"الداخل",cap6:"أطباق مميزة",
 ab_t:"قصتنا",ab_d:"مطبخ يُصنع بحب على ضفاف الأطلسي.",
 ab_p1:"كامبانا شيز فاطي مطعم عائلي صغير قرب باب دكالة في الصويرة. تديره الشيف فاطمة وفريقها، ويقدّم مطبخاً مغربياً ومتوسطياً صحياً ومبتكراً.",
 ab_p2:"نطبخ هنا بخضروات المنطقة، ونتجنب البلاستيك ونقلّل الهدر. والنتيجة أطباق بسيطة وملوّنة ولذيذة، تستمتع بها مع نسيم المحيط.",
 v1_t:"محلي وعضوي",v1_d:"خضروات من المنطقة ومنتجات طازجة تُختار بعناية.",
 v2_t:"بدون نفايات",v2_d:"لا أكواب بلاستيكية ولا مناديل ورقية.",
 v3_t:"استقبال دافئ",v3_d:"نستقبلك كأنك في بيتك.",
 feat_t:"معلومات مفيدة",
 f1:"مطبخ مغربي ومتوسطي",f2:"مناسب للنباتيين",f3:"جلسة خارجية",f4:"واي فاي مجاني",f5:"إمكانية الحجز",f6:"الدفع نقداً فقط",f7:"أجواء عائلية",f8:"خدمة على الطاولة",
 ct_t:"التواصل والموقع",ct_d:"عند باب دكالة، خارج المدينة العتيقة مباشرة، أمام المحيط.",
 call:"اتصل",wa_l:"واتساب",mail_l:"البريد",addr_l:"العنوان",addr_v:"باب دكالة، الصويرة 44000، المغرب",addr_h:"أمام المحيط، خارج الأسوار مباشرة.",
 hrs_l:"ساعات العمل",closed:"مغلق",dir:"الاتجاهات",
 res_t:"احجز طاولة",fn:"الاسم",fd:"التاريخ",ft:"الوقت",fg:"عدد الأشخاص",send:"أرسل عبر واتساب",
 res_n:"يُفتح طلبك في واتساب ويؤكد المطعم الحجز برسالة.",
 wa_hello:"السلام عليكم، أريد حجز طاولة في كامبانا شيز فاطي.",
 wa_form:"السلام عليكم، أريد حجز طاولة.\nالاسم: {n}\nالتاريخ: {d}\nالوقت: {t}\nعدد الأشخاص: {g}",
 foot_t:"مطعم بإطلالة على المحيط · باب دكالة، الصويرة",foot_demo:"معاينة تصميم",rights:"© 2026 كامبانا شيز فاطي",
 foot_about:"مطبخ صحي ومنتجات محلية وإطلالة على المحيط، عند باب دكالة بالصويرة.",foot_nav:"التنقل",foot_contact:"التواصل",foot_hours:"ساعات العمل",foot_top:"إلى الأعلى",
 d0:"الأحد",d1:"الاثنين",d2:"الثلاثاء",d3:"الأربعاء",d4:"الخميس",d5:"الجمعة",d6:"السبت"
}};

var LANGS = ["ar","fr","en"];
var PAGE = document.body.getAttribute("data-page") || "home";
var NAV = [["home","index.html","home"],["menu","menu.html","utensils"],["gallery","gallery.html","image"],["about","about.html","heart"],["contact","contact.html","chat"]];
var lang = "fr", T = I18N.fr, io = null;

function svg(n, cls){return '<svg class="ic '+(cls||"")+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[n]||"")+'</svg>';}
function $(s,r){return (r||document).querySelector(s);}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));}

function pickLang(){
  var q = null;
  try{q = new URLSearchParams(location.search).get("lang");}catch(e){}
  if(LANGS.indexOf(q)>-1) return q;
  try{var s = localStorage.getItem("campana_lang"); if(LANGS.indexOf(s)>-1) return s;}catch(e){}
  var n = (navigator.language||"fr").slice(0,2).toLowerCase();
  return LANGS.indexOf(n)>-1 ? n : "fr";
}

/* ---------- shell: header, tab bar, fab, footer ---------- */
function buildShell(){
  var links = NAV.map(function(n){return '<a href="'+n[1]+'" class="'+(n[0]===PAGE?"on":"")+'" data-t="nav_'+n[0]+'"></a>';}).join("");
  var tabs = NAV.map(function(n){return '<a href="'+n[1]+'" class="'+(n[0]===PAGE?"on":"")+'">'+svg(n[2])+'<span data-t="nav_'+n[0]+'"></span></a>';}).join("");
  var langs = LANGS.map(function(l){return '<button type="button" data-l="'+l+'" aria-label="'+l+'">'+l.toUpperCase()+'</button>';}).join("");
  var head = document.createElement("header");
  head.className = "top";
  head.innerHTML = '<div class="wrap bar"><a class="brand" href="index.html"><span class="logo">C</span><span class="bn"><b>Campana</b><small data-t="brand_sub"></small></span></a>'+
    '<nav class="dnav" aria-label="Main">'+links+'</nav><div class="langs" role="group" aria-label="Language">'+langs+'</div></div>';
  document.body.insertBefore(head, document.body.firstChild);

  var tab = document.createElement("nav");
  tab.className = "tabbar"; tab.setAttribute("aria-label","Main");
  tab.innerHTML = tabs;
  document.body.appendChild(tab);

  if(PAGE !== "contact"){
    var fab = document.createElement("a");
    fab.className = "fab"; fab.setAttribute("data-wa",""); fab.setAttribute("target","_blank"); fab.setAttribute("rel","noopener"); fab.setAttribute("aria-label","WhatsApp");
    fab.innerHTML = svg("chat");
    document.body.appendChild(fab);
  }

  var foot = document.createElement("footer");
  foot.className = "foot";
  var flinks = NAV.map(function(n){return '<li><a href="'+n[1]+'" data-t="nav_'+n[0]+'"></a></li>';}).join("");
  foot.innerHTML =
    '<div class="wrap">'+
      '<div class="foot-grid">'+
        '<div class="foot-brand"><a class="brand" href="index.html"><span class="logo">C</span><span class="bn"><b>Campana · Chez Fati</b><small data-t="brand_sub"></small></span></a>'+
          '<p data-t="foot_about"></p>'+
          '<a class="btn wa" data-wa target="_blank" rel="noopener">'+svg("chat")+'<span data-t="cta_reserve"></span></a></div>'+
        '<div><h4 data-t="foot_nav"></h4><ul class="flinks">'+flinks+'</ul></div>'+
        '<div><h4 data-t="foot_contact"></h4><ul>'+
          '<li>'+svg("pin")+'<span data-t="addr_v"></span></li>'+
          '<li>'+svg("phone")+'<a data-tel data-phone-show></a></li>'+
          '<li>'+svg("mail")+'<a data-mail data-email-show></a></li></ul></div>'+
        '<div><h4 data-t="foot_hours"></h4><ul>'+
          '<li>'+svg("clock")+'<span data-t="hours_short"></span></li>'+
          '<li>'+svg("calendar")+'<span data-t="closed_mon"></span></li>'+
          '<li><span class="status js-status"></span></li></ul></div>'+
      '</div>'+
      '<div class="foot-bottom"><span data-t="rights"></span>'+(CFG.demo?'<span class="demo" data-t="foot_demo"></span>':'')+
        '<button type="button" class="totop"><span data-t="foot_top"></span>'+svg("up")+'</button></div>'+
    '</div>';
  $(".totop",foot).addEventListener("click",function(){window.scrollTo({top:0,behavior:"smooth"});});
  var main = $("main"); main.parentNode.insertBefore(foot, main.nextSibling);

  $$("i[data-i]").forEach(function(el){el.innerHTML = svg(el.getAttribute("data-i"));});
  $$(".langs button").forEach(function(b){b.addEventListener("click",function(){setLang(b.getAttribute("data-l"));});});
}

/* ---------- time / open status (Morocco time) ---------- */
function nowMA(){
  var p = new Intl.DateTimeFormat("en-GB",{timeZone:"Africa/Casablanca",weekday:"short",hour:"2-digit",minute:"2-digit",hour12:false}).formatToParts(new Date()), o = {};
  p.forEach(function(x){o[x.type]=x.value;});
  var map = {Sun:0,Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6};
  return {day:map[o.weekday], min:(parseInt(o.hour,10)%24)*60+parseInt(o.minute,10)};
}
function isOpen(){var n=nowMA(), h=HOURS[n.day]; return !!h && n.min>=h[0] && n.min<h[1];}
function renderStatus(){
  $$(".js-status").forEach(function(el){var o=isOpen(); el.innerHTML='<span class="dot '+(o?"on":"")+'"></span>'+(o?T.open_now:T.closed_now);});
}
function buildHours(){
  var ul = $("#hours"); if(!ul) return;
  var today = nowMA().day;
  ul.innerHTML = [1,2,3,4,5,6,0].map(function(d){
    var h = HOURS[d];
    return '<li class="'+(d===today?"today":"")+'"><span data-t="d'+d+'"></span><span>'+(h?"11:00 – 17:30":'<em data-t="closed" style="font-style:normal"></em>')+'</span></li>';
  }).join("");
}

/* ---------- gallery ---------- */
function buildGallery(){
  var g = $("#galleryGrid"); if(!g) return;
  var icons = ["sun","waves","utensils","cup","home","leaf"];
  g.innerHTML = icons.map(function(ic,i){
    var im = CFG.images[i];
    return '<div class="tile rv'+(im?" has":"")+'"'+(im?' data-src="'+im.src+'"':"")+'><span class="big">'+svg(ic)+'</span>'+(im?'<img loading="lazy" referrerpolicy="no-referrer" src="'+im.src+'" alt="">':'')+'<span class="cap" data-t="cap'+(i+1)+'"></span></div>';
  }).join("");
  $$(".tile img",g).forEach(function(img){img.addEventListener("error",function(){var t=img.parentNode;t.classList.remove("has");t.removeAttribute("data-src");img.remove();});});
  var lb = document.createElement("div"); lb.className="lb"; lb.innerHTML='<img alt="">'; document.body.appendChild(lb);
  lb.addEventListener("click",function(){lb.classList.remove("on");});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")lb.classList.remove("on");});
  $$(".tile.has",g).forEach(function(t){t.addEventListener("click",function(){$("img",lb).src=t.getAttribute("data-src");lb.classList.add("on");});});
}

/* ---------- home photo strip ---------- */
function buildStrip(){
  var s = $("#strip"); if(!s || CFG.images.length<5) return;
  s.innerHTML = [2,3,4].map(function(i){return '<a class="rv" href="gallery.html"><img loading="lazy" referrerpolicy="no-referrer" src="'+CFG.images[i].src+'" alt=""></a>';}).join("");
  $$("img",s).forEach(function(img){img.addEventListener("error",function(){img.parentNode.style.display="none";});});
}

/* ---------- translate ---------- */
function setLinks(){
  var msg = encodeURIComponent(T.wa_hello);
  $$("[data-wa]").forEach(function(a){a.href="https://wa.me/"+CFG.wa+"?text="+msg;});
  $$("[data-tel]").forEach(function(a){a.href="tel:"+CFG.phone;});
  $$("[data-mail]").forEach(function(a){a.href="mailto:"+CFG.email;});
  $$("[data-dir]").forEach(function(a){a.href="https://www.google.com/maps/dir/?api=1&destination="+CFG.lat+","+CFG.lng;});
  $$("[data-phone-show]").forEach(function(el){el.textContent=CFG.phoneShow;});
  $$("[data-email-show]").forEach(function(el){el.textContent=CFG.email;});
  $$("[data-price]").forEach(function(el){el.textContent=CFG.price?(CFG.price+" · "+T.per):"";});
}
function apply(){
  T = I18N[lang];
  var h = document.documentElement;
  h.lang = lang; h.dir = lang==="ar" ? "rtl" : "ltr";
  $$("[data-t]").forEach(function(el){var v=T[el.getAttribute("data-t")]; if(v!=null) el.textContent=v;});
  $$("[data-ph]").forEach(function(el){el.setAttribute("placeholder",T[el.getAttribute("data-ph")]||"");});
  document.title = T["t_"+PAGE] || document.title;
  var md = $('meta[name="description"]'); if(md) md.setAttribute("content", T["d_"+PAGE]||"");
  $$(".langs button").forEach(function(b){b.classList.toggle("on", b.getAttribute("data-l")===lang);});
  setLinks(); renderStatus();
}
function setLang(l){
  lang = l;
  try{localStorage.setItem("campana_lang",l);}catch(e){}
  apply();
}

/* ---------- reservation form -> WhatsApp ---------- */
function initForm(){
  var f = $("#resForm"); if(!f) return;
  var d = f.elements.date;
  if(d){var n=new Date(); d.min = n.getFullYear()+"-"+("0"+(n.getMonth()+1)).slice(-2)+"-"+("0"+n.getDate()).slice(-2);}
  f.addEventListener("submit",function(e){
    e.preventDefault();
    var v = f.elements;
    var m = T.wa_form.replace("{n}",v.name.value.trim()).replace("{d}",v.date.value).replace("{t}",v.time.value).replace("{g}",v.guests.value);
    window.open("https://wa.me/"+CFG.wa+"?text="+encodeURIComponent(m),"_blank","noopener");
  });
}

/* ---------- light scroll reveal ---------- */
function reveal(){
  var els = $$(".rv");
  if(!("IntersectionObserver" in window)){els.forEach(function(e){e.classList.add("in");});return;}
  io = new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target);}});},{threshold:.12,rootMargin:"0px 0px -4% 0px"});
  els.forEach(function(e){io.observe(e);});
}

/* ---------- logo: header, footer, favicon, share image ---------- */
function applyLogo(){
  if(!CFG.logo) return;
  var im = new Image();
  im.onload = function(){
    $$(".logo").forEach(function(el){
      el.classList.add("has"); el.innerHTML='<img src="'+CFG.logo+'" alt="Campana Café Restaurant">';
      if(el.parentNode) el.parentNode.classList.add("logo-on");
    });
  };
  var head = document.head;
  function link(rel,href,type){var l=document.createElement("link");l.rel=rel;l.href=href;if(type)l.type=type;head.appendChild(l);}
  var og = document.createElement("meta"); og.setAttribute("property","og:image"); og.content = CFG.faviconPng||CFG.logo; head.appendChild(og);
  im.src = CFG.logo;
}

/* ---------- living waves (traveling swell, no sliding strip) ---------- */
function initWaves(){
  var ps = $$(".waves path"); if(ps.length<3) return;
  var TAU = Math.PI*2;
  // back, middle, front  (b=base height, a/c/s = amplitude, cycles, speed)
  var L = [
    {el:ps[0],b:48,a:7,c:1.5,s:.45,a2:3,c2:3.1,s2:.8},
    {el:ps[1],b:63,a:8,c:2.1,s:.65,a2:3,c2:4.2,s2:1.0},
    {el:ps[2],b:80,a:7,c:2.7,s:.85,a2:2.5,c2:5.4,s2:1.25}
  ];
  function draw(t){
    L.forEach(function(w){
      var d = "";
      for(var x=-20;x<=1460;x+=20){
        var u = x/1440;
        var y = w.b + w.a*Math.sin(TAU*w.c*u - w.s*t) + w.a2*Math.sin(TAU*w.c2*u - w.s2*t);
        d += (d?"L":"M")+x+" "+y.toFixed(1)+" ";
      }
      w.el.setAttribute("d", d+"L1460 120 L-20 120Z");
    });
  }
  draw(0);
  var rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rm) return;
  (function frame(ts){draw(ts/1000);requestAnimationFrame(frame);})(0);
}

/* ---------- init ---------- */
document.documentElement.classList.add("js");
lang = pickLang();
buildShell(); buildHours(); buildGallery(); buildStrip(); initForm();
apply(); reveal(); initWaves(); applyLogo();
setInterval(renderStatus, 60000);
})();
