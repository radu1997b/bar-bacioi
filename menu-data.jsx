// Menu data for Bar Bacioi — RO + RU
// Categories can be flat (items: [...]) OR grouped (subs: [{ id, name: {ro,ru}, items: [...] }, ...]).

const MENU_DATA = [
  {
    id: 'mic-dejun',
    name: { ro: 'Mic Dejun', ru: 'Завтрак' },
    blurb: { ro: 'Servit până la 13:00', ru: 'Подаётся до 13:00' },
    items: [
      { id: 'b1', name: { ro: 'Ouă Benedict', ru: 'Яйца Бенедикт' }, desc: { ro: 'ou poșat, șuncă, sos olandez, brioșă', ru: 'яйцо пашот, ветчина, голландез, булочка' }, price: 145, tag: 'house' },
      { id: 'b2', name: { ro: 'Omletă cu trufe', ru: 'Омлет с трюфелем' }, desc: { ro: 'trei ouă, mascarpone, ulei de trufe', ru: 'три яйца, маскарпоне, трюфельное масло' }, price: 165 },
      { id: 'b3', name: { ro: 'Avocado pe pâine de casă', ru: 'Авокадо на домашнем хлебе' }, desc: { ro: 'avocado, lămâie, ardei iute, semințe', ru: 'авокадо, лимон, чили, семечки' }, price: 120 },
      { id: 'b4', name: { ro: 'Sirniki', ru: 'Сырники' }, desc: { ro: 'brânză de vaci, smântână, dulceață', ru: 'творог, сметана, варенье' }, price: 95 },
      { id: 'b5', name: { ro: 'Granola cu iaurt', ru: 'Гранола с йогуртом' }, desc: { ro: 'ovăz, miere, fructe de pădure', ru: 'овсянка, мёд, ягоды' }, price: 85 },
      { id: 'b6', name: { ro: 'Clătite cu caș', ru: 'Блинчики с творогом' }, desc: { ro: 'caș dulce, smântână, miere', ru: 'сладкий творог, сметана, мёд' }, price: 90 },
    ],
  },
  {
    id: 'bucatarie',
    name: { ro: 'Bucătărie', ru: 'Кухня' },
    blurb: { ro: 'De la prânz până la închidere', ru: 'С обеда до закрытия' },
    subs: [
      {
        id: 'gustari-reci',
        name: { ro: 'Gustări reci', ru: 'Холодные закуски' },
        items: [
          { id: 'gr1', name: { ro: 'Tartar de vită', ru: 'Тартар из говядины' }, desc: { ro: 'mușchi de vită, gălbenuș, capere, pâine prăjită', ru: 'говяжья вырезка, желток, каперсы, тосты' }, price: 220, tag: 'house' },
          { id: 'gr2', name: { ro: 'Burata cu roșii', ru: 'Бурата с томатами' }, desc: { ro: 'burata, roșii cherry, busuioc, ulei de măsline', ru: 'бурата, черри, базилик, оливковое масло' }, price: 185 },
          { id: 'gr3', name: { ro: 'Carpaccio de vită', ru: 'Карпаччо из говядины' }, desc: { ro: 'mușchi de vită, parmezan, rucola, lămâie', ru: 'говяжья вырезка, пармезан, руккола, лимон' }, price: 195 },
          { id: 'gr4', name: { ro: 'Platou cu brânzeturi', ru: 'Сырная тарелка' }, desc: { ro: 'patru brânzeturi, miere, nuci, struguri', ru: 'четыре сыра, мёд, орехи, виноград' }, price: 240 },
        ],
      },
      {
        id: 'salate',
        name: { ro: 'Salate', ru: 'Салаты' },
        items: [
          { id: 'sa1', name: { ro: 'Salată Caesar cu pui', ru: 'Цезарь с курицей' }, desc: { ro: 'salată romana, pui, parmezan, crutoane', ru: 'романо, курица, пармезан, гренки' }, price: 155 },
          { id: 'sa2', name: { ro: 'Salată grecească', ru: 'Греческий салат' }, desc: { ro: 'feta, măsline, castravete, roșii, ardei', ru: 'фета, оливки, огурец, томаты, перец' }, price: 135 },
          { id: 'sa3', name: { ro: 'Salată cu file de rață', ru: 'Салат с уткой' }, desc: { ro: 'rață, mix de salate, portocală, dressing balsamic', ru: 'утка, микс салатов, апельсин, бальзамик' }, price: 175, tag: 'house' },
          { id: 'sa4', name: { ro: 'Salată cu sfeclă și capră', ru: 'Салат со свёклой и козьим сыром' }, desc: { ro: 'sfeclă coaptă, brânză de capră, nuci, miere', ru: 'свёкла, козий сыр, орехи, мёд' }, price: 145 },
        ],
      },
      {
        id: 'supe',
        name: { ro: 'Supe', ru: 'Супы' },
        items: [
          { id: 'su1', name: { ro: 'Supă cremă de roșii', ru: 'Крем-суп из томатов' }, desc: { ro: 'roșii coapte, busuioc, mascarpone', ru: 'запечённые томаты, базилик, маскарпоне' }, price: 95 },
          { id: 'su2', name: { ro: 'Borș de pește', ru: 'Уха' }, desc: { ro: 'somon, biban, cartof, mărar', ru: 'лосось, окунь, картофель, укроп' }, price: 145 },
          { id: 'su3', name: { ro: 'Supă cremă de ciuperci', ru: 'Крем-суп из грибов' }, desc: { ro: 'ciuperci porcini, smântână, ulei de trufe', ru: 'белые грибы, сливки, трюфельное масло' }, price: 125, tag: 'house' },
          { id: 'su4', name: { ro: 'Zeamă de pui', ru: 'Куриный бульон' }, desc: { ro: 'pui, tăiței de casă, zarzavat', ru: 'курица, домашняя лапша, зелень' }, price: 95 },
        ],
      },
      {
        id: 'gustari-calde',
        name: { ro: 'Gustări calde', ru: 'Горячие закуски' },
        items: [
          { id: 'gc1', name: { ro: 'Camembert pané', ru: 'Камамбер во фритюре' }, desc: { ro: 'camembert, panko, dulceață de afine', ru: 'камамбер, панко, черничное варенье' }, price: 165 },
          { id: 'gc2', name: { ro: 'Calamari prăjiți', ru: 'Жареные кальмары' }, desc: { ro: 'calamari, lămâie, sos aioli', ru: 'кальмары, лимон, айоли' }, price: 185 },
          { id: 'gc3', name: { ro: 'Aripioare BBQ', ru: 'Крылышки BBQ' }, desc: { ro: 'aripioare de pui, sos BBQ, telină', ru: 'куриные крылышки, BBQ соус, сельдерей' }, price: 145 },
          { id: 'gc4', name: { ro: 'Cartofi trufați', ru: 'Картофель с трюфелем' }, desc: { ro: 'cartofi, parmezan, ulei de trufe', ru: 'картофель, пармезан, трюфельное масло' }, price: 110 },
        ],
      },
      {
        id: 'paste',
        name: { ro: 'Paste', ru: 'Паста' },
        items: [
          { id: 'pa1', name: { ro: 'Cacio e pepe', ru: 'Качо э пепе' }, desc: { ro: 'tonnarelli, pecorino, piper negru', ru: 'тоннарелли, пекорино, чёрный перец' }, price: 175, tag: 'house' },
          { id: 'pa2', name: { ro: 'Carbonara', ru: 'Карбонара' }, desc: { ro: 'spaghetti, guanciale, gălbenuș, pecorino', ru: 'спагетти, гуанчале, желток, пекорино' }, price: 185 },
          { id: 'pa3', name: { ro: 'Tagliatelle cu vită', ru: 'Тальятелле с говядиной' }, desc: { ro: 'tagliatelle, ragù de vită, parmezan', ru: 'тальятелле, рагу из говядины, пармезан' }, price: 210 },
          { id: 'pa4', name: { ro: 'Ravioli cu ricotta', ru: 'Равиоли с рикоттой' }, desc: { ro: 'ricotta, spanac, unt sage', ru: 'рикотта, шпинат, шалфейное масло' }, price: 195 },
        ],
      },
      {
        id: 'carne',
        name: { ro: 'Carne', ru: 'Мясо' },
        items: [
          { id: 'ca1', name: { ro: 'Burger Bacioi', ru: 'Бургер Bacioi' }, desc: { ro: 'vită 200g, cheddar, ceapă caramelizată, cartofi', ru: 'говядина 200г, чеддер, лук карамель, картофель' }, price: 195, tag: 'house' },
          { id: 'ca2', name: { ro: 'Ribeye 350g', ru: 'Рибай 350г' }, desc: { ro: 'vită maturată, unt de ierburi, cartofi', ru: 'выдержанная говядина, травяное масло, картофель' }, price: 520 },
          { id: 'ca3', name: { ro: 'Coaste de porc', ru: 'Свиные рёбра' }, desc: { ro: 'coaste, sos BBQ, varză murată', ru: 'рёбра, BBQ соус, квашеная капуста' }, price: 245 },
          { id: 'ca4', name: { ro: 'Pui la grătar', ru: 'Курица гриль' }, desc: { ro: 'piept de pui, lămâie, rozmarin, legume', ru: 'куриная грудка, лимон, розмарин, овощи' }, price: 175 },
          { id: 'ca5', name: { ro: 'Mușchi de vită', ru: 'Говяжья вырезка' }, desc: { ro: 'vită, sos demi-glace, piure de cartofi', ru: 'говядина, деми-глас, картофельное пюре' }, price: 380 },
        ],
      },
    ],
  },
  {
    id: 'bar',
    name: { ro: 'Bar', ru: 'Бар' },
    blurb: { ro: 'Cocktail-uri, semnătură & clasice', ru: 'Коктейли, авторские и классика' },
    subs: [
      {
        id: 'cocktail',
        name: { ro: 'Cocktail', ru: 'Коктейли' },
        items: [
          { id: 'co1', name: { ro: 'Disco Sour', ru: 'Disco Sour' }, desc: { ro: 'bourbon, lămâie, albuș, bitter', ru: 'бурбон, лимон, белок, биттер' }, price: 130, tag: 'house' },
          { id: 'co2', name: { ro: 'Espresso Martini', ru: 'Эспрессо Мартини' }, desc: { ro: 'vodcă, espresso, kahlúa', ru: 'водка, эспрессо, калуа' }, price: 140 },
          { id: 'co3', name: { ro: 'Negroni', ru: 'Негрони' }, desc: { ro: 'gin, campari, vermut roșu', ru: 'джин, кампари, красный вермут' }, price: 125 },
          { id: 'co4', name: { ro: 'Old Fashioned', ru: 'Олд Фэшн' }, desc: { ro: 'bourbon, zahăr, bitter, portocală', ru: 'бурбон, сахар, биттер, апельсин' }, price: 135 },
          { id: 'co5', name: { ro: 'Aperol Spritz', ru: 'Апероль Шприц' }, desc: { ro: 'aperol, prosecco, sifon', ru: 'апероль, просекко, содовая' }, price: 110 },
          { id: 'co6', name: { ro: 'Margarita Picante', ru: 'Маргарита Picante' }, desc: { ro: 'tequila, lime, jalapeño, agave', ru: 'текила, лайм, халапеньо, агава' }, price: 140 },
          { id: 'co7', name: { ro: 'Gin Tonic Bacioi', ru: 'Джин-тоник Bacioi' }, desc: { ro: 'gin local, tonic, rozmarin, grepfrut', ru: 'локальный джин, тоник, розмарин, грейпфрут' }, price: 120 },
        ],
      },
      {
        id: 'limonade',
        name: { ro: 'Limonade', ru: 'Лимонады' },
        items: [
          { id: 'li1', name: { ro: 'Limonadă clasică', ru: 'Классический лимонад' }, desc: { ro: 'lămâie, mentă, sirop de zahăr', ru: 'лимон, мята, сахарный сироп' }, price: 75 },
          { id: 'li2', name: { ro: 'Limonadă pepene & busuioc', ru: 'Лимонад арбуз & базилик' }, desc: { ro: 'pepene roșu, busuioc, lime', ru: 'арбуз, базилик, лайм' }, price: 85, tag: 'house' },
          { id: 'li3', name: { ro: 'Limonadă cătină & ghimbir', ru: 'Лимонад облепиха & имбирь' }, desc: { ro: 'cătină, ghimbir, miere, lămâie', ru: 'облепиха, имбирь, мёд, лимон' }, price: 85 },
          { id: 'li4', name: { ro: 'Limonadă citrice & rozmarin', ru: 'Лимонад цитрус & розмарин' }, desc: { ro: 'portocală, grepfrut, rozmarin', ru: 'апельсин, грейпфрут, розмарин' }, price: 85 },
        ],
      },
      {
        id: 'hot-drinks',
        name: { ro: 'Hot Drinks', ru: 'Горячие напитки' },
        items: [
          { id: 'hd1', name: { ro: 'Espresso', ru: 'Эспрессо' }, desc: { ro: 'arabica, single shot', ru: 'арабика, одинарный' }, price: 35 },
          { id: 'hd2', name: { ro: 'Cappuccino', ru: 'Капучино' }, desc: { ro: 'espresso, lapte spumat', ru: 'эспрессо, вспененное молоко' }, price: 50 },
          { id: 'hd3', name: { ro: 'Latte', ru: 'Латте' }, desc: { ro: 'espresso, lapte, opțional sirop', ru: 'эспрессо, молоко, сироп по желанию' }, price: 55 },
          { id: 'hd4', name: { ro: 'Ceai negru', ru: 'Чёрный чай' }, desc: { ro: 'ceainic, lămâie, miere', ru: 'чайник, лимон, мёд' }, price: 65 },
          { id: 'hd5', name: { ro: 'Ciocolată caldă', ru: 'Горячий шоколад' }, desc: { ro: 'ciocolată 70%, frișcă', ru: 'шоколад 70%, сливки' }, price: 75, tag: 'house' },
          { id: 'hd6', name: { ro: 'Vin fiert', ru: 'Глинтвейн' }, desc: { ro: 'vin roșu, scorțișoară, portocală, miere', ru: 'красное вино, корица, апельсин, мёд' }, price: 95 },
        ],
      },
    ],
  },
  {
    id: 'vin',
    name: { ro: 'Vin', ru: 'Вино' },
    blurb: { ro: 'Selecție locală & internațională', ru: 'Локальные и международные' },
    items: [
      { id: 'w1', name: { ro: 'Fetească Neagră', ru: 'Фетяска Нягрэ' }, desc: { ro: 'roșu sec, Moldova — pahar / sticlă', ru: 'красное сухое, Молдова — бокал / бутылка' }, price: 75, priceBottle: 380 },
      { id: 'w2', name: { ro: 'Rara Neagră', ru: 'Рара Нягрэ' }, desc: { ro: 'roșu sec, Moldova — pahar / sticlă', ru: 'красное сухое, Молдова — бокал / бутылка' }, price: 85, priceBottle: 420, tag: 'house' },
      { id: 'w3', name: { ro: 'Fetească Albă', ru: 'Фетяска Албэ' }, desc: { ro: 'alb sec, Moldova — pahar / sticlă', ru: 'белое сухое, Молдова — бокал / бутылка' }, price: 70, priceBottle: 350 },
      { id: 'w4', name: { ro: 'Sauvignon Blanc', ru: 'Совиньон Блан' }, desc: { ro: 'alb sec, Franța — pahar / sticlă', ru: 'белое сухое, Франция — бокал / бутылка' }, price: 95, priceBottle: 480 },
      { id: 'w5', name: { ro: 'Rosé de Provence', ru: 'Розе Прованс' }, desc: { ro: 'roze sec, Franța — pahar / sticlă', ru: 'розе сухое, Франция — бокал / бутылка' }, price: 90, priceBottle: 460 },
      { id: 'w6', name: { ro: 'Prosecco', ru: 'Просекко' }, desc: { ro: 'spumant, Italia — pahar / sticlă', ru: 'игристое, Италия — бокал / бутылка' }, price: 95, priceBottle: 490 },
      { id: 'w7', name: { ro: 'Champagne', ru: 'Шампанское' }, desc: { ro: 'brut, Franța — sticlă', ru: 'брют, Франция — бутылка' }, price: 1200, bottleOnly: true },
    ],
  },
  {
    id: 'hookah',
    name: { ro: 'Hookah', ru: 'Кальян' },
    blurb: { ro: 'Tutun premium, mixuri semnătură', ru: 'Премиум табак, авторские миксы' },
    items: [
      { id: 'h1', name: { ro: 'Mix Bacioi', ru: 'Микс Bacioi' }, desc: { ro: 'mango, maracuja, mentă', ru: 'манго, маракуйя, мята' }, price: 350, tag: 'house' },
      { id: 'h2', name: { ro: 'Disco Nights', ru: 'Disco Nights' }, desc: { ro: 'pepene roșu, kiwi, busuioc', ru: 'арбуз, киви, базилик' }, price: 350 },
      { id: 'h3', name: { ro: 'Citrus Storm', ru: 'Citrus Storm' }, desc: { ro: 'grepfrut, lime, ghimbir', ru: 'грейпфрут, лайм, имбирь' }, price: 350 },
      { id: 'h4', name: { ro: 'Berry Velvet', ru: 'Berry Velvet' }, desc: { ro: 'zmeură, mure, vanilie', ru: 'малина, ежевика, ваниль' }, price: 350 },
      { id: 'h5', name: { ro: 'Clasic dublu măr', ru: 'Классика двойное яблоко' }, desc: { ro: 'măr roșu, anason', ru: 'красное яблоко, анис' }, price: 320 },
      { id: 'h6', name: { ro: 'Schimb tutun', ru: 'Замена табака' }, desc: { ro: 'pe aceeași narghilea', ru: 'на ту же кальянную чашу' }, price: 150 },
    ],
  },
];

const UI_STRINGS = {
  ro: {
    tagline: 'Disco bar · Chișinău',
    open: 'Deschis acum · până la 02:00',
    house: 'Recomandare',
    glass: 'pahar',
    bottle: 'sticlă',
    callWaiter: 'Cheamă ospătar',
    wifi: 'Wi-Fi',
    instagram: 'Instagram',
    scrollHint: 'Glisează ↓',
    menuOf: 'Meniul',
  },
  ru: {
    tagline: 'Диско-бар · Кишинёв',
    open: 'Открыто · до 02:00',
    house: 'Хит',
    glass: 'бокал',
    bottle: 'бутылка',
    callWaiter: 'Позвать официанта',
    wifi: 'Wi-Fi',
    instagram: 'Instagram',
    scrollHint: 'Листай ↓',
    menuOf: 'Меню',
  },
};

// Helper: flatten a category into its sub-rows for rendering & rail tracking.
// Returns array of { kind: 'sub', subId, name, items } when category has subs,
// or [{ kind: 'flat', items }] when it's flat.
function expandCategory(cat) {
  if (cat.subs && cat.subs.length) {
    return cat.subs.map((s) => ({ kind: 'sub', subId: s.id, name: s.name, items: s.items }));
  }
  return [{ kind: 'flat', items: cat.items || [] }];
}

window.MENU_DATA = MENU_DATA;
window.UI_STRINGS = UI_STRINGS;
window.expandCategory = expandCategory;
