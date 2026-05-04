-- Categories
INSERT OR IGNORE INTO categories (id, name_ro, name_ru, blurb_ro, blurb_ru, sort_order) VALUES
  ('mic-dejun', 'Mic Dejun', 'Завтрак', 'Servit până la 13:00', 'Подаётся до 13:00', 1),
  ('bucatarie', 'Bucătărie', 'Кухня', 'De la prânz până la închidere', 'С обеда до закрытия', 2),
  ('bar', 'Bar', 'Бар', 'Cocktail-uri, semnătură & clasice', 'Коктейли, авторские и классика', 3),
  ('vin', 'Vin', 'Вино', 'Selecție locală & internațională', 'Локальные и международные', 4),
  ('hookah', 'Hookah', 'Кальян', 'Tutun premium, mixuri semnătură', 'Премиум табак, авторские миксы', 5);

-- Subcategories for 'bucatarie'
INSERT OR IGNORE INTO subcategories (id, category_id, name_ro, name_ru, sort_order) VALUES
  ('gustari-reci', 'bucatarie', 'Gustări reci', 'Холодные закуски', 1),
  ('salate', 'bucatarie', 'Salate', 'Салаты', 2),
  ('supe', 'bucatarie', 'Supe', 'Супы', 3),
  ('gustari-calde', 'bucatarie', 'Gustări calde', 'Горячие закуски', 4),
  ('paste', 'bucatarie', 'Paste', 'Паста', 5),
  ('carne', 'bucatarie', 'Carne', 'Мясо', 6);

-- Subcategories for 'bar'
INSERT OR IGNORE INTO subcategories (id, category_id, name_ro, name_ru, sort_order) VALUES
  ('cocktail', 'bar', 'Cocktail', 'Коктейли', 1),
  ('limonade', 'bar', 'Limonade', 'Лимонады', 2),
  ('hot-drinks', 'bar', 'Hot Drinks', 'Горячие напитки', 3);

-- Items: mic-dejun (flat)
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('b1', 'mic-dejun', NULL, 'Ouă Benedict', 'Яйца Бенедикт', 'ou poșat, șuncă, sos olandez, brioșă', 'яйцо пашот, ветчина, голландез, булочка', 145, NULL, 0, 'house', 1),
  ('b2', 'mic-dejun', NULL, 'Omletă cu trufe', 'Омлет с трюфелем', 'trei ouă, mascarpone, ulei de trufe', 'три яйца, маскарпоне, трюфельное масло', 165, NULL, 0, NULL, 2),
  ('b3', 'mic-dejun', NULL, 'Avocado pe pâine de casă', 'Авокадо на домашнем хлебе', 'avocado, lămâie, ardei iute, semințe', 'авокадо, лимон, чили, семечки', 120, NULL, 0, NULL, 3),
  ('b4', 'mic-dejun', NULL, 'Sirniki', 'Сырники', 'brânză de vaci, smântână, dulceață', 'творог, сметана, варенье', 95, NULL, 0, NULL, 4),
  ('b5', 'mic-dejun', NULL, 'Granola cu iaurt', 'Гранола с йогуртом', 'ovăz, miere, fructe de pădure', 'овсянка, мёд, ягоды', 85, NULL, 0, NULL, 5),
  ('b6', 'mic-dejun', NULL, 'Clătite cu caș', 'Блинчики с творогом', 'caș dulce, smântână, miere', 'сладкий творог, сметана, мёд', 90, NULL, 0, NULL, 6);

-- Items: bucatarie / gustari-reci
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('gr1', 'bucatarie', 'gustari-reci', 'Tartar de vită', 'Тартар из говядины', 'mușchi de vită, gălbenuș, capere, pâine prăjită', 'говяжья вырезка, желток, каперсы, тосты', 220, NULL, 0, 'house', 1),
  ('gr2', 'bucatarie', 'gustari-reci', 'Burata cu roșii', 'Бурата с томатами', 'burata, roșii cherry, busuioc, ulei de măsline', 'бурата, черри, базилик, оливковое масло', 185, NULL, 0, NULL, 2),
  ('gr3', 'bucatarie', 'gustari-reci', 'Carpaccio de vită', 'Карпаччо из говядины', 'mușchi de vită, parmezan, rucola, lămâie', 'говяжья вырезка, пармезан, руккола, лимон', 195, NULL, 0, NULL, 3),
  ('gr4', 'bucatarie', 'gustari-reci', 'Platou cu brânzeturi', 'Сырная тарелка', 'patru brânzeturi, miere, nuci, struguri', 'четыре сыра, мёд, орехи, виноград', 240, NULL, 0, NULL, 4);

-- Items: bucatarie / salate
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('sa1', 'bucatarie', 'salate', 'Salată Caesar cu pui', 'Цезарь с курицей', 'salată romana, pui, parmezan, crutoane', 'романо, курица, пармезан, гренки', 155, NULL, 0, NULL, 1),
  ('sa2', 'bucatarie', 'salate', 'Salată grecească', 'Греческий салат', 'feta, măsline, castravete, roșii, ardei', 'фета, оливки, огурец, томаты, перец', 135, NULL, 0, NULL, 2),
  ('sa3', 'bucatarie', 'salate', 'Salată cu file de rață', 'Салат с уткой', 'rață, mix de salate, portocală, dressing balsamic', 'утка, микс салатов, апельсин, бальзамик', 175, NULL, 0, 'house', 3),
  ('sa4', 'bucatarie', 'salate', 'Salată cu sfeclă și capră', 'Салат со свёклой и козьим сыром', 'sfeclă coaptă, brânză de capră, nuci, miere', 'свёкла, козий сыр, орехи, мёд', 145, NULL, 0, NULL, 4);

-- Items: bucatarie / supe
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('su1', 'bucatarie', 'supe', 'Supă cremă de roșii', 'Крем-суп из томатов', 'roșii coapte, busuioc, mascarpone', 'запечённые томаты, базилик, маскарпоне', 95, NULL, 0, NULL, 1),
  ('su2', 'bucatarie', 'supe', 'Borș de pește', 'Уха', 'somon, biban, cartof, mărar', 'лосось, окунь, картофель, укроп', 145, NULL, 0, NULL, 2),
  ('su3', 'bucatarie', 'supe', 'Supă cremă de ciuperci', 'Крем-суп из грибов', 'ciuperci porcini, smântână, ulei de trufe', 'белые грибы, сливки, трюфельное масло', 125, NULL, 0, 'house', 3),
  ('su4', 'bucatarie', 'supe', 'Zeamă de pui', 'Куриный бульон', 'pui, tăiței de casă, zarzavat', 'курица, домашняя лапша, зелень', 95, NULL, 0, NULL, 4);

-- Items: bucatarie / gustari-calde
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('gc1', 'bucatarie', 'gustari-calde', 'Camembert pané', 'Камамбер во фритюре', 'camembert, panko, dulceață de afine', 'камамбер, панко, черничное варенье', 165, NULL, 0, NULL, 1),
  ('gc2', 'bucatarie', 'gustari-calde', 'Calamari prăjiți', 'Жареные кальмары', 'calamari, lămâie, sos aioli', 'кальмары, лимон, айоли', 185, NULL, 0, NULL, 2),
  ('gc3', 'bucatarie', 'gustari-calde', 'Aripioare BBQ', 'Крылышки BBQ', 'aripioare de pui, sos BBQ, telină', 'куриные крылышки, BBQ соус, сельдерей', 145, NULL, 0, NULL, 3),
  ('gc4', 'bucatarie', 'gustari-calde', 'Cartofi trufați', 'Картофель с трюфелем', 'cartofi, parmezan, ulei de trufe', 'картофель, пармезан, трюфельное масло', 110, NULL, 0, NULL, 4);

-- Items: bucatarie / paste
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('pa1', 'bucatarie', 'paste', 'Cacio e pepe', 'Качо э пепе', 'tonnarelli, pecorino, piper negru', 'тоннарелли, пекорино, чёрный перец', 175, NULL, 0, 'house', 1),
  ('pa2', 'bucatarie', 'paste', 'Carbonara', 'Карбонара', 'spaghetti, guanciale, gălbenuș, pecorino', 'спагетти, гуанчале, желток, пекорино', 185, NULL, 0, NULL, 2),
  ('pa3', 'bucatarie', 'paste', 'Tagliatelle cu vită', 'Тальятелле с говядиной', 'tagliatelle, ragù de vită, parmezan', 'тальятелле, рагу из говядины, пармезан', 210, NULL, 0, NULL, 3),
  ('pa4', 'bucatarie', 'paste', 'Ravioli cu ricotta', 'Равиоли с рикоттой', 'ricotta, spanac, unt sage', 'рикотта, шпинат, шалфейное масло', 195, NULL, 0, NULL, 4);

-- Items: bucatarie / carne
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('ca1', 'bucatarie', 'carne', 'Burger Bacioi', 'Бургер Bacioi', 'vită 200g, cheddar, ceapă caramelizată, cartofi', 'говядина 200г, чеддер, лук карамель, картофель', 195, NULL, 0, 'house', 1),
  ('ca2', 'bucatarie', 'carne', 'Ribeye 350g', 'Рибай 350г', 'vită maturată, unt de ierburi, cartofi', 'выдержанная говядина, травяное масло, картофель', 520, NULL, 0, NULL, 2),
  ('ca3', 'bucatarie', 'carne', 'Coaste de porc', 'Свиные рёбра', 'coaste, sos BBQ, varză murată', 'рёбра, BBQ соус, квашеная капуста', 245, NULL, 0, NULL, 3),
  ('ca4', 'bucatarie', 'carne', 'Pui la grătar', 'Курица гриль', 'piept de pui, lămâie, rozmarin, legume', 'куриная грудка, лимон, розмарин, овощи', 175, NULL, 0, NULL, 4),
  ('ca5', 'bucatarie', 'carne', 'Mușchi de vită', 'Говяжья вырезка', 'vită, sos demi-glace, piure de cartofi', 'говядина, деми-глас, картофельное пюре', 380, NULL, 0, NULL, 5);

-- Items: bar / cocktail
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('co1', 'bar', 'cocktail', 'Disco Sour', 'Disco Sour', 'bourbon, lămâie, albuș, bitter', 'бурбон, лимон, белок, биттер', 130, NULL, 0, 'house', 1),
  ('co2', 'bar', 'cocktail', 'Espresso Martini', 'Эспрессо Мартини', 'vodcă, espresso, kahlúa', 'водка, эспрессо, калуа', 140, NULL, 0, NULL, 2),
  ('co3', 'bar', 'cocktail', 'Negroni', 'Негрони', 'gin, campari, vermut roșu', 'джин, кампари, красный вермут', 125, NULL, 0, NULL, 3),
  ('co4', 'bar', 'cocktail', 'Old Fashioned', 'Олд Фэшн', 'bourbon, zahăr, bitter, portocală', 'бурбон, сахар, биттер, апельсин', 135, NULL, 0, NULL, 4),
  ('co5', 'bar', 'cocktail', 'Aperol Spritz', 'Апероль Шприц', 'aperol, prosecco, sifon', 'апероль, просекко, содовая', 110, NULL, 0, NULL, 5),
  ('co6', 'bar', 'cocktail', 'Margarita Picante', 'Маргарита Picante', 'tequila, lime, jalapeño, agave', 'текила, лайм, халапеньо, агава', 140, NULL, 0, NULL, 6),
  ('co7', 'bar', 'cocktail', 'Gin Tonic Bacioi', 'Джин-тоник Bacioi', 'gin local, tonic, rozmarin, grepfrut', 'локальный джин, тоник, розмарин, грейпфрут', 120, NULL, 0, NULL, 7);

-- Items: bar / limonade
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('li1', 'bar', 'limonade', 'Limonadă clasică', 'Классический лимонад', 'lămâie, mentă, sirop de zahăr', 'лимон, мята, сахарный сироп', 75, NULL, 0, NULL, 1),
  ('li2', 'bar', 'limonade', 'Limonadă pepene & busuioc', 'Лимонад арбуз & базилик', 'pepene roșu, busuioc, lime', 'арбуз, базилик, лайм', 85, NULL, 0, 'house', 2),
  ('li3', 'bar', 'limonade', 'Limonadă cătină & ghimbir', 'Лимонад облепиха & имбирь', 'cătină, ghimbir, miere, lămâie', 'облепиха, имбирь, мёд, лимон', 85, NULL, 0, NULL, 3),
  ('li4', 'bar', 'limonade', 'Limonadă citrice & rozmarin', 'Лимонад цитрус & розмарин', 'portocală, grepfrut, rozmarin', 'апельсин, грейпфрут, розмарин', 85, NULL, 0, NULL, 4);

-- Items: bar / hot-drinks
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('hd1', 'bar', 'hot-drinks', 'Espresso', 'Эспрессо', 'arabica, single shot', 'арабика, одинарный', 35, NULL, 0, NULL, 1),
  ('hd2', 'bar', 'hot-drinks', 'Cappuccino', 'Капучино', 'espresso, lapte spumat', 'эспрессо, вспененное молоко', 50, NULL, 0, NULL, 2),
  ('hd3', 'bar', 'hot-drinks', 'Latte', 'Латте', 'espresso, lapte, opțional sirop', 'эспрессо, молоко, сироп по желанию', 55, NULL, 0, NULL, 3),
  ('hd4', 'bar', 'hot-drinks', 'Ceai negru', 'Чёрный чай', 'ceainic, lămâie, miere', 'чайник, лимон, мёд', 65, NULL, 0, NULL, 4),
  ('hd5', 'bar', 'hot-drinks', 'Ciocolată caldă', 'Горячий шоколад', 'ciocolată 70%, frișcă', 'шоколад 70%, сливки', 75, NULL, 0, 'house', 5),
  ('hd6', 'bar', 'hot-drinks', 'Vin fiert', 'Глинтвейн', 'vin roșu, scorțișoară, portocală, miere', 'красное вино, корица, апельсин, мёд', 95, NULL, 0, NULL, 6);

-- Items: vin (flat)
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('w1', 'vin', NULL, 'Fetească Neagră', 'Фетяска Нягрэ', 'roșu sec, Moldova — pahar / sticlă', 'красное сухое, Молдова — бокал / бутылка', 75, 380, 0, NULL, 1),
  ('w2', 'vin', NULL, 'Rara Neagră', 'Рара Нягрэ', 'roșu sec, Moldova — pahar / sticlă', 'красное сухое, Молдова — бокал / бутылка', 85, 420, 0, 'house', 2),
  ('w3', 'vin', NULL, 'Fetească Albă', 'Фетяска Албэ', 'alb sec, Moldova — pahar / sticlă', 'белое сухое, Молдова — бокал / бутылка', 70, 350, 0, NULL, 3),
  ('w4', 'vin', NULL, 'Sauvignon Blanc', 'Совиньон Блан', 'alb sec, Franța — pahar / sticlă', 'белое сухое, Франция — бокал / бутылка', 95, 480, 0, NULL, 4),
  ('w5', 'vin', NULL, 'Rosé de Provence', 'Розе Прованс', 'roze sec, Franța — pahar / sticlă', 'розе сухое, Франция — бокал / бутылка', 90, 460, 0, NULL, 5),
  ('w6', 'vin', NULL, 'Prosecco', 'Просекко', 'spumant, Italia — pahar / sticlă', 'игристое, Италия — бокал / бутылка', 95, 490, 0, NULL, 6),
  ('w7', 'vin', NULL, 'Champagne', 'Шампанское', 'brut, Franța — sticlă', 'брют, Франция — бутылка', 1200, NULL, 1, NULL, 7);

-- Items: hookah (flat)
INSERT OR IGNORE INTO items (id, category_id, subcategory_id, name_ro, name_ru, desc_ro, desc_ru, price, price_bottle, bottle_only, tag, sort_order) VALUES
  ('h1', 'hookah', NULL, 'Mix Bacioi', 'Микс Bacioi', 'mango, maracuja, mentă', 'манго, маракуйя, мята', 350, NULL, 0, 'house', 1),
  ('h2', 'hookah', NULL, 'Disco Nights', 'Disco Nights', 'pepene roșu, kiwi, busuioc', 'арбуз, киви, базилик', 350, NULL, 0, NULL, 2),
  ('h3', 'hookah', NULL, 'Citrus Storm', 'Citrus Storm', 'grepfrut, lime, ghimbir', 'грейпфрут, лайм, имбирь', 350, NULL, 0, NULL, 3),
  ('h4', 'hookah', NULL, 'Berry Velvet', 'Berry Velvet', 'zmeură, mure, vanilie', 'малина, ежевика, ваниль', 350, NULL, 0, NULL, 4),
  ('h5', 'hookah', NULL, 'Clasic dublu măr', 'Классика двойное яблоко', 'măr roșu, anason', 'красное яблоко, анис', 320, NULL, 0, NULL, 5),
  ('h6', 'hookah', NULL, 'Schimb tutun', 'Замена табака', 'pe aceeași narghilea', 'на ту же кальянную чашу', 150, NULL, 0, NULL, 6);
