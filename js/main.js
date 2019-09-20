$( document ).ready(function() {

    var api_url = "https://hyls-api.ru/";

    var cookie_name_token = "am_token";
    var cookie_name_id = "am_id";
    var cookie_token = getCookie(cookie_name_token);

    var cc2_sadhana_all = ["1а) Единый, не имеющий формы и начала бесконечный Пара́ма Бра́хма (высшее Сознание) – та единственная сущность, к обретению которой следует стремиться каждому живому существу. Он и никто другой является джага́т Гу́ру (высшим наставником), и именно Он посредством имени и физической формы Анандамурти-джи сделал бра́хмави́дью (интуитивную науку) доступной для нас. Необходимо сделать так, чтобы все существа осознали Его величие.",
            "1б) Независимо от того, больны вы или здоровы, сидите, лежите или едете в транспорте, вы должны два раза в день выполнять полноценную и́швара пранидха́ну. Независимо от того, насколько безотлагательна предстоящая в ближайшем будущем работа и насколько беспокоен разум, каждый са́дхака должен выполнить джа́пу согласно полученной технике медитации (т.е. повторить свою и́шта мантру – «мантру, которая ведет к конечной цели») сначала восемьдесят раз, а затем продолжить эту практику уже без счета. Не приступайте к завтраку до тех пор, пока не закончите утреннюю и́швара пранидха́ну. Не принимайтесь за ужин, пока не завершите свою вечернюю и́швара пранидха́ну.",
            "1в) Все требования и запреты джа́мы и ния́мы должны соблюдаться при любых обстоятельствах.г) Вы не должны допускать, чтобы живые существа умирали голодной смертью. Даже тех, кто является вашими джа́та ша́тру (естественный враг), нельзя морить голодом или увечить. ",
            "1д) Если позволяет состояние здоровья, обязательно посещайте еженедельную дхармача́кру. Если работа или уход за больным не позволяют вам присутствовать на дхармача́кре в назначенное время, необходимо посетить джа́грити в любое другое время в течение этого же дня и выполнить и́швара пранидха́ну. Если и это невозможно, тогда следует пропустить один прием пищи в выходные дни.",
            "2) Когда вы голодаете с целью очищения разума, следует раздать свою пищу нуждающимся, а воду использовать для полива растений. ",
            "3) Помните о том, что у вас есть обязательства, более того, вы в долгу перед каждым созданием в этой Вселенной. Но по отношению к вам ни у кого нет никаких обязательств, вам никто ничего не должен.",
            "4) Жизнь животных посвящена плотским удовольствиям, жизнь человека предназначена для са́дханы. Однако для того чтобы выполнять са́дхану, необходимо тело, поэтому для поддержания его жизнедеятельности вы должны уделять внимание всем аспектам жизни.",
            "5) Все нуждается в основании. Если в жизни нет прочного фундамента, ее может разрушить любая буря. Бра́хма – это самое надежное основание. ",
            "6) Дха́рма (духовность) является чем-то внутренним. Тот, у кого внутри пустота, маскирует ее, звоня в колокола, стуча в барабаны и поднимая шум.",
            "7) Позиция «я не знаю» – отправная точка любого познания. Только признав свое невежество, можно получить какое-то знание. Эта способность – неотъемлемая черта характера настоящего духовного искателя.",
            "8) Человеческая жизнь быстротечна, поэтому разумно было бы получить все разъяснения, касающиеся са́дханы, как можно скорее. ",
            "9) Только то состояние можно назвать му́кти (освобождение), когда поток сознания не встречает препятствий разума в виде эгоизма, ограниченности или предрассудков.",
            "10) Что бы вы ни говорили и ни делали,<br/>Никогда не забывайте о Нем;<br/>Храня Его имя в сердце,<br/>Работайте и помните, что это для Него,<br/>И вечно деятельные, пребывайте в блаженстве.",
            "11) Любыми делами, большими и малыми, человечество должно быть разбужено. Человечность в наиболее полном смысле этого слова равна божественности. Ее совершенство – брахма́тва (богобытие, единение с Брахмой). Духовный искатель ни на мгновение не должен забывать об этом.",
            "12) Обнаружив в себе недостаток и не найдя способа для ша́сти (наказания с целью исправления), следует очищать разум голоданием.",
            "13) Перед тем как критиковать кого-либо за некоторый изъян, убедитесь, что сами свободны от этого недостатка. ",
            "14) Когда человек утвердился в принципах джа́мы и ния́мы, восемь оков (а́ста па́ша) теряют власть над разумом. Тот, кто свободен от оков, не знает предрассудков.",
            "15) Действия, а не рассуждения, придают человеку значимость. ",
            "16) Не пытайтесь добиться превосходства, принижая других, потому что комплекс неполноценности другого человека даст всходы и в вашем разуме.",
            "17) Побеждайте осуждение похвалой, а тьму – светом.",
            "18) Называть вещи чужими именами – значит лгать и кощунствовать. Поэтому те, кто под именем безначального, бесконечного и не имеющего формы Брахмы поклоняются идолам, сознательно и намеренно богохульствуют. Вы не должны предаваться этой разновидности махапа́пы (великого греха).",
            "19) С помощью таких уроков са́дханы, как праная́ма (контроль жизненной энергии), пратьяха́ра (отвлечение разума от внешних ощущений), дха́рана (концентрация) и дхья́на (медитация), можно обуздать врагов своего разума. Вам следует взять под контроль врагов и оковы разума, нельзя позволять им контролировать вас. Но в разуме людей всегда будут присутствовать враги и оковы, так как это заложено в самой природе всех живых существ. ",
            "20) Клевета и злословие в нашем мире держатся в основном на лжи. Некоторые лгут неосознанно, другие – потому, что были уязвлены их мелкие корыстные интересы, а третьих толкает к обману хи́мса ври́тти (психическая склонность к причинению вреда). Вы должны спокойно указать клеветнику на его ошибку, но, прежде чем сделать это, убедитесь, что в его высказываниях действительно нет ни слова правды. Если же за вами есть пусть даже небольшая вина, лучше промолчите и примите все, что о вас говорят, как должное. В этом случае следует поблагодарить человека, который таким образом указал вам на ошибку, и попросить о наказании.",
            "21) Всегда помните о том, что не следует пытаться в споре доказать что-либо тем, кто критикует вашу и́шту (цель), ада́ршу (идеологию), Высшее указание или Правила поведения. В случае, когда имеет место такая критика, вам следует занять жесткую и бескомпромиссную позицию."];

    var samgits_all = [
        {num: "1",    audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/1%20BANDHU%20HE%20NIYE%20CALO.mp3", russian_name: "БОНДХУ ХЕ"},
        {num: "2",    audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/2%20E%20GA%27N%20A%27MA%27R%20ALOR%20JHARN%27A%27DHA%27RA%27.mp3", russian_name: "Е ГА́Н А́МА́Р"},
        {num: "6",    audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/6%20BANDHU%20A%27MA%27R%2C%20BANDHU%20A%27MA%27R%2C%20January%201st%201983%2C%20Ananda%20Nagar.mp3", russian_name: "BANDHU A'MA'R, BANDHU A'MA'R, January 1st 1983, Ananda Nagar"},
        {num: "10",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/10%20MA%27YA%27%20MUKURE%20KE%20KII%20BHA%27VE%20KII%20KARE.mp3", russian_name: "МА́ЙЯ МУКУРЕ"},
        {num: "12",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/12%20NAYANE%20MAMATA%27%20BHARA%27%202.mp3", russian_name: "НОЙОНЕ МОМОТА́ БХОРА́"},
        {num: "29",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/29%20A%27MA%27Y%20CHOT%27T%27A%20EKAT%27I%20MAN%20DIYECHO.mp3", russian_name: "А́МА́Й ЧХОТ́Т́О ЕКТ́И МОН ДИЙЕЧХО"},
        {num: "50",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/50%20RAKTIM%20KISHALAY%20A%27MI%20RAKTIM%20KISHALAY.mp3", russian_name: "РОКТИМ КИШОЛАЙ"},
        {num: "53",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/53%20OGO%2C%20PRABHU%2C%20TOMA%27KE%20A%27MI%20BHA%27LOBA%27SI.mp3", russian_name: "ОГО ПРОБХУ ТОМА́КЕ А́́МИ"},
        {num: "63",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/63%20DIIPA%27VALII%20SA%27JA%27YECHI%20PRABHU.mp3", russian_name: "ДИ́ПА́БОЛИ́ "},
        {num: "68",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/68%20I%20LOVE%20THIS%20TINY%20GREEN%20ISLAND%202.mp3", russian_name: "I LOVE THIS TINY GREEN ISLAND"},
        {num: "80",   audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/80%20SVAPANE%20ESECHO%20A%27NANDAGHANA%20TUMI.mp3", russian_name: "ШВОПОНЕ ЕШЕЧХО А́НОНДОГХОНО ТУМИ"},
        {num: "152",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/152%20CAMPAKA%20VANE%20MADHURA%20SVAPANE%2C%20May%2024th%201985%2C%20Calcutta.mp3", russian_name: "CAMPAKA VANE MADHURA SVAPANE, May 24th 1985, Calcutta"},
        {num: "154",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/154%20ESO%20ESO%2C%20PRABHU%2C%20ESO%20ESO%2C%20A%27MA%27R%20HRDAYE%2C%20May%2024th%201985%2C%20Calcutta.mp3", russian_name: "ESO ESO, PRABHU, ESO ESO, A'MA'R HRDAYE, May 24th 1985, Calcutta\n"},
        {num: "158",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/158%20TUMI%20SABA%27R%20MANE%20A%27CHO.mp3", russian_name: "ТУМИ ШОБА́Р МОНЕ А́ЧХО"},
        {num: "159",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/159%20PRABHU%20A%27MI%20BHA%27LOBA%27SI.mp3", russian_name: "ПРОБХУ А́МИ БХА́ЛОБА́ШИ"},
        {num: "162",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/162%20KICHU%20KAYE%20JA%27O%20KICHU%20SUNE%20JA%27O.mp3", russian_name: "КИЧХУ КОЙЕ ДЖА́У"},
        {num: "163",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/163%20MAN%20KE%20KONO%20CHOT%27O%20KA%27JEI%2C%20January%201st%201983%2C%20Ananda%20Nagar.mp3", russian_name: "MAN KE KONO CHOT'O KA'JEI, January 1st 1983, Ananda Nagar"},
        {num: "342",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/1-999/342%20SUMUKHER%20PA%27NE%20CALE%20JA%27BO%20A%27MI.mp3", russian_name: "ШУМУКЕР ПА́́НЕ ЧОЛЕ ДЖА́́БО А́́МИ"},
        {num: "647",  audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/647%20TUMI%20JE%20ESECHO%20A%27J%20%28part%29%2C%20May%2027%2C%201984%20morning%2C%20Ranchi.mp3", russian_name: "TUMI JE ESECHO A'J (part), May 27, 1984 morning, Ranchi\n"},
        {num: "1025", audio: "http://xn--prabhta-sagiita-rjb5298j.net/1000-1999/1025%20A%27MA%27R%20JIIVANE%20TUMI%20KE.mp3", russian_name: "А́МА́Р ДЖИВОНЕ ТУМИ КЕ"},
        {num: "1041", audio: "http://xn--prabhta-sagiita-rjb5298j.net/1000-1999/1041%20ANEK%20SHUNIYA%27%20ANEK%20BHA%27VIYA%27.mp3", russian_name: "ОНЕК ШУНИЯ ОНЕК БХА́БИЯ"},
        {num: "1682", audio: "http://xn--prabhta-sagiita-rjb5298j.net/1000-1999/1682%20VASANTERI%20A%27GAMANE%20DHARA%27%20NAVA.mp3", russian_name: "БОШОНТОРИ А́́ГОМОНЕ"},
        {num: "1698", audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/1698%20AJA%27NA%27%20PATHIK%20THA%27MO%20GO%20KS%27AN%27IK%20%28part%29%2C%20December%2031st%201985%2C%20Cacutta.mp3", russian_name: "AJA'NA' PATHIK THA'MO GO KS'AN'IK (part), December 31st 1985, Cacutta"},
        {num: "2526", audio: "http://xn--prabhta-sagiita-rjb5298j.net/2000-2999/2526%20JAYA%2C%20SHUBHA%20VAJRADHARA.mp3", russian_name: "ДЖАЯ ШУБХА ВАДЖРАДХАРА "},
        {num: "2976", audio: "http://xn--prabhta-sagiita-rjb5298j.net/2000-2999/2976%20TOMA%27Y%20A%27MI%20PELU%27M2.mp3", russian_name: "ТОМА́Й А́МИ ПЕЛУМ"},
        {num: "3069", audio: "http://xn--prabhta-sagiita-rjb5298j.net/3000-3999/3069%20JYOTSNA%27%20DILE%20PHU%27L%20PHOT%27A%27LE.mp3", russian_name: "ДЖЁТШНА́ ДИЛЕ"},
        {num: "3522", audio: "http://xn--prabhta-sagiita-rjb5298j.net/live/3522%20TOMA%27RE%20D%27EKECHI%20TOMA%27RE%20CEYECHI%2C%20June%201st%201986%2C%20Calcutta.mp3", russian_name: "TOMA'RE D'EKECHI TOMA'RE CEYECHI, June 1st 1986, Calcutta"},
        {num: "3951", audio: "http://xn--prabhta-sagiita-rjb5298j.net/3000-3999/3951%20TVAM%27%20MAMA%20PRIYAH%20TVAMASI%20AMEYA.mp3", russian_name: "ТВАМ́ МАМА ПРИЯХ"},
        {num: "4455", audio: "http://xn--prabhta-sagiita-rjb5298j.net/4000-5018/4455%20KE%20GO%20KE%20GO%20TUMI%20ACENA%27.mp3", russian_name: "КЕГО КЕГО ТУМИ А́ЧЕНА́"},
        {num: "5008", audio: "http://xn--prabhta-sagiita-rjb5298j.net/4000-5018/5008%20WE%20LOVE%20THAT%20GREAT%20ENTITY.mp3", russian_name: "WE LOVE THAT GREAT ENTITY"},
        {num: "5009", audio: "http://xn--prabhta-sagiita-rjb5298j.net/4000-5018/5009%20THIS%20LIFE%20IS%20FOR%20HIM%2C%20THIS%20MIND%20IS%20FOR%20HIM.mp3", russian_name: "THIS LIFE IS FOR HIM"}
    ];

    var vritis_all = [
        {chakra: 'Муладхара', sound: 'va', sanscrit: 'Dharma', rus: 'психо-духовная жажда'},
        {chakra: 'Муладхара', sound: 'sha', sanscrit: 'Artha', rus: 'психическая жажда'},
        {chakra: 'Муладхара', sound: 'śa', sanscrit: 'Káma', rus: 'жажда объектов материального мира'},
        {chakra: 'Муладхара', sound: 'sa', sanscrit: 'Mokśa', rus: 'духовная жажда'},

        {chakra: 'Свадхиштха́на', sound: 'ba', sanscrit: 'Avajiṋá', rus: 'презрение, принижение других'},
        {chakra: 'Свадхиштха́на', sound: 'bha', sanscrit: 'Múrcchá', rus: 'отупение, отсутствие здравого смысла, ступор'},
        {chakra: 'Свадхиштха́на', sound: 'ma', sanscrit: 'Prashraya', rus: 'потакание своим слабостям/желаниям'},
        {chakra: 'Свадхиштха́на', sound: 'ya', sanscrit: 'Avishvása', rus: 'неуверенность, отсутствие веры'},
        {chakra: 'Свадхиштха́на', sound: 'ra', sanscrit: 'Sarvanásha', rus: 'мысль о неминуемой смерти'},
        {chakra: 'Свадхиштха́на', sound: 'la', sanscrit: 'Kruratá', rus: 'жестокость'},

        {chakra: 'Манипу́ра', sound: 'd́a', sanscrit: 'Lajjá', rus: 'стыд, застенчивость'},
        {chakra: 'Манипу́ра', sound: 'd́ha', sanscrit: 'Pishunatá', rus: 'садизм'},
        {chakra: 'Манипу́ра', sound: 'ńa', sanscrit: 'Iirśá', rus: 'зависть'},
        {chakra: 'Манипу́ра', sound: 'ta', sanscrit: 'Suśupti', rus: 'статичность, сонливость'},
        {chakra: 'Манипу́ра', sound: 'tha', sanscrit: 'Viśáda', rus: 'меланхолия'},
        {chakra: 'Манипу́ра', sound: 'da', sanscrit: 'Kaśáya', rus: 'раздражительность'},
        {chakra: 'Манипу́ра', sound: 'dha', sanscrit: 'Trśńá', rus: 'жажда приобретения'},
        {chakra: 'Манипу́ра', sound: 'na', sanscrit: 'Moha', rus: 'слепая привязанность'},
        {chakra: 'Манипу́ра', sound: 'pa', sanscrit: 'Ghrńá', rus: 'ненависть, отвращение'},
        {chakra: 'Манипу́ра', sound: 'pha', sanscrit: 'Bhaya', rus: 'страх'},

        {chakra: 'Анаха́та', sound: 'ka', sanscrit: 'A’shá', rus: 'надежда'},
        {chakra: 'Анаха́та', sound: 'kha', sanscrit: 'Cintá', rus: 'беспокойство'},
        {chakra: 'Анаха́та', sound: 'ga', sanscrit: 'Ceśt́á', rus: 'усилие'},
        {chakra: 'Анаха́та', sound: 'gha', sanscrit: 'Mamatá', rus: 'собственническая любовь'},
        {chakra: 'Анаха́та', sound: 'uṋa', sanscrit: 'Dambha', rus: 'тщеславие'},
        {chakra: 'Анаха́та', sound: 'ca', sanscrit: 'Viveka', rus: 'разборчивость, совесть'},
        {chakra: 'Анаха́та', sound: 'cha', sanscrit: 'Vikalatá', rus: 'психическое оцепенение вследствие страха'},
        {chakra: 'Анаха́та', sound: 'ja', sanscrit: 'Ahaḿkára', rus: 'эгоизм'},
        {chakra: 'Анаха́та', sound: 'jha', sanscrit: 'Lolatá', rus: 'жадность'},
        {chakra: 'Анаха́та', sound: 'iṋa', sanscrit: 'Kapat́atá', rus: 'лицемерие'},
        {chakra: 'Анаха́та', sound: 't́a', sanscrit: 'Vitarka', rus: 'чрезмерная склонность к спорам'},
        {chakra: 'Анаха́та', sound: 't́ha', sanscrit: 'Anutápa', rus: 'раскаянье'},

        {chakra: 'Вишудха', sound: 'a', sanscrit: 'S’ad́aja', rus: 'крик павлина'},
        {chakra: 'Вишудха', sound: 'á', sanscrit: 'Rśabha', rus: 'крик быка или буйвола'},
        {chakra: 'Вишудха', sound: 'i', sanscrit: 'Gándhára', rus: 'блеяние козы'},
        {chakra: 'Вишудха', sound: 'ii', sanscrit: 'Madhyama', rus: 'мычание оленя'},
        {chakra: 'Вишудха', sound: 'u', sanscrit: 'Paiṋcama', rus: 'крик кукушки'},
        {chakra: 'Вишудха', sound: 'ú', sanscrit: 'Dhaevata', rus: 'крик осла'},
        {chakra: 'Вишудха', sound: 'r', sanscrit: 'Niśáda', rus: 'крик слона'},
        {chakra: 'Вишудха', sound: 'rr', sanscrit: 'Oṋm', rus: 'акустический корень творения, сохранения, растворени'},
        {chakra: 'Вишудха', sound: 'lr', sanscrit: 'hum', rus: 'звук пробуждения кулакундалини'},
        {chakra: 'Вишудха', sound: 'lrr', sanscrit: 'Phat́', rus: 'воплощение теории в практику'},
        {chakra: 'Вишудха', sound: 'e', sanscrit: 'Baośat́', rus: 'благополучие в мирской сфере'},
        {chakra: 'Вишудха', sound: 'ae', sanscrit: 'Vaśat́', rus: 'благополучие в тонкой сфере'},
        {chakra: 'Вишудха', sound: 'o', sanscrit: 'Sváhá', rus: 'выполнение благородных действий'},
        {chakra: 'Вишудха', sound: 'ao', sanscrit: 'Namah', rus: 'вручение себя Высшему'},
        {chakra: 'Вишудха', sound: 'aḿ', sanscrit: 'Viśa', rus: 'отталкивающие проявления'},
        {chakra: 'Вишудха', sound: 'ah', sanscrit: 'Amrta', rus: 'приятные проявления'},

        {chakra: 'Агья', sound: 'kśa', sanscrit: 'Apará ', rus: 'мирское знание'},
        {chakra: 'Агья', sound: 'ha', sanscrit: 'Pará ', rus: 'духовное знание'},
    ];


    var dharma_all = [
        "1. Dhrti (дхрити): терпение перед лицом опасности, бедствий и страдания.",
        "2. Ksámá (кшама): прощение человека, который навредил тебе лично и исправился; воздержание от мести. На индивидуальном уровне человек не может прощать кого-то, кто навредил обществу.",
        "3. Dama (дама): само-контроль; контроль над внутренними врагами.",
        "4. Asteya (астея): не-воровство; не-воровстро физически и психически.",
        "5. Shaoca' (шаоча): содержать физическое и ментальное тело в аккуратности и в чистоте.",
        "6. Indriyanigraha (индрияниграха): полный контроль над сенсорными и моторными органами и нервами.",
        "7. Dhii (дхии): интеллект свободный от низости, загрязнений и всех дегениративных качеств; дхрувасмрити, или постоянное повторение Ишты.  ",
        "8. Vidyá (видья): духовная наука; движение разума к Парама Пуруше.",
        "9. Satyam (сатьям): ментальное движение к Сат (Космический Когнитивный Принцип, который не подвергается изменению); правильное применение мыслей и слов на благо человечества).",
        "10. Akrodha (акродха): свобода от злости. Это дает человеку преимущество над оппонентом."
    ];

    var nocarma_all = [
        "1. Оставь желание результата действия",
        "2. Оставь гордость от действия",
        "3. Отрекись от гордости инструмента",
        "4. Относись ко всему вокруг себя как к Богу"
    ];
    var random_shuffle   = [];
    var answers_count   = 0;
    var answers_correct = 0;
    var answers_uncorrect = [];
    var vritis_random_direct = "";


    var points_all = [
        "1. После мочеиспускания омойте мочеполовые органы водой.",
        "2. Мужчины должны либо подвергаться обрезанию, либо сдвигать крайнюю плоть назад.",
        "3. Не удаляйте волосы в паху и в подмышечных впадинах. ",
        "4. Мужчины должны всегда пользоваться каупи́ной (ланго́том). ",
        "5. Выполняйте вьпа́ка шаучу согласно приведенным инструкциям. ",
        "6. Принимайте ванну и душ согласно предписанной системе. ",
        "7. Употребляйте только саттви́чную [благоприятную для разума] пищу. ",
        "8. Голодайте согласно приведенным инструкциям: <br/> а) На экадаши (для маргов), Пурниму и Амавасью (для лфт, ачарий и неженатых маргов).<br/>б) Без воды.",
        "9. Регулярно выполняйте са́дхану:<br/>а) Используйте Мадхувидью.<br/>б) Все уроки 4 (2) раза в день.<br/>в) Асаны дважды в день.<br/>д) Сарватмака Шаоча (Внутренняя и внешняя).<br/>е) Тапах. Четыре типа джагьи: питри джагья, бхута джагья, нр джагья (шудрочитта сева, вайяшьячитта сева, кшатриячитта сева, випрочитта сева), адхьятма джайна.",
        "10. Сохраняйте бескомпромиссную твердость и веру в святость и́шты (цели).",
        "11. Сохраняйте бескомпромиссную твердость и веру в святость ада́рши (идеологии).",
        "12. Сохраняйте бескомпромиссную твердость и веру в святость Высшего указания.",
        "13. Сохраняйте бескомпромиссную твердость и веру в святость Правил поведения.",
        "14. Всегда помните о данных вами клятвах.",
        "15. Регулярное посещение еженедельной дхармача́кры в местном джа́грити должно быть обязательным.",
        "16. Соблюдайте C.S.D.K. 9 (Правила поведения, семинары, обязанности, ки́ртан)"
    ];

    var djama_niyama_all = [
        {russian_name: "Джама. Ахимса", russian_desc: "Не причинение никому вреда ни мыслью, ни словом, ни действием."},
        {russian_name: "Джама. Сатья", russian_desc: "Все мысли, существующие в разуме, и все используемые словесные выражения должны служить целям благосостояния (физический, ментальный и духовный аспекты)"},
        {russian_name: "Джама. Астейя ", russian_desc: "Не воровать физически, мысленно. Не лишать других того, что им причитается в ни действиях ни в мыслях"},
        {russian_name: "Джама. Брахмачарья", russian_desc: "Оставаться во взаимосвязи с Брахмой, Высшим Сознанием. Для этого необходимо смотреть на всех людей и все внешние объекты, как различные проявления Брахмы.оставаться во взаимосвязи с Брахмой, Высшим Сознанием.  "},
        {russian_name: "Джама. Апариграха", russian_desc: "Воздерживаться от вещей и удовольствий, не являющихся необходимыми для поддержания жизни."},
        {russian_name: "Нияма. Шаоча", russian_desc: "Поддержание чистоты тела и внешнего окружения, а также сохранение внутренней ментальной чистоты. "},
        {russian_name: "Нияма. Сантоша", russian_desc: "Всегда находиться в состоянии ментального покоя и удовлетворения."},
        {russian_name: "Нияма. Тапах", russian_desc: "Жертвовать чем-либо или испытывать лишения, оказывая служение другим"},
        {russian_name: "Нияма. Свадхьяя", russian_desc: "Чтение духовных писаний для приобретения ясного понимания сути изложенного"},
        {russian_name: "Нияма. Ишвара Пранидхана", russian_desc: "Утверждение себя в Космической Идее, принятие Ишвары в качестве единственного идеала и движение с возрастающей скоростью по направлению к этому Высшему Прибежищу, Богу."},
    ];

    var mantras_all = [
        {name: 'Гуру Сакаш',
            src: "mantras/guru_sakash.wav",
            sansckrit: 'Prātaḥ shiraśi shukleábje<br/>dvinetram dvibhujaḿ gurum;<br/>varábhayakrtahastaḿ<br/>smarettaḿ námapúrvakam.<br/><br/>' , russian: 'Рано утром, сидящего в Гуру чакре, в белом лотосе,<br/>С двумя глазами и двумя руками, я представляю Гуру,<br/>Руки держащего в варабхая мудре,<br/>Я вспоминаю Его, произнося Его святое имя.<br/><br/>'},
        {name: 'Dhyana mūlam', sansckrit: 'Dhyana mūlam gurora mūrtiḥ,<br/>Puja’ mūlam guroh padam;<br/>Mantra mūlam gurora vākyam,<br/>Mokṣa mūlam guroh kṛpā.<br/><br/>' , russian: 'Основа (корень) дхьяны (медитации) - это форма Гуру;<br/>основа приношения - стопы Гуру.<br/>Мантра - основа слова Гуру,<br/>основа спасения - милость Гуру.<br/><br/>'},
        {name: 'Shriináthe jánakiináthe', sansckrit: 'Shriináthe jánakiináthe<br/>cábhede paramátmani,<br/>tathápi mam sarvasvam<br/>Ramah kamalalocanah<br/><br/>' , russian: 'Зовут ли Его Вишну или Рама, Господь Сита,<br/>для Высшего Я нет разницы. Но для меня Рама,<br/>чьи глаза подобны свежим лепесткам лотоса, -<br/>это все для меня.<br/><br/>'},
        {name: 'Bhaktir bhagavataḥ Sheva', sansckrit: 'Bhaktir bhagavataḥ Sheva<br/>Bhaktih premasvarupinii;<br/>Bhaktir ánandarúpá ca<br/>Bhaktir bhaktasya jiivanam.<br/><br/>' , russian: 'Преданность - это служение Богу, преданность - это истинная суть любви. Преданность принимает форму блаженства, преданность - это вся жизнь преданного.<br/><br/>'},
        {name: 'Tava tattvama na jánámi', sansckrit: 'Tava tattvama na jánámi<br/>kiidrshośi Maheshvara<br/>Yádrshosi Mahadeva<br/>tádrsháya namo namah.<br/><br/>' , russian: 'О Махешвара, я не понимаю Твоей природы. Какова твоя природа? Она за пределами того, я склоняюсь перед тобой, о Махешвара!<br/><br/>'},
        {name: 'Mukam karoti vácálam,', sansckrit: 'Mukam karoti vácálam,<br/>Panga laḿghayate girim<br/>yat krpa’ Jagata Vande,<br/>Paramānanda mádhavam.<br/><br/>' , russian: 'Милостью бога немой может говорить, а хромой покорить горные вершины. Перед его милостью склоняется вся вселения.<br/><br/>'},
        {name: 'Tvameva mátá ca pitá tvameva,', sansckrit: 'Tvameva mátá ca pitá tvameva,<br/>tvameva bandhushca sakhá tvameva;<br/>tvameva vidyá dravinám tvameva,<br/>tvameva sarvaḿ mamadevadeva.<br/><br/>' , russian: 'Ты моя мать. Ты мой отец. Ты мой брат и мой друг. Ты мое богатство. Ты мое знание. Ты - мое все, Бог богов.<br/><br/>'},
        {name: 'Asado-má sadagamayo', sansckrit: 'Asado-má sadagamayo<br/>tamaso-má jyotir gamayo<br/>mrtyur-má amrtyor gamayo<br/>avi rávi mayaedhi<br/><br/>' , russian: 'О, Боже, веди меня от временного к вечному!<br/>Все формы временные, только Бог неизменный, Сат, Вечная Истина. Поэтому веди меня от асат, временного, к сат, вечному.<br/>О, Боже, веди меня от темноты к свету!<br/>Темнота - это майя или незнание, которое не дает возможность видеть реальность как она есть. Когда Майя исчезает, индивидуальная душа становится Универсальной душой.<br/>О Боже, веди меня от смерти к жизни!<br/>Смерть просто означает изменение. В этой вселенной все меняется и будет меняться. Поэтому, все живые существа и вещи подвержены смерти. Истинная жизнь - это достичь абсолютного, вечного и неизменного, за пределами смертного царства.<br/><br/>'},
        {name: 'Oṋḿ bhúr bhuvah svah', sansckrit: 'Oṋḿ bhúr bhuvah svah<br/>oṋḿ tat saviturvareńyaḿ;<br/>bhargo devasya dhiimahi<br/>dhiyo yo nah pracodayát, oṋḿ<br/><br/>' , russian: 'Meaning Baba explained:<br/>We meditate on Dhii Mahii (He) Why meditate on Him? For He can guide our intellect in the path of righteousness. This universe is Saptalokátmaka, has seven layers: Bhuh, bhuvah, svah, mahah, janah, tapah and satya. Its creator is given the name "Savita". Savita means "Progenitor". Some people mistakenly give the name of Savita their daughters. The name of a child should not be Savita. Savita means father (male). We meditate on the venerable divine effulgence of the Creator of the seven lokas. Why we meditate on Him? So He can lead our intellect (buddhi, medha) by the appropriate path. Dhii means intellect, nah mean our, pracodayat \'means guiding the proper way. There should be only one sentence from humans, that his intellect is guided to the right path. If the intellect reform, everything has been achieved. If the intellect goes astray, nothing yet achieved if we got it all. "<br/>Shree Shree Anandamurti - Patna August 24, 1978<br/><br/>'},
        {name: 'Nityánandaḿ paramasukhadaḿ', sansckrit: 'Nityánandaḿ paramasukhadaḿ, Kevalam jiṋánamúrtim;<br/>vishvátiitaḿ gaganasadrshaḿ, tatvamasyádilakśyaḿ.<br/>Ekam nityam Vimalam acalaḿ, sarvadhisákśiibhútam;<br/>bhávátiitaḿ triguńarahitaḿ, sadguruḿ Tam nama’mi -<br/><br/>' , russian: 'You are the eternal bliss, the Giver of infinite happiness, the only Personified Knowledge. You are beyond the universe, like the sky. You do understand me, "You are That". You are One, Eternal, the purest of the pure, unchangeable. You are the witness of all beings. You are beyond the realm of existence, devoid of the three gunas (creative principles). A Ti, Sadaguru, I offer my greetings<br/><br/>'},
        {name: 'Нитьям шудхам',
            src: "mantras/nityam_shudham.wav",
            sansckrit: 'Nityam shuddhaḿ nirábhásaḿ,<br/>nirákáraḿ nirainjanam;<br/>nityabodhaḿ cidánandaḿ,<br/>gurur Brahama namámyaham.<br/><br/>' , russian: 'вечный чистый непостижимый<br/>бесформенный незапятнанный<br/>всезнающий полный блаженства<br/>гуру – Брахма я приветствую<br/><br/>'},
        {
            name: 'Гуру Пуджа',
            src: "mantras/guru_pudja.wav",
            sansckrit: 'Akhańd́a mańd́alákáraḿ vyáptaḿ yena carácaraḿ,<br/>tadpadaḿ darshitaḿ yena tasmae shrii gurave namah.<br/>Ajiṋánatimirándhasya jiṋánáiṋjana shalákaya,<br/>cakśurunmilitaḿ yena tasmae shrii gurave namah.<br/>Gurur brahmá, gurur viśńu, gurur devo maheshvara,<br/>gurureva parama brahma, tasmae shrii gurave namah.<br/>—Tava dravyaḿ jagatguro, tubhyameva samarpaye—.<br/>' ,
            russian: 'Я приветствую того высшего гуру, который пронизывает всю эту движущуюся и неподвижную сферическую вселенную.<br/>Я приветствую того высшего гуру, который рассеивает тьму и открывает глаза знания бальзамом духовности.<br/>Гуру – творец, Гуру – хранитель,<br/>Гуру – разрушитель. Гуру есть поистине высший Брахма.<br/>Я приветствую этого высшего Гуру<br/>О, Гуру Вселенной, все то, что Ты мне дал,<br/>я отдаю обратно Тебе<br/>'},
        {name: 'Sarvétra sukhinah bhavantu', sansckrit: 'Sarvétra sukhinah bhavantu<br/>sarve santu nirámayáh;<br/>sarve bhadráńi pashyantu<br/>na kashcid duhkhamápnuyát.<br/>ONM Shantih, ONM Shantih, ONM shantih.<br/><br/>' , russian: 'Пусть все будут счастливы. Пусть все будут свободны от физических и ментальных болезней. Пусть все смотрят на положительные стороны вещей. Пускай никому не приходится страдать от проблем, под давлением обстоятельств. Мир, мир, мир.<br/><br/>'},
        {name: 'Мантра после ванны',
            src: "mantras/pitri.wav",
            sansckrit: 'Pitr puruśebhyo namah,<br/>RSI devebhyo namah<br/>Brahmarpanam brahmáhavir,<br/>brahmágnao brahmanánhutam<br/>brahmaeva tena gantavyam,<br/>brahmakarma samādhinā.<br/><br/>' , russian: 'Я приветствую предков<br/>и Божественных Риши (мудрецов, изобретателей).<br/>Процесс приношения - это Брахма, приношение - это Брахма, <br/>огонь жертвования - Брахма, тот кто предлагает приношение - это Брахма,<br/>тот кому предлагают - Брахма.<br/>Выполнив обязанности данные Брахмой, человек сольется с ним.<br/><br/>'},
        {name: 'Onm madhu vata rtayate', sansckrit: 'Onm madhu vata rtayate madhu ksarantu sindhavah,<br/>madhviirnah santvosadhiih madhu naktamutasaso,<br/>madhumat prathivam rajah, madhu dyaorastu nah pita,<br/>madhumanno banaspatir, madhuman asta suryah,<br/>madhviirgavo bhavantu nah;<br/>oṋḿ madhu, oṋḿ madhu, oṋḿ madhu.<br/><br/>' , russian: 'Пусть дыханье ветра будет благословенно, а океан приносит удачу!<br/>Пусть благословенны будут наши посевы,<br/>а дни и ночи полны сладостного аромата!<br/>Пусть будут благословенны частицы пыли,<br/>пусть наши всходы будут урожайными!<br/>Пусть духовное царство божественных сущностей<br/>и почтенных предков будет к нам благосклонно!<br/>Пусть будут благословенны наши домашние животные, и солнце льет удачу!<br/>Брахма мадху, Брахма мадху, Брахма мадху.<br/><br/>'},
        {name: 'Saḿgacchadhvaḿ',
            src: "mantras/samga.wav",
            sansckrit: 'Saḿgacchadhvaḿ saḿvadadhvaḿ<br/>saḿ vo manáḿsi jánatám,<br/>devábhágaḿ yathápúrve<br/>saḿjánáná upásate.<br/>Samánii va ákútih<br/>samáná hrdayánivah,<br/>samánamastu vo mano<br/>yathá vah susahásati.<br/>' , russian: 'Давайте двигаться вместе, давайте петь вместе, <br/>вместе познаем самих себя.<br/>Давайте наслаждаться этой Вселенной<br/>подобно святым прошлого.<br/>Объединим наши усилия,<br/>пусть наши сердца будут едины.<br/>Когда наши разумы сольются воедино,<br/>мы познаем Единого.<br/>'},
        {name: 'Satyameva jayate, nánrtam', sansckrit: 'Satyameva jayate, nánrtam<br/><br/>' , russian: 'Только истина восторжествует, а не ложь.<br/><br/>'},
        {name: 'Parampita Baba kii ... Jaya!', sansckrit: 'Parampita Baba kii ... Jaya!<br/><br/>' , russian: 'Победа высшему отцу!<br/><br/>'},
    ];

    var sutras_all = [
        {sansckrit: "1-1. Shivashaktyátmakaḿ Brahma.", russian: "Бра́хма – это единство Ши́вы и Ша́кти"},
        {sansckrit: "1-2. Shaktih Sá Shivasya Shaktih.",
            russian: "[Шакти (действующее начало) – это шакти (cила) Шивы.]"},
        {   sansckrit: "1-3. Tayoh siddhih saiṋcare pratisaiṋcare ca.",
            russian:   "[Выражение обоих (Шивы и Шакти) происходит в санча́ре и пратисанча́ре.]"},
        {   sansckrit: "1-4. Paramashivah Puruśottamah vishvasya kendram.",
            russian:   "[Высшее Сознание, которое находится в Ядре Вселенной называется Пурушо́ттама или Парамашива.]"},
        {   sansckrit: "1-5. Pravrttimukhii saiṋcarah guńadháráyám.",
            russian:   "[Санча́ра (в Космическом Цикле) – это процесс  постепенного экстровертного движения под возрастающим сковывающим влиянием гун.] "},
        {   sansckrit: "1-6. Nivrttimukhii pratisaiṋcarah guńávakśayeńa.",
            russian:   "[Пратисанча́ра (в Космическом Цикле) – это постепенное интровертное движение под уменьшающимся влиянием гун.] "},
        {   sansckrit: "1-7. Drk Puruśah darshanaḿ Shaktishca.",
            russian:   "[Пуру́ша является свидетелем, а Пракри́ти – действием свидетельствования ( и тем что свидетельствуется).] "},
        {   sansckrit: "1-8. Guńabandhanena guńábhivyaktih.",
            russian:   "[По мере того как усиливается сковывающее влияние гун, они полностью проявляют себя через возникновение фундаментальных факторов.]"},
        {   sansckrit: "1-9. Guńádhikye jad́asphot́ah bhútasámyábhávát.",
            russian:   "[В результате чрезмерного давления гун утрачивается должный баланс между пятью фундаментальными факторами (бхута), и происходит взрыв твердого фактора (джадаспотах).] "},
        {   sansckrit: "1-10. Guńaprabhávena bhútasaungharśádbalam.",
            russian:   "[Под влиянием гун пять фундаментальных факторов приходят в столкновение, и возникает ба́ла, или энергия.]"},
        {   sansckrit: "1-11. Dehakendrikáńi parińámabhútáńi baláni práńáh.",
            russian:   "[Результирующая внутренненаправленная сила, формирующая ядро в физической структуре и сохраняющая ее целостность, называется пра́нах, или жизненная энергия.]"},
        {   sansckrit: "1-12. Tiivrasaungharśeńa cúrńiibhútáni jad́áni cittáńu mánasadhátuh vá.",
            russian:   "[Интенсивные столкновения становятся причиной измельчения некоторой части грубого фактора и возникновения частиц эктоплазмы, или вещества разума.]"},
        {   sansckrit: "1-13. Vyaśt́idehe cittáńusamaváyena cittabodhah.",
            russian:   "[Благодаря объединению частиц эктоплазмы в индивидуальной структуре возникает чувство чи́тты, или объективности.]"},
        {   sansckrit: "1-14. Cittát guńávakśaye rajoguńaprábalye aham.",
            russian:   "[В результате уменьшения воздействия сковывающих начал и преобладания динамичной силы из чи́тты возникает аха́м, или эго.]"},
        {   sansckrit: "1-15. Súkśmábhimukhinii gatirudaye ahaḿtattvánmahat.",
            russian:   "[В процессе дальнейшего утончения из ахамта́ттвы развивается маха́т.]"},
        {   sansckrit: "1-16. Cittádahaḿprábalye buddhih.",
            russian:   "[Когда аха́м начинает преобладать над чи́ттой, развивается интеллект.]"},
        {   sansckrit: "1-17. Ahaḿtattvát mahadprábalye bodhih.",
            russian:   "[Когда маха́т начинает доминировать над аха́мом, развивается интуиция.]"},
        {   sansckrit: "1-18. Mahadahaḿvarjite anagrasare jiivadehe latágulme kevalaḿ cittam.",
            russian:   "[В некоторых неразвитых живых существах (например, деревьях и пресмыкающихся) может быть выражена только чи́тта, а маха́т и аха́м оставаться не проявленными.]"},
        {   sansckrit: "1-19. Mahadvarjite anagrasare jiivadehe latágulme cittayuktáham.",
            russian:   "[В некоторых неразвитых живых существах (например, деревьях и пресмыкающихся) могут быть выражены аха́м и чи́тта, а маха́т оставаться не проявленным.]"},
        {   sansckrit: "1-20. Prágrasare jiive latágulme mánuśe mahadahaḿcittáni.",
            russian:   "[В сравнительно развитых живых существах (например, деревьях и пресмыкающихся), как и в человеке, проявлены маха́т, аха́м и чи́тта.]"},
        {   sansckrit: "1-21. Bhúmávyápte Mahati ahaḿ cittayorprańáshe saguńásthitih savikalpasamádhih vá.",
            russian:   "[Когда в процессе расширения единичного сознания аха́м и чи́тта преобразуются в космический Маха́т, это слияние называется савика́льпа самáдхи – состояние условного растворения, растворения в обусловленном состоянии.]"},
        {   sansckrit: "1-22. Átmani mahadprańáshe nirguńásthitih nirvikalpasamádhih vá.",
            russian:   "[Когда маха́т преобразуется в А́тман, он выходит из-под сковывающего влияния гун и погружается в состояние, называемое нирвика́льпа сама́дхи, состояние безусловной погруженности, полное растворение разума]\n"},
        {   sansckrit: "1-23. Tasyasthitih amánasikeśu.",
            russian:   "[Это состояние (нирвика́льпа сама́дхи) вне воспринимающей способности разума.]"},
        {   sansckrit: "1-24. Abhávottaránandapratyayálambaniirvrttih tasya pramáńam.",
            russian:   "[Блаженство, следующее за пустотой, является доказательством этого состояния, причиной твердой веры в существование этого состояния.]"},
        {   sansckrit: "1-25. Bhávah bhávátiitayoh setuh Tárakabrahma.",
            russian:   "[Мост между Ниргу́на и Сагу́на Бра́хмой называется Та́рака Бра́хма, или освобождающий Бра́хма.]"}
    ];


    var shils_all = [
        {russian: "1. Прощение. "},
        {russian: "2. Великодушие. "},
        {russian: "3. Постоянная сдержанность в эмоциях и поведении. "},
        {russian: "4. Готовность пожертвовать всем в жизни ради идеологии. "},
        {russian: "5. Самоконтроль во всем. "},
        {russian: "6. Доброжелательность и улыбчивость. "},
        {russian: "7. Нравственная твердость. "},
        {russian: "8. Подайте пример собственным поведением, прежде чем спрашивать с других. "},
        {russian: "9. Воздерживайтесь от критики, осуждения, клеветы и оскорблений, а также избегайте всех форм группизма . "},
        {russian: "10. Строгое соблюдение принципов джа́мы и ния́мы. "},
        {russian: "11. Если ошибка совершена по небрежности или неосознанно, следует немедленно признать ее и просить о наказании. "},
        {russian: "12. Даже общаясь с враждебно настроенным человеком, не будьте надменными и не поддавайтесь ненависти и гневу. "},
        {russian: "13. Воздержание от пустой болтовни. "},
        {russian: "14. Подчинение кодексу дисциплины организационной структуры. "},
        {russian: "15. Чувство ответственности."}
    ];

    var socials_all = [
        {russian: "1.	Вы должны благодарить того, кто оказывает вам служение (говоря «спасибо» или «благодарю»)."},
        {russian: "2.	Вы должны немедленно отвечать на чей-либо Намаскар тем же."},
        {russian: "3.	Следует принимать или предлагать что-либо со следующей мудрой: вытяните правую руку, касаясь левой рукой правого локтя."},
        {russian: "4.	Следует встать, если к вам подходит почтенный/пожилой человек."},
        {russian: "5.	Когда зеваете, прикройте рот и одновременно с этим щелкните пальцами."},
        {russian: "6.	Во время разговора всегда уважительно отзывайтесь об отсутствующих."},
        {russian: "7.	Чихая, прикройте рот носовым платком или рукой."},
        {russian: "8.	Почистив нос, вымойте руки. Если при раздаче пищи вы зевнули или чихнули, немедленно помойте руки."},
        {russian: "9.	После дефекации и последующего использования воды вымойте руки с мылом, намылив мылом вначале правую руку, а затем правой рукой – левую."},
        {russian: "10.	Перед тем как подойти к людям занятых разговором, спросите их разрешение."},
        {russian: "11.	Вы не должны вести конфиденциальных разговоров (касающихся организации) в поезде, автобусе или любом другом общественном транспорте."},
        {russian: "12.	Не берите без разрешения чужие вещи."},
        {russian: "13.	Не пользуйтесь ничем, что принадлежит другому."},
        {russian: "14.	Разговаривая, не используйте резких и колких слов. Выразите то, что хотите сказать косвенно."},
        {russian: "15.	Не позволяйте себе критиковать чужие ошибки и недостатки."},
        {russian: "16.	Собираясь встретиться с официальным лицом, договоритесь заранее: пошлите визитную карточку или получите устное согласие."},
        {russian: "17.	Следует воздерживаться от чтения чужих личных писем."},
        {russian: "18.	Во время беседы следите за тем, чтобы другие тоже имели возможность высказать свою точку зрения."},
        {russian: "19.	Слушая кого-либо, время от времени голосом подтверждайте, что слушаете внимательно."},
        {russian: "20.	Говоря с человеком, не отводите глаз и не отворачивайте лицо в сторону."},
        {russian: "21.	Не сидите в позе «Заминдари»  и не пританцовывайте по-дурацки ногами."},
        {russian: "22.	Если тот, с кем вы собираетесь поговорить, в это время пишет, не смотрите в написанную им или ей бумагу"},
        {russian: "23.	Никогда не берите пальцы в рот, и не откусывайте ногти зубами."},
        {russian: "24.	Если во время разговора вы чего-то не поняли, скромно скажите: «Извините меня, пожалуйста»."},
        {russian: "25.	Когда кто-либо справляется о вашем здоровье и ваших делах, следует сердечно поблагодарить его или ее."},
        {russian: "26.	Здоровайтесь «Доброе утро», «Добрый вечер» или «Доброй ночи» согласно времени суток."},
        {russian: "27.	Вы не должны посещать чужой дом или звонить кому-либо после 9 часов вечера."},
        {russian: "28.	Если вы должны сообщить человеку что-то неприятное, вначале скажите «извините меня», и уже затем начинайте говорить."},
        {russian: "29.	Перед приемом пищи вымойте руки и ноги."},
        {russian: "30.	Если вы хотите меда, ешьте его с жидкостью (вода, чай и пр.)."},
        {russian: "31.	Не говорите, стоя перед человеком, принимающим пищу."},
        {russian: "32.	Не чихайте и не кашляйте, находясь за обеденным столом."},
        {russian: "33.	Не предлагайте другому человеку тарелку с пищей левой рукой."},
        {russian: "34.	Не мойтесь и не пейте воду в положении стоя."},
        {russian: "35.	Мочеиспускание и дефекация не должны производиться стоя."},
        {russian: "36.	Когда активна ваша левая ноздря (ида нади), следует принимать жидкую пищу, а когда активна правая (пиунгала), то твердую."},
        {russian: "37.	Когда работает преимущественно ида нади, следует использовать это время для садханы."},
        {russian: "38.	Предлагая стакан с водой, следует держаться только за его нижнюю часть."},
        {russian: "39.	Когда вы готовите кому-либо питье, вначале вымойте стакан, а затем наполните его водой. "},
        {russian: "40.	Если во время принятия пищи вы сильно вспотели, вытрите пот носовым платком."}
    ];

    var enemies_all = [
        {russian: "Враг 1. Влечение к удовольствию, получаемому от объектов материального мира (káma - кама)"},
        {russian: "Враг 2. Гнев (krodha - кродха)"},
        {russian: "Враг 3. Жадность (lobha - лобха)"},
        {russian: "Враг 4. Слепая привязанность (moha - моха)"},
        {russian: "Враг 5. Гордыня, честолюбие (mada - мада)"},
        {russian: "Враг 6. Зависть (mátsarya - матсарья)"},
        {russian: "Окова 1. GHRNA’ - гхрина (ненависть)"},
        {russian: "Окова 2. SHAUNKA’ - шанка (сомнение)"},
        {russian: "Окова 3. BHAYA - бхая (страх)"},
        {russian: "Окова 4. LAJJA’ - ладжжа (стеснительность)"},
        {russian: "Окова 5. JUGUPSA’ - джугупса (лицемерие)"},
        {russian: "Окова 6. KULA’ - кула (гордость происхождением)"},
        {russian: "Окова 7. SHIILA - шила (комплекс культурного превосходства)"},
        {russian: "Окова 8. MA’NA - мана (самовлюбленность)"}
    ];

    function ifLogin()  {
        checkOS();

        if (typeof cookie_token !== 'undefined' && cookie_token !== 'undefined') {
            start();
        } else {
            $('#page_load').hide();
            $("#page_login").show();
        }
    }
    ifLogin();
    function login_user(phone, pass){
        var token_web = $.base64.encode(phone + ":" + pass);

        $.ajax({
            type: "GET",
            url: api_url + "token",
            headers: {
                'Authorization': 'Basic ' + token_web,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                // console.log("try get token");
                //  console.log(JSON.stringify(data));
                if (data.token.length == 32) {
                    //console.log("success get token");
                    setCookie(cookie_name_token, data.token, {expires: 36000000000000});
                    setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                    cookie_token = getCookie(cookie_name_token);
                    ifLogin();}
                else {
                    //   console.log("fail get token");
                }},
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }});
    }
    $.ajaxSetup({
        error: function (data, textStatus, jqXHR) {
            console.log(data);

            if (data.status == 401) {
                console.log("Error 401");
                $('#page_login').show();
                $("#page_user_main") .hide();
                $('#page_admin_main').hide();
                //  console.log(data.responseText.includes("Incorrect credentials"));

                if (data.responseText.includes("Incorrect credentials")) {
                    alert("Неправильные данные");
                }
                if (data.responseText.includes("Bad Token")) {
                    cookie_token = getCookie(cookie_name_token);
                }
            }

            if (data.status == 500) {
                console.log("Error 500 ");
            }
        }
    });
    if (!navigator.cookieEnabled) {
        alert('Включите cookie для комфортной работы');
    }

    $('#btn_login').click(function () {
        var token_web = $.base64.encode($('#login_login').val() + ":" + $('#login_password').val());
        //  console.log(token_web);
        try {
            $.ajax({
                type: "GET",
                url: api_url + "token",
                headers: {
                    'Authorization': 'Basic ' + token_web,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    // console.log("try get token");
                    console.log(JSON.stringify(data));

                    if (data.token.length == 32) {
                        //console.log("success get token");
                        setCookie(cookie_name_token, data.token, {expires: 36000000000000});
                        setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                        cookie_token = getCookie(cookie_name_token);
                        ifLogin();
                    } else {
                        //   console.log("fail get token");
                    }
                },
                failure: function (errMsg) {
                    //    console.log(errMsg.toString());
                }
            });
        }
        catch (err) {
            //  console.log(err);
        }

    });

    $('#btn_register_self').click(function () {
        var token_web = $.base64.encode($('#margii_reg_email').val() + ":" + $('#margii_reg_pass').val());
        //  console.log(token_web);


        if ($('#margii_reg_name').val() == "" || $('#margii_reg_email').val() == "" || $('#margii_reg_pass').val() == "" ) {
            alert("Заполните все поля");
            return;
        }
        try {
            $.ajax({
                type: "POST",
                url: api_url + "margii_create",
                data: {
                    name:  $('#margii_reg_name').val(),
                    email: $('#margii_reg_email').val(),
                    password:  $('#margii_reg_pass').val(),
                },
                headers: {
                    'Authorization': 'Basic ' + token_web,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    // console.log("try get token");
                    console.log(JSON.stringify(data));
                    if (data.error === 0) {
                        setCookie(cookie_name_token, data.user.auth_token, {expires: 36000000000000});
                        setCookie(cookie_name_id,    data.user.id,         {expires: 36000000000000});
                        cookie_token = getCookie(cookie_name_token);
                        ifLogin();
                    } else {
                        alert("Не создано. Такой пользователь уже существует");
                    }
                },
                failure: function (errMsg) {
                    //    console.log(errMsg.toString());
                }
            });
        }
        catch (err) {
            //  console.log(err);
        }

    });


    function start(){
        $.ajax({
            type: "GET",
            url: api_url + "margii_base_info",
            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                // console.log("try get token");
                console.log(JSON.stringify(data));
                $('#modal_register_self').modal('hide');


                if (data.margii){
                    $('#page_load').hide();
                    $('#page_login').hide();
                    $('#page_main').show();
                    setHistory(data.margiis_days);

                } else {
                    alert("Это только для маргов");
                }
            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });


    }

    //start();


    $(document).on('click', '.main_nav',  function () {
        switch ($(this).val()) {
            case "link":
                var win = window.open('https://docs.google.com/document/d/1lnHcnZJi7RT6ny5GVo67HNkq0e4sUdVFFrm-v-atA5s/edit?usp=sharing', '_blank');
                win.focus();
                break;
            case "duties":
                $('#first_screen').hide();
                $('#page_duties').show();
                break;
            case "50vriti":
                $('#first_screen').hide();
                $('#page_50vriti').show();
                break;
            case "16points":

                $('#first_screen').hide();
                $('#page_16points').show();
                break;
            case "15shils":

                $('#first_screen').hide();
                $('#page_15shils').show();
                break;
            case "40socials":

                $('#first_screen').hide();
                $('#page_40socials').show();
                break;
            case "10nrav":
                $('#first_screen').hide();

                var row = "";
                $.each(djama_niyama_all, function (i, item) {

                    row += '<div class=" diary_body" data-10nrav-num="' + i + '">';

                    row += "<b>" +  item.russian_name + "</b><br/>";
                    row += item.russian_desc ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#10nrav_table').empty().append(row);
                $('#page_10nrav').show();

                break;
            case "dharma":
                $('#first_screen').hide();

                var row = "";
                $.each(dharma_all, function (i, item) {

                    row += '<div class=" diary_body" data-dharma-num="' + i + '">';
                    row += item ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#dharma_table').empty().append(row);
                $('#page_dharma').show();

                break;
            case "nocarma":
                $('#first_screen').hide();

                var row = "";
                $.each(nocarma_all, function (i, item) {

                    row += '<div class=" diary_body" data-dharma-num="' + i + '">';
                    row += item ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#nocarma_table').empty().append(row);
                $('#page_nocarma').show();

                break;
            case "cc2_sadhana":
                $('#first_screen').hide();

                var row = "";
                $.each(cc2_sadhana_all, function (i, item) {

                    row += '<div class=" diary_body">';
                    row += item ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#cc2_sadhana_table').empty().append(row);
                $('#page_cc2_sadhana').show();

                break;
            case "diary":
                $('#first_screen').hide();
                $('#page_diary').show();


                break;

            case "mantras":
                $('#first_screen').hide();


                var row = "";
                $.each(mantras_all, function (i, item) {
                    if (i === 0 || i === 10 || i === 11 || i === 13 || i === 15  ){
                        row += '<div class="mantra_row diary_body" style="background-color: rgba(232,111,8,0.5)" data-mantra-num="' + i + '">';

                    } else {
                        row += '<div class="mantra_row diary_body" data-mantra-num="' + i + '">';

                    }

                    row += item.name ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#mantras_table').empty().append(row);
                $('#page_mantras').show();

                break;

            case "samgits":
                $('#first_screen').hide();


                var row = "";
                $.each(samgits_all, function (i, item) {
                    if ([6, 152, 154, 163, 647, 1698, 3522].includes(parseInt(item.num))  ){
                        row += '<div class="samgit_row diary_body" style="background-color: rgba(232,111,8,0.5)" data-samgit-num="' + i + '">';
                    } else {
                        row += '<div class="samgit_row diary_body" data-samgit-num="' + i + '">';
                    }
                    row += item.num + ". " + item.russian_name;
                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#samgits_table').empty().append(row);
                $('#page_samgits').show();

                break;
            case "donation":
                $('#modal_donation').modal('show');
                break;
            case "supreme":
                $('#first_screen').hide();
                $('#page_supreme').show();
                break;

            case "ananda_sutras":
                $('#first_screen').hide();

                var row = "";
                $.each(sutras_all, function (i, item) {
                    row += '<div class="sutra_row diary_body" data-sutra-num="' + i + '">';
                    row += "<b>" + item.sansckrit + "</b><br/>" ;
                    row += '<img class="img-responsive" src="img/sutras/' + i + '.png"/>' ;

                    row += item.russian ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#sutras_table').empty().append(row);
                $('#page_ananda_sutras').show();
                break;
            case "enemies":
                $('#first_screen').hide();

                var row = "";
                $.each(enemies_all, function (i, item) {
                    row += '<div class="diary_body">';
                    row += item.russian;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#enemies_table').empty().append(row);
                $('#page_enemies').show();
                break;
        }
    });


    $(document).on('click', '.nav_50vriti',  function () {
        $('#page_50vriti_options').hide();
        $('#nav_50vriti_order_next').hide();
        $('#nav_50vriti_random_next').hide();



        switch ($(this).val()) {
            case "order":
                var vritis_answers_count_text = answers_count + 1;
                $('#page_50vriti_test_order').show();
                $('#50vriti_question_order').text("Помните врити №" + vritis_answers_count_text + "?");

                break;
            case "random":
                $('#page_50vriti_test_random').show();
                random_shuffle = shuffle(Array.from({length: vritis_all.length}, (v, k) => k));
                vritis_random_direct = $(this).attr("data-direct");
                setVritiRandomQuestion();
                break;
            case "learn":

                var vritis = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(vritis_all, function (i, item) {
                    switch (item.chakra) {
                        case vritis_all[0].chakra:
                            vritis += '<tr style="background-color: rgba(255,74,72, 0.5)">';
                            break;
                        case vritis_all[4].chakra:
                            vritis += '<tr style="background-color: rgba(255,136,26,0.5)">';
                            break;
                        case vritis_all[10].chakra:
                            vritis += '<tr style="background-color: rgba(255,226,66,0.5)">';
                            break;
                        case vritis_all[22].chakra:
                            vritis += '<tr style="background-color: rgba(119,255,72,0.5)">';
                            break;
                        case vritis_all[47].chakra:
                            vritis += '<tr style="background-color: rgba(74,219,255,0.8)">';
                            break;
                        case vritis_all[49].chakra:
                            vritis += '<tr style="background-color: rgba(80,90,255,0.8)">';
                            break;
                    }

                    vritis += '<td class="vriti_pronounce" data-vriti-num="' + i + '">' + item.sanscrit    + '</td>';
                    vritis += '<td>' + item.rus    + '</td>';
                    vritis += '<td>' + item.sound    + '</td>';
                    vritis += '</tr>';
                });
                vritis += '</tbody></table>';
                $('#50vriti_all').empty().append(vritis);
                $('#page_50vriti_learn').show();


                break;
        }
    });
    $(document).on('click', '.vriti_pronounce',  function () {

        var vriti_url = "https://byhtada.github.io/am_training/audio/vritis/" + $(this).attr("data-vriti-num") + ".mp3";
        playBackground(vriti_url)
       // audio.pla;

    });
    function playBackground(url){
        $('#background_pronounce').attr("src", url);
        var audio = document.getElementById("background_pronounce_main");
        audio.load();
    }

    $(document).on('click', '.nav_50vriti_test_order',  function () {
        $('#50vriti_answer_order').hide().empty();
        $('#nav_50vriti_order_next').hide();
        $('#nav_50vriti_order_no')  .show();
        $('#nav_50vriti_order_yes') .show();


        switch ($(this).val()) {
            case "next":
                var vritis_answers_count_text = answers_count + 1;
                $('#50vriti_question_order').text("Помните врити №" + vritis_answers_count_text + "?");

                if (answers_count  === vritis_all.length ){
                    showVritiResults();
                }
                break;
            case "yes":
                var current_vriti = vritis_all[answers_count];

                var sanscrit = '<div class="vriti_pronounce" data-vriti-num="' + answers_count + '">' + current_vriti.sanscrit + '</div>';

                $('#50vriti_answer_order').show().empty().append(sanscrit).append(current_vriti.sound + " - " + current_vriti.rus + "<br/>" + current_vriti.chakra);
                var vriti_url = "https://byhtada.github.io/am_training/audio/vritis/" + answers_count + ".mp3";
                playBackground(vriti_url);
                answers_correct += 1;
                answers_count += 1;

                $('#nav_50vriti_order_next').show();
                $('#nav_50vriti_order_no')  .hide();
                $('#nav_50vriti_order_yes') .hide();

                break;
            case "no":
                var current_vriti = vritis_all[answers_count];
                var sanscrit = '<div class="vriti_pronounce" data-vriti-num="' + answers_count + '">' + current_vriti.sanscrit + '</div>';

                $('#50vriti_answer_order').show().empty().append(sanscrit).append(current_vriti.sound + " - " + current_vriti.rus + "<br/>" + current_vriti.chakra);
                var vriti_url = "https://byhtada.github.io/am_training/audio/vritis/" + answers_count + ".mp3";
                playBackground(vriti_url);

                answers_uncorrect.push(answers_count);
                answers_count += 1;

                $('#nav_50vriti_order_next').show();
                $('#nav_50vriti_order_no')  .hide();
                $('#nav_50vriti_order_yes') .hide();

                break;
        }
    });
    $(document).on('click', '.nav_50vriti_test_random',  function () {
        $('#50vriti_answer_random').hide().empty();
        $('#nav_50vriti_random_next').hide();
        $('#nav_50vriti_random_no')  .show();
        $('#nav_50vriti_random_yes') .show();


        switch ($(this).val()) {
            case "next":
                if (answers_count  === vritis_all.length ){
                    showVritiResults();
                }

                setVritiRandomQuestion();


                break;
            case "yes":
                answers_count += 1;
                answers_correct += 1;
                if (answers_count  === vritis_all.length ){
                    showVritiResults();
                    return;
                }
                setVritiRandomQuestion();


                break;
            case "no":
                var current_vriti = vritis_all[random_shuffle[answers_count]];

                answers_count += 1;

                var answer = "";
                if (vritis_random_direct === "sans_rus") {
                    answer = current_vriti.sound + " - " + current_vriti.rus + "<br/>" + current_vriti.chakra;
                } else {
                    answer = current_vriti.sanscrit + " - " + current_vriti.sound + "<br/>" + current_vriti.chakra;
                }

                $('#50vriti_answer_random').show().empty().append(answer);
                $('#nav_50vriti_random_next').show();
                $('#nav_50vriti_random_no')  .hide();
                $('#nav_50vriti_random_yes') .hide();

                break;
        }
    });
    function setVritiRandomQuestion(){
        console.log("random_shuffle", random_shuffle);
        console.log("answers_count", answers_count);
        console.log("random_shuffle[answers_count]", random_shuffle[answers_count]);
        console.log("vritis_all[random_shuffle[answers_count]]", vritis_all[random_shuffle[answers_count]]);

        var question = "";
        if (vritis_random_direct === "sans_rus"){
            question = "Помнишь перевод врити: " + vritis_all[random_shuffle[answers_count]].sanscrit;
        } else {
            question = "Помнишь перевод врити: " + vritis_all[random_shuffle[answers_count]].rus;
        }

        $('#50vriti_question_random').empty().show().text(question);
    }
    function showVritiResults(){
        $('#page_50vriti_test_order') .hide();
        $('#page_50vriti_test_random').hide();
        $('#page_50vriti_learn').hide();



        $('#page_50vriti_results')    .show();
        $('#50vriti_results')    .text("Результат " + answers_correct + "/" + answers_count);

        if (answers_uncorrect.length > 0){

            var vritis = '<table class="table table-hover table-bordered table-condensed" >';
            $.each(answers_uncorrect, function (i, itm) {
                var item = vritis_all[itm];

                switch (item.chakra) {
                    case vritis_all[0].chakra:
                        vritis += '<tr style="background-color: rgba(255,74,72, 0.5)">';
                        break;
                    case vritis_all[4].chakra:
                        vritis += '<tr style="background-color: rgba(255,136,26,0.5)">';
                        break;
                    case vritis_all[10].chakra:
                        vritis += '<tr style="background-color: rgba(255,226,66,0.5)">';
                        break;
                    case vritis_all[22].chakra:
                        vritis += '<tr style="background-color: rgba(119,255,72,0.5)">';
                        break;
                    case vritis_all[47].chakra:
                        vritis += '<tr style="background-color: rgba(74,219,255,0.8)">';
                        break;
                    case vritis_all[49].chakra:
                        vritis += '<tr style="background-color: rgba(80,90,255,0.8)">';
                        break;
                }

                vritis += '<td class="vriti_pronounce" data-vriti-num="' + itm + '">' + item.sanscrit    + '</td>';
                vritis += '<td>' + item.rus    + '</td>';
                vritis += '<td>' + item.sound    + '</td>';
                vritis += '</tr>';
            });
            vritis += '</tbody></table>';
            $('#div_vritis_uncorrect').show();
            $('#table_vritis_uncorrect').empty().append(vritis);
        }


        answers_count   = 0;
        answers_correct = 0;

    }



    $(document).on('click', '.nav_16points',  function () {
        $('#page_16points_options').hide();
        $('#nav_16points_order_next').hide();
        $('#nav_16points_random_next').hide();



        switch ($(this).val()) {
            case "order":
                var answers_count_text = answers_count + 1;
                $('#page_16points_test_order').show();
                $('#16points_question_order').text("Помнишь пункт №" + answers_count_text + "?");

                break;
            case "random":
                $('#page_16points_test_random').show();
                random_shuffle = shuffle(Array.from({length: points_all.length}, (v, k) => k));
                setPointsRandomQuestion();
                break;
            case "learn":

                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(points_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item    + '</td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#16points_all').empty().append(row);
                $('#page_16points_learn').show();


                break;
        }
    });
    $(document).on('click', '.nav_16points_test_order',  function () {
        $('#16points_answer_order').hide().empty();
        $('#nav_16points_order_next').hide();
        $('#nav_16points_order_no')  .show();
        $('#nav_16points_order_yes') .show();


        switch ($(this).val()) {
            case "next":
                var answers_count_text = answers_count + 1;
                $('#16points_question_order').text("Помнишь пункт №" + answers_count_text + "?");

                if (answers_count  === points_all.length ){
                    showPointsResults();
                }
                break;
            case "yes":
                var current_point = points_all[answers_count];
                $('#16points_answer_order').show().empty().append(current_point);
                $('#nav_16points_order_next').show();
                $('#nav_16points_order_no')  .hide();
                $('#nav_16points_order_yes') .hide();

                answers_correct += 1;
                answers_count += 1;
                break;
            case "no":
                var current_point = points_all[answers_count];
                answers_uncorrect.push(answers_count);

                answers_count += 1;
                $('#16points_answer_order').show().empty().append(current_point);
                $('#nav_16points_order_next').show();
                $('#nav_16points_order_no')  .hide();
                $('#nav_16points_order_yes') .hide();

                break;
        }
    });
    $(document).on('click', '.nav_16points_test_random',  function () {
        $('#16points_answer_random').hide().empty();
        $('#nav_16points_random_next').hide();
        $('#nav_16points_random_no')  .show();
        $('#nav_16points_random_yes') .show();


        switch ($(this).val()) {
            case "next":
                if (answers_count  === points_all.length ){
                    showPointsResults();
                }

                setPointsRandomQuestion();


                break;
            case "yes":
                var current = points_all[random_shuffle[answers_count]];
                var answer = current;

                $('#16points_answer_random').show().empty().append(answer);
                $('#nav_16points_random_next').show();
                $('#nav_16points_random_no')  .hide();
                $('#nav_16points_random_yes') .hide();

                answers_count += 1;
                answers_correct += 1;
                break;
            case "no":
                var current = points_all[random_shuffle[answers_count]];
                answers_uncorrect.push(random_shuffle[answers_count]);

                answers_count += 1;

                var answer = current;


                $('#16points_answer_random').show().empty().append(answer);
                $('#nav_16points_random_next').show();
                $('#nav_16points_random_no')  .hide();
                $('#nav_16points_random_yes') .hide();

                break;
        }
    });
    function setPointsRandomQuestion(){
        var point_num = random_shuffle[answers_count] + 1;
        var question = "Помнишь пункт № " + point_num + "?";

        $('#16points_question_random').empty().show().text(question);
    }
    function showPointsResults(){
        $('#page_16points_test_order') .hide();
        $('#page_16points_test_random').hide();
        $('#page_16points_learn').hide();

        $('#page_16points_results')    .show();
        $('#16points_results')    .text("Результат " + answers_correct + "/" + answers_count);

        if (answers_uncorrect.length > 0){
            var row = '<table class="table table-hover table-bordered table-condensed" >';
            $.each(answers_uncorrect, function (i, item) {
                row += '<tr>';

                row += '<td>' + points_all[item]    + '</td>';
                row += '</tr>';
            });
            row += '</tbody></table>';
            $('#div_16points_uncorrect').show();
            $('#table_16points_uncorrect').empty().append(row);
        }

        answers_count   = 0;
        answers_correct = 0;

    }




    $(document).on('click', '.nav_15shils',  function () {
        $('#page_15shils_options').hide();
        $('#nav_15shils_order_next').hide();
        $('#nav_15shils_random_next').hide();



        switch ($(this).val()) {
            case "order":
                var answers_count_text = answers_count + 1;
                $('#page_15shils_test_order').show();
                $('#15shils_question_order').text("Помнишь шилу №" + answers_count_text + "?");

                break;
            case "random":
                $('#page_15shils_test_random').show();
                random_shuffle = shuffle(Array.from({length: shils_all.length}, (v, k) => k));
                setShilsRandomQuestion();
                break;
            case "learn":

                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(shils_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item.russian    + '</td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#15shils_all').empty().append(row);
                $('#page_15shils_learn').show();


                break;
        }
    });
    $(document).on('click', '.nav_15shils_test_order',  function () {
        $('#15shils_answer_order').hide().empty();
        $('#nav_15shils_order_next').hide();
        $('#nav_15shils_order_no')  .show();
        $('#nav_15shils_order_yes') .show();


        switch ($(this).val()) {
            case "next":
                var answers_count_text = answers_count + 1;
                $('#15shils_question_order').text("Помнишь шилу №" + answers_count_text + "?");

                if (answers_count  === shils_all.length ){
                    showShilsResults();
                }
                break;
            case "yes":
                var current_shila = shils_all[answers_count];
                answers_correct += 1;
                answers_count += 1;
                $('#15shils_answer_order').show().empty().append(current_shila.russian);
                $('#nav_15shils_order_next').show();
                $('#nav_15shils_order_no')  .hide();
                $('#nav_15shils_order_yes') .hide();

                break;
            case "no":
                var current_shila = shils_all[answers_count];
                answers_uncorrect.push(answers_count);

                answers_count += 1;
                $('#15shils_answer_order').show().empty().append(current_shila.russian);
                $('#nav_15shils_order_next').show();
                $('#nav_15shils_order_no')  .hide();
                $('#nav_15shils_order_yes') .hide();

                break;
        }
    });
    $(document).on('click', '.nav_15shils_test_random',  function () {
        $('#15shils_answer_random').hide().empty();
        $('#nav_15shils_random_next').hide();
        $('#nav_15shils_random_no')  .show();
        $('#nav_15shils_random_yes') .show();


        switch ($(this).val()) {
            case "next":
                if (answers_count  === shils_all.length ){
                    showShilsResults();
                }
                setShilsRandomQuestion();
                break;
            case "yes":

                var current = shils_all[random_shuffle[answers_count]];

                answers_count += 1;
                answers_correct += 1;

                var answer = current.russian;

                $('#15shils_answer_random').show().empty().append(answer);
                $('#nav_15shils_random_next').show();
                $('#nav_15shils_random_no')  .hide();
                $('#nav_15shils_random_yes') .hide();


                break;
            case "no":
                var current = shils_all[random_shuffle[answers_count]];
                answers_uncorrect.push(random_shuffle[answers_count]);

                answers_count += 1;

                var answer = current.russian;

                $('#15shils_answer_random')  .show().empty().append(answer);
                $('#nav_15shils_random_next').show();
                $('#nav_15shils_random_no')  .hide();
                $('#nav_15shils_random_yes') .hide();

                break;
        }
    });
    function setShilsRandomQuestion(){
        var point_num = random_shuffle[answers_count] + 1;
        var question = "Помнишь шилу № " + point_num + "?";

        $('#15shils_question_random').empty().show().text(question);
    }
    function showShilsResults(){
        $('#page_15shils_test_order') .hide();
        $('#page_15shils_test_random').hide();
        $('#page_15shils_learn').hide();

        $('#page_15shils_results')    .show();
        $('#15shils_results')    .text("Результат " + answers_correct + "/" + answers_count);

        if (answers_uncorrect.length > 0){
            var row = '<table class="table table-hover table-bordered table-condensed" >';
            $.each(answers_uncorrect, function (i, item) {
                row += '<tr>';

                row += '<td>' + shils_all[item].russian    + '</td>';
                row += '</tr>';
            });
            row += '</tbody></table>';
            $('#div_15shils_uncorrect').show();
            $('#table_15shils_uncorrect').empty().append(row);
        }



        answers_count   = 0;
        answers_correct = 0;
    }




    $(document).on('click', '.nav_40socials',  function () {
        $('#page_40socials_options').hide();
        $('#nav_40socials_order_next').hide();
        $('#nav_40socials_random_next').hide();

        switch ($(this).val()) {
            case "order":
                var answers_count_text = answers_count + 1;
                $('#page_40socials_test_order').show();
                $('#40socials_question_order').text("Помнишь норму №" + answers_count_text + "?");

                break;
            case "random":
                $('#page_40socials_test_random').show();
                random_shuffle = shuffle(Array.from({length: socials_all.length}, (v, k) => k));
                setSocialsRandomQuestion();
                break;
            case "learn":

                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(socials_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item.russian    + '</td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#40socials_all').empty().append(row);
                $('#page_40socials_learn').show();

                break;
        }
    });
    $(document).on('click', '.nav_40socials_test_order',  function () {
        $('#40socials_answer_order').hide().empty();
        $('#nav_40socials_order_next').hide();
        $('#nav_40socials_order_no')  .show();
        $('#nav_40socials_order_yes') .show();


        switch ($(this).val()) {
            case "next":
                var answers_count_text = answers_count + 1;
                $('#40socials_question_order').text("Помнишь норму №" + answers_count_text + "?");

                if (answers_count  === socials_all.length ){
                    showSocialsResults();
                }
                break;
            case "yes":

                var current_social = socials_all[answers_count];
                answers_correct += 1;
                answers_count += 1;
                $('#40socials_answer_order').show().empty().append(current_social.russian);
                $('#nav_40socials_order_next').show();
                $('#nav_40socials_order_no')  .hide();
                $('#nav_40socials_order_yes') .hide();


                break;
            case "no":
                var current_social = socials_all[answers_count];

                answers_uncorrect.push(answers_count);
                answers_count += 1;
                $('#40socials_answer_order').show().empty().append(current_social.russian);
                $('#nav_40socials_order_next').show();
                $('#nav_40socials_order_no')  .hide();
                $('#nav_40socials_order_yes') .hide();

                break;
        }
    });
    $(document).on('click', '.nav_40socials_test_random',  function () {
        $('#40socials_answer_random').hide().empty();
        $('#nav_40socials_random_next').hide();
        $('#nav_40socials_random_no')  .show();
        $('#nav_40socials_random_yes') .show();


        switch ($(this).val()) {
            case "next":
                if (answers_count  === socials_all.length ){
                    showSocialsResults();
                }
                setSocialsRandomQuestion();
                break;
            case "yes":
                answers_count += 1;
                answers_correct += 1;
                if (answers_count  === socials_all.length ){
                    showSocialsResults();
                    return;
                }
                setSocialsRandomQuestion();

                break;
            case "no":
                var current = socials_all[random_shuffle[answers_count]];

                answers_count += 1;

                var answer = current.russian;


                $('#40socials_answer_random').show().empty().append(answer);
                $('#nav_40socials_random_next').show();
                $('#nav_40socials_random_no')  .hide();
                $('#nav_40socials_random_yes') .hide();

                break;
        }
    });
    function setSocialsRandomQuestion(){
        var point_num = random_shuffle[answers_count] + 1;
        var question = "Помнишь норму № " + point_num + "?";

        $('#40socials_question_random').empty().show().text(question);
    }
    function showSocialsResults(){
        $('#page_40socials_test_order') .hide();
        $('#page_40socials_test_random').hide();
        $('#page_40socials_learn').hide();

        $('#page_40socials_results')    .show();
        $('#40socials_results')    .text("Результат " + answers_correct + "/" + answers_count);

        if (answers_uncorrect.length > 0){
            var row = '<table class="table table-hover table-bordered table-condensed" >';
            $.each(answers_uncorrect, function (i, item) {
                row += '<tr>';

                row += '<td>' + socials_all[item].russian    + '</td>';
                row += '</tr>';
            });
            row += '</tbody></table>';
            $('#div_40socials_uncorrect').show();
            $('#table_40socials_uncorrect').empty().append(row);
        }



        answers_count   = 0;
        answers_correct = 0;
    }





    var day_practises  = 0;
    var day_16points  = 0;
    var day_10nrav    = 0;
    var day_15shils   = 0;
    var day_40socials = 0;
    var diary_total   = 0;

    $(document).on('click', '.nav_diary',  function () {
        window.scrollTo(0, 0);
        switch ($(this).val()) {
            case "to_16points":
                var row = '<table class="table table-hover table-bordered table-condensed" >';

                $.each(points_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item    + '</td>';
                    row += '<td><div class="pretty p-default p-curve p-thick p-smooth p-bigger">';
                    row += '<input type="checkbox" checked class="diary_points" />';
                    row += '<div class="state p-success-o"><label></label></div>';
                    row += '</div></td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#diary_16points_value').empty().append(row);

                $('#div_diary_practises')   .hide();

                $('#div_diary_16points') .show();

                break;
            case "to_10nrav":
                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(djama_niyama_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item.russian_name    + '</td>';
                    row += '<td><div class="pretty p-default p-curve p-thick p-smooth p-bigger">';
                    row += '<input type="checkbox" checked class="diary_10nravs" />';
                    row += '<div class="state p-success-o"><label></label></div>';
                    row += '</div></td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#diary_10nrav_value').empty().append(row);

                $('#div_diary_16points') .hide();
                $('#div_diary_10nrav')   .show();

                break;
            case "to_15shils":
                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(shils_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item.russian    + '</td>';
                    row += '<td><div class="pretty p-default p-curve p-thick p-smooth p-bigger">';
                    row += '<input type="checkbox" checked class="diary_15shils" />';
                    row += '<div class="state p-success-o"><label></label></div>';
                    row += '</div></td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#diary_15shils_value').empty().append(row);

                $('#div_diary_10nrav')   .hide();
                $('#div_diary_15shils')  .show();
                break;
            case "to_40socials":
                var row = '<table class="table table-hover table-bordered table-condensed" >';
                $.each(socials_all, function (i, item) {
                    row += '<tr>';
                    row += '<td>' + item.russian    + '</td>';
                    row += '<td><div class="pretty p-default p-curve p-thick p-smooth p-bigger">';
                    row += '<input type="checkbox" checked class="diary_40socials" />';
                    row += '<div class="state p-success-o"><label></label></div>';
                    row += '</div></td>';
                    row += '</tr>';
                });
                row += '</tbody></table>';
                $('#diary_40socials_value').empty().append(row);


                $('#div_diary_15shils')  .hide();
                $('#div_diary_40socials').show();
                break;
            case "to_result":
                var practises_total = 0;
                $( ".diary_practises" ).each( function( index, element ){
                    if ( $( element ).is(":checked") ){
                        practises_total += 1;
                    }
                });
                day_practises  = parseInt(100 * practises_total / 11);

                $('#practises_percent').text(day_practises + "%");
                $('#practises_comment').text($('#diary_practises_comment').val());


                var points_total = 0;
                $( ".diary_points" ).each( function( index, element ){
                    if ( $( element ).is(":checked") ){
                        points_total += 1;
                    }
                });
                day_16points  = parseInt(100 * points_total / 16);

                $('#16points_percent').text(day_16points + "%");
                $('#16points_comment').text($('#diary_16points_comment').val());



                var nravs_total = 0;
                $( ".diary_10nravs" ).each( function( index, element ){
                    if ( $( element ).is(":checked") ){
                        nravs_total += 1;
                    }
                });
                day_10nrav    = parseInt(100 * nravs_total / 10);
                $('#10nravs_percent').text(day_10nrav + "%");
                $('#10nravs_comment').text($('#diary_10nrav_comment').val());


                var shils_total = 0;
                $( ".diary_15shils" ).each( function( index, element ){
                    if ( $( element ).is(":checked") ){
                        shils_total += 1;
                    }
                });
                day_15shils   = parseInt(100 * shils_total / 15);
                $('#15shils_percent').text(day_15shils + "%");
                $('#15shils_comment').text($('#diary_15shils_comment').val());



                var socials_total = 0;
                $( ".diary_40socials" ).each( function( index, element ){
                    if ( $( element ).is(":checked") ){
                        socials_total += 1;
                    }
                });
                day_40socials = parseInt(100 * socials_total / 40);
                $('#40socials_percent').text(day_40socials + "%");
                $('#40socials_comment').text($('#diary_40socials_comment').val());


                diary_total = parseInt((day_practises + day_16points + day_10nrav + day_15shils + day_40socials) / 5);
                $('#diary_total').text("Итог дня: " + diary_total + "%");


                $('#div_diary_40socials').hide();
                $('#div_diary_results')  .show();
                break;
            case "save":
                $.ajax({
                    type: "POST",
                    url: api_url + "margii_save_day",
                    data: {
                        diary_date:            new Date(),
                        day_practises_percent:  day_practises,
                        day_16points_percent:  day_16points,
                        day_10nrav_percent:    day_10nrav,
                        day_15shils_percent:   day_15shils,
                        day_40socials_percent: day_40socials,
                        diary_total_percent:   diary_total,
                        diary_practises_comment:   $('#diary_practises_comment').val(),
                        diary_total_comment:   $('#diary_results_comment').val(),
                        day_16points_comment:  $('#diary_16points_comment').val(),
                        day_10nrav_comment:    $('#diary_10nrav_comment').val(),
                        day_15shils_comment:   $('#diary_15shils_comment').val(),
                        day_40socials_comment: $('#diary_40socials_comment').val()
                    },
                    headers: {
                        'Authorization': 'Token token=' + cookie_token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    success: function (data) {
                        alert("Сохранили");
                        setHistory(data.margiis_days);
                        $('#pratic') .click();

                    },
                    failure: function (errMsg) {
                        //    console.log(errMsg.toString());
                    }
                });
                break;



        }
    });

    $('#btn_create_history').click(function (){
        $('#div_diary_history').hide();
        $('#div_diary_practises').show();

    });


    function setHistory(history){
        var row = "";
        $.each(history, function (i, item) {
            row += '<div class="diary_body">';
            row += '<p class="margii_diary_header">' + item.diary_date_string + " - Общий итог " + item.diary_total_percent + "%" + '</p>';
            row += '<div class="row">';
            row += '<div class="col-xs-6">';
            row += '<p>' + "Практики   "   + item.day_practises_percent + "%" +  '</p>';
            row += '<p>' + "16 пунктов " + item.day_16points_percent + "%" +  '</p>';
            row += '</div>';
            row += '<div class="col-xs-6">';
            row += '<p>' + "Джама/Нияма " + item.day_10nrav_percent + "%" +  '</p>';
            row += '<p>' + "15 шил      " + item.day_15shils_percent + "%" +  '</p>';
            row += '</div>';
            row += '</div>';
            row += '<p>' + "40 Cоциальных норм поведения " + item.day_40socials_percent + "%" +  '</p>';
            row += '</div>';
        });
        $('#diary_history_table').empty().append(row);

    }










    $(document).on('click', '.mantra_row',  function () {
        var mantra = mantras_all[$(this).attr("data-mantra-num")];
        $('#mantras_table').hide();
        $('#mantra_name')    .empty().append(mantra.name);
        $('#mantra_sanskrit').empty().append(mantra.sansckrit);
        $('#mantra_russian') .empty().append(mantra.russian);

        var mantra_url = "https://byhtada.github.io/am_training/audio/mantras/m" + $(this).attr("data-mantra-num") +".mp3";
        $('#mantra_pronounce').attr("src", mantra_url);
        var audio = document.getElementById("mantra_pronounce_main");
        audio.load();
        $('#mantra_value').show();

    });

    $(document).on('click', '.sutra_row',  function () {


        var vriti_url = "https://byhtada.github.io/am_training/audio/sutras/" + $(this).attr("data-sutra-num") + ".mp3";
        $('#background_pronounce').attr("src", vriti_url);
        var audio = document.getElementById("background_pronounce_main");
        audio.load();
    });

    $('#mantras_back').click(function (){
        $('#mantras_table').show();
        $('#mantra_value').hide();

        var audio = document.getElementById("mantra_pronounce_main");
        audio.pause();
    });





    $(document).on('click', '.samgit_row',  function () {
        var samgit = samgits_all[$(this).attr("data-samgit-num")];
        $('#samgits_table').hide();
        $('#samgit_name')    .empty().append(samgit.russian_name);


        var samgit_url = samgit.audio;
        $('#samgit_pronounce').attr("src", samgit_url);
        var audio = document.getElementById("samgit_pronounce_main");
        audio.load();

        var samgit_text_src = "img/samgits/" + samgit.num + ".png";
        $('#samgit_text').attr("src", samgit_text_src);
        $('#samgit_value').show();

    });

    $('#samgits_back').click(function (){
        $('#samgits_table').show();
        $('#samgit_value').hide();

        var audio = document.getElementById("samgit_pronounce_main");
        audio.pause();
    });





    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    $(document).on('click', '.nav_to_main',  function () {
        $('#page_50vriti_test_order') .hide();
        $('#page_50vriti_test_random').hide();
        $('#page_50vriti_learn').hide();
        $('#page_50vriti_results').hide();
        $('#page_50vriti').hide();
        $('#page_50vriti_options').show();
        var answers_uncorrect = [];
        $('#div_vritis_uncorrect').hide();

        $('#page_16points_test_order') .hide();
        $('#page_16points_test_random').hide();
        $('#page_16points_learn').hide();
        $('#page_16points_results').hide();
        $('#page_16points').hide();
        $('#page_16points_options').show();

        $('#page_15shils_test_order') .hide();
        $('#page_15shils_test_random').hide();
        $('#page_15shils_learn').hide();
        $('#page_15shils_results').hide();
        $('#page_15shils').hide();
        $('#page_15shils_options').show();

        $('#page_40socials_test_order') .hide();
        $('#page_40socials_test_random').hide();
        $('#page_40socials_learn').hide();
        $('#page_40socials_results').hide();
        $('#page_40socials').hide();
        $('#page_40socials_options').show();

        $('#page_10nrav').hide();

        $('#page_diary').hide();
        $('#div_diary_history')  .show();
        $('#div_diary_16points') .hide();
        $('#div_diary_10nrav')   .hide();
        $('#div_diary_15shils')  .hide();
        $('#div_diary_40socials').hide();
        $('#div_diary_results')  .hide();
        $( ".diary_practises" ).prop("checked", true);
        $( ".diary_points" )   .prop("checked", true);
        $( ".diary_10nravs" )  .prop("checked", true);
        $( ".diary_15shils" )  .prop("checked", true);
        $( ".diary_40socials" ).prop("checked", true);
        $('#diary_practises_comment').val("");
        $('#diary_16points_comment') .val("");
        $('#diary_10nrav_comment')   .val("");
        $('#diary_15shils_comment')  .val("");
        $('#diary_40socials_comment').val("");
        $('#diary_results_comment')  .val("");

        $('#page_mantras').hide();
        $('#mantras_table').show();
        $('#mantra_value').hide();
        var audio = document.getElementById("mantra_pronounce_main");
        audio.pause();

        $('#page_samgits').hide();
        $('#samgits_table').show();
        $('#samgit_value').hide();
        var audio = document.getElementById("samgit_pronounce_main");
        audio.pause();


        $('#page_supreme').hide();
        $('#page_ananda_sutras').hide();
        $('#page_enemies').hide();
        $('#page_duties').hide();
        $('#page_nocarma').hide();
        $('#page_cc2_sadhana').hide();


        $('#first_screen').show();
    });



    function checkOS() {
        var userAgent = window.navigator.userAgent,
            platform = window.navigator.platform,
            macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
            windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
            iosPlatforms = ['iPhone', 'iPad', 'iPod'],
            os = null;

        if (macosPlatforms.indexOf(platform) !== -1) {
            os = 'Mac OS';
            alert('На технике Apple пока работает не весь функционал');
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            os = 'iOS';
            alert('На технике Apple пока работает не весь функционал');
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            os = 'Android';
        } else if (!os && /Linux/.test(platform)) {
            os = 'Linux';
        }

        return os;
    }

    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    window.addEventListener("hashchange", function(e) {
        if(e.oldURL.length > e.newURL.length)
            $('#pratic').click();
    });
});
