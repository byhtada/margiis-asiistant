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

                break;
            case "10nrav":

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
        $('#vriti_pronounce').attr("src", vriti_url);
        var audio = document.getElementById("vriti_pronounce_main");
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

        $('#page_mantras').hide();
        $('#mantras_table').show();
        $('#mantra_value').hide();
        var audio = document.getElementById("mantra_pronounce_main");
        audio.pause();


        $('#page_supreme').hide();


        $('#first_screen').show();
    });

});
