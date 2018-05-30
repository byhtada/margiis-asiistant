$(document).ready(function() {



    $.ajaxSetup({
        error: function (data, textStatus, jqXHR) {
            // console.log(data);
            //  console.log("fail get token -> show initial reg (ajaxSetup)");

            if (data.status == 401) {
                // console.log("Error 401");
                //  console.log(data.responseText.includes("Incorrect credentials"));

                if (data.responseText.includes("Incorrect credentials")) {
                    alert("Вход не выполнен. Проверьте корректность введенных данных")
                }
                if (data.responseText.includes("Bad Token")) {
                    cookie_token = getCookie(cookie_name_token);
                }
            } else {
                //   console.log("Error not 401");
            }
        }
    });
    if (!navigator.cookieEnabled) {
        alert('Включите cookie для комфортной работы');
    }

    var cookie_name_token = "grand_token";
    var cookie_name_id = "grand_id";
    var cookie_token = getCookie(cookie_name_token);
    var api_url      = "https://зйож.рф/";
    var api_url_full = "https://зйож.рф/users";
  // var api_url      = "https://0.0.0.0:3000/";
  // var api_url_full = "https://0.0.0.0:3000/users";


    var button_reg = $ipsp.get("button");
    button_reg.setHost("api.fondy.eu");
    button_reg.setProtocol("https");
    button_reg.setMerchantId(1409532);
    button_reg.setAmount("","RUB",false);
    button_reg.setResponseUrl("https://byhtada.github.io/hyls_client/");
    button_reg.addParam("lang","ru");
    button_reg.addParam("order_desc","Участие в марафоне HYLS");
    var url_reg = button_reg.getUrl();
    $ipsp("checkout").config({
        "wrapper": "#checkout",
        "styles": {
            "body": {
                "overflow": "hidden"
            }
        }
    }).scope(function () {
        this.width("100%");
        this.height(480);
        this.action("resize", function (data) {
            this.setCheckoutHeight(data.height);
        });
        this.loadUrl(url_reg);
        this.addCallback(function(data,type){
            console.log(type);
            console.log(data);

            if (typeof data.send_data !== 'undefined' && data.final ) {
                console.log(data.send_data.signature);
                console.log(data.send_data.order_status);
                console.log(data.send_data.currency);
                console.log(data.send_data.settlement_amount);

                reg_user_confirm_payment(data.send_data);
            }
        })
    });


   // var button = $ipsp.get("button");
   // button.setHost("api.fondy.eu");
   // button.setProtocol("https");
   // button.setMerchantId(1409532);
   // button.setAmount("","RUB",false);
   // button.setResponseUrl("https://byhtada.github.io/hyls_client/");
   // button.addParam("lang","ru");
   // button.addParam("order_desc","Участие в марафоне HYLS");
   // var url = button.getUrl();
   // $ipsp("checkout").config({
   //     "wrapper": "#checkout_2",
   //     "styles": {
   //         "body": {
   //             "overflow": "hidden"
   //         }
   //     }
   // }).scope(function () {
   //     this.width("100%");
   //     this.height(480);
   //     this.action("resize", function (data) {
   //         this.setCheckoutHeight(data.height);
   //     });
   //     this.loadUrl(url);
   //     this.addCallback(function(data,type){
   //         console.log(type);
   //         console.log(data);
//
   //         if (typeof data.send_data !== 'undefined' && data.final ) {
   //             alert("Платеж успешно завершен. Благодарим за поддержку!")
   //         }
   //     })
   // });



    var  timerId = setInterval(function() {
        console.log( "тик" );
        var url_string = window.location.href; //window.location.href
        var url = new URL(url_string);
        var params = parse_query_string(url.hash.replace('#', ''));
        if (typeof params.access_token !== 'undefined' &&  params.access_token !== null){
            clearInterval(timerId);
            var vk_info = "sex,bdate,city,country,photo_200,contacts,followers_count,timezone";
            var vk_api_query = "https://api.vk.com/method/users.get?user_ids= " + params.user_id + "&fields=" + vk_info + "&access_token=" + params.access_token + "&v=5.76&callback=callbackFunc";
            jsonp(vk_api_query, function(userInfo) {
                console.log(userInfo.response[0]);
                userInfo = userInfo.response[0];
                try_find_user(userInfo, params, "vk")
            });
        }
    }, 100);


    function ifLogin()  {

        //console.log(cookie_token);
        if (typeof cookie_token !== 'undefined' && cookie_token !== 'undefined') {
            start();
            clearInterval(timerId);
        } else {
            //   console.log(cookie_token);
            $('#page_user_main') .hide();
            $('#page_admin_main').hide();
            $("#page_login")     .show();
        }
    }
    ifLogin();
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
                    //  console.log(JSON.stringify(data));

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

    function start() {
        try {
            $.ajax({
                type: "GET",
                url:   api_url + "users",
                data: {query_info: "get_user_status"},
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    console.log(data);


                    hide_all_in_admin();
                    hide_all_in_user();

                    if (data.user_status == "admin") {
                        $("#page_login")     .hide();
                        $("#page_user_main") .hide();
                        $('#page_admin_main').show();
                        $('#page_groups')    .show();
                        update_admin_info();
                    } else if (data.user_status == "curator") {
                        $("#page_login")     .hide();
                        $("#page_user_main") .hide();
                        $('#page_admin_main').show();
                        $('#page_groups')    .show();
                        update_admin_info();
                    } else if (data.user_status == "new") {
                        $("#page_login")     .show();
                        $("#page_user_main") .hide();
                        $('#page_admin_main').hide();
                    } else {
                        $("#page_login")     .hide();
                        $('#page_admin_main').hide();
                        $("#page_user_main") .show();
                        $("#page_user_programm") .show();
                        update_user_info();
                    }
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        catch (err) {
            console.log(err);
        }

    }
    function no_access() {
        alert("У Вас не достаточно прав, для выполнения этого действия")
    }

    var city = {};
    var couintry = {};
    var user_reg_info = {
        first_name:      null,
        last_name:       null,
        sex:             null,
        bdate:           null,
        city:            city,
        country:         couintry,
        photo_200:       null,
        home_phone:      null,
        followers_count: null,
        timezone:        null
    };

    var user_params = {
        user_id:  null,
        access_token:  null,
        email: null
    };

    $('#btn_fb_log_in').click(function (){
        FB.login(function (response) {
                console.log(response);
                if (response.status == "connected"){
                    FB.api('/me?fields=id,first_name,last_name,email,age_range,link,gender,locale,picture,timezone', function (userData){
                        console.log(userData);
                        user_reg_info["first_name"] = userData.first_name;
                        user_reg_info["last_name"]  = userData.last_name;
                        console.log("user_reg_info " + JSON.stringify(user_reg_info));
                        user_params["user_id"] = response.authResponse.userID;
                        user_params["access_token"] = response.authResponse.access_token;
                        user_params["email"] = userData.email;
                        console.log("user_params " + JSON.stringify(user_params));

                        try_find_user(user_reg_info, user_params, "fb")
                    });
                }
            },
            {scope: 'public_profile, email'});
    });
    $('#btn_vk_log_in').click(function (){

    });

    $('#btn_exit, #btn_user_exit').click(function () {
        setCookie(cookie_name_token);
        cookie_token = getCookie(cookie_name_token);
        ifLogin();
    });


    function try_find_user(userInfo, params, social_name){
        console.log("try find user");
        $.ajax({
            type: "GET",
            url: api_url + "find_user",
            data: {email: params.email, social_id: params.user_id},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log("try find user");
                console.log(JSON.stringify(data));
                console.log(JSON.stringify(data.token));

                if (typeof data.token !== 'undefined') {
                    console.log("user founded");
                    setCookie(cookie_name_token, data.token, {expires: 36000000000000});
                    setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                    cookie_token = getCookie(cookie_name_token);
                    ifLogin();
                } else {
                    console.log("user not founded");
                    reg_user(userInfo, params.email, social_name, params.user_id, params.access_token);
                }
            },
            failure: function (errMsg) {
                console.log("fail");
                console.log(errMsg.toString());
            }
        });
    }

//Registration
    function reg_user(userInfo, email, social_name, social_id, access_token){

        var person  = {  social_name: social_name,
            social_id:    social_id,
            access_token: access_token,
            email:           email,
            first_name:      userInfo.first_name,
            last_name:       userInfo.last_name,
            sex:             userInfo.sex,
            bdate:           userInfo.bdate,
            city:            userInfo.city.title,
            country:         userInfo.country.title,
            photo:           userInfo.photo_200,
            phone_home:      userInfo.home_phone,
            followers_count: userInfo.followers_count,
            hour_tail:       userInfo.timezone
        };
        console.log(JSON.stringify(person));

        $.ajax({
            type: "POST",
            url: api_url_full,
            data: JSON.stringify(person),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                console.log("Reg success: " + JSON.stringify(data));
                setCookie(cookie_name_token, data.auth_token,     {expires: 36000000000000});
                setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                cookie_token = getCookie(cookie_name_token);
                ifLogin();
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    }

    var user_messenger_reg = "", user_messenger_reg_self = "";
    $(document).on('click', '.messenger_link_user_reg',       function () {
        //  console.log($(this).attr("name"));
        $('#btn_dd_messenger_user_reg').text($(this).attr("name"));
        user_messenger_reg_self = $(this).attr("name");
    });
    $('#btn_register_self').click(function () {
        $('#btn_register_self').prop('disabled', true);

        var user_name       = $('#field_user_reg_name').val();
        var user_email      = $('#field_user_reg_email').val();
        var user_phone      = $('#field_user_reg_phone').val();
        var user_password   = $('#field_user_reg_password').val();
        var user_vk         = $('#field_user_reg_vk').val();
        var user_fb         = $('#field_user_reg_fb').val();

        if (user_phone != null && user_password != null && user_email != null && user_messenger_reg_self !== "") {
            var person  = {
                first_name:  user_name,
                phone:       user_phone,
                password:    user_password,
                email:       user_email,
                user_vk:     user_vk,
                user_fb:     user_fb,
                messenger: user_messenger_reg_self};

            $.ajax({
                type: "POST",
                url: api_url_full,
                data: JSON.stringify(person),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $('#btn_register_self').prop('disabled', false);
                    if (data.error == 0){
                        console.log("Reg success: " + JSON.stringify(data));
                        setCookie(cookie_name_token, data.auth_token, {expires: 36000000000000});
                        setCookie(cookie_name_id,    data.user_id,    {expires: 36000000000000});
                        cookie_token = getCookie(cookie_name_token);
                        ifLogin();
                    } else {
                        alert("Видимо Вы уже зарегистрированы. Т.к. в нашей базе имеется указанный номер телефона|почта")
                    }
                    $('#modal_register_self').modal('hide');

                },
                failure: function(errMsg) {
                    alert(errMsg);
                }
            });
        } else {
            alert("Заполните обязательные поля: почта, телефон, способ общения и пароль");
            $('#btn_register_self').prop('disabled', false);
        }
    });


    $(document).on('click', '.messenger_link_user',       function () {
        //  console.log($(this).attr("name"));
        $('#btn_dd_messenger_user').text($(this).attr("name"));
        user_messenger_reg = $(this).attr("name");
    });
    $('#btn_user_reg_messenger').click(function (){
        if (user_messenger_reg != "" && $('#field_phone_user').val() != ""){
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_info: "user_set_messenger",
                    messenger: user_messenger_reg,
                    phone:     $('#field_phone_user').val()},
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data) {
                    ifLogin();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert('Заполните все поля');
        }

    });
    $('#btn_pay_card').click(function (){
        $('#btn_pay_card')    .hide();
        $('#payment_text_no_money')    .hide();
        $('#btn_pay_currency').show();
        $('#div_other_payment').show();


    });
    $(document).on('click', '.pay_currency', function (){
       // console.log($(this).val());
        var currency = $(this).val();

        var button = $ipsp.get("button");
        button.setHost("api.fondy.eu");
        button.setProtocol("https");
        button.setMerchantId(1409532);

        switch (currency) {
            case "RUB":
                button.setAmount("","RUB",false);

                break;
            case "UAH":
                button.setAmount("","UAH",false);

                break;
            case "KZT":
                button.setAmount("","KZT",false);

                break;
            case "BYN":
                button.setAmount("","BYN",false);

                break;
            case "USD":
                button.setAmount("","USD",false);

                break;
            case "EUR":
                button.setAmount("","EUR",false);

                break;

        }

        button.setResponseUrl("https://byhtada.github.io/hyls_client/");
        button.addParam("lang","ru");
        button.addParam("order_desc","Участие в марафоне HYLS");
        var url = button.getUrl();
        $ipsp("checkout").config({
            "wrapper": "#checkout",
            "styles": {
                "body": {
                    "overflow": "hidden"
                }
            }
        }).scope(function () {
            this.width("100%");
            this.height(480);
            this.action("resize", function (data) {
                this.setCheckoutHeight(data.height);
            });
            this.loadUrl(url);
            this.addCallback(function(data,type){
                console.log(type);
                console.log(data);

                if (typeof data.send_data !== 'undefined' && data.final ) {
                    console.log(data.send_data.signature);
                    console.log(data.send_data.order_status);
                    console.log(data.send_data.currency);
                    console.log(data.send_data.settlement_amount);

                    reg_user_confirm_payment(data.send_data);
                }
            })
        });
    //    $ipsp("checkout").config({
    //        "wrapper": "#checkout_2",
    //        "styles": {
    //            "body": {
    //                "overflow": "hidden"
    //            }
    //        }
    //    }).scope(function () {
    //        this.width("100%");
    //        this.height(480);
    //        this.action("resize", function (data) {
    //            this.setCheckoutHeight(data.height);
    //        });
    //        this.loadUrl(url);
    //        this.addCallback(function(data,type){
    //            console.log(type);
    //            console.log(data);
//
    //            if (typeof data.send_data !== 'undefined' && data.final ) {
    //                alert("Платеж успешно завершен. Благодарим за поддержку!")
    //            }
    //        })
    //    });


    });
    function reg_user_confirm_payment(send_data){
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: "user_confirm_payment",
                payment_currency:   send_data.currency,
                payment_size:       send_data.amount,
                payment_card:       send_data.masked_card,
                payment_requisites: send_data.sender_email,
                payment_date:       send_data.order_time
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data) {
                ifLogin();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }
    $('#btn_pay_other').click(function (){
        $('#btn_pay_other').hide();
        $('#div_other_method').show();
    });
    $('#btn_pay_complete').click(function (){
        var blank = {
            "currency" : 0 ,
            "amount" : 0 ,
            "masked_card" : 0 ,
            "sender_email" : 0 ,
            "order_time" : 0
        };

        reg_user_confirm_payment(blank);
    });
    $('#btn_reg_no_money').click(function (){
        var blank = {
            "currency" : 0 ,
            "amount" : -100 ,
            "masked_card" : 0 ,
            "sender_email" : 0 ,
            "order_time" : 0
        };

        reg_user_confirm_payment(blank);
    });




//Navigation
    $(document).on('click', '.nav-link-admin',       function () {
        hide_all_in_admin();

        switch ($(this).attr("id")){
            case "nav_groups":
                $('#page_groups')  .show();
                break;
            case "nav_curators":
                $('#page_curators').show();
                break;
            case "nav_users":
                $('#page_users')  .show();
                break;
            case "nav_program":
                $('#page_program').show();
                break;
        }
    });
    function hide_all_in_admin() {
        $('#page_group_info').hide();
        $('#page_user_info') .hide();

        $('#page_groups')  .hide();
        $('#page_curators').hide();
        $('#page_users')   .hide();
        $('#page_program') .hide();
    }
    function update_admin_info() {
        try {
            $.ajax({
                type: "GET",
                url:   api_url + "users",
                data: {query_info: "get_admin_info"},
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //   console.log(data);
                    var currentdate = new Date();

                    var datetime = "Last Sync: " + currentdate.getDate() + "/"+(currentdate.getMonth()+1)
                        + "/" + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                    //    console.log(datetime);


                    setCurators(data.curators);
                    setUsers(data.users);
                    setGroups(data.groups);
                    setProgrammMain(data.programm_main);

                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        catch (err) {
            console.log(err);
        }
    }


    $(document).on('click', '.nav-link-user',       function () {
        hide_all_in_user();

        switch ($(this).attr("id")){
            case "nav_user_programm":
                $('#page_user_programm').show();
                break;
            case "nav_user_diary":
                $('#page_user_diary').show();
                break;
            case "nav_user_settings":
                $('#page_user_settings').show();
                break;
            case "nav_user_support":
                $('#page_user_support').show();
                break;
        }
    });
    function hide_all_in_user() {
        $('#page_user_programm').hide();
        $('#page_user_diary').hide();
        $('#page_user_settings').hide();
        $('#page_user_support').hide();
    }
    function update_user_info() {
        try {
            $.ajax({
                type: "GET",
                url:   api_url + "users",
                data: {query_info: "get_user_info", user_time: new Date()},
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    console.log(data);
                    //setUserDiary(data.user_diary);
                    day_new = data.marafon_day;

                    $('#user_marafon_reg').hide();
                    $('#user_marafon_pay').hide();
                    $('#user_marafon_start').hide();
                    $('#user_marafon_wait').hide();

                    $('#wait_messenger_link, #programm_messenger_link, #settings_messenger_link').attr("href", data.messenger_link);
                    $('#wait_messenger_link, #programm_messenger_link, #settings_messenger_link').text(data.messenger_link);

                    $('#filed_7day').prop("checked", data.user.show_practic_7);

                    if (data.marafon_day > -998 && data.marafon_day < 1) {
                        console.log("wait");

                        $('#user_marafon_wait').show();
                        $('#user_marafon_wait_text').text("Ожидайте старта марафона " + data.marafon_day_start);
                        if (data.marafon_day == 0){
                            $('#user_marafon_wait_messenger').show();
                        }

                    } else if (data.marafon_day < -998) {
                        if (data.user.messenger == null) {
                            console.log("reg");
                            $('#user_marafon_reg').show();
                        } else {
                            console.log("pay");
                            $('#user_marafon_pay').show();
                        }

                    } else if (data.marafon_day > 0) {
                        console.log("go");
                        setUserMarafonDay(data.marafon_info_today, data.marafon_day);
                    }

                    if (data.detox_type !== null ){
                        $('#detox_settings').show();
                        $('#detox_name')    .text(data.detox_type);
                        $('#detox_time')    .text(data.user.detox_time_new);


                        var detox_last_date1;
                        var detox_time1 = data.user.detox_time_new;
                        switch (parseInt(data.user.detox_type_new)){
                            case 1:
                                detox_days = 30;
                                detox_last_date1 = 60 - detox_time1 - 2;
                                break;
                            case 2:
                                detox_days = 20;
                                detox_last_date1 = 60 - detox_time1 - 2 - 5;
                                break;
                            case 3:
                                detox_days = 15;
                                detox_last_date1 = 60 - detox_time1 - 2 - 2 - 5;
                                break;
                            case 4:
                                detox_days = 5;
                                detox_last_date1 = 60 - detox_time1 - 2 - 1 - 1 - 2 - 1 - 2 - 5;
                                break;
                        }

                        var i;
                        var detox_time_row      = '';
                        for (i = 1; i < detox_days + 1; i++) {
                            detox_time_row      += '<li><a href="#" class="link_detox_time_edit" name="'+ i +'">' + i + '</a></li>';
                        }
                        $('#detox_answer_time_edit') .empty();
                        $('#detox_answer_time_edit') .append(detox_time_row);


                        var i1;
                        var detox_start      = '';
                        for (i1 = 28; i1 < detox_last_date1 + 1; i1++) {
                            detox_start      += '<li><a href="#" class="link_detox_start_edit" name="'+ i1 +'">' + i1 + " день" + '</a></li>';
                        }
                        $('#detox_answer_start_edit') .empty();
                        $('#detox_answer_start_edit') .append(detox_start);
                    }
                    if (data.user.detox_stop == true) {
                        $('#detox_settings').hide();

                    }
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        catch (err) {
            //console.log(err);
        }
    }


//Program
    var programm_days_main;
    var day_num;
    var day_show_now;
    var day_new;
    function setUserMarafonDay(current_day, marafon_day){
        day_num = current_day.day_num;


        var eat_no_snacking_fact   = current_day.eat_no_snacking_fact;
        var eat_diet_fact          = current_day.eat_diet_fact;
        var tongue_clean_day       = current_day.tongue_clean_day;
        var tongue_clean_night     = current_day.tongue_clean_night;
        var phisic_fact            = current_day.phisic_fact;
        var therapy_fact           = current_day.therapy_fact;
        var asana_fact             = current_day.asana_fact;
        var psi_fact               = current_day.psi_fact;
        var half_bath_day          = current_day.half_bath_day;
        var half_bath_night        = current_day.half_bath_night;

        var water_fact             = current_day.water_fact;
        var wake_up_hours_fact     = current_day.wake_up_hours_fact;
        var wake_up_minutes_fact   = current_day.wake_up_minutes_fact;
        var meditation_day_fact    = current_day.meditation_day_fact;
        var meditation_night_fact  = current_day.meditation_night_fact;
        var kaoshiki_minutes_fact  = current_day.kaoshiki_minutes_fact;

        var kirtan_day_fact        = current_day.kirtan_day_fact;
        var kirtan_night_fact      = current_day.kirtan_night_fact;
        var day_comment            = current_day.day_comment;
        var day_materials          = current_day.day_materials;


        var eat_no_snacking_active = current_day.eat_no_snacking_active;
        var eat_diet_active        = current_day.eat_diet_active;
        var tongue_clean_active    = current_day.tongue_clean_active;
        var phisic_active          = current_day.phisic_active;
        var therapy_active         = current_day.therapy_active;
        var asana_active           = current_day.asana_active;
        var psi_active             = current_day.psi_active;
        var half_bath_active             = current_day.half_bath_active;

        var water_target            = current_day.water_target;
        var wake_up_hours_target    = current_day.wake_up_hours_target;
        var wake_up_minutes_target  = current_day.wake_up_minutes_target;
        var meditation_day_target   = current_day.meditation_day_target;
        var meditation_night_target = current_day.meditation_night_target;
        var kaoshiki_minutes_target = current_day.kaoshiki_minutes_target;
        var kirtan_day_target       = current_day.kirtan_day_target;
        var kirtan_night_target     = current_day.kirtan_night_target;



        console.log(day_show_now + "  " + day_new);
        if (day_show_now !== day_new) {
            $('#row_water')           .hide();
            $('#row_no_snacking')     .hide();
            $('#row_diet')            .hide();
            $('#row_wake_up')         .hide();
            $('#row_tongue')          .hide();
            $('#row_meditation_day')  .hide();
            $('#row_meditation_night').hide();
            $('#row_kaoshiki')        .hide();
            $('#row_phisic')          .hide();
            $('#row_therapy')         .hide();
            $('#row_asana')           .hide();
            $('#row_psy')             .hide();
            $('#row_half_bath')       .hide();
            $('#row_kirtan_day')      .hide();
            $('#row_kirtan_night')    .hide();

            $('#filed_no_snacking_fact')       .prop("checked", false);
            $('#filed_diet')                   .prop("checked", false);
            $('#filed_tongue_day')             .prop("checked", false);
            $('#filed_tongue_night')           .prop("checked", false);
            $('#filed_phisic')                 .prop("checked", false);
            $('#filed_therapy')                .prop("checked", false);
            $('#filed_asana')                  .prop("checked", false);
            $('#filed_psy')                    .prop("checked", false);
            $('#filed_half_bath_day')          .prop("checked", false);
            $('#filed_half_bath_night')        .prop("checked", false);

            $('#filed_water_fact')             .val(null);
            $('#filed_wake_up_fact')           .val(null);
            $('#filed_meditation_day_fact')    .val(null);
            $('#filed_meditation_night_fact')  .val(null);
            $('#filed_kaoshiki_fact')          .val(null);
            $('#filed_kirtan_day_fact')        .val(null);
            $('#filed_kirtan_night_fact')      .val(null);
            $('#filed_day_comment')      .val(null);


            if (eat_no_snacking_active != null && eat_no_snacking_active != false) {$('#row_no_snacking').show();}
            if (eat_diet_active        != null && eat_diet_active        != false) {
                $('#row_diet').show();
                $('#text_diet').text("Диета" + " - " + current_day.eat_diet_description);

            }
            if (tongue_clean_active    != null && tongue_clean_active    != false) {$('#row_tongue').show();}
            if (phisic_active          != null && phisic_active          != false) {$('#row_phisic').show();}
            if (therapy_active         != null && therapy_active         != false) {$('#row_therapy').show();}
            if (asana_active           != null && asana_active           != false) {$('#row_asana').show();}
            if (psi_active             != null && psi_active             != false) {$('#row_psy').show();}
            if (half_bath_active       != null && half_bath_active             != false) {$('#row_half_bath').show();}

            if (water_target != null) {
                $('#row_water').show();
                $('#filed_water_plan').val(water_target);
            }

            if (wake_up_hours_target != null) {
                var string = current_day.wake_up_recomendation;
                $('#wake_up_text').text(string);
                $('#wake_up_tomorrow').text(current_day.wake_up_next_day);


                $('#row_wake_up').show();
                if (wake_up_minutes_target < 10) {
                    var wake_up_time = wake_up_hours_target + ":0" + wake_up_minutes_target;
                } else {
                    var wake_up_time = wake_up_hours_target + ":" + wake_up_minutes_target;
                }

                $('#filed_wake_up_plan').text(wake_up_time);
            }

            if (meditation_day_target != null) {
                $('#row_meditation_day').show();
                $('#filed_meditation_day_plan').val(meditation_day_target);
            }

            if (meditation_night_target != null) {
                $('#row_meditation_night').show();
                $('#filed_meditation_night_plan').val(meditation_night_target);
            }

            if (kaoshiki_minutes_target != null) {
                $('#row_kaoshiki').show();
                $('#filed_kaoshiki_plan').val(kaoshiki_minutes_target);
            }

            if (kirtan_day_target != null) {
                $('#row_kirtan_day').show();
                $('#filed_kirtan_day_plan').val(kirtan_day_target);
            }

            if (kirtan_night_target != null) {
                $('#row_kirtan_night').show();
                $('#filed_kirtan_night_plan').val(kirtan_night_target);
            }

            eat_no_snacking_fact != null && eat_no_snacking_fact !=false ?  $('#filed_no_snacking_fact').prop("checked", true) : $('#filed_no_snacking_fact').prop("checked", false);
            eat_diet_fact        != null && eat_diet_fact        !=false ?  $('#filed_diet')            .prop("checked", true) : $('#filed_diet')            .prop("checked", false);
            tongue_clean_day     != null && tongue_clean_day     !=false ?  $('#filed_tongue_day')      .prop("checked", true) : $('#filed_tongue_day')      .prop("checked", false);
            tongue_clean_night   != null && tongue_clean_night   !=false ?  $('#filed_tongue_night')    .prop("checked", true) : $('#filed_tongue_night')    .prop("checked", false);
            phisic_fact          != null && phisic_fact          !=false ?  $('#filed_phisic')          .prop("checked", true) : $('#filed_phisic')          .prop("checked", false);
            therapy_fact         != null && therapy_fact         !=false ?  $('#filed_therapy')         .prop("checked", true) : $('#filed_therapy')         .prop("checked", false);
            asana_fact           != null && asana_fact           !=false ?  $('#filed_asana')           .prop("checked", true) : $('#filed_asana')           .prop("checked", false);
            psi_fact             != null && psi_fact             !=false ?  $('#filed_psy')             .prop("checked", true) : $('#filed_psy')             .prop("checked", false);
            half_bath_day        != null && half_bath_day        !=false ?  $('#filed_half_bath_day')   .prop("checked", true) : $('#filed_half_bath_day')   .prop("checked", false);
            half_bath_night      != null && half_bath_night      !=false ?  $('#filed_half_bath_night') .prop("checked", true) : $('#filed_half_bath_night') .prop("checked", false);



            var wake_up_time_fact = wake_up_hours_fact + ":" + wake_up_minutes_fact;
            water_fact         != null && water_fact !=false         ?  $('#filed_water_fact').val(water_fact)   : $('#filed_water_fact').val();
            if (wake_up_hours_fact != null && wake_up_hours_fact != false) {

                var minutes = "";
                wake_up_minutes_fact < 10 ? minutes = "0" + wake_up_minutes_fact : minutes = wake_up_minutes_fact

                $('#filed_wake_up_fact_hour').val(wake_up_hours_fact);
                $('#filed_wake_up_fact_minute').val(minutes);
            } else {
                $('#filed_wake_up_fact_hour').val(null);
                $('#filed_wake_up_fact_minute').val(null);
            }


            meditation_day_fact       != null && meditation_day_fact !=false   ?  $('#filed_meditation_day_fact').val(meditation_day_fact)   : $('#filed_meditation_day_fact').val();
            meditation_night_fact     != null && meditation_night_fact !=false ?  $('#filed_meditation_night_fact').val(meditation_night_fact)   : $('#filed_meditation_night_fact').val();
            kaoshiki_minutes_fact     != null && kaoshiki_minutes_fact !=false ?  $('#filed_kaoshiki_fact').val(kaoshiki_minutes_fact)   : $('#filed_kaoshiki_fact').val();
            kirtan_day_fact           != null && kirtan_day_fact !=false       ?  $('#filed_kirtan_day_fact').val(kirtan_day_fact)       : $('#filed_kirtan_day_fact').val();
            kirtan_night_fact         != null && kirtan_night_fact !=false     ?  $('#filed_kirtan_night_fact').val(kirtan_night_fact)   : $('#filed_kirtan_night_fact').val();



            day_comment               != null && day_comment !=false     ?  $('#filed_day_comment').val(day_comment)   : $('#filed_day_comment').val();

        }
        day_show_now = day_num;

        console.log(current_day);


        day_num == 1 ? $('#programm_messenger_link_text').show() : $('#programm_messenger_link_text').show()


        if (current_day.water_target_answer) {
            $('#water_alert_no_answer').hide();
            $('#table_question_water').hide();
        } else {
            if (day_num > 5) {
                $('#water_alert_no_answer').show();
                $('#table_question_water').show();
            } else {
                $('#water_alert_no_answer').hide();
                $('#table_question_water').hide();
            }
        }

        if (current_day.water_target_answer && day_num > 5) {
            $('#water_settings').show();
        }


        if (current_day.wake_up_target_answer) {
            $('#wake_up_alert_no_answer').hide();
            $('#table_question_wake_up').hide();
            $('#wake_up_settings').hide();
        } else {
            if (day_num > 14) {
                $('#wake_up_alert_no_answer').show();
                $('#table_question_wake_up').show();
                $('#wake_up_settings').show();
            } else {
                $('#wake_up_alert_no_answer').hide();
                $('#table_question_wake_up').hide();
                $('#wake_up_settings').hide();
            }
        }

        $('#btn_question_detox_save').hide();
        if (current_day.detox_answer ) {
            $('#table_question_detox').hide();
        } else {
            if (day_num > 26) {
                $('#table_question_detox').show();
            } else {
                $('#table_question_detox').hide();
            }
        }

        if (current_day.half_bath_answer ) {
            $('#table_question_half_bath').hide();
        } else {
            if (day_num > 29) {
                $('#table_question_half_bath').show();
            } else {
                $('#table_question_half_bath').hide();
            }
        }

        if (current_day.therapy_answer ) {
            $('#table_question_therapy').hide();
        } else {
            if (day_num > 32) {
                $('#table_question_therapy').show();
            } else {
                $('#table_question_therapy').hide();
            }
        }



        if (current_day.day_num == marafon_day) {
            $('#user_current_day')    .text("День " + day_num + " (сегодня)");
        } else if (current_day.day_num == marafon_day - 1){
            $('#user_current_day')    .text("День " + day_num + " (вчера)");
        } else if (current_day.day_num == marafon_day + 1) {
            $('#user_current_day')    .text("День " + day_num + " (завтра)");
        } else {
            $('#user_current_day')    .text("День " + day_num + " (" + current_day.day_date + ")");
        }


        $('#btn_user_material')    .val(current_day.day_materials);
        $('#btn_user_previus_day') .val(day_num - 1);
        $('#btn_user_next_day')    .val(day_num + 1);
        $('#btn_user_save_day')    .val(day_num);




        var progress = current_day.day_progress;
        $('#user_progress_bar').css('width', progress+'%').attr('aria-valuenow', progress);
        $('#user_marafon_start').show();
    }
    $('#btn_user_previus_day, #btn_user_next_day').click(function() {
        getDayInfo($(this).val());

    });
    function getDayInfo(day_num){
        if (day_num > 0 && day_num < 61) {
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_info: "get_day_info",
                    day_num: day_num
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    //  console.log(data);
                    if (data.error == 0) {
                        day_new = data.current_day.day_num;
                        setUserMarafonDay(data.current_day, data.marafon_day);
                    } else {
                        alert("Вы не можете просматривать программу на последующие дни")
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    }
    $('#filed_no_snacking_fact, #filed_diet, #filed_tongue_day, #filed_tongue_night, #filed_phisic, #filed_therapy, #filed_asana, #filed_psy, #filed_half_bath_day, #filed_half_bath_night').change(function() {
        userSaveDay();
    });
    $("#filed_water_fact, #filed_meditation_day_fact, #filed_meditation_night_fact, #filed_kaoshiki_fact, #filed_kirtan_day_fact, #filed_kirtan_night_fact, #filed_wake_up_fact_hour, #filed_wake_up_fact_minute, #filed_day_comment").on('change keyup paste', function () {
        userSaveDay();
    });
    function userSaveDay() {
        //console.log("save day");
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_day_status",
                day_num: day_num,
                water_fact:            $('#filed_water_fact')             .val(),
                no_snacking_fact:      $('#filed_no_snacking_fact')       .is(':checked'),
                diet_fact:             $('#filed_diet')                   .is(':checked'),
                wake_up_hours_fact:    $('#filed_wake_up_fact_hour')           .val(),
                wake_up_minutes_fact:  $('#filed_wake_up_fact_minute')         .val(),
                tongue_day:            $('#filed_tongue_day')             .is(':checked'),
                tongue_night:          $('#filed_tongue_night')           .is(':checked'),
                meditation_day_fact:   $('#filed_meditation_day_fact')    .val(),
                meditation_night_fact: $('#filed_meditation_night_fact')  .val(),
                kaoshiki_fact:         $('#filed_kaoshiki_fact')          .val(),
                phisic:                $('#filed_phisic')                 .is(':checked'),
                therapy:               $('#filed_therapy')                .is(':checked'),
                asana:                 $('#filed_asana')                  .is(':checked'),
                psy:                   $('#filed_psy')                    .is(':checked'),
                half_bath_day:         $('#filed_half_bath_day')         .is(':checked'),
                half_bath_night:       $('#filed_half_bath_night')         .is(':checked'),
                kirtan_day_fact:       $('#filed_kirtan_day_fact')        .val(),
                kirtan_night_fact:     $('#filed_kirtan_night_fact')      .val(),
                day_comment:           $('#filed_day_comment')      .val()

                //    question_wake_up_fact: $('#filed_question_wake_up_fact').mTimePicker('getTime'),
                //    question_wake_up_plan: $('#filed_question_wake_up_plan').mTimePicker('getTime')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){

                setUserMarafonDay(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }

    $('#btn_user_material').click(function (){
        var win = window.open($(this).val(), '_blank');
        win.focus();
    });

    $('#btn_question_half_bath_save').click(function (){
        $('#btn_question_half_bath_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_half_bath_answer",
                question_half_bath:       $('#filed_question_half_bath')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_half_bath_save').prop('disabled', false);
                day_new = 0;
                setUserMarafonDay(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_water_save').click(function (){
        $('#btn_question_water_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_water_answer",
                question_water:        $('#filed_question_water')       .val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_water_save').prop('disabled', false);
                setUserMarafonDay(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_wake_up_save').click(function (){
        $('#btn_question_wake_up_save').prop('disabled', true);

        console.log($('#filed_question_wake_up_fact_hour').val() );
        if ($('#filed_question_wake_up_fact_hour').val()  != "" && $('#filed_question_wake_up_fact_minute').val()  != "" && $('#filed_question_wake_up_target_hour').val()  != "" && $('#filed_question_wake_up_target_minute').val( ) != ""){
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "user_save_wake_up_answer",
                    question_wake_up_fact_hour:          $('#filed_question_wake_up_fact_hour')       .val(),
                    question_wake_up_fact_minute:        $('#filed_question_wake_up_fact_minute')       .val(),
                    question_wake_up_target_hour:        $('#filed_question_wake_up_target_hour')       .val(),
                    question_wake_up_target_minute:      $('#filed_question_wake_up_target_minute')       .val()
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_wake_up_save').prop('disabled', false);
                    setUserMarafonDay(data.current_day, data.marafon_day);
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });

        } else {
            alert("Заполните все поля");
            $('#btn_question_wake_up_save').prop('disabled', false);
        }
    });
    $('#btn_question_hour_tail_save').click(function (){
        $('#btn_question_hour_tail_save').prop('disabled', true);

        if ($('#filed_question_hour_tail').val() > 12 ||  $('#filed_question_hour_tail').val() < -12) {
            alert("Введите корректное значение от -12 до 12");
            $('#btn_question_hour_tail_save').prop('disabled', false);
        } else {
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "user_save_hour_tail_answer",
                    answer_hour_tail:        $('#filed_question_hour_tail')       .val()
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_hour_tail_save').prop('disabled', false);
                    setUserMarafonDay(data.current_day, data.marafon_day);
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });

    var detox_type, detox_time, detox_time_edit = 0, detox_start, detox_start_edit = 0;
    var detox_days, detox_last_date;
    $(document).on('click', '.link_detox_type',  function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_type').text($(this).text());
        detox_type = $(this).attr("name");

        switch (parseInt(detox_type)){
            case 1:
                detox_days = 30;
                break;
            case 2:
                detox_days = 20;
                break;
            case 3:
                detox_days = 15;
                break;
            case 4:
                detox_days = 5;
                break;
        }

        var i;
        var detox_time_row      = '';
        for (i = 1; i < detox_days + 1; i++) {
            detox_time_row      += '<li><a href="#" class="link_detox_time" name="'+ i +'">' + i + '</a></li>';
        }
        $('#detox_answer_time') .empty();
        $('#detox_answer_time') .append(detox_time_row);
        $('#row_quest_detox_time').show();
        $('#row_quest_detox_start').hide();
        $('#btn_question_detox_save').hide();
        detox_time = null;
        detox_start = null;
        $('#btn_dd_detox_time').text("Кол-во дней");
        $('#btn_dd_detox_start').text("День старта");
    });
    $(document).on('click', '.link_detox_time',  function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_time').text($(this).text());
        detox_time = parseInt($(this).attr("name"));

        switch (parseInt(detox_type)){
            case 1:
                detox_last_date = 60 - detox_days - 2;
                break;
            case 2:
                detox_last_date = 60 - detox_time - 2 - 5;
                break;
            case 3:
                detox_last_date = 60 - detox_time - 2 - 2 - 5;
                break;
            case 4:
                detox_last_date = 60 - detox_time - 2 - 1 - 1 - 2 - 1 - 2 - 5;
                break;
        }

        var i;
        var detox_start      = '';
        for (i = 28; i < detox_last_date + 1; i++) {
            detox_start      += '<li><a href="#" class="link_detox_start" name="'+ i +'">' + i + " день" + '</a></li>';
        }
        $('#detox_answer_start') .empty();
        $('#detox_answer_start') .append(detox_start);

        $('#row_quest_detox_start').show();
        $('#btn_question_detox_save').hide();
        detox_start = null;
        $('#btn_dd_detox_start').text("День старта");
    });
    $(document).on('click', '.link_detox_start', function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_start').text($(this).text());
        detox_start = $(this).attr("name");
        $('#btn_question_detox_save').show();
    });
    $('#btn_question_detox_save').click(function (){
        if (detox_type !== null && detox_time !== null && detox_start !== null){
            $('#btn_question_detox_save').prop('disabled', true);
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "user_save_detox_answer",
                    detox_type:      detox_type,
                    detox_time:      detox_time,
                    detox_start:     detox_start
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_detox_save').prop('disabled', false);
                    setUserMarafonDay(data.current_day, data.marafon_day);
                    update_user_info();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert("Сначала ответьте на все вопросы")
        }

    });

    var therapy_type = "";
    $(document).on('click', '.link_therapy_type',  function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_therapy_type').text($(this).text());
        therapy_type = $(this).attr("name");
    });
    $('#btn_question_therapy_save').click(function (){
        if (therapy_type !== ""){
            $('#btn_question_therapy_save').prop('disabled', true);
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "user_save_therapy_answer",
                        therapy_type: therapy_type
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_therapy_save').prop('disabled', false);
                    update_user_info();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert("Сначала ответьте на все вопросы")
        }

    });

//Diary
    $('#nav_user_diary').click(function (){
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: "get_user_diary"},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data) {
                setUserDiary(data.user_diary);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    function setUserDiary(diary){
        var diary_row = '<table id="table_diary" class="table table-hover table-bordered table-condensed" >';
        diary_row    += '<thead><tr> <th>День</th> <th>Описание</th> <th>Выполнено</th><th>Запись</th></tr></thead><tbody>';
        $.each(diary, function (i, item) {
            diary_row += '<tr>';
            diary_row += '<td><h5 align="center"><a href="#" class="diary_day reg_link" name="' + item.day_num +'">' + item.day_num + '</a></h5></td>';
            diary_row += '<td><h5><a href="'+ item.day_materials +'" class="reg_link" target="_blank">' + item.day_description + '</a></h5></td>';
            diary_row += '<td><h5 align="center">' + item.day_progress + '</h5></td>';
            diary_row += '<td><h5>' + item.day_comment + '</h5></td>';
            diary_row += '</tr>';
        });
        diary_row += '</tbody></table';
        $('#user_diary').empty();
        $('#user_diary').append(diary_row);
    }

    $(document).on('click', '.diary_day', function () {
        console.log($(this).attr("name"));
        hide_all_in_user();
        $('#page_user_programm').show();
        getDayInfo($(this).attr("name"));
    });

//Settings
    $('#btn_water_edit').click(function (){
        $('#btn_water_edit').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_edit_water_answer",
                question_water:        $('#filed_question_water_edit')       .val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_water_edit').prop('disabled', false);
                update_user_info();
                hide_all_in_user();
                $('#page_user_programm').show();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_wake_up_edit').click(function (){
        $('#btn_wake_up_edit').prop('disabled', true);

        if ($('#filed_question_wake_up_hour_edit').val()  != "" && $('#filed_question_wake_up_minute_edit').val()  != "") {
            $.ajax({
                type: "GET",
                url: api_url_full,
                data: {
                    query_update: "user_edit_wake_up_answer",
                    wake_up_hour:   $('#filed_question_wake_up_hour_edit').val(),
                    wake_up_minute: $('#filed_question_wake_up_minute_edit').val()
                },
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    $('#btn_wake_up_edit').prop('disabled', false);
                    day_new = 0;
                    update_user_info();
                    hide_all_in_user();
                    $('#page_user_programm').show();
                },
                failure: function (errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert ("Заполните все поля");
            $('#btn_wake_up_edit').prop('disabled', false);

        }
    });

    $(document).on('click', '.link_detox_time_edit',  function () {
        $('#btn_dd_detox_time_edit').text($(this).text());
        detox_time_edit = parseInt($(this).attr("name"));
    });
    $('#btn_detox_edit_time').click(function (){
        if (detox_time_edit !== 0){
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update:   "detox_edit_time",
                    detox_time_new: detox_time_edit},
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    day_new = 0;
                    update_user_info();
                    hide_all_in_user();
                    $('#page_user_programm').show();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert ("Сначала выберите желаемое кол-во дней")
        }

    });
    $(document).on('click', '.link_detox_start_edit',  function () {
        $('#btn_dd_detox_start_edit').text($(this).text());
        detox_start_edit = parseInt($(this).attr("name"));
    });
    $('#btn_detox_edit_start').click(function (){
        if (detox_start_edit !== 0){
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update:   "detox_edit_start",
                    detox_start_new: detox_start_edit},
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){

                    day_new = 0;
                    update_user_info();
                    hide_all_in_user();
                    $('#page_user_programm').show();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert ("Сначала выберите желаемое кол-во дней")
        }

    });
    $('#btn_detox_stop').click(function (){
        $('#btn_detox_stop').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "detox_stop"},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#modal_detox_stop') .modal('hide');
                $('#btn_detox_stop').prop('disabled', false);
                day_new = 0;
                update_user_info();
                hide_all_in_user();
                $('#page_user_programm').show();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $('#btn_password_save').click(function() {
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_new_password",
                    password_old: $('#password_old').val(),
                    password_new: $('#password_new').val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){

                if (data.error == 0) {
                    alert("Новый пароль установлен");
                } else {
                    alert("Новый пароль не установлен");
                }

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });


    $('#btn_7day_edit').click(function() {
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_change_7day_practic",
                show_practic: $('#filed_7day').is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

/////////////////////////////////////  ADMIN  ////////////////////////////////////////////////////////

//Groups
    var group_curator_id;
    function setGroups(groups){
        var groups_selector  = '<option>Выберите группу</option>';

        var groups_row = '<table id="groups" class="table table-hover table-bordered table-condensed" >';
        groups_row    += '<thead><tr> <th>Название</th> <th>Дата старта</th> <th>Куратор</th>  <th>Участников</th> </tr></thead><tbody>';
        $.each(groups, function (i, item) {
            groups_row += '<tr><td><h5>';
            groups_row += item.group_name    + '</h5></td><td><h5>';
            groups_row += item.group_start   + '</h5></td><td><h5>';
            groups_row += item.group_curator + '</h5></td><td><h5>';
            groups_row += item.group_users   + '</h5></td>';
            groups_row += '<td><button type="button" class="btn btn-info    btn-sm" name="btns_group_info"   value="'  +  item.group_id + '"  > <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button></td>';
            groups_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_group_edit"   value="'  +  item.group_id + '"  data-toggle="modal" data-target="#modal_group_edit"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            groups_row += '<td><button type="button" class="btn btn-danger  btn-sm" name="btns_group_delete" value="'  +  item.group_id + '"  data-toggle="modal" data-target="#modal_group_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
            groups_row += '</tr>';

            groups_selector  += '<option data-tokens="'+ item.group_name +'" name="group_select"      value="' + item.group_id + '">' + item.group_name  + '</option>';
        });
        groups_row += '</tbody></table';
        $('#groups_table') .empty();
        $('#groups_table').append(groups_row);
        $('#groups_table').bsTable(undefined, false, undefined, undefined, true);

        $('#group_add_user').empty();
        $('#group_add_user').append(groups_selector);
        $('#group_add_user').selectpicker("deselectAll");
        $('#group_add_user').selectpicker("refresh");
    }
    $('#group_add_curator').on('changed.bs.select', function () {
        //console.log($(this).find("option:selected").val());
        group_curator_id = $(this).find("option:selected").val();
    });
    var group_messenger = "";
    $(document).on('click', '.messenger_link_group',       function () {
        //  console.log($(this).attr("name"));
        $('#btn_dd_messenger_group').text($(this).attr("name"));
        group_messenger = $(this).attr("name");
    });
    $('#btn_group_add').click(function () {
        $('#btn_group_add').prop('disabled', true);

        var group_name   = $('#group_name') .val();
        var group_start  = $('#group_start').val();
        var group_messenger_link  = $('#group_messenger_link').val();

        if (group_name == null || group_curator_id == null || group_start === "" || group_messenger === "" || group_messenger_link === "") {
            alert("Заполните все поля");
        } else {
            $.ajax({
                type: "GET",
                url: api_url_full,
                data: { query_update:     "create_group",
                    group_name        : group_name,
                    group_start       : group_start,
                    group_curator_id  : group_curator_id,
                    group_messenger   : group_messenger,
                    group_messenger_link   : group_messenger_link
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    console.log(data);
                    if (data.access == 1) {
                        $('#btn_group_add').prop('disabled', false);
                        $('#modal_add_group').modal('hide');
                        $('#btn_dd_messenger_group').text("Выберите способ");
                        group_messenger = "";
                        update_admin_info();
                    } else {no_access();}
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });

    $(document).on('click', '[name="btns_group_edit"]', function() {
        $('#btn_group_edit').val($(this).val());
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: { query_info: "group_info", group_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                $('#group_name_edit').val(data.group.group_name);
                $('#group_messenger_link_edit').val(data.group.messenger_link);

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_group_edit').click(function () {
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: { query_update:    "group_edit",
                    group_id:        $(this).val(),
                    group_name:      $('#group_name_edit').val(),
                    group_messenger: $('#group_messenger_link_edit').val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                //console.log(data);
                hide_all_in_admin();
                $('#page_groups')  .show();
                update_admin_info();
                $('#modal_group_edit') .modal('hide');
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '[name="btns_group_delete"]', function() {
        $('#btn_group_delete').val($(this).val());
    });
    $('#btn_group_delete').click(function () {
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: { query_update: "group_delete", group_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                //console.log(data);
                if (data.error == 0) {
                    hide_all_in_admin();
                    $('#page_groups')  .show();
                    update_admin_info();
                    $('#modal_group_delete') .modal('hide');
                }

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '[name="btns_group_info"]' , function() {
        //console.log($(this).val());
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: "get_group_info",
                group_id: $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                //  console.log(data);
                hide_all_in_admin();
                $('#page_group_info').show();
                $('#group_info_name')   .text(data.group_name);
                $('#group_info_curator').text(" (куратор: " + data.group_curator + ")");

                var group_users_row = '<table id="group_users" class="table table-hover table-bordered table-condensed" >';
                group_users_row    += '<thead><tr> <th>Имя</th> <th>Телефон</th>  <th>Ссылка ВК</th><th>Почта</th> </tr></thead><tbody>';
                $.each(data.group_users, function (i, item) {
                    group_users_row += '<tr><td><h5>';
                    group_users_row += item.first_name    + '</h5></td><td><h5>';
                    group_users_row += item.phone    + '</h5></td>';
                    if (item.social_link == null) {
                        group_users_row += '<td><h5>' + "-" + '</h5></td>';
                    } else {
                        group_users_row +='<td><a href="' + item.social_link + '" target="_blank">' + item.social_link + '</a></td>';
                    }
                    group_users_row += '<td><h5>' + item.email + '</h5></td>';


                    group_users_row += '<td><button type="button" class="btn btn-info btn-sm"   name="btns_group_user_info"   value="'  +  item.id + '"  > <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button></td>';
                    group_users_row += '<td><button type="button" class="btn btn-danger btn-sm" name="btns_group_user_delete" value="'  +  item.id + '"  data-toggle="modal" data-target="#modal_group_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';
                    group_users_row += '</tr>';

                });
                group_users_row += '</tbody></table';
                $('#table_group_users') .empty();
                $('#table_group_users').append(group_users_row);
                $('#table_group_users').bsTable(undefined, true, undefined, undefined, true);

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_group_back').click(function() {
        $('#page_group_info').hide();
        $('#page_groups').show();
    });
    $(document).on('click', '[name="btns_group_user_delete"]', function() {
        $('#btn_group_user_delete').val($(this).val());
    });
    $('#btn_group_user_delete').click(function () {
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: { query_update: "group_user_delete", user_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                //  console.log(data);
                if (data.error == 0) {
                    hide_all_in_admin();
                    $('#page_groups')  .show();
                    update_admin_info();
                    $('#modal_group_user_delete') .modal('hide');
                }

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $(document).on('click', '[name="btns_group_user_info"]' , function() {
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: "get_group_user_info",
                user_id: $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#page_group_info').hide();
                $('#page_user_info') .show();
                setUserProgramm(data.user_programm);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    function setUserProgramm(user_programm) {
        //  console.log(user_programm);

        var user_programm_row = '<table id="table_programm_main1" class="table table-hover table-bordered table-condensed" >';
        user_programm_row    += '<thead><tr> <th>День</th> <th>Вода</th><th>Перекусы</th><th>Диета статус</th><th>Диета тип</th><th>Подъем</th><th>Язык</th>';
        user_programm_row    += '        <th>Медитация (утро)</th> <th>Медитация (вечер)</th><th>Каушики</th><th>Физ. упр.</th><th>Терапии</th><th>Асаны</th>';
        user_programm_row    += '        <th>Псих. упр.</th><th>Полуванна</th> <th>Киртан (утро)</th><th>Киртан (вечер)</th>';
        user_programm_row    += '</tr></thead><tbody>';
        $.each(user_programm, function (i, item) {
            var day_num = item.day_num;

            user_programm_row += '<tr>';
            user_programm_row += '<td><h5>' + day_num + '</h5></td>';

            if (day_num >= 7 ) {
                if (item.water_target != null){
                    if (item.water_fact != null) {
                        user_programm_row += '<td class="warning""><h5>' + item.water_fact + " (" + item.water_target + ")" + '</h5></td>';
                    } else {
                        user_programm_row += '<td class="warning""><h5>' + "0" + " (" + item.water_target + ")" + '</h5></td>';
                    }
                } else {
                    user_programm_row += '<td class="warning""><h5></h5></td>';
                }
            } else {
                user_programm_row +='<td><h5>' +  "" + '</h5></td>';
            }

            if ( item.eat_no_snacking_active != null  &&  item.eat_no_snacking_active != false) {
                if (item.eat_no_snacking_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.eat_diet_active != null  &&  item.eat_diet_active != false) {
                if (item.eat_diet_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.eat_diet_active != null  &&  item.eat_diet_active != false) {
                user_programm_row += '<td class="warning"><h5>' + item.eat_diet_description  + '</h5></td>';
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if (day_num >= 12) {
                if (item.wake_up_hours_target != null) {
                    var wake_up_string_target = "";
                    item.wake_up_minutes_target < 10 ? wake_up_string_target = item.wake_up_hours_target + ":0" + item.wake_up_minutes_target : wake_up_string_target = item.wake_up_hours_target + ":" + item.wake_up_minutes_target

                    var wake_up_string_fact   = "";
                    item.wake_up_minutes_fact < 10 ? wake_up_string_fact = item.wake_up_hours_fact + ":0" + item.wake_up_minutes_fact : wake_up_string_fact = item.wake_up_hours_fact + ":" + item.wake_up_minutes_fact


                    if (item.wake_up_hours_fact != null) {
                        user_programm_row += '<td class="warning"><h5>' + wake_up_string_fact + "(" + wake_up_string_target + ")" + '</h5></td>';
                    } else {
                        user_programm_row += '<td class="warning"><h5>' + "-" + "(" + wake_up_string_target + ")" + '</h5></td>';
                    }
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row +='<td><h5>' +  "" + '</h5></td>';
            }


            if ( item.tongue_clean_active != null  &&  item.tongue_clean_active != false) {
                if (item.tongue_clean_day && item.tongue_clean_night) {
                    user_programm_row += '<td class="warning"><h5>' + "+ +"  + '</h5></td>';
                } else if (item.tongue_clean_day || item.tongue_clean_night) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }


            if (item.meditation_day_target != null) {
                var meditation_day_fact;
                item.meditation_day_fact != null ? meditation_day_fact = item.meditation_day_fact : meditation_day_fact = 0;

                user_programm_row += '<td class="warning""><h5>' + meditation_day_fact + " (" + item.meditation_day_target + ")" + '</h5></td>';
            } else {
                user_programm_row +='<td><h5></h5></td>';
            }

            if (item.meditation_night_target != null) {
                var meditation_night_fact;
                item.meditation_night_fact != null ? meditation_night_fact = item.meditation_night_fact : meditation_night_fact = 0;

                user_programm_row += '<td class="warning""><h5>' + meditation_night_fact + " (" + item.meditation_night_target + ")" + '</h5></td>';
            } else {
                user_programm_row +='<td><h5></h5></td>';
            }

            if (item.kaoshiki_minutes_target != null) {
                var kaoshiki_minutes_fact;
                item.kaoshiki_minutes_fact != null ? kaoshiki_minutes_fact = item.kaoshiki_minutes_fact : kaoshiki_minutes_fact = 0;

                user_programm_row += '<td class="warning""><h5>' + kaoshiki_minutes_fact + " (" + item.kaoshiki_minutes_target + ")" + '</h5></td>';
            } else {
                user_programm_row +='<td><h5></h5></td>';
            }



            if ( item.phisic_active != null  &&  item.phisic_active != false) {
                if (item.phisic_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }


            if ( item.therapy_active != null  &&  item.therapy_active != false) {
                if (item.therapy_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.asana_active != null  &&  item.asana_active != false) {
                if (item.asana_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.psi_active != null  &&  item.psi_active != false) {
                if (item.psi_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }



            if ( item.half_bath_active != null  &&  item.half_bath_active != false) {
                if (item.half_bath_day && item.half_bath_night) {
                    user_programm_row += '<td class="warning"><h5>' + "+ +"  + '</h5></td>';
                } else if (item.half_bath_day || item.half_bath_night) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }



            if (item.kirtan_day_target != null) {
                var kirtan_day_fact;
                item.kirtan_day_fact != null ? kirtan_day_fact = item.kirtan_day_fact : kirtan_day_fact = 0;

                user_programm_row += '<td class="warning""><h5>' + kirtan_day_fact + " (" + item.kirtan_day_target + ")" + '</h5></td>';
            } else {
                user_programm_row +='<td><h5></h5></td>';
            }

            if (item.kirtan_night_target != null) {
                var kirtan_night_fact;
                item.kirtan_night_fact != null ? kirtan_night_fact = item.kirtan_night_fact : kirtan_night_fact = 0;

                user_programm_row += '<td class="warning""><h5>' + kirtan_night_fact + " (" + item.kirtan_night_target + ")" + '</h5></td>';
            } else {
                user_programm_row +='<td><h5></h5></td>';
            }

            user_programm_row += '<td><button type="button" class="btn btn-default btn-sm " name="btns_edit_programm_main"    value="'  +  item.day_id + '"  data-toggle="modal" data-target="#modal_edit_programm_main"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            user_programm_row += '</tr>';
        });
        user_programm_row += '</tbody></table';
        $('#table_user_programm').empty();
        $('#table_user_programm').append(user_programm_row);
        $('#table_user_programm').bsTable(undefined, false, undefined, undefined, true);

    }
    $('#btn_user_back').click(function() {
        $('#page_user_info') .hide();
        $('#page_group_info').show();
    });


//Curators
    function setCurators(curators){
        var curators_selector  = '<option>Выберите куратора</option>';

        var curators_row = '<table id="curators" class="table table-hover table-bordered table-condensed" >';
        curators_row    += '<thead><tr> <th>Имя куратора</th> <th>Телефон</th>  <th>Ссылка ВК</th> <th>Логин</th> <th>Пароль</th> </tr></thead><tbody>';
        $.each(curators, function (i, item) {
            curators_row += '<tr><td><h5>';
            curators_row += item.curator_name  + '</h5></td><td><h5>';
            curators_row += item.curator_phone + '</h5></td><td><h5>';
            curators_row += item.curator_vk    + '</h5></td><td><h5>';
            curators_row += item.curator_login + '</h5></td><td><h5>';
            curators_row += item.curator_pass  + '</h5></td>';
            curators_row += '</tr>';

            curators_selector  += '<option data-tokens="'+ item.curator_name +'" name="curator_select"      value="' + item.curator_id + '">' + item.curator_name  + '</option>';


        });
        curators_row += '</tbody></table';
        $('#curators_table') .empty();
        $('#curators_table').append(curators_row);
        $('#curators_table').bsTable(undefined, false, undefined, undefined, true);
        $('#group_add_curator').empty();
        $('#group_add_curator').append(curators_selector);
        $('#group_add_curator').selectpicker("deselectAll");
        $('#group_add_curator').selectpicker("refresh");
    }
    $('#btn_curator_add') .click(function () {
        $('#btn_curator_add').prop('disabled', true);

        var curator_add_name  = $('#curator_add_name') .val();
        var curator_add_phone = $('#curator_add_phone').val();
        var curator_add_vk    = $('#curator_add_vk')   .val();
        var curator_add_pass  = $('#curator_add_pass') .val();

        if (curator_add_phone == null || curator_add_pass == null) {
            alert("Поля логин и пароль обязательны к заполнению");
        } else {
            $.ajax({
                type: "GET",
                url: api_url_full,
                data: { query_update: "create_curator",
                    curator_add_name  : curator_add_name,
                    curator_add_phone : curator_add_phone,
                    curator_add_vk    : curator_add_vk,
                    curator_add_pass  : curator_add_pass
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    //  console.log(data);
                    if (data.access == 1) {
                        $('#btn_curator_add').prop('disabled', false);
                        $('#modal_add_curator').modal('hide');
                        update_admin_info();
                    } else {no_access();}
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });


//Users
    function setUsers(users){
        var user_register_row = '<table id="table_users_register1" class="table table-hover table-bordered table-condensed" >';
        user_register_row    += '<thead><tr>';
        user_register_row    += '<th>Имя</th>';
        user_register_row    += '<th>Почта</th>';
        user_register_row    += '<th>Телефон</th>';
        user_register_row    += '<th>Пароль</th>';
        user_register_row    += '<th>Ссылка соц.сети</th>';
        user_register_row    += '<th>Мессенджер</th>';
        user_register_row    += '<th>Комментарий</th>';
        user_register_row    += '<th>План оплата</th>';
        user_register_row    += '</tr></thead><tbody>';
        $.each(users.user_reg, function (i, item) {
            user_register_row += '<tr>';
            user_register_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_social_link            + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_messenger          + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_comment            + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_payment_size_plan  + '</h5></td>';
            user_register_row += '<td><button type="button" class="btn btn-success btn-sm" name="btns_confirm_pay" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_confirm_pay"> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></td>';
            user_register_row += '</tr>';
        });
        user_register_row += '</tbody></table';
        $('#table_users_register').empty();
        $('#table_users_register').append(user_register_row);
        $('#table_users_register').bsTable(undefined, false, undefined, undefined, true);



        var user_pay_row = '<table id="table_users_pay1" class="table table-hover table-bordered table-condensed" >';
        user_pay_row    += '<thead><tr>';
        user_pay_row    += '<th>Имя</th>';
        user_pay_row    += '<th>Почта</th>';
        user_pay_row    += '<th>Телефон</th>';
        user_pay_row    += '<th>Пароль</th>';
        user_pay_row    += '<th>Ссылка соц.сети</th>';
        user_pay_row    += '<th>Мессенджер</th>';
        user_pay_row    += '<th>Комментарий</th>';
        user_pay_row    += '<th>План оплата</th>';
        user_pay_row    += '<th>Факт оплата</th>';
        user_pay_row    += '</tr></thead><tbody>';
        $.each(users.user_pay, function (i, item) {
            user_pay_row += '<tr>';
            user_pay_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_link_vk            + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_messenger          + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_comment            + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_payment_size_plan  + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_payment_size_fact  + '</h5></td>';
            user_pay_row += '<td><button type="button" class="btn btn-success btn-sm" name="btns_to_group" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_to_group"> <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></button></td>';
            user_pay_row += '<td><button type="button" class="btn btn-danger btn-sm"  name="btns_user_delete" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';

            user_pay_row += '</tr>';
        });
        user_pay_row += '</tbody></table';
        $('#table_users_pay').empty();
        $('#table_users_pay').append(user_pay_row);
        $('#table_users_pay').bsTable(undefined, false, undefined, undefined, true);

        var user_in_group_row = '<table id="table_users_pay1" class="table table-hover table-bordered table-condensed" >';
        user_in_group_row    += '<thead><tr>';
        user_in_group_row    += '<th>Имя</th>';
        user_in_group_row    += '<th>Почта</th>';
        user_in_group_row    += '<th>Телефон(Логин)</th>';
        user_in_group_row    += '<th>Пароль</th>';
        user_in_group_row    += '<th>Ссылка ВК</th>';
        user_in_group_row    += '<th>Мессенджер</th>';
        user_in_group_row    += '<th>Комментарий</th>';
        user_in_group_row    += '<th>План оплата</th>';
        user_in_group_row    += '<th>Факт оплата</th>';
        user_in_group_row    += '<th>Группа</th>';
        user_in_group_row    += '<th></th>';
        user_in_group_row    += '</tr></thead><tbody>';

        $.each(users.user_group, function (i, item) {
            user_in_group_row += '<tr>';
            user_in_group_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_link_vk            + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_messenger          + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_comment            + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_payment_size_plan  + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_payment_size_fact  + '</h5></td>';
            user_in_group_row += '<td><h5>' + item.user_group              + '</h5></td>';

            user_in_group_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_edit_user" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_edit_user"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            user_in_group_row += '</tr>';
        });
        user_in_group_row += '</tbody></table';
        $('#table_users_in_group').empty();
        $('#table_users_in_group').append(user_in_group_row);
        $('#table_users_in_group').bsTable(undefined, false, undefined, undefined, true);
    }

    var user_messenger = "";
    $('#btn_modal_register').click(function () {
        var pass = Math.floor(Math.random() * 10000) + 1;
        while (pass < 1000 && pass > 10000) {
            pass = Math.floor(Math.random() * 10000) + 1;
        }

        //  console.log("pass " + pass);
        $('#field_user_password').val(pass);
    });
    $(document).on('click', '.messenger_link',       function () {
        //  console.log($(this).attr("name"));
        $('#btn_dd_messenger').text($(this).attr("name"));
        user_messenger = $(this).attr("name");
    });
    $('#btn_register').click(function () {
        var user_name      = $('#field_user_name').val();
        var user_email     = $('#field_user_email').val();
        var user_password  = $('#field_user_password').val();
        var user_vk        = $('#field_user_vk').val();
        var user_fb        = $('#field_user_fb').val();

        var user_phone        = $('#field_user_phone').val();
        var user_payment_plan = $('#field_user_payment_plan').val();
        var user_comment      = $('#field_user_comment').val();


        if (user_name == null || user_email == null || user_password == null ){
            alert("Заполните все поля");
        } else {
            var person  = {
                email:    user_email,
                name:     user_name,
                password: user_password,
                link_vk:  user_vk,

                phone:             user_phone,
                messenger:         user_messenger,
                payment_size_plan: user_payment_plan,
                comment:           user_comment};
            /*
                        $.ajax({
                            type: "POST",
                            url:   api_url_full,
                            data: JSON.stringify(person),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function(data){
                              //  console.log("Reg data " + JSON.stringify(data));
                                // getToken(input_address, input_password);
                                alert("Зарегистрирован");
                                update_admin_info();
                                $('#modal_register') .modal('hide');

                            },
                            failure: function(errMsg) {
                                alert(errMsg);
                            }
                        });
            */
            $.ajax({
                type: "GET",
                url: api_url_full,
                data: { query_update: "user_create",
                    email:    user_email,
                    name:     user_name,
                    password: user_password,
                    link_vk:  user_vk,
                    link_fb:  user_fb,
                    phone:             user_phone,
                    messenger:         user_messenger,
                    payment_size_plan: user_payment_plan,
                    comment:           user_comment},
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    console.log(data);
                    if (data.error == 0) {
                        update_admin_info();
                        $('#modal_register') .modal('hide');
                    }
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });

        }
    });

    $(document).on('click', '[name="btns_edit_user"]' , function() {
        // console.log($(this).val());
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "get_user_edit_info",
                user_id:  $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_admin_info();
                $('#btn_edit_user').val(data.user.id);
                $('#field_user_edit_email').val(data.user.email);
                $('#field_user_edit_name') .val(data.user.first_name);
                $('#field_user_edit_phone').val(data.user.phone);
                $('#field_user_edit_vk')   .val(data.user.link_vk);
                $('#field_user_edit_fb')   .val(data.user.link_fb);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });

    });
    $('#btn_edit_user').click(function () {
        var user_email      = $('#field_user_edit_email').val();
        var user_name       = $('#field_user_edit_name') .val();
        var user_phone      = $('#field_user_edit_phone').val();
        var user_link_vk    = $('#field_user_edit_vk')   .val();
        var user_link_fb    = $('#field_user_edit_fb')   .val();

        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "edit_user",
                user_id: $(this).val(),
                user_email:  user_email,
                user_name:   user_name,
                user_phone:  user_phone,
                user_link_vk:     user_link_vk,
                user_link_fb:     user_link_fb
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_admin_info();
                $('#modal_edit_user') .modal('hide');},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $('#btn_hide_user_register').click(function (){
        if ($('#div_table_users_register').is(":visible")){
            $('#div_table_users_register').hide();
        } else {
            $('#div_table_users_register').show();
        }
    });
    $('#btn_hide_user_paid')    .click(function (){
        if ($('#div_table_users_pay').is(":visible")){
            $('#div_table_users_pay').hide();
        } else {
            $('#div_table_users_pay').show();
        }
    });
    $('#btn_hide_user_group')   .click(function (){
        if ($('#div_table_users_in_group').is(":visible")){
            $('#div_table_users_in_group').hide();
        } else {
            $('#div_table_users_in_group').show();
        }
    });
    $(document).on('click', '[name="btns_confirm_pay"]' , function() {
        // console.log($(this).val());
        $('#btn_confirm_pay').val($(this).val());
    });
    $('#btn_confirm_pay').click(function () {
        var payment_date       = $('#payment_date').val();
        var payment_size       = $('#payment_size').val();
        var payment_method     = $('#payment_method').val();

        if (payment_date == "" || payment_size == null || payment_method == null ) {
            alert("Заполните все поля");
        } else {
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "confirm_pay",
                    user_id:            $(this).val(),
                    payment_date:       payment_date,
                    payment_size:       payment_size,
                    payment_method:     payment_method       },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    update_admin_info();
                    $('#modal_confirm_pay') .modal('hide');
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });
    $(document).on('click', '[name="btns_user_delete"]', function() {
        $('#btn_user_delete').val($(this).val());
    });
    $('#btn_user_delete').click(function () {
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: { query_update: "user_delete", user_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                // console.log(data);
                if (data.error == 0) {
                    update_admin_info();
                    $('#modal_user_delete') .modal('hide');
                }

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    var group_id;
    $(document).on('click', '[name="btns_to_group"]' , function() {
        //  console.log($(this).val());
        $('#btn_to_group').val($(this).val());
    });
    $('#group_add_user').on('changed.bs.select', function () {
        // console.log($(this).find("option:selected").val());
        group_id = $(this).find("option:selected").val();
    });
    $('#btn_to_group').click(function () {
        if (group_id == null) {
            alert("Выберите группу");
        } else {
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "join_to_group",
                    user_id:       $(this).val(),
                    group_id:      group_id   },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    update_admin_info();
                    $('#modal_to_group') .modal('hide');
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });



//Program main
    function setProgrammMain(programm_main){
        programm_days_main = programm_main;
        var programm_main_row = '<table id="table_programm_main1" class="table table-hover table-bordered table-condensed" >';
        programm_main_row    += '<thead><tr> <th>День</th> <th>Перекусы</th><th>Диета</th><th>Язык</th>';
            programm_main_row    += '        <th>Медитация (утро)</th> <th>Медитация (вечер)</th><th>Каушики</th><th>Физ. упр.</th><th>Терапии</th><th>Асаны</th>';
            programm_main_row    += '        <th>Псих. упр.</th> <th></th><th></th>';
        programm_main_row    += '</tr></thead><tbody>';
        $.each(programm_main, function (i, item) {
            programm_main_row += '<tr><td><h5>';
            programm_main_row += item.day_num  + '</h5></td><td><h5>';

            item.eat_no_snacking_active != null  &&  item.eat_no_snacking_active != false   ? programm_main_row += "+"  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.eat_diet_active        != null  &&  item.eat_diet_activ         != false   ? programm_main_row += item.eat_diet_description  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';


            item.tongue_clean_active != null &&  item.tongue_clean_active != false       ? programm_main_row += "+"  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';


            item.meditation_day_target != null                          ? programm_main_row += item.meditation_day_target + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.meditation_night_target != null                        ? programm_main_row += item.meditation_night_target + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.kaoshiki_minutes_target != null                        ? programm_main_row += item.kaoshiki_minutes_target + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';



            item.phisic_active != null && item.phisic_active   !=false       ? programm_main_row += "+"  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.therapy_active != null && item.therapy_active != false      ? programm_main_row += "+"  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.asana_active  != null && item.asana_active    !=false       ? programm_main_row += "+"  + '</h5></td><td><h5>' : programm_main_row += "" + '</h5></td><td><h5>';
            item.psi_active     != null && item.psi_active     != false      ? programm_main_row += "+"  + '</h5></td>' : programm_main_row += "" + '</h5></td>';


            programm_main_row += '<td><button type="button" class="btn btn-default btn-sm" name="btns_edit_programm_main"     value="'  +  item.day_id + '"  data-toggle="modal" data-target="#modal_edit_programm_main"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';

            if (item.day_num != 60) {
                programm_main_row += '<td><button type="button" class="btn btn-default btn-sm" name="btns_copy_day_programm_main" value="'  +  item.day_num + '"  > <span class="glyphicon glyphicon-copy" aria-hidden="true"></span></button></td>';
            }
            programm_main_row += '</tr>';
        });
        programm_main_row += '</tbody></table';
        $('#table_programm_main').empty();
        $('#table_programm_main').append(programm_main_row);
        $('#table_programm_main').bsTable(undefined, false, undefined, undefined, true);
    }

    $(document).on('click', '[name="btns_edit_programm_main"]' , function() {
       // console.log($(this).val());
        $('#btn_edit_programm_main').val($(this).val());

        $('#field_eat_no_snacking_active') .prop("checked", false);
        $('#field_eat_diet_active')        .prop("checked", false);
        $('#field_eat_diet_description')   .val();
        $('#field_tongue_clean_active')    .prop("checked", false);
        $('#field_meditation_day_target')  .val();
        $('#field_meditation_night_target').val();
        $('#field_kaoshiki_minutes_target').val();
        $('#field_phisic_active')          .prop("checked", false);
        $('#field_therapy_active')          .prop("checked", false);
        $('#field_therapy_decription')     .val();
        $('#field_asana_active')           .prop("checked", false);
        $('#field_psi_active')              .prop("checked", false);
        $('#field_half_bath_active')              .prop("checked", false);


        $('#field_kirtan_day_target')      .val();
        $('#field_kirtan_night_target')    .val();
        $('#field_time_to_read')           .val();
        $('#field_time_to_practise')       .val();
        $('#field_day_materials')          .val();
        $('#field_day_comment')          .val();


        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: "get_day_info_main",
                day_id: $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                var current_day = data.day_info;

              //  console.log(current_day);

                var eat_no_snacking_active = current_day.eat_no_snacking_active;
                var eat_diet_active        = current_day.eat_diet_active;
                var tongue_clean_active    = current_day.tongue_clean_active;
                var phisic_active          = current_day.phisic_active;
                var therapy_active         = current_day.therapy_active;
                var asana_active           = current_day.asana_active;
                var psi_active             = current_day.psi_active;
                var half_bath_active       = current_day.half_bath_active;

                eat_no_snacking_active == null || eat_no_snacking_active == false ?  $('#field_eat_no_snacking_active').prop("checked", false) : $('#field_eat_no_snacking_active') .prop("checked", true);
                eat_diet_active        == null || eat_diet_active == false        ?  $('#field_eat_diet_active')       .prop("checked", false) : $('#field_eat_diet_active')        .prop("checked", true);

                $('#field_eat_diet_description')   .val(current_day.eat_diet_description);
                tongue_clean_active == null || tongue_clean_active == false ?  $('#field_tongue_clean_active') .prop("checked", false) : $('#field_tongue_clean_active') .prop("checked", true);

                $('#field_meditation_day_target')  .val(current_day.meditation_day_target);
                $('#field_meditation_night_target').val(current_day.meditation_night_target);
                $('#field_kaoshiki_minutes_target').val(current_day.kaoshiki_minutes_target);
                phisic_active == null || phisic_active == false ?  $('#field_phisic_active') .prop("checked", false) : $('#field_phisic_active') .prop("checked", true);


                therapy_active == null || therapy_active == false ?  $('#field_therapy_active') .prop("checked", false) : $('#field_therapy_active') .prop("checked", true);
                asana_active   == null || asana_active   == false ?  $('#field_asana_active')   .prop("checked", false) : $('#field_asana_active') .prop("checked", true);
                psi_active     == null || psi_active     == false ?  $('#field_psi_active')     .prop("checked", false) : $('#field_psi_active') .prop("checked", true);
                half_bath_active     == null || half_bath_active     == false ?  $('#field_half_bath_active')     .prop("checked", false) : $('#field_half_bath_active') .prop("checked", true);

                $('#field_kirtan_day_target')  .val(current_day.kirtan_day_target);
                $('#field_kirtan_night_target').val(current_day.kirtan_night_target);
                $('#field_time_to_read')       .val(current_day.time_to_read);
                $('#field_time_to_practise')   .val(current_day.time_to_practise);
                $('#field_day_materials')      .val(current_day.day_materials);
                $('#field_day_comment')        .val(current_day.day_comment);

                $('#modal_edit_programm_main') .modal('show');

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_edit_programm_main').click(function () {
        //console.log("chekbox" + $('#field_eat_no_snacking_active').is(':checked'));

        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "edit_programm_main",
                day_id: $(this).val(),
                eat_no_snacking_active:    $('#field_eat_no_snacking_active') .is(':checked'),
                eat_diet_active:           $('#field_eat_diet_active')        .is(':checked'),
                eat_diet_description:      $('#field_eat_diet_description')   .val(),
                tongue_clean_active:       $('#field_tongue_clean_active')    .is(':checked'),
                meditation_day_target:     $('#field_meditation_day_target')  .val(),
                meditation_night_target:   $('#field_meditation_night_target').val(),
                kaoshiki_minutes_target:   $('#field_kaoshiki_minutes_target').val(),
                phisic_active:             $('#field_phisic_active')          .is(':checked'),
                therapy_active:            $('#field_therapy_active')          .is(':checked'),
                asana_active:              $('#field_asana_active')           .is(':checked'),
                psi_active:                $('#field_psi_active')              .is(':checked'),
                half_bath_active:          $('#field_half_bath_active')              .is(':checked'),
                kirtan_day_target:         $('#field_kirtan_day_target')      .val(),
                kirtan_night_target:       $('#field_kirtan_night_target')    .val(),
                time_to_read:              $('#field_time_to_read')           .val(),
                time_to_practise:          $('#field_time_to_practise')       .val(),
                day_materials:          $('#field_day_materials')       .val(),
                day_comment:          $('#field_day_comment')       .val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_admin_info();
                $('#modal_edit_programm_main') .modal('hide');

                if (typeof data.user_program !== 'undefined'){
                    setUserProgramm(data.user_programm);
                }
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '[name="btns_copy_day_programm_main"]' , function() {
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "copy_day_programm_main",
                day_num: $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_admin_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });






//Other

    $("#modal_register").on("hidden.bs.modal", function(){
        $(".modal-body input").val(null);
        $('#btn_dd_messenger') .text("Способ общения");
    });

    $("#modal_add_curator, #modal_add_group, #modal_to_group").on("hidden.bs.modal", function(){
        $(".modal-body input").val(null);

        group_id = null;
        group_curator_id = null;

        $("#group_add_curator option:selected").prop("selected", false);
        $("#group_add_curator option:first").prop("selected", "selected");
        $('#group_add_curator').selectpicker("refresh");

        $("#group_add_user option:selected").prop("selected", false);
        $("#group_add_user option:first").prop("selected", "selected");
        $('#group_add_user').selectpicker("refresh");
    });



    function leadingZeros(input) {
        if(!isNaN(input.value) && input.value.length === 1) {
            input.value = '0' + input.value;
        }
    }

    function jsonp(url, callback) {
        var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            callback(data);
        };

        var script = document.createElement('script');
        script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
        document.body.appendChild(script);
    }
    function parse_query_string(query) {
        var vars = query.split("&");
        var query_string = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1]);
            // If first entry with this name
            if (typeof query_string[key] === "undefined") {
                query_string[key] = decodeURIComponent(value);
                // If second entry with this name
            } else if (typeof query_string[key] === "string") {
                var arr = [query_string[key], decodeURIComponent(value)];
                query_string[key] = arr;
                // If third or later entry with this name
            } else {
                query_string[key].push(decodeURIComponent(value));
            }
        }
        return query_string;
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
});

