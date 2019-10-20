$( document ).ready(function() {

    var api_url = "http://localhost:3000/";
  //  var api_url = "https://hyls-api.ru/";
    var user_status = "";
    var training_plus = ["margii_training", "secretary_training", "acarya"];


    var cookie_name_token = "ma_token";
    var cookie_name_id    = "ma_id";
    var cookie_token = getCookie(cookie_name_token);


    ifLogin();
    function ifLogin()     {
        // checkOS();
        console.log("ifLogin");


        if (typeof cookie_token !== 'undefined' && cookie_token !== 'undefined') {
            start();
        } else {
            getWords("login");
            $('#page_load').hide();
            $("#page_login").show();

        }
    }
    function getWords(kind){
        var userLang = navigator.language || navigator.userLanguage;
        var lang = userLang.split("-");
        console.log("lang " + lang);

        $.ajax({
            type: "GET",
            url: api_url + "get_words",
            data: {kind: kind,
            lang: lang[0]
            },
            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                $('#text_login_login').text(data.words.login);
                $('#text_login_pass') .text(data.words.password);
                $('#btn_login')       .text(data.words.log_in);
                $('.login_text_1')    .text(data.words.login_text_1);
                $('.login_text_2')    .text(data.words.login_text_2);
            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
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
                    console.log("try get token");
                    console.log(JSON.stringify(data));

                    if (data.token.length == 32) {
                        //console.log("success get token");
                        setCookie(cookie_name_token, data.token,   3600);
                        setCookie(cookie_name_id,    data.user_id, 3600);
                        cookie_token = getCookie(cookie_name_token);
                        ifLogin();
                    } else {
                        console.log("Проверьте логин и пароль");
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
        console.log("start");

        $.ajax({
            type: "GET",
            url: api_url + "get_start_info",
            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                hour_tail: -1 * (new Date().getTimezoneOffset() / 60)
            },
            success: function (data) {
                // console.log("try get token");
                //console.log(JSON.stringify(data));
                $('#page_load').hide();
                $('#page_login').hide();
                $('#page_main').show();
                setWords(data.words);
                setFasting(data.fasting);


                if (data.in_flow){
                    $('#btn_flow_about').hide();
                    $('#flow_about')    .hide();
                    $('#flow_info')     .show();
                    $('.text_flow_detail').show().empty().append(data.words.text_flow_detail + data.flow_size + '<button value="chat" type="button" class="main_nav btn btn-default btn-xs"> <span class="glyphicon glyphicon-comment" aria-hidden="true"></span></button>\n');

                    svadhyaya_day   = data.svadhyayas.day;
                    svadhyaya_night = data.svadhyayas.night;

                    var link = "https://margiis-assistant.am/audio/prabhat_samgiits/" + data.flow.samgiit_num + "/";


                    $('#audio_panchadjanya_samgiit').attr("src", link + "samgiit.mp3");
                    $('#text_samgiit').attr("src", link + "text_" + data.margii.lang + ".png");
                    $('#audio_panchadjanya_kiirtan').attr("src", link + "kiirtan.mp3");
                    $('#audio_ak_small').attr("src", link + "ak_small.mp3");
                    $('#audio_ak_big')  .attr("src", link + "ak_big.mp3");

                    $('.learn_base_ru').text(data.flow.learn_base_ru);
                    $('.learn_pro_ru') .text(data.flow.learn_pro_ru);


                    if (data.flow_next !== 0) {
                        link = "https://margiis-assistant.am/audio/prabhat_samgiits/" + data.flow_next.samgiit_num + "/";
                        $('#div_panchadjanya_next').show();
                        $('#audio_panchadjanya_samgiit_next').attr("src", link + "samgiit.mp3");
                        $('#text_samgiit_next').attr("src", link + "text_" + data.margii.lang + ".png");
                    }



                } else {
                    $('#btn_flow_about').show();
                    $('#flow_about')    .hide();
                    $('#flow_info')     .hide();
                }

                if (data.margii.training){
                    $('.main_nav[value="ananda_sutras"]').show();
                    $('.main_nav[value="mantras"]')      .show();
                    $('.learn_pro_ru')          .show();
                }

                if (data.margii.status === "secretary"){
                    $('.main_nav[value="secretary"]').show();
                }





                //$('#modal_register_self').modal('hide');
                //
                //var today = new Date();
                //var dd = parseInt(String(today.getDate()).padStart(2, '0'));
//
                //if (dd === 7) {
                //    $('#btn_fasting').text("Завтра экадаши. Инструкция");
//
                //} else if (dd == 8) {
                //    $('#btn_fasting').text("Сегодня экадаши. Инструкция");
//
                //} else if (dd == 9 && today.getHours() < 10) {
                //    $('#btn_fasting').text("Выход из экадаши. Инструкция");
                //} else {
                //    $('#btn_fasting').hide();
                //}
//
//
                //setSvadhyaya();
//
                //if (data.margii){
                //    $('#page_load').hide();
                //    $('#page_login').hide();
                //    $('#page_main').show();
                //    setHistory(data.margiis_days);
//
                //    if (data.in_flow){
                //        $('#btn_flow_about').hide();
                //        $('#flow_about')    .hide();
                //        $('#flow_info')    .show();
                //        $('#flow_header')    .empty().append("Мировой Марговский Поток<br/>Маргов в потоке: " + data.flow_size + '                    <button value="chat" type="button" class="main_nav btn btn-default btn-xs"> <span class="glyphicon glyphicon-comment" aria-hidden="true"></span></button>\n');
//
                //    } else {
                //        $('#btn_flow_about').show();
                //        $('#flow_about')    .hide();
                //        $('#flow_info')     .hide();
                //    }
//
                //} else {
                //    alert("Упс. Ошибка. Напишите в телеграмм @aashesh");
                //}
//
//
//
//
                //user_status = data.user.status;
                //if (training_plus.includes(user_status)){
                //    $('.main_nav[value="ananda_sutras"]').show();
                //    $('.main_nav[value="mantras"]').show();
                //    $('.learning_for_training').show();
                //}
                //if (secretary.includes(user_status)){
                //    $('.main_nav[value="secretary"]').show();
                //}

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    }

    function setFasting(fasting){
        console.log("fasting" , fasting);
        var days_to_fasting = [0,1,3];
        if (days_to_fasting.includes(fasting.days_to_fasting)){
            $('#btn_fasting').show().text(fasting.btn_fasting_text);
        }
    }

    var flow_success;
    function setWords(words){
        flow_success = words.flow_success;

        $('.nav_to_main')             .text(words.nav_to_main);
        $('.text_flow_header')        .text(words.text_flow_header);
        $('.btn_flow_join')           .text(words.btn_flow_join);
        $('.text_flow_about')         .text(words.text_flow_about);
        $('#btn_flow_panchadjanya')   .text(words.btn_panchadjanya);
        $('.text_panchajanya_kiirtan').text(words.text_panchajanya_kiirtan);
        $('.btn_svadhyaya_day')       .text(words.btn_svadhyaya_day);
        $('.btn_svadhyaya_night')     .text(words.btn_svadhyaya_night);
        $('#btn_flow_avarta')         .text(words.btn_flow_avarta);
        $('.text_flow_avarta_small')  .text(words.text_flow_avarta_small);
        $('.text_flow_avarta_big')    .text(words.text_flow_avarta_big);

        $('.svadhyaya_label')        .text(words.svadhyaya_label);
        $('.svadhyaya_read_realized').text(words.svadhyaya_read_realized);

        $('.text_learning_title').text(words.text_learning_title);
        $('.btn_margiis_diary').text(words.btn_margiis_diary);

        $('.app_name').text(words.app_name);


        $('.header_practises').text(words.header_practises);
        $('.header_study')    .text(words.header_study);
        $('.header_flow')     .text(words.header_flow);
        $('.header_unit')     .text(words.header_unit);
        $('.header_am')       .text(words.header_am);

        $('.oath_to_baba') .text(words.oath_to_baba);
        $('.sadhaka_rules').text(words.sadhaka_rules);
        $('.points_16')    .text(words.points_16);
        $('.points_10')    .text(words.points_10);
        $('.djama')        .text(words.djama);
        $('.niyama')       .text(words.niyama);
        $('.points_15')    .text(words.points_15);
        $('.points_40')    .text(words.points_40);
        $('.prabhat_samgiits')    .text(words.prabhat_samgiits);
        $('.kiirtans')    .text(words.kiirtans);
        $('.kaoshikiis')    .text(words.kaoshikiis);
        $('.mantras')    .text(words.mantras);
        $('.ananda_sutras')    .text(words.ananda_sutras);
        $('.library')    .text(words.library);
        $('.supreme_command')    .text(words.supreme_command);
        $('.asanas')    .text(words.asanas);

        $('.structure')     .text(words.structure);
        $('.vritti')        .text(words.vritti);
        $('.enemies_chains').text(words.enemies_chains);
        $('.enemies')       .text(words.enemies);
        $('.chains')        .text(words.chains);
        $('.dharma_pattern')   .text(words.dharma_pattern);
        $('.calendar_fasting') .text(words.calendar_fasting);
        $('.calendar_holidays').text(words.calendar_holidays);
        $('.dictionary_names') .text(words.dictionary_names);
        $('.recipes')  .text(words.recipes);
        $('.secretary').text(words.secretary);

        $('.fasting_instruction_header').text(words.fasting_instruction_header);
        $('.fasting_instruction_value').empty().append(words.fasting_instruction_value);

    }

    $('#btn_flow_about').click(function () {
        $('#btn_flow_about').hide();
        $('#flow_about').show();
    });


    $('#btn_flow_join').click(function() {
        $.ajax({
            type: "POST",
            url: api_url + "join_to_flow",
            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                alert(flow_success);

                var win = window.open('https://t.me/joinchat/Eu4zOxacBg04DrVfC3ZbpQ', '_blank');
                win.focus();

                window.location.reload();

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    });





    $(document).on('click', '.icon_flow',  function () {
        hide_all();
        $('.top_bar_icons')   .css("border-top", "2px solid #FFFFFF");
        $('.bottom_bar_icons').css("border-bottom", "2px solid #FFFFFF");
        $('#page_flow').show();
    });

    $(document).on('click', '.bottom_bar_icons',  function () {
        $('.top_bar_icons')   .css("border-top", "2px solid #FFFFFF");
        $('.bottom_bar_icons').css("border-bottom", "2px solid #FFFFFF");
        $(this).css("border-bottom", "2px solid #FF7F5C");

        hide_all();

        switch ($(this).attr("data-page")) {
            case "practise":
                $('#page_practise').show();
                break;
            case "study":
                $('#page_study').show();
                break;
            case "unit":
                $('#page_unit').show();
                break;
            case "am":
                $('#page_am').show();
                break;

        }
    });



    function hide_all(){
        $('#page_flow').hide();
        $('#page_practise').hide();
        $('#page_study').hide();
        $('#page_unit').hide();
        $('#page_am').hide();

    }













    var test_questions = [];
    $('#btn_test').click(function() {
        test_questions = [
            {question: "Помнишь первый принцип Джамы?",    answer: "Первый принцип Джамы: Ахимса"},
            {question: "Помнишь второй принцип Джамы?",    answer: "Второй принцип Джамы: Сатья"},
            {question: "Помнишь третий принцип Джамы?",    answer: "Третий принцип Джамы: Астея"},
            {question: "Помнишь четвертый принцип Джамы?", answer: "Четвертый принцип Джамы: Брахмачарья"},
            {question: "Помнишь пятый принцип Джамы?",     answer: "Пятый принцип Джамы: Апариграха"},

            {question: "Помнишь первый принцип Ниямы?",    answer: "Первый принцип Ниямы: Шауча"},
            {question: "Помнишь второй принцип Ниямы?",    answer: "Второй принцип Ниямы: Сантоша"},
            {question: "Помнишь третий принцип Ниямы?",    answer: "Третий принцип Ниямы: Тапах"},
            {question: "Помнишь четвертый принцип Ниямы?", answer: "Четвертый принцип Ниямы: Свадхьяя"},
            {question: "Помнишь пятый принцип Ниямы?",     answer: "Пятый принцип Ниямы: Ишвара Пранидхана"},

            {question: "Помнишь что означает Ахимса?",     answer: "Ахимса: " + djama_niyama_all[0].russian_desc},
            {question: "Помнишь что означает Сатья?",     answer: "Сатья: " + djama_niyama_all[1].russian_desc},
            {question: "Помнишь что означает Астея?",     answer: "Астея: " + djama_niyama_all[2].russian_desc},
            {question: "Помнишь что означает Брахмачарья?",     answer: "Брахмачарья: " + djama_niyama_all[3].russian_desc},
            {question: "Помнишь что означает Апариграха?",     answer: "Апариграха: " + djama_niyama_all[4].russian_desc},
            {question: "Помнишь что означает Шауча?",     answer: "Шауча: " + djama_niyama_all[5].russian_desc},
            {question: "Помнишь что означает Сантоша?",     answer: "Сантоша: " + djama_niyama_all[6].russian_desc},
            {question: "Помнишь что означает Тапах?",     answer: "Тапах: " + djama_niyama_all[7].russian_desc},
            {question: "Помнишь что означает Свадхьяя?",     answer: "Свадхьяя: " + djama_niyama_all[8].russian_desc},
            {question: "Помнишь что означает Ишвара пранидхана?",     answer: "Ишвара пранидхана: " + djama_niyama_all[9].russian_desc},
        ];

        $('#page_main_flow').hide();
        $('#first_screen').hide();

        $('#page_test').show();
        $('#page_test_go').show();

        random_shuffle = shuffle(Array.from({length: test_questions.length}, (v, k) => k));
        setTestQuestion();
    });
    function setTestQuestion(){
        $('#btn_test_next').hide();
        $('#btn_test_no')  .show();
        $('#btn_test_yes') .show();

        var question_num = random_shuffle[answers_count] ;

        $('#test_question').empty().show().text(test_questions[question_num].question);
        $('#test_answer')  .empty().hide().text(test_questions[question_num].answer);
    }
    $(document).on('click', '.nav_test',  function () {

        switch ($(this).val()) {
            case "next":
                if (answers_count  === test_questions.length ){
                    showTestResults();
                }
                setTestQuestion();
                break;
            case "yes":
                answers_count += 1;
                answers_correct += 1;

                $('#test_answer').show();
                $('#btn_test_next').show();
                $('#btn_test_no')  .hide();
                $('#btn_test_yes') .hide();


                break;
            case "no":
                var current = test_questions[random_shuffle[answers_count]];
                answers_uncorrect.push(random_shuffle[answers_count]);
                answers_count += 1;

                $('#test_answer').show();
                $('#btn_test_next').show();
                $('#btn_test_no')  .hide();
                $('#btn_test_yes') .hide();
                break;
        }
    });
    function showTestResults(){
        $('#page_test_go').hide();
        $('#page_test_results').show();
        $('#test_results')  .text("Результат " + answers_correct + "/" + answers_count);

        if (answers_uncorrect.length > 0){
            var row = '<table class="table table-hover table-bordered table-condensed" >';
            $.each(answers_uncorrect, function (i, item) {
                row += '<tr>';
                row += '<td>' + test_questions[item].answer    + '</td>';
                row += '</tr>';
            });
            row += '</tbody></table>';
            $('#div_test_uncorrect').show();
            $('#table_test_uncorrect').empty().append(row);
        } else {
            var audio_url = "https://margiis-assistant.am/audio/veeery_good.mp3";
            $('#background_pronounce').attr("src", audio_url);
            var audio = document.getElementById("background_pronounce_main");
            audio.load();
        }

        answers_count   = 0;
        answers_correct = 0;
    }




    $('#btn_secretary_access').click(function() {
        var name     = $('#create_margii_name')    .val();
        var unit     = $('#create_margii_unit')    .val();
        var email    = $('#create_margii_email')   .val();
        var password = $('#create_margii_password').val();

        if (name === "" || unit === "" || email === "" || password === "" ){
            alert("Сначала заполните все поля");
        } else {
            var status = $('#create_margii_training').is(":checked") ? "margii_training" : "margii";

            $.ajax({
                type: "POST",
                url: api_url + "margii_create",
                data: {
                    name:     name,
                    unit:     unit,
                    email:    email,
                    password: password,
                    status: status
                },
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    $('#create_margii_name')    .val("");
                    $('#create_margii_unit')    .val("");
                    $('#create_margii_email')   .val("");
                    $('#create_margii_password').val("");

                    var text_info = "Логин: " + email + "\nПароль: " + password + "\nАдрес сервиса: margiis-assistant.am";
                    copyToClipboard(text_info);

                    alert("Информация о доступе скопирована в буфер обмена. Можете вставить ее в любом месте и отправить");

                    var pass = Math.floor(Math.random() * 10000) + 1;
                    while (pass < 1000 && pass > 10000) {
                        pass = Math.floor(Math.random() * 10000) + 1;
                    }
                    $('#create_margii_password').val(pass);
                },
                failure: function (errMsg) {
                    //    console.log(errMsg.toString());
                }
            });
        }

    });


    function setSvadhyaya(){
        $.each(svadhyaya_all, function (i, item) {

            var date_source = item.date.split(".");
            var date = new Date();

            if (parseInt(date_source[0]) === date.getDate() && parseInt(date_source[1]) === date.getMonth() + 1 && parseInt(date_source[2]) === date.getFullYear() ){
                console.log(item);
                svadhyaya_1 = item.svadhyaya_1;
                svadhyaya_2 = item.svadhyaya_2;
                return false;
            }

        });
    }


    $(document).on('click', '.main_nav',  function () {

        var links = ["donation", "library", "kirtans", "fasting", "chat"];
        if (!links.includes($(this).val())) {
            $('#page_main_flow').hide();
        }


        switch ($(this).val()) {
            case "chat":
                var win = window.open('https://t.me/joinchat/Eu4zOxacBg04DrVfC3ZbpQ', '_blank');
                win.focus();
                break;
            case "link":
                var win = window.open('https://docs.google.com/document/d/1lnHcnZJi7RT6ny5GVo67HNkq0e4sUdVFFrm-v-atA5s/edit?usp=sharing', '_blank');
                win.focus();
                break;
            case "oath":
                $('#first_screen').hide();
                $('#page_oath').show();
                break;
            case "rules":
                $('#first_screen').hide();
                $('#page_rules').show();
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
                        row += item.name ;
                        row += '</div>';
                    } else {
                        if (training_plus.includes(user_status)){
                            row += '<div class="mantra_row diary_body" data-mantra-num="' + i + '">';
                            row += item.name ;
                            row += '</div>';
                        }
                    }


                });
                row += '</tbody></table>';
                $('#mantras_table').empty().append(row);
                $('#page_mantras').show();

                break;

            case "samgiits":
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
            case "kaoshiki":
                $('#first_screen').hide();

                var row = "";
                $.each(kaoshikis_all, function (i, item) {
                    row += '<div class="kaoshiki_row diary_body" data-kaoshiki-link="' + item.link + '">';
                    row += item.name;
                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#kaoshikis_table').empty().append(row);
                $('#page_kaoshikis').show();

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
                    row += "<b>" + item.russian + "</b>" ;
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


                var row = "";
                $.each(chains_all, function (i, item) {
                    row += '<div class="diary_body">';
                    row += item.russian;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#chains_table').empty().append(row);


                $('#page_enemies').show();
                break;

            case "recipes":
                $('#first_screen').hide();

                var row = "";
                $.each(recipes_all, function (i, item) {
                    row += '<div class="diary_body recipe" data-link="' + item.link + '">';
                    row += item.name;

                    row += '</div>';
                });
                row += '</tbody></table>';
                $('#recipes_table').empty().append(row);
                $('#page_recipes').show();
                break;
            case "fasting":
                var win = window.open('http://www.skillcase.com/fasting/', '_blank');
                win.focus();
                break;
            case "kirtans":
                alert("\"We must support our artists\" - Sri Sri Anandamurti");
                var win = window.open('http://www.innersong.com/products/index.htm', '_blank');
                win.focus();
                break;
            case "library":
                var win = window.open('http://elib.amps.org/', '_blank');
                win.focus();
                break;
            case "secretary":
                $('#first_screen').hide();
                $('#page_secretary').show();

                var pass = Math.floor(Math.random() * 10000) + 1;
                while (pass < 1000 && pass > 10000) {
                    pass = Math.floor(Math.random() * 10000) + 1;
                }

                //  console.log("pass " + pass);
                $('#create_margii_password').val(pass);
                break;
        }
    });
    $(document).on('click', '.day_svadhyaya',  function () {
        var text = "";
        if ($(this).attr("data-type") === "1") {
            text = svadhyaya_day;
        } else {
            text = svadhyaya_night;
        }
        $('#svadhyaya_text') .empty().append(text);
        $('#modal_svadhyaya').modal('show');

    });
    $('#btn_flow_panchadjanya').click(function(){
        $('#div_flow_avarta').hide();

        if ($("#div_flow_panchadjanya").is(":visible")) {
            $('#div_flow_panchadjanya').hide();
        } else {
            $('#div_flow_panchadjanya').show();
        }
    });
    let panchadjanyaTimerId;
    $('#btn_panchadjanya_timer_start').click(function(){
        $('#btn_panchadjanya_timer_start').hide();
        $('#btn_panchadjanya_timer_stop') .show();

         panchadjanyaTimerId =  setTimeout(() => $('#btn_panchadjanya_timer_stop').click(), 10 * 60 * 1000);
    });
    $('#btn_panchadjanya_timer_stop').click(function(){
        clearTimeout(panchadjanyaTimerId);
        $('#btn_panchadjanya_timer_start').show();
        $('#btn_panchadjanya_timer_stop') .hide();
        playBackground("https://margiis-assistant.am/audio/timer_end.mp3");
       //  panchadjanyaTimerId =  setTimeout(() => alert('Привет'), 1000);
    });




    let meditationTimerId;
    var meditation_now    = 0;
    var meditation_target = 0;

    $('#btn_open_meditation_timer').click(function(){
        $('#btn_open_meditation_timer').hide();
        $('#div_meditation_timer').show();
    });

    $('#btn_meditation_timer_start').click(function(){
        meditation_target = parseInt($('#meditation_min').val()) * 60;
        if (meditation_target > 0) {
            $('#div_meditation_timer').hide();
            $('#btn_meditation_timer_stop') .show();

            meditationTimerId = setInterval(increaseTimer, 1000);

           // meditationTimerId =  setTimeout(() => $('#btn_meditation_timer_stop').click(), meditation_target * 1000);
        }
    });
    function increaseTimer(){
        meditation_now += 1;
        $('#timer').text(meditation_now);

        if ( meditation_now >= meditation_target){
            $('#btn_meditation_timer_stop').click()
        }

    }

    $('#btn_meditation_timer_stop').click(function(){
        //clearTimeout(meditationTimerId);
        clearInterval(meditationTimerId);
        $('#btn_open_meditation_timer').show();
        $('#div_meditation_timer').hide();
        $('#btn_meditation_timer_stop') .hide();
        playBackground("https://margiis-assistant.am/audio/timer_end.mp3");
    });


    $('#btn_flow_avarta').click(function(){
        $('#div_flow_panchadjanya').hide();

        if ($("#div_flow_avarta").is(":visible")) {
            $('#div_flow_avarta').hide();
        } else {
            $('#div_flow_avarta').show();
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

        if (training_plus.includes(user_status)){
            $('#background_pronounce').attr("src", url);
            var audio = document.getElementById("background_pronounce_main");
            audio.load();
        }
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
            $.each(answers_uncorrect.sort(function(a, b){return a - b}), function (i, item) {
                row += '<tr>';

                row += '<td>' + points_all[item]    + '</td>';
                row += '</tr>';
            });
            row += '</tbody></table>';
            $('#div_16points_uncorrect').show();
            $('#table_16points_uncorrect').empty().append(row);
        } else {
            var audio_url = "https://margiis-assistant.am/audio/veeery_good.mp3";
            $('#background_pronounce').attr("src", audio_url);
            var audio = document.getElementById("background_pronounce_main");
            audio.load();
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
        } else {
            var audio_url = "https://margiis-assistant.am/audio/veeery_good.mp3";
            $('#background_pronounce').attr("src", audio_url);
            var audio = document.getElementById("background_pronounce_main");
            audio.load();
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
                        $('#logo') .click();

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

        var samgit_text_src = "img/samgiits/" + samgit.num + ".png";
        $('#samgit_text').attr("src", samgit_text_src);
        $('#samgit_value').show();

    });


    $('#samgits_back').click(function (){
        $('#samgits_table').show();
        $('#samgit_value').hide();

        var audio = document.getElementById("samgit_pronounce_main");
        audio.pause();
    });


    $(document).on('click', '.kaoshiki_row',  function () {
        var kaoshiki_link = $(this).attr("data-kaoshiki-link") + "?autoplay=1";
        $('#video_kaoshiki').attr("src", kaoshiki_link).show();
        window.scrollTo(0, 0);
    });


    $(document).on('click', '.recipe',  function () {
        var win = window.open($(this).attr('data-link'), '_blank');
        win.focus();
    });



    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    $(document).on('click', '.nav_to_main',  function () {
        window.scrollTo(0, 0);

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

        $('#page_test').hide();
        $('#page_test_go').show();
        $('#page_test_results').hide();

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



        $('#page_kaoshikis').hide();
        $('#video_kaoshiki').attr("src", "#").hide();



        $('#page_dharma').hide();

        $('#page_supreme').hide();
        $('#page_ananda_sutras').hide();
        $('#page_enemies').hide();
        $('#page_duties').hide();
        $('#page_oath').hide();
        $('#page_nocarma').hide();
        $('#page_cc2_sadhana').hide();
        $('#page_secretary').hide();
        $('#page_recipes').hide();


        $('#first_screen').show();
        $('#page_main_flow').show();
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

    function setCookie(name, value, days) {



        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    window.addEventListener("hashchange", function(e) {
        if(e.oldURL.length > e.newURL.length)
            $('#logo').click();
    });



    $.ajaxSetup({
        error: function (data, textStatus, jqXHR) {
            console.log("ajaxSetup");
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

    function copyToClipboard(text) {
        if (window.clipboardData && window.clipboardData.setData) {
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return clipboardData.setData("Text", text);

        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            var textarea = document.createElement("textarea");
            textarea.textContent = text;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (ex) {
                console.warn("Copy to clipboard failed.", ex);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }
});
