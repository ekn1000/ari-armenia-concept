'use strict';

const translations = {
  hy: {
    title: 'ARI — Հայաստանը՝ քո ռիթմով',
    description: 'ARI — քո անձնական ասիստենտը Հայաստանում։ Անհատական ժամանց, տեղական բացահայտումներ և քո ռիթմով կազմակերպված օրեր։',
    skip: 'Անցնել բովանդակությանը', navHow: 'Ինչպես է աշխատում', navExperiences: 'Տպավորություններ', navAbout: 'Մեր մասին', navCta: 'Պլանավորենք այցը',
    heroLabel: 'Քո մարդը՝ Հայաստանում', heroTitle: 'Հայաստանը՝<br><span>քո ռիթմով։</span>',
    heroDescription: 'Մի տեղացի ընկեր, ով գիտի՝ ուր գնալ, ինչ փորձել ու ինչպես քո ամեն օրը դարձնել հիշարժան։ Մնացած հոգսերը թող մեզ։',
    heroCta: 'Կազմակերպենք իմ օրը', heroExplore: 'Մի փոքր ոգեշնչում', heroNote: 'Քո ցանկությունները։ Քո բյուջեն։ Քո Հայաստանը։',
    heroAlt: 'Խոր Վիրապի վանքը՝ Արարատ լեռան ձյունածածկ գագաթների ֆոնին', heroPlace: 'Խոր Վիրապ, Հայաստան', heroImageNote: 'Մեծ բացահայտումները սկսվում են մի «արի»-ից։',
    localTitle: 'Տեղացու աչքերով', localText: 'Քեզ համար, ոչ բոլորի նման։', strip1: 'Մեկ անձնական ասիստենտ', strip2: 'Քո նախասիրություններին համապատասխան', strip3: 'Ավելի շատ պահեր, ավելի քիչ հոգսեր',
    introLabel: 'ԲԱՐԵՎ, ՄԵՆՔ ARI-Ն ԵՆՔ', introTitle: 'Հայաստանում՝<br>ինչպես ընկերոջ մոտ։',
    introText: 'Երբ կողքիդ քո մարդն է, ամեն ինչ ավելի հեշտ է։ Մենք օգնում ենք բացահայտել Հայաստանը ու կազմակերպում այն ամենը, ինչ պետք է լավ օր ունենալու համար։',
    introSub: 'Առաջին անգամ ես այստեղ, մի քանի օրով ես վերադարձել, թե պարզապես ուզում ես նորովի բացահայտել քո քաղաքը՝ մենք քո կողքին ենք։',
    service1Title: 'Քո ճաշակով վայրեր', service1Text: 'Հարմար սրճարանից մինչև թաքնված արահետ․ ընտրություններ, որոնք իսկապես քոնն են։',
    service2Title: 'Կազմակերպչական հոգսերը՝ մեզ', service2Text: 'Ռեստորան, տրանսպորտ, միջոցառումներ ու ամրագրումներ՝ մեկ մարդու օգնությամբ։',
    service3Title: 'Տեղացի մարդու աջակցություն', service3Text: 'Ասիստենտ, ով լսում է քեզ, օգնում կողմնորոշվել և հարմարվում քո ծրագրերին։',
    experiencesLabel: 'ՓՈՔՐ ԵՐԿԻՐ, ՄԵԾ ՏՊԱՎՈՐՈՒԹՅՈՒՆՆԵՐ', experiencesTitle: 'Ի՞նչ տրամադրություն ունես։', experiencesIntro: 'Մի քանի գաղափար՝ սկսելու համար։ Մնացածը կստեղծենք միասին։', experiencesFoot: 'Սրանք ընդամենը գաղափարներ են։ Քո օրը կարող է լրիվ ուրիշ լինել։',
    filters: ['Բոլորը', 'Քաղաք', 'Մշակույթ', 'Բնություն'], cardMore: 'Բացահայտել օրը',
    cards: [
      {id:'city', image:'yerevan', tag:'ՔԱՂԱՔԻ ՌԻԹՄԸ', location:'ԵՐԵՎԱՆ', title:'Մի օր՝ երևանցու պես', text:'Բուրավետ սուրճ, փոքրիկ փողոցներ, արվեստ ու քաղաքի ամենահամեղ կանգառները։', detail:'Սկսիր օրը Կասկադի մոտ սուրճով, քայլիր քաղաքի կենտրոնով, բացահայտիր տեղական դիզայնն ու ավարտիր երեկոն հայկական ընթրիքով։ Ասիստենտը կարող է օգնել ընտրել վայրերն ու կազմակերպել ամրագրումները։', alt:'Երևանի համայնապատկերը և Արարատը'},
      {id:'culture', image:'garni', tag:'ԱՎԵԼԻ ՄՈՏ՝ ՊԱՏՄՈՒԹՅԱՆԸ', location:'ԳԱՌՆԻ ԵՎ ԳԵՂԱՐԴ', title:'Դարերի միջով, քո տեմպով', text:'Քարե պատմություններ, տպավորիչ տեսարաններ ու լավաշի բույրը՝ մեկ օրվա մեջ։', detail:'Գառնիի տաճար, Գեղարդի ժայռափոր վանք և տեղական ճաշ՝ ըստ քո նախասիրությունների։ Կարող ենք օգնել նախապես պլանավորել տրանսպորտը, ուղեկցորդն ու սննդի կանգառը։ Տոմսերն ու այլ ծառայությունները համաձայնեցվում են առանձին։', alt:'Գառնիի տաճարը՝ լեռների և կանաչ բլուրների մեջ'},
      {id:'nature', image:'dilijan', tag:'ՔԱՂԱՔԻՑ ՄԻ ՓՈՔՐ ՀԵՌՈՒ', location:'ԴԻԼԻՋԱՆ', title:'Անշտապ՝ կանաչի մեջ', text:'Անտառային արահետներ, մաքուր օդ ու երկար զրույցներ՝ քաղաքի աղմուկից հեռու։', detail:'Դիլիջանի կանաչ բնությունը, Հաղարծնի վանքը և հանգիստ ճաշ՝ լեռների ֆոնին։ Քայլարշավի բարդությունն ու կանգառները կարելի է հարմարեցնել խմբիդ։ Երթուղին կախված է եղանակից և ճանապարհների հասանելիությունից։', alt:'Հաղարծնի վանական համալիրը՝ Դիլիջանի կանաչ անտառների մեջ'}
    ],
    howLabel:'ԱՅՍՔԱՆ ՊԱՐԶ', howTitle:'Դու վայելիր։<br>Մենք կկազմակերպենք։', howIntro:'Երկար որոնումների փոխարեն՝ մի պարզ զրույց քո ասիստենտի հետ։', howCta:'Սկսենք մի գաղափարից',
    step1Title:'Պատմիր՝ ինչ ես սիրում', step1Text:'Երբ ես գալիս, ում հետ և ինչպես ես ուզում անցկացնել ժամանակդ։ Մենք նախ լսում ենք։',
    step2Title:'Ստացիր քո անհատական պլանը', step2Text:'Առաջարկում ենք տարբերակներ, միասին հստակեցնում ծրագիրն ու բյուջեն։',
    step3Title:'Ապրիր պահը', step3Text:'Մենք օգնում ենք կազմակերպման հարցերում ու կապի մեջ ենք մնում պայմանավորված ժամերին։',
    planLabel:'ՔՈ ՀԱՋՈՐԴ ԼԱՎ ՕՐԸ', planTitle:'Արի մի լավ<br>օր պլանավորենք։', planIntro:'Լեռներ, համեր, մշակույթ, թե պարզապես անշտապ զբոսանք։ Ընտրիր քո տրամադրությունը և տես օրվա օրինակ։',
    formLabel:'Մի փոքր քո ծրագրերի մասին', dateLabel:'Ո՞ր օրը', guestsLabel:'Քանի՞ հոգով', guest1:'Միայն ես', guest2:'2 հոգով', guest3:'3–4 հոգով', guest5:'5 և ավելի', moodLabel:'Ինչպիսի՞ օր ես պատկերացնում', moodCity:'Քաղաք, սուրճ ու նոր բացահայտումներ', moodCulture:'Մշակույթ, պատմություն ու տեղական համեր', moodNature:'Բնություն, լեռներ ու մաքուր օդ', wishesLabel:'Ուրիշ ցանկություններ կա՞ն', optional:'(ըստ ցանկության)', wishesPlaceholder:'Օրինակ՝ սիրում եմ լուսանկարել ու տեղական ուտեստներ փորձել…', formCta:'Տեսնել օրվա պլանի օրինակը', formNote:'Սա ցուցադրական ձև է։ Տվյալները չեն ուղարկվում, ամրագրում չի կատարվում։',
    faqLabel:'ՄԻ ՔԱՆԻ ՊԱՏԱՍԽԱՆ', faqTitle:'Գուցե ուզում<br>էիր իմանալ։',
    faq: [
      ['Սա միայն զբոսաշրջիկների՞ համար է։','Ոչ։ Ծառայությունը նախատեսված է և՛ Հայաստանի հյուրերի, և՛ տեղացիների համար։ Կարող ենք օգնել կազմակերպել ազատ օրը, հատուկ առիթը կամ ընկերների հետ փոքրիկ ճանապարհորդությունը։'],
      ['Ի՞նչ տարբերություն կա տուրից։','Պատրաստի խմբային ծրագրի փոխարեն՝ քո նախասիրություններից կազմված օր և անձնական ասիստենտ։ Ուղեկցորդի, վարորդի կամ այլ մասնագետի ծառայությունները կարող են ներառվել միայն նախնական պայմանավորվածությամբ։'],
      ['Ինչպե՞ս է որոշվում արժեքը։','Արժեքը կախված կլինի ծրագրի տևողությունից, կազմակերպման ծավալից և ընտրված ծառայություններից։ Այս մակետում գնացուցակ չկա․ իրական առաջարկի դեպքում ամեն ծախս կհամաձայնեցվի նախապես։'],
      ['Կարո՞ղ եմ հիմա ամրագրել կայքով։','Սա բիզնեսի կայքի ցուցադրական մակետն է։ Կարող ես փոխել լեզուն, դիտել գաղափարները և ստանալ օրվա օրինակ։ Իրական հարցումներ կամ ամրագրումներ դեռ չեն ընդունվում։']
    ],
    footerTag:'Քո մարդը։ Քո ռիթմը։ Քո Հայաստանը։', footerCta:'Արի Հայաստան', demoLabel:'Կայքի ցուցադրական մակետ', madeWith:'Սիրով՝ Հայաստանից', credits:'Լուսանկարներ', close:'Փակել', menu:'Բացել ընտրացանկը', mainNav:'Հիմնական ընտրացանկ', categoriesLabel:'Տպավորությունների տեսակները',
    exampleLabel:'ՄԻ ԳԱՂԱՓԱՐ՝ ՔԵԶ ՀԱՄԱՐ', exampleTitle:'Քո օրվա առաջին ուրվագիծը', exampleNotice:'Սա միայն ոգեշնչման համար է։ Հասանելիությունը, ժամերն ու արժեքները հաստատված չեն։ Տվյալները չեն ուղարկվել, ամրագրում չի կատարվել։', guests:'Խումբ', people:{'1':'1 հոգի','2':'2 հոգի','3':'3–4 հոգի','5':'5+ հոգի'}, wishes:'Քո ցանկությունները', download:'Ներբեռնել պլանը', copy:'Պատճենել պլանը', copied:'Պլանը պատճենված է', copyError:'Օգտվիր պլանի ներբեռնումից։', choose:'Ընտրել այս տրամադրությունը', suggested:'Օրվա հնարավոր կանգառները', invalidDate:'Ընտրիր այսօրվա կամ ավելի ուշ ամսաթիվ։', creditsTitle:'Լուսանկարների հեղինակները', creditsNote:'Լուսանկարները Wikimedia Commons-ից են։ Դրանք փոքրացվել են, փոխարկվել WebP ձևաչափի և ցուցադրվում են կադրված։', source:'Բնօրինակ', fontCredits:'Տառատեսակներ՝ Manrope և Noto Sans Armenian, SIL Open Font License 1.1։',
    routes:{city:[['10:00','Սուրճ և զբոսանք Կասկադի շրջակայքում։'],['12:30','Տեղական համերով ճաշ՝ քո նախասիրություններին համապատասխան։'],['15:00','Պատկերասրահ, տեղական դիզայն կամ թաքնված բակեր։'],['19:00','Ընթրիք ու երեկոյան զբոսանք քաղաքի կենտրոնում։']],culture:[['09:00','Մեկնում Երևանից դեպի Գառնի։'],['10:00','Գառնիի տաճար և շրջակա տեսարաններ։'],['13:00','Տեղական ճաշ և լավաշի պատրաստման փորձառության գաղափար։'],['15:00','Գեղարդի վանք, ապա վերադարձ Երևան։']],nature:[['09:00','Մեկնում Երևանից դեպի Դիլիջան։'],['11:00','Հաղարծնի վանք և անտառային տեսարաններ։'],['13:30','Հանգիստ ճաշ Դիլիջանում։'],['15:00','Թեթև զբոսանք՝ եղանակին ու քո տեմպին համապատասխան։']]}
  },
  ru: {
    title:'ARI — Армения в твоём ритме', description:'Твой персональный ассистент в Армении. Местные открытия, организация досуга и дни, созданные для тебя.',
    skip:'Перейти к содержимому', navHow:'Как это работает', navExperiences:'Впечатления', navAbout:'О нас', navCta:'Спланировать поездку',
    heroLabel:'Твой человек в Армении', heroTitle:'Армения.<br><span>В твоём ритме.</span>', heroDescription:'Как местный друг, который знает, куда пойти, что попробовать и как сделать каждый день особенным. А все заботы возьмёт на себя.', heroCta:'Спланировать мой день', heroExplore:'Немного вдохновения', heroNote:'Твои желания. Твой бюджет. Твоя Армения.', heroAlt:'Монастырь Хор Вирап на фоне заснеженной горы Арарат', heroPlace:'Хор Вирап, Армения', heroImageNote:'Большие открытия начинаются с простого «ари» — пойдём.', localTitle:'Глазами местных', localText:'Для тебя. С твоим характером.', strip1:'Один персональный ассистент', strip2:'С учётом твоих интересов', strip3:'Больше впечатлений, меньше забот',
    introLabel:'БАРЕВ, МЫ — ARI', introTitle:'В Армении —<br>как в гостях у друга.', introText:'Когда рядом свой человек, всё становится проще. Мы помогаем открывать Армению и берём на себя организацию того, что делает день хорошим.', introSub:'Ты здесь впервые, вернулся на несколько дней или хочешь заново открыть свой город — мы рядом.', service1Title:'Места в твоём вкусе', service1Text:'От уютного кафе до скрытой тропы — выбираем то, что откликнется именно тебе.', service2Title:'Организация — на нас', service2Text:'Рестораны, транспорт, события и бронирования — с помощью одного человека.', service3Title:'Поддержка местного', service3Text:'Ассистент, который слушает, помогает сориентироваться и подстраивается под твои планы.',
    experiencesLabel:'МАЛЕНЬКАЯ СТРАНА, БОЛЬШИЕ ВПЕЧАТЛЕНИЯ', experiencesTitle:'Какое у тебя настроение?', experiencesIntro:'Несколько идей для начала. Всё остальное придумаем вместе.', experiencesFoot:'Это только идеи. Твой день может быть совсем другим.', filters:['Все идеи','Город','Культура','Природа'], cardMore:'Открыть этот день',
    cards:[
      {id:'city',image:'yerevan',tag:'В РИТМЕ ГОРОДА',location:'ЕРЕВАН',title:'На день стать ереванцем',text:'Ароматный кофе, маленькие улочки, искусство и самые вкусные остановки города.',detail:'Начни утро с кофе у Каскада, прогуляйся по центру, открой местный дизайн и заверши день армянским ужином. Ассистент поможет подобрать места и организовать бронирования.',alt:'Панорама Еревана на фоне Арарата'},
      {id:'culture',image:'garni',tag:'БЛИЖЕ К ИСТОРИИ',location:'ГАРНИ И ГЕГАРД',title:'Сквозь века, в своём темпе',text:'Истории в камне, впечатляющие виды и аромат свежего лаваша — за один день.',detail:'Храм Гарни, скальный монастырь Гегард и обед по твоему вкусу. Поможем заранее продумать транспорт, гида и остановку на обед. Билеты и дополнительные услуги согласовываются отдельно.',alt:'Храм Гарни среди гор и зелёных холмов'},
      {id:'nature',image:'dilijan',tag:'ЧУТЬ ДАЛЬШЕ ОТ ГОРОДА',location:'ДИЛИЖАН',title:'Не спеша, среди зелени',text:'Лесные тропы, свежий воздух и долгие разговоры вдали от городского шума.',detail:'Зелёный Дилижан, монастырь Агарцин и неспешный обед с видом на горы. Сложность прогулки и остановки можно подобрать для твоей компании. Маршрут зависит от погоды и доступности дорог.',alt:'Монастырь Агарцин среди зелёных лесов Дилижана'}
    ],
    howLabel:'ВСЁ ПРОСТО',howTitle:'Ты наслаждаешься.<br>Мы организуем.',howIntro:'Вместо долгих поисков — простой разговор с твоим ассистентом.',howCta:'Начнём с одной идеи',step1Title:'Расскажи, что тебе нравится',step1Text:'Когда приедешь, с кем и как хочешь провести время. Сначала мы слушаем.',step2Title:'Получи свой личный план',step2Text:'Предложим варианты, вместе уточним программу и бюджет.',step3Title:'Будь в моменте',step3Text:'Поможем с организацией и будем на связи в согласованные часы.',
    planLabel:'ТВОЙ СЛЕДУЮЩИЙ ХОРОШИЙ ДЕНЬ',planTitle:'Давай придумаем<br>отличный день.',planIntro:'Горы, вкусы, культура или просто неспешная прогулка. Выбери настроение и посмотри пример дня.',formLabel:'Немного о твоих планах',dateLabel:'На какой день?',guestsLabel:'Сколько вас?',guest1:'Только я',guest2:'2 человека',guest3:'3–4 человека',guest5:'5 и больше',moodLabel:'Какой день тебе хочется?',moodCity:'Город, кофе и новые открытия',moodCulture:'Культура, история и местные вкусы',moodNature:'Природа, горы и свежий воздух',wishesLabel:'Ещё какие-нибудь пожелания?',optional:'(необязательно)',wishesPlaceholder:'Например: люблю фотографировать и пробовать местную кухню…',formCta:'Посмотреть пример моего дня',formNote:'Это демонстрационная форма. Данные не отправляются, бронирование не создаётся.',
    faqLabel:'НЕСКОЛЬКО ОТВЕТОВ',faqTitle:'Возможно,<br>ты хотел узнать.',faq:[['Это только для туристов?','Нет. Сервис задуман и для гостей Армении, и для местных жителей. Поможем организовать свободный день, особый повод или небольшую поездку с друзьями.'],['Чем это отличается от тура?','Вместо готовой групповой программы — день с учётом твоих интересов и персональный ассистент. Гид, водитель и другие специалисты могут быть включены только по предварительной договорённости.'],['Как определяется стоимость?','Она будет зависеть от длительности программы, объёма организации и выбранных услуг. В этом макете нет прайса: в реальном предложении все расходы будут согласованы заранее.'],['Можно уже забронировать на сайте?','Это демонстрационный макет сайта для бизнеса. Можно переключать языки, смотреть идеи и получить пример дня. Реальные заявки и бронирования пока не принимаются.']],
    footerTag:'Твой человек. Твой ритм. Твоя Армения.',footerCta:'Ари в Армению',demoLabel:'Демонстрационный макет сайта',madeWith:'С любовью из Армении',credits:'Фотографии',close:'Закрыть',menu:'Открыть меню',mainNav:'Главная навигация',categoriesLabel:'Категории впечатлений',
    exampleLabel:'ИДЕЯ СПЕЦИАЛЬНО ДЛЯ ТЕБЯ',exampleTitle:'Первый набросок твоего дня',exampleNotice:'Только для вдохновения. Доступность, время и цены не подтверждены. Данные не отправлены, бронирование не создано.',guests:'Компания',people:{'1':'1 человек','2':'2 человека','3':'3–4 человека','5':'5+ человек'},wishes:'Твои пожелания',download:'Скачать план',copy:'Скопировать план',copied:'План скопирован',copyError:'Воспользуйся скачиванием плана.',choose:'Выбрать это настроение',suggested:'Возможные остановки',invalidDate:'Выбери сегодняшнюю или более позднюю дату.',creditsTitle:'Авторы фотографий',creditsNote:'Фотографии взяты с Wikimedia Commons, уменьшены, преобразованы в WebP и отображаются с кадрированием.',source:'Оригинал',fontCredits:'Шрифты: Manrope и Noto Sans Armenian, SIL Open Font License 1.1.',
    routes:{city:[['10:00','Кофе и прогулка в районе Каскада.'],['12:30','Обед с местными вкусами и с учётом твоих предпочтений.'],['15:00','Галерея, местный дизайн или скрытые дворики.'],['19:00','Ужин и вечерняя прогулка по центру.']],culture:[['09:00','Выезд из Еревана в Гарни.'],['10:00','Храм Гарни и окружающие пейзажи.'],['13:00','Местный обед и идея знакомства с выпечкой лаваша.'],['15:00','Монастырь Гегард, затем возвращение в Ереван.']],nature:[['09:00','Выезд из Еревана в Дилижан.'],['11:00','Монастырь Агарцин и лесные пейзажи.'],['13:30','Неспешный обед в Дилижане.'],['15:00','Лёгкая прогулка с учётом погоды и твоего темпа.']]}
  },
  en: {
    title:'ARI — Armenia, at your pace',description:'Your personal assistant in Armenia. Local discoveries, thoughtful plans and days made just for you.',
    skip:'Skip to content',navHow:'How it works',navExperiences:'Experiences',navAbout:'About us',navCta:'Plan your visit',heroLabel:'Your person in Armenia',heroTitle:'Armenia.<br><span>At your pace.</span>',heroDescription:'Like a local friend who knows where to go, what to try and how to make every day memorable. Leave the little details to us.',heroCta:'Make it my kind of day',heroExplore:'A little inspiration',heroNote:'Your wishes. Your budget. Your Armenia.',heroAlt:'Khor Virap monastery beneath the snow-covered peaks of Mount Ararat',heroPlace:'Khor Virap, Armenia',heroImageNote:'Great discoveries start with a little “ari” — come along.',localTitle:'Through local eyes',localText:'Made for you, with a personal touch.',strip1:'One personal assistant',strip2:'Built around what you love',strip3:'More moments, fewer things to worry about',
    introLabel:'BAREV. WE’RE ARI.',introTitle:'In Armenia.<br>Among friends.',introText:'Everything feels easier when you have your person by your side. We help you discover Armenia and take care of the things that make a good day happen.',introSub:'Your first visit, a few days back home, or a fresh look at your own city — we’re here for you.',service1Title:'Places that feel like you',service1Text:'From a cosy café to a hidden trail, thoughtful choices that match your kind of day.',service2Title:'The details, taken care of',service2Text:'Restaurants, transport, events and reservations, with one person to help bring it together.',service3Title:'A local in your corner',service3Text:'An assistant who listens, helps you find your way and adapts as your plans change.',
    experiencesLabel:'SMALL COUNTRY. BIG FEELINGS.',experiencesTitle:'What’s your kind of day?',experiencesIntro:'A few ideas to get you started. We’ll dream up the rest together.',experiencesFoot:'These are just starting points. Your day can be something entirely different.',filters:['All ideas','City life','Culture','Nature'],cardMore:'Explore this day',
    cards:[
      {id:'city',image:'yerevan',tag:'FIND THE CITY’S RHYTHM',location:'YEREVAN',title:'A day as a Yerevan local',text:'Good coffee, little streets, art and delicious stops around the city.',detail:'Start with coffee near the Cascade, wander the city centre, discover local design and finish with an Armenian dinner. Your assistant can help choose the right places and arrange reservations.',alt:'Yerevan skyline with Mount Ararat in the background'},
      {id:'culture',image:'garni',tag:'A LITTLE CLOSER TO HISTORY',location:'GARNI & GEGHARD',title:'Through time, at your pace',text:'Stories in stone, sweeping views and the scent of fresh lavash, all in a day.',detail:'Garni Temple, the rock-carved Geghard Monastery and a local lunch chosen around your tastes. We can help plan transport, a guide and your lunch stop in advance. Tickets and additional services are agreed separately.',alt:'Garni Temple surrounded by mountains and green hills'},
      {id:'nature',image:'dilijan',tag:'A LITTLE FURTHER FROM IT ALL',location:'DILIJAN',title:'Take the scenic, slower way',text:'Forest paths, fresh air and long conversations, away from the city’s buzz.',detail:'Green Dilijan, Haghartsin Monastery and a slow lunch with mountain views. Walking difficulty and stops can be adapted for your group. The route depends on the weather and road access.',alt:'Haghartsin Monastery nestled in the green forests of Dilijan'}
    ],
    howLabel:'IT’S REALLY THIS SIMPLE',howTitle:'You enjoy it.<br>We make it happen.',howIntro:'Trade hours of searching for a simple conversation with your assistant.',howCta:'Let’s start with an idea',step1Title:'Tell us what you love',step1Text:'When you’re coming, who’s joining and how you’d like to spend your time. First, we listen.',step2Title:'Get a plan that feels like you',step2Text:'We suggest the possibilities, then work out the details and budget together.',step3Title:'Be in the moment',step3Text:'We help with the arrangements and stay in touch during the hours we’ve agreed.',
    planLabel:'YOUR NEXT GOOD DAY',planTitle:'Let’s plan<br>something lovely.',planIntro:'Mountains, flavours, culture or just a wonderfully slow walk. Choose your mood and see what a day could look like.',formLabel:'A little about your plans',dateLabel:'Which day?',guestsLabel:'How many of you?',guest1:'Just me',guest2:'2 people',guest3:'3–4 people',guest5:'5 or more',moodLabel:'What does your ideal day look like?',moodCity:'City streets, coffee and new discoveries',moodCulture:'Culture, history and local flavours',moodNature:'Nature, mountains and fresh air',wishesLabel:'Anything else on your wish list?',optional:'(optional)',wishesPlaceholder:'For example: I love photography and trying local food…',formCta:'Show me a sample day',formNote:'This is a demo form. No data is sent and no booking is made.',
    faqLabel:'A FEW THINGS TO KNOW',faqTitle:'You might<br>be wondering.',faq:[['Is this just for tourists?','No. The service is designed for visitors and locals alike. We can help plan a day off, a special occasion or a little trip with friends.'],['How is this different from a tour?','A day built around your interests and a personal assistant, rather than a fixed group itinerary. A guide, driver or other specialist may be included only by prior agreement.'],['How does pricing work?','Pricing will depend on the length of your plan, the arrangements needed and the services you choose. This mockup has no price list. For a real proposal, all costs would be agreed in advance.'],['Can I make a booking now?','This is a demonstration website for the business concept. You can change languages, explore ideas and create a sample day. Real enquiries and bookings are not available yet.']],
    footerTag:'Your person. Your pace. Your Armenia.',footerCta:'Come along to Armenia',demoLabel:'Website concept / demo',madeWith:'With love, from Armenia',credits:'Photo credits',close:'Close',menu:'Open menu',mainNav:'Main navigation',categoriesLabel:'Experience categories',
    exampleLabel:'A LITTLE IDEA, JUST FOR YOU',exampleTitle:'The first sketch of your day',exampleNotice:'For inspiration only. Availability, times and prices have not been confirmed. No data was sent and no booking was made.',guests:'Your group',people:{'1':'1 person','2':'2 people','3':'3–4 people','5':'5+ people'},wishes:'Your wishes',download:'Download plan',copy:'Copy plan',copied:'Plan copied',copyError:'Please use the download option.',choose:'Choose this kind of day',suggested:'A few possible stops',invalidDate:'Please choose today or a later date.',creditsTitle:'Behind the photographs',creditsNote:'Images from Wikimedia Commons. Resized, converted to WebP and displayed with cropping.',source:'Original image',fontCredits:'Fonts: Manrope and Noto Sans Armenian, SIL Open Font License 1.1.',
    routes:{city:[['10:00','Coffee and a walk around the Cascade.'],['12:30','A local lunch, chosen around your tastes.'],['15:00','A gallery, local design or hidden courtyards.'],['19:00','Dinner and an evening walk in the city centre.']],culture:[['09:00','Leave Yerevan for Garni.'],['10:00','Garni Temple and the surrounding views.'],['13:00','A local lunch and a possible lavash-making experience.'],['15:00','Geghard Monastery, then back to Yerevan.']],nature:[['09:00','Leave Yerevan for Dilijan.'],['11:00','Haghartsin Monastery and forest views.'],['13:30','A slow lunch in Dilijan.'],['15:00','An easy walk, adapted to the weather and your pace.']]}
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key,value) { try { localStorage.setItem(key,value); } catch {} } };
const queryLang = new URLSearchParams(location.search).get('lang');
let language = ['hy','ru','en'].includes(queryLang) ? queryLang : (['hy','ru','en'].includes(storage.get('ari-language')) ? storage.get('ari-language') : 'hy');
let activeFilter = 'all';
let lastPlan = null;
let activeDialog = null;
let toastTimeout;
const dialog = $('#detail-dialog');
const locale = () => ({hy:'hy-AM',ru:'ru-RU',en:'en-GB'}[language]);
const localDate = (date) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const today = localDate(new Date());
const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1);
$('#trip-date').min = today;
$('#trip-date').value = localDate(tomorrow);

function closeMenu() {
  $('.menu-toggle').setAttribute('aria-expanded','false');
  $('#navigation').classList.remove('open');
}

function setLanguage(next, updateUrl = true) {
  language = next;
  const t = translations[language];
  document.documentElement.lang = language;
  document.title = t.title;
  $('meta[name="description"]').content = t.description;
  $('meta[property="og:title"]').content = t.title;
  $('meta[property="og:description"]').content = t.description;
  $$('[data-t]').forEach(el => { if (t[el.dataset.t] !== undefined) el.textContent = t[el.dataset.t]; });
  $$('[data-html]').forEach(el => { el.innerHTML = t[el.dataset.html]; });
  $$('[data-placeholder]').forEach(el => { el.placeholder = t[el.dataset.placeholder]; });
  $$('[data-alt]').forEach(el => { el.alt = t[el.dataset.alt]; });
  $$('[data-label]').forEach(el => { el.setAttribute('aria-label',t[el.dataset.label]); });
  $$('[data-lang]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.lang === language)));
  $('#navigation').setAttribute('aria-label',t.mainNav);
  $('.menu-toggle').setAttribute('aria-label',t.menu);
  $('.filters').setAttribute('aria-label',t.categoriesLabel);
  storage.set('ari-language',language);
  if (updateUrl) { const url = new URL(location.href); url.searchParams.set('lang',language); history.replaceState({},'',url); }
  renderExperiences();
  renderFaq();
  closeMenu();
  $('#trip-date').setCustomValidity('');
}

function renderExperiences() {
  const t = translations[language];
  const ids = ['all','city','culture','nature'];
  $('.filters').innerHTML = t.filters.map((label,index) => `<button type="button" data-filter="${ids[index]}" aria-pressed="${activeFilter === ids[index]}">${label}</button>`).join('');
  $('#experience-grid').innerHTML = t.cards.filter(card => activeFilter === 'all' || card.id === activeFilter).map(card => `
    <button class="experience-card" type="button" data-card="${card.id}" aria-label="${escapeHtml(card.title)}">
      <div class="card-image"><img src="assets/${card.image}.webp" width="1200" height="800" alt="${escapeHtml(card.alt)}" loading="lazy"><span class="card-tag"><span></span>${card.tag}</span></div>
      <div class="card-content"><span class="card-kicker">${icon('pin')}${card.location}</span><h3>${card.title}</h3><p>${card.text}</p><div class="card-bottom"><span>${t.cardMore}</span><span class="card-arrow">${icon('diagonal')}</span></div></div>
    </button>`).join('');
}

function renderFaq() {
  const openIndexes = $$('#faq-list details').map((el,i) => el.open ? i : -1);
  $('#faq-list').innerHTML = translations[language].faq.map(([q,a],i) => `<details${openIndexes.includes(i)?' open':''}><summary>${q}</summary><p>${a}</p></details>`).join('');
}

function openDialog(html, type) {
  $('#dialog-body').innerHTML = html;
  activeDialog = type;
  const heading = $('#dialog-body h2');
  if (heading) { heading.id = 'dialog-title'; dialog.setAttribute('aria-labelledby','dialog-title'); }
  dialog.showModal();
  document.body.style.overflow = 'hidden';
}

function showExperience(id) {
  const t = translations[language];
  const card = t.cards.find(item => item.id === id);
  openDialog(`<img src="assets/${card.image}.webp" alt="${escapeHtml(card.alt)}"><span class="eyebrow">${card.location}</span><h2>${card.title}</h2><p>${card.detail}</p><h3 class="detail-subtitle">${t.suggested}</h3><ul>${t.routes[id].slice(0,3).map(([,text])=>`<li>${text}</li>`).join('')}</ul><button class="button" type="button" data-choose="${id}">${t.choose}${icon('diagonal')}</button>`, 'experience');
}

function planDate(date) { return new Intl.DateTimeFormat(locale(),{day:'numeric',month:'long',year:'numeric'}).format(new Date(date+'T12:00:00')); }

function showPlan() {
  const t = translations[language];
  const card = t.cards.find(item => item.id === lastPlan.mood);
  const route = t.routes[lastPlan.mood];
  openDialog(`<span class="eyebrow">${t.exampleLabel}</span><h2>${t.exampleTitle}</h2><div class="plan-summary"><span>${planDate(lastPlan.date)}</span><span>${t.people[lastPlan.guests]}</span><span>${card.location}</span></div><ol class="route-list">${route.map(([time,text])=>`<li><strong>${time}</strong><span>${text}</span></li>`).join('')}</ol>${lastPlan.wishes ? `<p class="wishes"><strong>${t.wishes}:</strong> ${escapeHtml(lastPlan.wishes)}</p>` : ''}<p class="demo-notice">${t.exampleNotice}</p><div class="dialog-actions"><button type="button" class="button" data-download>${t.download}${icon('arrow')}</button><button type="button" class="button button-secondary" data-copy>${t.copy}</button></div>`, 'plan');
}

function plainPlan() {
  const t = translations[language];
  const card = t.cards.find(item => item.id === lastPlan.mood);
  return `ARI — ${t.exampleTitle}\n${planDate(lastPlan.date)} · ${t.people[lastPlan.guests]} · ${card.location}\n\n${t.routes[lastPlan.mood].map(([time,text])=>`${time}  ${text}`).join('\n\n')}${lastPlan.wishes ? `\n\n${t.wishes}: ${lastPlan.wishes}` : ''}\n\n${t.exampleNotice}\n${location.origin}${location.pathname}?lang=${language}\n`;
}

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(()=>$('#toast').classList.remove('visible'),3500);
}

$$('[data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
$('.menu-toggle').addEventListener('click',()=>{
  const open = $('.menu-toggle').getAttribute('aria-expanded') !== 'true';
  $('.menu-toggle').setAttribute('aria-expanded',String(open));
  $('#navigation').classList.toggle('open',open);
});
$$('#navigation a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{ if(event.key==='Escape') closeMenu(); });
$('.filters').addEventListener('click',event=>{
  const button = event.target.closest('[data-filter]');
  if(!button) return;
  activeFilter = button.dataset.filter;
  renderExperiences();
  $(`.filters [data-filter="${activeFilter}"]`).focus({preventScroll:true});
});
$('#experience-grid').addEventListener('click',event=>{
  const card = event.target.closest('[data-card]');
  if(card) showExperience(card.dataset.card);
});
$('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{ if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom) dialog.close();} });
dialog.addEventListener('close',()=>{ document.body.style.overflow=''; activeDialog=null; });
dialog.addEventListener('click',async event=>{
  const choose = event.target.closest('[data-choose]');
  if(choose) {
    $('#trip-mood').value = choose.dataset.choose;
    dialog.close();
    $('#plan').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    $('#trip-date').focus({preventScroll:true});
  }
  if(event.target.closest('[data-download]')) {
    const blob = new Blob(['\uFEFF'+plainPlan()],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `ARI-${lastPlan.date}-${language}.txt`;
    document.body.append(link); link.click(); link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  if(event.target.closest('[data-copy]')) {
    try { await navigator.clipboard.writeText(plainPlan()); toast(translations[language].copied); }
    catch { toast(translations[language].copyError); }
  }
});
$('#trip-date').addEventListener('input',()=>$('#trip-date').setCustomValidity(''));
$('#plan-form').addEventListener('submit',event=>{
  event.preventDefault();
  const date = $('#trip-date').value;
  if(!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < localDate(new Date())) {
    $('#trip-date').setCustomValidity(translations[language].invalidDate);
    $('#trip-date').reportValidity(); return;
  }
  lastPlan = {date,guests:$('#trip-guests').value,mood:$('#trip-mood').value,wishes:$('#trip-wishes').value.trim()};
  showPlan();
});
let creditsData;
$('#credits-button').addEventListener('click',async()=>{
  const t = translations[language];
  try {
    if(!creditsData) { const response=await fetch('assets/credits.json'); if(!response.ok) throw new Error('Credits unavailable'); creditsData=await response.json(); }
    openDialog(`<span class="eyebrow">ARI / CREDITS</span><h2>${t.creditsTitle}</h2><p>${t.creditsNote}</p><div class="credits-list">${creditsData.map(item=>`<div><strong>${escapeHtml(item.image.replace('assets/',''))}</strong><p>${escapeHtml(item.author)} · <a href="${escapeHtml(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.license)}</a></p><a href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">${t.source} ↗</a></div>`).join('')}<p>${t.fontCredits}</p></div>`, 'credits');
  } catch { window.open('https://commons.wikimedia.org/','_blank','noopener'); }
});
setLanguage(language, false);
