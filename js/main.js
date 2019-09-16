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



    function start(){
        $('#page_load').hide();
        $('#page_main').show();

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

                break;
            case "donation":
                $('#modal_donation').modal('show');
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
                    vritis += '<tr>';
                    vritis += '<td>' + item.chakra    + '</td>';
                    vritis += '<td>' + item.sanscrit    + '</td>';
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

                answers_count += 1;
                $('#50vriti_answer_order').show().empty().append(current_vriti.sanscrit + " - " + current_vriti.sound + " - " + current_vriti.rus + "<br/>" + current_vriti.chakra);
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


        $('#first_screen').show();
    });

});
