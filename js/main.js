$( document ).ready(function() {




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

    var random_shuffle   = [];
    var answers_count   = 0;
    var answers_correct = 0;
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
        {russian: "1.	Вы должны благодарить того, кто оказывает вам служение (говоря «спасибо»)."},
        {russian: "2.	Вы должны немедленно отвечать на чей-либо Намаскар тем же."},
        {russian: "3.	Следует принимать или предлагать что-либо со следующей мудрой: вытяните правую руку, касаясь левой рукой правого локтя."},
        {russian: "4.	Следует встать, если к вам подходит почтенный пожилой человек."},
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
        {russian: "30.	Если вы хотите меда, ешьте его с водой."},
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




    function start(){
        $('#page_load').hide();
        $('#page_main').show();

        //var audio = document.getElementById('');
       // $('mantra_pronounce').attr('src', 'audio/mantras/samga.wav');


        //mantra_pronounce
        //document.body.appendChild(x);
    }

    start();


    $(document).on('click', '.main_nav',  function () {
        switch ($(this).val()) {
            case "link":
                var win = window.open('https://docs.google.com/document/d/1lnHcnZJi7RT6ny5GVo67HNkq0e4sUdVFFrm-v-atA5s/edit?usp=sharing', '_blank');
                win.focus();
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
                    row += item.sansckrit + "<br/><br/>" ;
                    row += item.russian ;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#sutras_table').empty().append(row);
                $('#page_ananda_sutras').show();
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
        $('#background_pronounce').attr("src", vriti_url);
        var audio = document.getElementById("background_pronounce_main");
        audio.load();
       // audio.pla;



    });
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
                answers_count += 1;
                answers_correct += 1;
                var vritis_answers_count_text = answers_count + 1;
                $('#50vriti_question_order').text("Помните врити №" + vritis_answers_count_text + "?");

                if (answers_count  === vritis_all.length ){
                    showVritiResults();
                }
                break;
            case "no":
                var current_vriti = vritis_all[answers_count];
                var sanscrit = '<div class="vriti_pronounce" data-vriti-num="' + answers_count + '">' + current_vriti.sanscrit + '</div>';

                $('#50vriti_answer_order').show().empty().append(sanscrit).append(current_vriti.sound + " - " + current_vriti.rus + "<br/>" + current_vriti.chakra);

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
                answers_count += 1;
                answers_correct += 1;
                var answers_count_text = answers_count + 1;
                $('#16points_question_order').text("Помните пункт №" + answers_count_text + "?");

                if (answers_count  === points_all.length ){
                    showPointsResults();
                }
                break;
            case "no":
                var current_point = points_all[answers_count];

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
                answers_count += 1;
                answers_correct += 1;
                if (answers_count  === points_all.length ){
                    showPointsResults();
                    return;
                }
                setPointsRandomQuestion();

                break;
            case "no":
                var current = points_all[random_shuffle[answers_count]];

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
                answers_count += 1;
                answers_correct += 1;
                var answers_count_text = answers_count + 1;
                $('#15shils_question_order').text("Помнишь шилу №" + answers_count_text + "?");

                if (answers_count  === shils_all.length ){
                    showShilsResults();
                }
                break;
            case "no":
                var current_shila = shils_all[answers_count];

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
                answers_count += 1;
                answers_correct += 1;
                if (answers_count  === shils_all.length ){
                    showShilsResults();
                    return;
                }
                setShilsRandomQuestion();

                break;
            case "no":
                var current = shils_all[random_shuffle[answers_count]];

                answers_count += 1;

                var answer = current.russian;


                $('#15shils_answer_random').show().empty().append(answer);
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
                answers_count += 1;
                answers_correct += 1;
                var answers_count_text = answers_count + 1;
                $('#40socials_question_order').text("Помнишь норму №" + answers_count_text + "?");

                if (answers_count  === socials_all.length ){
                    showSocialsResults();
                }
                break;
            case "no":
                var current_social = socials_all[answers_count];

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

        answers_count   = 0;
        answers_correct = 0;
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


        $('#page_mantras').hide();
        $('#mantras_table').show();
        $('#mantra_value').hide();
        var audio = document.getElementById("mantra_pronounce_main");
        audio.pause();


        $('#page_supreme').hide();
        $('#page_ananda_sutras').hide();


        $('#first_screen').show();
    });

});
