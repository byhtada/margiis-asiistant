$( document ).ready(function() {
    $('body').tooltip({ selector: '[data-toggle="tooltip"]' });

    var api_url      = "https://зйож.рф/";
    var api_url_full = "https://зйож.рф/users";


    var cookie_name_token = "grand_token";
    var cookie_name_id = "grand_id";
    var cookie_name_vk = "vk_login";
    var cookie_token = getCookie(cookie_name_token);

    var interval_white_page;
    var timer_white_page = setTimeout(function (){
        interval_white_page = setInterval(function (){
            if ($('#page_login').is(':visible') || $('#page_admin_main').is(':visible') || $('#page_user_main').is(':visible') ){
                $('#text_white_page').hide();
            } else {
                $('#text_white_page').show();
            }
        }, 1000);
    }, 7000);

    var chat_url;
    var payment_flow = "";
    var button;
    var url;
    var merchant_id  = 1409532;
    var order_desc   = "Участие в марафоне HYLS.";
    var response_url = "https://marafon.hyls.ru/";
    var order_id     = "";
    var signature    = "";
    var rectoken    = "";
    var fondy_host   = "https://api.fondy.eu/api/status/order_id";

    initFondy();
    if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
        //alert("Наше программное обесепечение не поддерживает Internet Explore, пожалуйста, используйте другой браузер.");
        ifLogin();
        $('#btn_fb_log_in').hide();
    } else {


        window.fbAsyncInit = function() {
            FB.init({
                appId      : '309469549587161',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.0'
            });

            FB.AppEvents.logPageView();

            ifLogin();


        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js#version=v3.0&appId=309469549587161&status=true&cookie=true&xfbml=true";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));




    }

    var programm_days_main;
    var day_id, day_num, day_show_now, day_new;

    var detox_type, detox_time, detox_time_edit = 0, detox_start, detox_start_edit = 0;
    var detox_days, detox_last_date;
    var therapy_type = "";
    var group_curator_id, group_messenger = "", group_program_id = "";
    var user_messenger = "";
    var group_id, group_all_id;
    var conversion_start, conversion_finish;

    var  timerId;

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


    var reg_mini_water      = false;
    var reg_mini_detox      = false;
    var reg_mini_wake_up    = false;
    var reg_mini_snacking   = false;
    var reg_mini_thanks     = false;
    var reg_mini_family     = false;
    var reg_mini_vegan      = false;
    var reg_mini_kaoshiki   = false;
    var reg_mini_asana      = false;
    var mini_marafon_all = {};



    function initFondy(){

        payment_flow = "reg";
        button = $ipsp.get("button");
        button.setHost("api.fondy.eu");
        button.setProtocol("https");
        button.setMerchantId(merchant_id);
        button.setAmount("","RUB",false);
        button.setResponseUrl(response_url);
        button.addParam("lang","ru");
        button.addParam("order_desc", order_desc);
        //button.addParam("required_rectoken", "Y");

        url = button.getUrl();
        $ipsp("checkout").config();
        $ipsp("checkout").config({
            "wrapper": "#checkout_reg_daily",
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
                // console.log("reg");
                // console.log(data);

                if (typeof data.send_data !== 'undefined' && data.final ) {
                    signature = data.send_data.signature;
                    order_id  = data.send_data.order_id;

                    reg_user_confirm_payment(data.send_data, payment_flow);
                } else {
                    alert("Платеж не прошел. Проверьте баланс и лимит оплаты в интернете по карте.")
                }
            })
        });
    }
    function ifLogin()  {
        console.log("ifLogin");
        if (typeof cookie_token !== 'undefined' && cookie_token !== 'undefined') {
            clearInterval(timerId);
            start();
        } else {
            console.log("no cookie");
            hide_all_in_user();
            timerId = setInterval(function() {
                //  console.log( "тик" );
                var params = parse_query_string();
                //   console.log(params);
                if (typeof params.access_token !== 'undefined' &&  params.access_token !== null){

                    var new_params = params;
                    clearInterval(timerId);
                    var vk_info = "photo_200";
                    var vk_api_query = "https://api.vk.com/method/users.get?user_ids= " + params.user_id + "&fields=" + vk_info + "&access_token=" + params.access_token + "&v=5.76&callback=callbackFunc";
                    jsonp(vk_api_query, function(userInfo) {
                        //  console.log("timer response " + userInfo.response[0]);
                        //  console.log("timer params " + params);
                        //  console.log(params);
                        userInfo = userInfo.response[0];
                        try_find_user(userInfo, new_params, "vk")
                    });
                }
            }, 500);
            var params = parse_query_string();
            if (typeof params.social_login !== 'undefined') {
                if (params.social_login === "vk")   {
                    setCookie(cookie_name_vk, true);
                    //  if_social_vk = true;
                    sendMove("reg_hyls", "vk_click_link");
                    $('#page_load').show();
                    $('#btn_vk_log_in')[0].click();
                }
                if (params.social_login === "fb")   {
                    if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
                        $("#page_login").show();
                        $("#btn_fb_log_in").hide();
                        $("#div_reg_other").show();
                        alert("Извините, но Internet Explorer не поддерживает вход/регистрацию через Facebook, пожалуйста используйте ВКонтакте или альтернативный способ");
                    } else {
                        //  if_social_fb = true;
                        sendMove("reg_hyls", "fb_click_link");
                        $('#page_load').show();
                        fb_login();
                    }
                }
                if (params.social_login === "none") {
                    // if_social_none = true;
                    sendMove("reg_hyls", "hand_click_link");
                    $("#page_login").show();
                    $("#div_reg_other").show();
                    $("#modal_register_self").modal('show');
                }
            } else if (typeof params.access_token == 'undefined') {

                if (params.hyls_program === "21days") {
                    $('#page_user_main').show();
                    $('#page_marafon_reg').show();
                } else {
                    $("#page_login").show();
                }
            }
        }
    }


    $('#reg_marafon_btn').click(function (){
        $('#reg_marafon_btn').prop("disabled", true);
        $.ajax({
            type: "POST",
            url:   api_url + "add_password_to_user",
            data: {phone: $('#reg_marafon_phone').val(),
                   pass:  $('#reg_marafon_pass') .val()},
            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log(data);
                $('#reg_marafon_btn').prop("disabled", false);
                if (data.error === 0){
                    console.log("error == 0");
                    setCookie(cookie_name_token, data.auth_token, {expires: 36000000000000});
                    setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                    cookie_token = getCookie(cookie_name_token);
                    ifLogin();
                } else {
                    alert("Пользователь с таким телефоном не найден");
                }
            },
            failure: function (errMsg) {
                console.log("error" + errMsg);
                alert(errMsg);
            }
        });
    });

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
    function sendMove(move_category, move_desc) {
        $.ajax({
            type: "POST",
            url: api_url + "send_move",
            data: {move_category: move_category, move_desc: move_desc},
            headers: {

                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log(data);
            },
            failure: function (errMsg) {
                console.log("fail");
                console.log(errMsg.toString());
            }
        });
    }

    function start() {
        try {
            $.ajax({
                type: "GET",
                url:   api_url + "get_user_status",
                data: {token: cookie_token},
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    //   console.log(data);

                    hide_all_in_admin();
                    hide_all_in_user();

                    if (data.user_status == "admin") {
                        $("#page_login")     .hide();
                        $("#page_user_main") .hide();
                        $('#page_admin_main').show();
                        $('#page_users')    .show();
                        update_admin_info();
                    } else if (data.user_status == "curator") {
                        $("#page_login")     .hide();
                        $("#page_user_main") .hide();
                        $('#page_admin_main').show();
                        $('#page_users')    .show();
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
                    console.log("error" + errMsg);
                    alert(errMsg);
                }
            });
        }
        catch (err) {
            console.log(err);
        }

    }




    console.log( "document loaded" );
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    $('#btn_get_comments').click(function () {
        try {
            $.ajax({
                type: "GET",
                url:   api_url + "users",
                data: {query_info: "get_comments",
                    day_num: $('#day_num_input').val()},
                headers: {
                    'Authorization': 'Token token=' + cookie_token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: function (data) {
                    console.log(data);
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });
        }
        catch (err) {
            console.log(err);
        }

    });

    $('#btn_check_out_info').click(function (){
        $.ajax({
            type: "POST",
            url: fondy_host,
            data: {
                order_id:      "Order_1409532_cVaZ3AqudR_1528098474",
                merchant_id:      "1409532",
                signature:     "9b930831f78a4ad7352713b267ac1c6c8c1b38f7"
            },

            headers: {
                'Content-Type': 'application/json'
            },
            success: function (data) {
                console.log(data);

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    });
    $('#btn_send_email').click(function (){
        $.ajax({
            type: "POST",
            url: api_url + "set_ratings_for_all_days",
            data: {
            },

            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log(data);

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    });

    $('#btn_get_rating').click(function (){
        $.ajax({
            type: "GET",
            url: api_url + "get_flow_rating",
            data: {
            },

            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                console.log(data);

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    });
    $('#btn_send_payment').click(function () {
        $.ajax({
            type: "GET",
            url: api_url_full,
            data: {
                query_info: "send_payment"
            },

            headers: {
                'Authorization': 'Token token=' + cookie_token,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                //console.log(data);

            },
            failure: function (errMsg) {
                //    console.log(errMsg.toString());
            }
        });
    });
    $.ajaxSetup({
        error: function (data, textStatus, jqXHR) {

            if (data.status == 401) {
                 console.log("Error 401");
                $('#page_login').show();
                $("#page_user_main") .hide();
                $('#page_admin_main').hide();
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

    function no_access() {
        alert("У Вас не достаточно прав, для выполнения этого действия")
    }





//Registration

    function fb_login(){


        FB.login(function (response) {
                console.log(response);
                if (response.status == "connected"){
                    FB.api('/me?fields=id,first_name,last_name,email,age_range,link,gender,locale,picture,timezone', function (userData){
                        $('#text_white_page').hide();
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
    }
    $('#btn_fb_log_in').click(function (){
        fb_login();
    });
    $('#btn_vk_log_in').click(function (){
        console.log('click vk');

    });
    $('#btn_reg_other').click(function (){
        $('#div_reg_other').show();
    });
    $('#btn_modal_register_self').click(function (){

        sendMove("reg_hyls", "hand_click_link");
    });

    var reg_practic_counter = 0, marafon_mini_cost = 0;
    $('.reg_mini').click(function(){
        $('#div_checkout_reg_mini').hide();
        if ($(this).is(":checked")){
            reg_practic_counter += 1;
        } else {
            reg_practic_counter -= 1;
        }

        switch ($(this).id){
            case "reg_checkbox_water":
                reg_mini_water = $(this).is(":checked");
                break;
            case "reg_checkbox_detox":
                reg_mini_detox = $(this).is(":checked");
                break;
            case "reg_checkbox_wareup":
                reg_mini_wake_up = $(this).is(":checked");
                break;
            case "reg_checkbox_snacking":
                reg_mini_snacking = $(this).is(":checked");
                break;
            case "reg_checkbox_thanks":
                reg_mini_thanks = $(this).is(":checked");
                break;
            case "reg_checkbox_family":
                reg_mini_family = $(this).is(":checked");
                break;
            case "reg_checkbox_vegan":
                reg_mini_vegan = $(this).is(":checked");
                break;
            case "reg_checkbox_kaoshiki":
                reg_mini_kaoshiki = $(this).is(":checked");
                break;
            case "reg_checkbox_asana":
                reg_mini_asana = $(this).is(":checked");
                break;
        }

        mini_marafon_all = {
            reg_mini_water: reg_mini_water,
            reg_mini_detox: reg_mini_detox,
            reg_mini_wake_up: reg_mini_wake_up,
            reg_mini_snacking: reg_mini_snacking,
            reg_mini_thanks: reg_mini_thanks,
            reg_mini_family: reg_mini_family,
            reg_mini_vegan: reg_mini_vegan,
            reg_mini_kaoshiki: reg_mini_kaoshiki,
            reg_mini_asana: reg_mini_asana
        };
        console.log(mini_marafon_all);



        console.log(reg_practic_counter);
        marafon_mini_cost = 0;
        switch (reg_practic_counter) {
            case 1:
                marafon_mini_cost = 2;
                break;

            case 2:
                marafon_mini_cost = 3;
                break;

            default:
                marafon_mini_cost = 5 + 1 * (reg_practic_counter - 2);
                break;
        }

        $('#reg_mini_cost').text("Стоимость марафона: " + marafon_mini_cost + " руб.");

        if (reg_practic_counter > 0){
            $('#reg_mini_cost').show();
            $('#div_btn_pay_mini').show();
        } else {
            $('#reg_mini_cost').hide();
            $('#div_btn_pay_mini').hide();
        }
    });

    $('#btn_pay_mini').click(function (){
        $('#div_btn_pay_mini').hide();
        $('#div_checkout_reg_mini').show();
        $(window).animate({scrollTop: $(document).height() + $(window).height()});

        var button = $ipsp.get("button");
        button.setHost("api.fondy.eu");
        button.setProtocol("https");
        button.setMerchantId(merchant_id);
        button.setAmount(marafon_mini_cost,"RUB",true);
        button.setResponseUrl(response_url);
        button.addParam("lang","ru");
        button.addParam("order_desc", "Участие в мини-марафоне HYLS");
        //button.addParam("required_rectoken", "Y");
        payment_flow = "reg_mini_marafon";
        var url = button.getUrl();
        $ipsp("checkout").config();
        $ipsp("checkout").config({
            "wrapper": "#checkout_reg_mini",
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
            this.loadUrl(url)
        });

    });



    $('#btn_reg_step_1').click(function (){
        $('#reg_step_1').hide();
        $('#reg_step_3').hide();
        $('#reg_step_2').show();
	    scrollTop();
    });
    $('#btn_reg_step_2').click(function (){
        $('#reg_step_2').hide();
        $('#reg_step_4').hide();
        $('#reg_step_3').show();
	    scrollTop();
    });
    $('#btn_reg_step_3').click(function (){
        $('#reg_step_3').hide();
        $('#reg_step_5').hide();
        $('#reg_step_4').show();
	    scrollTop();
    });
    $('#btn_reg_step_4').click(function (){
        $('#reg_step_4').hide();
        $('#reg_step_6').hide();
        $('#reg_step_5').show();
	    scrollTop();
    });
    $('#btn_reg_step_5').click(function (){
        $('#reg_step_5').hide();
        $('#reg_step_6').show();
	    scrollTop();
    });

    function scrollTop() {
        console.log('123');
	    $('html, body').animate({scrollTop: 0},500);
    }

    $('#btn_register_self').click(function () {

        $('#btn_register_self').prop('disabled', true);

        $('#reg_hand_error_phone').hide();
        $('#reg_hand_error_email').hide();
        $('#reg_hand_error_password').hide();

        var user_name       = $('#field_user_reg_name').val();
        var user_email      = $('#field_user_reg_email').val();
        var user_phone      = $('#field_user_reg_phone').val();
        var user_password   = $('#field_user_reg_password').val();


        var user_phone_check    = false;
        var user_password_check = false;
        var user_email_check    = false;

        if (user_phone == "") {
            user_phone_check = true;
            $('#reg_hand_error_phone').show();
        }
        if (user_password == "" || user_password.length < 4 ) {
            user_password_check = true;
            $('#reg_hand_error_password').show();
        }
        if (user_email == "" || isValidEmailAddress(user_email) == false) {
            user_email_check = true;
            $('#reg_hand_error_email').show();
        }

        if (user_phone_check || user_password_check || user_email_check) {

            $('#reg_alert').show();
            $('#btn_register_self').prop('disabled', false);


        } else {

            var person  = {
                first_name:  user_name,
                phone:       user_phone,
                password:    user_password,
                email:       user_email};

            $.ajax({
                type: "POST",
                url: api_url_full,
                data: JSON.stringify(person),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(data){
                    $('#btn_register_self').prop('disabled', false);
                    if (data.error == 0){
                       // if (if_social_none) {
                       //     sendMove("reg_hyls", "hand_click_link");
                       // }
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

        }
    });
    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    }

    $('#btn_support_show_currency').click(function(){
        if ($('#support_currency').is(":visible")) {
            $('#support_currency').hide();
        } else {
            $('#support_currency').show();
        }
    });

    $('#btn_reg_show_currency').click(function(){
        if ($('#reg_currency').is(":visible")) {
            $('#reg_currency').hide();
        } else {
            $('#reg_currency').show();
        }
    });
    $(document).on('click', '.pay_currency_reg_daily', function (){
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

        button.setResponseUrl(response_url);
        button.addParam("lang","ru");
        button.addParam("order_desc","Участие в марафоне HYLS.");
       // button.addParam("required_rectoken", "Y");

        var url = button.getUrl();
        $ipsp("checkout").config({
            "wrapper": "#checkout_reg_daily",
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
        });
    });
    $(document).on('click', '.pay_currency_support', function (){
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

        button.setResponseUrl(response_url);
        button.addParam("lang","ru");
        button.addParam("order_desc","Поддержка HYLS");

        payment_flow = "support";
        var url = button.getUrl();
        $ipsp("checkout").config({
            "wrapper": "#checkout_support",
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
            this.loadUrl(url);});
    });
    $(document).on('click', '.pay_currency_settings', function (){
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

        button.setResponseUrl(response_url);
        button.addParam("lang","ru");
        button.addParam("order_desc","Участие в марафоне HYLS.");
       // button.addParam("required_rectoken", "Y");

        var url_settings = button.getUrl();
        $ipsp("checkout").config({
            "wrapper": "#checkout_settings",
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
            this.loadUrl(url);});


    });
    $('#btn_pay_other').click(function (){
        $('#btn_pay_other').hide();
        $('#div_other_method').show();
    });

    function try_find_user(userInfo, params, social_name){
        //console.log("try_find_user params ");
        // console.log(params);
        $.ajax({
            type: "GET",
            url: api_url + "find_user",
            data: {email: params.email, social_id: params.user_id, social_name: social_name},
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (data) {
                //    console.log("try find user");
                //    console.log(JSON.stringify(data));
                //     console.log(JSON.stringify(data.token));
//
                if (typeof data.token !== 'undefined') {
                    //     console.log("user founded");
                    setCookie(cookie_name_token, data.token, {expires: 36000000000000});
                    setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                    cookie_token = getCookie(cookie_name_token);
                    ifLogin();
                } else {
                    //  console.log("user not founded");

                    //if (typeof getCookie(cookie_name_vk) != undefined && getCookie(cookie_name_vk)) {
                    //    sendMove("reg_hyls", "vk_click_link");
                    //    setCookie(cookie_name_vk)
                    //} else if(if_social_fb) {
                    //    sendMove("reg_hyls", "fb_click_link");
                    //}
                    reg_user(userInfo, params.email, social_name, params.user_id, params.access_token);
                }
            },
            failure: function (errMsg) {
                console.log("fail");
                console.log(errMsg.toString());
            }
        });
    }
    function reg_user(userInfo, email, social_name, social_id, access_token){
        var person;
        if (typeof userInfo.city !== 'undefined' && typeof userInfo.country !== 'undefined'){
            person  = {  social_name: social_name,
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
        } else {
            person  = {   social_name: social_name,
                social_id:    social_id,
                access_token: access_token,
                email:           email,
                first_name:      userInfo.first_name,
                last_name:       userInfo.last_name,
                sex:             userInfo.sex,
                bdate:           userInfo.bdate,
                photo:           userInfo.photo_200,
                phone_home:      userInfo.home_phone,
                followers_count: userInfo.followers_count,
                hour_tail:       userInfo.timezone};
        }


        console.log(JSON.stringify(person));

        $.ajax({
            type: "POST",
            url: api_url_full,
            data: JSON.stringify(person),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data){
                if (data.error == 0){
                    setCookie(cookie_name_token, data.auth_token,     {expires: 36000000000000});
                    setCookie(cookie_name_id,    data.user_id, {expires: 36000000000000});
                    cookie_token = getCookie(cookie_name_token);
                    ifLogin();
                } else {
                    alert("Аккаунт с таким ИД социальной сети уже зарегистрирован. Обратитесь vk.com/id251622303, чтобы решить этот вопрос")
                }
                // console.log("Reg success: " + JSON.stringify(data));

            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
    }
    function reg_user_confirm_payment(send_data, place){
        var query;
        switch (place) {
            case "reg":
                query = "user_confirm_payment_detox";
                break;
            case "support":
                query = "user_confirm_payment_support";
                break;
            case "settings":
                query = "user_start_daily_payment_again";
                break;
            case "reg_mini_marafon":
                query = "user_confirm_payment_mini_marafon";
                mini_marafon_all = {
                    reg_mini_water: reg_mini_water,
                    reg_mini_detox: reg_mini_detox,
                    reg_mini_wake_up: reg_mini_wake_up,
                    reg_mini_snacking: reg_mini_snacking,
                    reg_mini_thanks: reg_mini_thanks,
                    reg_mini_family: reg_mini_family,
                    reg_mini_vegan: reg_mini_vegan,
                    reg_mini_kaoshiki: reg_mini_kaoshiki,
                    reg_mini_asana: reg_mini_asana
                };
                break;
        }

        console.log("query " + query);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_info: query,
                payment_id:   send_data.order_id,
                payment_currency:   send_data.currency,
                payment_amount:       send_data.amount,
                payment_card:       send_data.masked_card,
                payment_requisites: send_data.sender_email,
                payment_approval_code: send_data.approval_code,
                payment_date:          send_data.order_time,
                payment_descr:         order_desc,
                payment_signature:     send_data.signature,
                payment_rectoken:      send_data.rectoken,
                selected_marafon:      mini_marafon_all
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data) {
                //2962397  console.log(data);
                if (send_data.amount > 0) {
                    alert("Платеж успешно завершен. Благодарим Вас за поддержку!");
                }
                update_user_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }



//Navigation
    function hide_all_in_admin() {
        $('#page_load').hide();
        $('#page_group_info').hide();
        $('#page_user_info') .hide();


        $('#page_groups')  .hide();
        $('#page_curators').hide();
        $('#page_users')   .hide();
        $('#page_program') .hide();
        $('#page_material') .hide();
        $('#current_program') .hide();
        $('#page_conversion') .hide();
        $('#page_leaved') .hide();
        $('#page_test')  .hide();
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
                    console.log(data);
                    var currentdate = new Date();

                    var datetime = "Last Sync: " + currentdate.getDate() + "/"+(currentdate.getMonth()+1)
                        + "/" + currentdate.getFullYear() + " @ "
                        + currentdate.getHours() + ":"
                        + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                    //    console.log(datetime);

                    $('#dau').text(data.dau);
                    $('#nav_bar_admin').show();

                    setCurators(data.curators);
                    setUsersRegPay(data.users_reg_pay);
                    setGroups(data.groups);
                    setPrograms(data.programs);

                    setMaterial(data.material);

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
            case "nav_materials":
                $('#page_material').show();
                break;
            case "nav_conversion":
               // $('#page_conversion').show();
                break;
            case "nav_leaved":
                $.ajax({
                    type: "GET",
                    url:  api_url + "get_leaved",
                    data: {

                    },
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        console.log(data);


                        var user_row = '<table id="table_users_leaved1" class="table table-hover table-bordered table-condensed" >';
                        user_row    += '<thead><tr>';
                        user_row    += '<th>Имя</th>';
                        user_row    += '<th>Почта</th>';
                        user_row    += '<th>Телефон</th>';
                        user_row    += '<th>Ссылка соц.сети</th>';
                        user_row    += '<th>Группа</th>';
                        user_row    += '<th>Последняя активность</th>';
                        user_row    += '<th>Комментарий</th>';
                        user_row    += '</tr></thead><tbody>';
                        $.each(data.users_leaved, function (i, item) {
                            user_row += '<tr id="user_reg_' + item.user_id + '">';
                            user_row += '<td><h5>' + item.user_name               + '</h5></td>';
                            user_row += '<td><h5>' + item.user_email              + '</h5></td>';
                            user_row += '<td><h5>' + item.user_phone              + '</h5></td>';
                            user_row += '<td><h5>' + item.user_social_link            + '</h5></td>';
                            user_row += '<td><h5>' + item.user_group          + '</h5></td>';
                            user_row += '<td><h5>' + item.user_last_activity          + '</h5></td>';
                            user_row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';

                            user_row += '</tr>';
                        });
                        user_row += '</tbody></table';
                        $('#table_users_leaved').empty();
                        $('#table_users_leaved').append(user_row);
                        $('#table_users_leaved').bsTable(undefined, false, undefined, undefined, true);


                        $('#page_leaved').show();
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
                break;
            case "nav_test":
                $('#page_test')  .show();
                break;

        }
    });
    $('#nav_conversion, #report_conversion_show').click(function (){
        setConversion();
        $('#modal_conversion_date').modal('hide');
    });
    $('#get_chart_leave_users').click(function (){


        conversion_start  = $('#report_conversion_start').val();
        conversion_finish = $('#report_conversion_finish').val();
        $('#get_chart_leave_users').prop("disabled", true);
        $.ajax({
            type: "GET",
            url:  api_url + "get_chart_leave_users",
            data: {
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                $('#get_chart_leave_users').prop("disabled", false);

                var flows_selector = '<option>Выберите поток</option>';
                $.each(data.hyls_flows, function (i, item) {
                    flows_selector  += '<option data-tokens="'+ item +'" name="flow_select"      value="' + item + '">' + item  + '</option>';
                });
                $('#leave_flows').empty();
                $('#leave_flows').append(flows_selector);
                $('#leave_flows').selectpicker("deselectAll");
                $('#leave_flows').selectpicker("refresh");




                drawChartLeaves(data);


                $('#div_chart_leave_users').show();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    var leave_flow_start = "";
    $('#leave_flows').on('changed.bs.select', function () {
        // console.log($(this).find("option:selected").val());
        leave_flow_start = $(this).find("option:selected").val();
    });
    $('#get_chart_leave_flow').click(function() {
        if (leave_flow_start != "") {
            $.ajax({
                type: "GET",
                url:  api_url + "get_chart_leave_flow",
                data: {flow_start: leave_flow_start},
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data) {
                    drawChartLeaves(data);
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert("Сначала выберите поток")
        }

    });
    var chart_leave_users;
    function drawChartLeaves(data){
        if (typeof chart_leave_users != 'undefined'){
            console.log("destroy chart");
            chart_leave_users.destroy();
        }
        Chart.defaults.global.defaultFontColor   = '#000000';
        Chart.defaults.global.defaultFontFamily  = "'Copse', serif";
        Chart.defaults.global.defaultFontSize    = 35;
        Chart.defaults.global.legend.display     = false;
        Chart.defaults.global.animation.duration = 2000;
        Chart.defaults.doughnut.cutoutPercentage = 75;
        Chart.defaults.global.elements.arc.borderWidth = 5;
        chart_leave_users = new Chart($("#chart_leave_users"), {
            type: 'bar',
            data: {
                labels: data.chart_leave_days,
                datasets: [{
                    label:           'Пользователи ушедшие после этого дня',
                    data:            data.chart_leave_users,
                    backgroundColor: data.chart_leave_color
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Ушедших после этого дня'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'День'
                        }
                    }]
                }
            }
        });

    }
    document.getElementById("chart_leave_users").onclick = function (evt) {
        var activePoints = chart_leave_users.getElementAtEvent(evt);
        var theElement = chart_leave_users.config.data.datasets[activePoints[0]._datasetIndex].data[activePoints[0]._index];
        console.log(activePoints[0]);
        console.log(activePoints[0]._index);


        $.ajax({
            type: "GET",
            url:  api_url + "get_leave_users_by_day",
            data: {flow_start: leave_flow_start,
                day_num: activePoints[0]._index + 1},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data) {
                console.log(data);
                setConvUsersTable(data.leaved_users);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });



    };



    function hide_all_in_user() {
        $('#page_load').hide();
        $('#page_marafon_reg').hide();
        $('#page_user_programm').hide();
        $('#page_user_materials').hide();
        $('#page_user_hyls_store').hide();
        $('#page_user_rating').hide();
        $('#page_user_settings').hide();
        $('#page_user_support').hide();
    }
    $(document).on('click', '.nav-link-user',       function () {
        hide_all_in_user();

        switch ($(this).attr("name")){
            case "nav_user_programm":
                $('#page_user_programm').show();
                break;
            case "nav_user_diary":

                $.ajax({
                    type: "GET",
                    url:  api_url_full,
                    data: { query_info: "get_user_diary_detox"},
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data) {
                        setUserDiaryDetox(data.user_diary_detox);
                        $('#page_user_materials').show();
                        },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
                break;

            case "nav_user_rating":
                $('#page_user_rating').show();
                break;
            case "nav_user_settings":
                payment_flow = "settings";
                $ipsp("checkout").config({
                    "wrapper": "#checkout_settings",
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
                    this.loadUrl(url);});
                $('#page_user_settings').show();
                break;
            case "nav_user_support":

                payment_flow = "support";
                $ipsp("checkout").config({
                    "wrapper": "#checkout_support",
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
                    this.loadUrl(url);});
                $('#page_user_support').show();
                break;
        }
    });
    function update_user_info() {
        //console.log("update_user_info");
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
                    day_new = 0;


                    $('#user_wait_id, #user_wait_id_2').text(data.user.id);
                    $('#page_marafon_reg').hide();
                    $('#user_marafon_start').hide();
                    $('#user_marafon_block').hide();
                    $('#user_marafon_wait').hide();



                    if (data.marafon_day < -998) {
                        $('#reg_marafon_create_password').hide();
                        $('#page_marafon_reg').show();
                        if (data.user.program_type.includes("21day")) {
                            $('#reg_marafon_mini').show();
                            console.log("mini");
                        } else {


                            $('#reg_marafon_detox').show();
                            console.log("detox");
                        }

                    } else if  (data.marafon_day > -998 && data.marafon_day < 1){
                        console.log("wait");
                        $('#user_marafon_wait').show();
                        $('#user_marafon_wait_text').text("Ожидайте старта марафона " + data.marafon_day_start);
                        $('#wait_messenger_link')    .attr("href", data.messenger_link).text("по ссылке");
                        $('#user_marafon_wait_messenger').show();
                    } else if (data.marafon_day > 0) {
                        if (data.program_num == 1 || data.program_num == 2) {
                            if (data.block_programm) {
                                $('#user_marafon_block').show();
                            } else {
                                $('#user_marafon_start').show();
                                $('#diary_marafon_detox').show();
                                $('#nav_bar').show();
                            }

                            chat_url = data.messenger_link;

                            $('#settings_messenger_link').attr("href", data.messenger_link).text("Ссылка");

                            $('#filed_meditation_base_edit')  .val(data.medi_kao_target.meditation_base);
                            $('#filed_meditation_target_edit').val(data.medi_kao_target.meditation_target);
                            $('#filed_kaoshiki_base_edit')    .val(data.medi_kao_target.kaoshiki_base);
                            $('#filed_kaoshiki_target_edit')  .val(data.medi_kao_target.kaoshiki_target);

                            setPractiseDetox(data.practise_complete);
                            setDayDetox(data.marafon_info_today, data.marafon_day);
                            setGroupRatingDetox(data.group_rating_info, data.user);

                            if (data.daily_payment == true){
                                $('#div_settings_payment_change').show();
                                $('#div_settings_payment_start').hide();
                                $('#filed_payment_size_edit').val(data.daily_payment_amount);
                                $('#daily_payment_currency').text(data.daily_payment_currency);
                            } else {
                                $('#div_settings_payment_change').hide();
                                $('#div_settings_payment_start').show();
                            }

                            var detox_days_for_settings = 0;
                            if (data.detox_type !== null ){
                                $('#detox_settings').show();
                                $('#detox_name')    .text(data.detox_type);
                                $('#detox_time')    .text(data.user.detox_time_new);


                                var detox_last_date1;
                                var detox_time1 = data.user.detox_time_new;
                                detox_days_for_settings = detox_time1;

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
                                        detox_days_for_settings = detox_time1 + 2;
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
                            if (data.user.detox_start_new + detox_days_for_settings <= data.marafon_info_today.day_num) {
                                $('#detox_settings').hide();
                            }
                            $('#materials_detox').show();
                            $('#materials_mini') .hide();

                        } else if (data.program_num == 3) {
                            if (data.block_programm) {
                                $('#user_marafon_block').show();
                            } else {
                                $('#user_marafon_start').show();
                                $('#diary_marafon_mini').show();
                                $('#nav_bar').show();
                            }

                            $('#settings_messenger_link').attr("href", data.messenger_link).text("Ссылка");

                            $('#materials_detox').hide();
                            $('#materials_mini') .show();


                            setDayMini(data.marafon_info_today, data.marafon_day, data.materials_mini.materials);
                            setGroupRatingMini(data.group_rating_info, data.user);
                            setUserDiaryMini(data.user_diary_mini);
                            setUserMaterialsMini(data.materials_mini);




                           // $('#btn_material_mini') .text("Материалы (" + data.materials_mini.unread_materialsв + " новых)");
                            setHylsStoreMini(data.hyls_store_mini, data.user);


                        }
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
    function setPractiseDetox(practise){

        if (practise.practise_setting_show) {
            $('#practise_continue_settings').show();
            practise.water_practise_complete     ? $('#div_setting_water').show()       : $('#div_setting_water').hide()
            practise.tongue_practise_complete    ? $('#div_setting_tongue').show()      : $('#div_setting_tongue').hide()
            practise.snacking_practise_complete  ? $('#div_setting_no_snacking').show() : $('#div_setting_no_snacking').hide()
            practise.half_bath_practise_complete ? $('#div_setting_half_bath').show()   : $('#div_setting_half_bath').hide()
            practise.asana_practise_complete     ? $('#div_setting_asana').show()       : $('#div_setting_asana').hide()
            practise.phisic_practise_complete    ? $('#div_setting_phisic').show()      : $('#div_setting_phisic').hide()

            practise.ahimsa_practise_complete     ? $('#div_setting_ahimsa').show()      : $('#div_setting_ahimsa').hide()
            practise.satya_practise_complete      ? $('#div_setting_satya').show()       : $('#div_setting_satya').hide()
            practise.asteya_practise_complete     ? $('#div_setting_asteya').show()      : $('#div_setting_asteya').hide()
            practise.brahma_practise_complete     ? $('#div_setting_brahma').show()      : $('#div_setting_brahma').hide()
            practise.aparigraha_practise_complete ? $('#div_setting_aparigraha').show()  : $('#div_setting_aparigraha').hide()

            practise.shaucha_practise_complete  ? $('#div_setting_shaucha').show()   : $('#div_setting_shaucha').hide()
            practise.santosha_practise_complete ? $('#div_setting_santosha').show()  : $('#div_setting_santosha').hide()
            practise.tapah_practise_complete    ? $('#div_setting_tapah').show()     : $('#div_setting_tapah').hide()
            practise.svadhya_practise_complete  ? $('#div_setting_svadhya').show()   : $('#div_setting_svadhya').hide()
            practise.ishvara_practise_complete  ? $('#div_setting_ishvara').show()   : $('#div_setting_ishvara').hide()



            practise.water_practise_active      ? $('#setting_practiс_water').prop("checked", true)       : $('#setting_practiс_water').prop("checked", false)
            practise.tongue_practise_active     ? $('#setting_practiс_tongue').prop("checked", true)      : $('#setting_practiс_tongue').prop("checked", false)
            practise.snacking_practise_active   ? $('#setting_practiс_no_snacking').prop("checked", true) : $('#setting_practiс_no_snacking').prop("checked", false)
            practise.half_bath_practise_active  ? $('#setting_practiс_half_bath').prop("checked", true)   : $('#setting_practiс_half_bath').prop("checked", false)
            practise.asana_practise_active      ? $('#setting_practiс_asana').prop("checked", true)       : $('#setting_practiс_asana').prop("checked", false)
            practise.phisic_practise_active     ? $('#setting_practiс_phisic').prop("checked", true)      : $('#setting_practiс_phisic').prop("checked", false)

            practise.ahimsa_practise_active     ? $('#setting_practic_ahimsa').prop("checked", true)      : $('#setting_practic_ahimsa').prop("checked", false)
            practise.satya_practise_active      ? $('#setting_practic_satya').prop("checked", true)       : $('#setting_practic_satya').prop("checked", false)
            practise.asteya_practise_active     ? $('#setting_practic_asteya').prop("checked", true)      : $('#setting_practic_asteya').prop("checked", false)
            practise.brahma_practise_active     ? $('#setting_practic_brahma').prop("checked", true)      : $('#setting_practic_brahma').prop("checked", false)
            practise.aparigraha_practise_active ? $('#setting_practic_aparigraha').prop("checked", true)  : $('#setting_practic_aparigraha').prop("checked", false)

            practise.shaucha_practise_active  ? $('#setting_practic_shaucha').prop("checked", true)   : $('#setting_practic_shaucha').prop("checked", false)
            practise.santosha_practise_active ? $('#setting_practic_santosha').prop("checked", true)  : $('#setting_practic_santosha').prop("checked", false)
            practise.tapah_practise_active    ? $('#setting_practic_tapah').prop("checked", true)     : $('#setting_practic_tapah').prop("checked", false)
            practise.svadhya_practise_active  ? $('#setting_practic_svadhya').prop("checked", true)   : $('#setting_practic_svadhya').prop("checked", false)
            practise.ishvara_practise_active  ? $('#setting_practic_ishvara').prop("checked", true)   : $('#setting_practic_ishvara').prop("checked", false)


        } else {
            $('#practise_continue_settings').hide();
        }
    }
    function setGroupRatingDetox(group_rating_info, user){
        if (user.rating_show_status) {
            $('#filed_rating_show').prop("checked", true);
            $('#btn_rating_link').show();
            $('#btn_rating_link').text("Выполняя ежедневные практики, вы улучшаете свои позиции в рейтинге марафонцев вашего потока." +
                "Сейчас Вы на " + group_rating_info.rating_user + " месте из " + group_rating_info.rating_all + " участников");
        } else {
            $('#filed_rating_show').prop("checked", false);
            $('#btn_rating_link').hide();
        }



        var row = '<table class="table table-hover table-bordered table-condensed" >';
        row    += '<thead><tr> <th>Место</th> <th>Прогресс</th> <th>Имя</th>  <th>Профиль</th> </tr></thead><tbody>';
        $.each(group_rating_info.rating_table, function (i, item) {
            if (item.user_place <= 25) {
                row += '<tr>';
                row += '<td class="column_rating_place"><h5>' + item.user_place    + '</h5></td>';



                var progress_percent = item.user_progress + "%";
                row += '<td class="div_row_fact text-center"><div class="progress">';

                if (item.user_id == user.id){
                    row += '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="' + item.user_progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress_percent + '; min-width: 2em;">';
                } else {
                    row += '<div class="progress-bar progress-bar-info    progress-bar-striped active" role="progressbar" aria-valuenow="' + item.user_progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress_percent + '; min-width: 2em;">';
                }

                row += progress_percent;
                row += '</div></div></td>';




                row += '<td class="column_rating_name"><h5>' + item.user_name     + '</h5></td>';
                row += '<td class="column_rating_link"><h5><a href="' + item.user_link  + '" target="_blank">' + item.user_link + '</a></h5></td>';
                row += '</tr>';
            }
        });
        row += '</tbody></table';
        $('#rating_group_table') .empty();
        $('#rating_group_table').append(row);
        $('#rating_group_table').bsTable(undefined, false, undefined, undefined, false);

    }
    function setGroupRatingMini(group_rating_info, user){
        if (user.rating_show_status) {
            $('#filed_rating_show_mini').prop("checked", true);
            $('#btn_rating_link_mini').show();
            $('#btn_rating_link_mini').text("Выполняя ежедневные практики, вы улучшаете свои позиции в рейтинге марафонцев вашего потока." +
                "Сейчас Вы на " + group_rating_info.rating_user + " месте из " + group_rating_info.rating_all + " участников");
        } else {
            $('#filed_rating_show_mini').prop("checked", false);
            $('#btn_rating_link_mini').hide();
        }



        var row = '<table class="table table-hover table-bordered table-condensed" >';
        row    += '<thead><tr> <th>Место</th> <th>Прогресс</th> <th>Имя</th>  <th>Профиль</th> </tr></thead><tbody>';
        $.each(group_rating_info.rating_table, function (i, item) {
            if (item.user_place <= 25) {
                row += '<tr>';
                row += '<td class="column_rating_place"><h5>' + item.user_place    + '</h5></td>';



                var progress_percent = item.user_progress + "%";
                row += '<td class="div_row_fact text-center"><div class="progress">';

                if (item.user_id == user.id){
                    row += '<div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="' + item.user_progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress_percent + '; min-width: 2em;">';
                } else {
                    row += '<div class="progress-bar progress-bar-info    progress-bar-striped active" role="progressbar" aria-valuenow="' + item.user_progress + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + progress_percent + '; min-width: 2em;">';
                }

                row += progress_percent;
                row += '</div></div></td>';




                row += '<td class="column_rating_name"><h5>' + item.user_name     + '</h5></td>';
                row += '<td class="column_rating_link"><h5><a href="' + item.user_link  + '" target="_blank">' + item.user_link + '</a></h5></td>';
                row += '</tr>';
            }
        });
        row += '</tbody></table';
        $('#rating_group_table') .empty();
        $('#rating_group_table').append(row);
        $('#rating_group_table').bsTable(undefined, false, undefined, undefined, false);

    }


    $('#btn_rating_link').click(function() {
        hide_all_in_user();
        $('#page_user_rating').show();
    });
    $('.btn_footer_chat').click(function() {
        var win = window.open(chat_url, '_blank');
        win.focus();
    });
    $('#btn_footer_diary').click(function() {
        hide_all_in_user();
        $('#page_user_materials').show();
    });
    $('#btn_footer_support').click(function() {
        hide_all_in_user();

    });
    $('#btn_footer_settings').click(function() {
        hide_all_in_user();

    });
    $('#btn_unlock_diary').click(function() {
        hide_all_in_user();

        $.ajax({
            type: "POST",
            url:  api_url + "unlock_diary",
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data) {
                $('#user_marafon_block').hide();
                $('#page_user_programm').show();
                $('#user_marafon_start').show();
                $('#nav_bar').show();

            },
            failure: function(errMsg) {
                alert(errMsg.toString());}
        });
    });

    $('#btn_exit, #btn_user_exit, #btn_login_exit, #btn_reg_exit').click(function () {

        setCookie(cookie_name_token);
        cookie_token = getCookie(cookie_name_token);
        ifLogin();
        hide_all_in_user();
        hide_all_in_admin();
        $("#nav_bar")     .hide();
        $("#nav_bar_admin")     .hide();
        $("#page_login")     .show();

    });
    $('#wait_logo').click(function (){
        $('#hidden_info_wait').show();
    });
    $('#reg_foto_logo').click(function (){
        $('#hidden_info_reg').show();
    });

//Program
    /////////////////DETOX/////////////////////////////
    function getDayInfoDetox(day_num){
        if (day_num > 0) {
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
                        setDayDetox(data.current_day, data.marafon_day);
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
    function setDayDetox(current_day, marafon_day){
        day_num = current_day.day_num;
        day_id = current_day.id;

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

        var ahimsa        = current_day.ahimsa_fact;
        var satya         = current_day.satya_fact;
        var asteya        = current_day.asteya_fact;
        var brahma        = current_day.brahma_fact;
        var aparigraha    = current_day.aparigraha_fact;

        var shaucha        = current_day.shaucha_fact;
        var santosha       = current_day.santosha_fact;
        var tapah          = current_day.tapah_fact;
        var svadhya        = current_day.svadhya_fact;
        var ishvara        = current_day.ishvara_fact;
        var social_practic = current_day.social_practic_fact;

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

        var ahimsa_active            = current_day.ahimsa_active;
        var satya_active             = current_day.satya_active;
        var asteya_active            = current_day.asteya_active;
        var brahma_active            = current_day.brahma_active;
        var aparigraha_active        = current_day.aparigraha_active;

        var shaucha_active            = current_day.shaucha_active;
        var santosha_active             = current_day.santosha_active;
        var tapah_active            = current_day.tapah_active;
        var svadhya_active            = current_day.svadhya_active;
        var ishvara_active        = current_day.ishvara_active;

        var social_practic_active   = current_day.social_practic_active;

        var water_target            = current_day.water_target;
        var wake_up_hours_target    = current_day.wake_up_hours_target;
        var wake_up_minutes_target  = current_day.wake_up_minutes_target;
        var meditation_day_target   = current_day.meditation_day_target;
        var meditation_night_target = current_day.meditation_night_target;
        var kaoshiki_minutes_target = current_day.kaoshiki_minutes_target;
        var kirtan_day_target       = current_day.kirtan_day_target;
        var kirtan_night_target     = current_day.kirtan_night_target;


        day_num == marafon_day;


        //   console.log(day_show_now + "  " + day_new);
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

            $('#row_ahimsa')          .hide();
            $('#row_satya')           .hide();
            $('#row_asteya')          .hide();
            $('#row_brahma')          .hide();
            $('#row_aparigraha')      .hide();
            $('#row_shaucha')         .hide();
            $('#row_santosha')        .hide();
            $('#row_tapah')           .hide();
            $('#row_svadhya')         .hide();
            $('#row_ishvara')         .hide();
            $('#row_social_practic')         .hide();



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

            $('#filed_ahimsa')        .prop("checked", false);
            $('#filed_satya')         .prop("checked", false);
            $('#filed_asteya')        .prop("checked", false);
            $('#filed_brahma')        .prop("checked", false);
            $('#filed_aparigraha')    .prop("checked", false);

            $('#filed_shaucha')       .prop("checked", false);
            $('#filed_santosha')      .prop("checked", false);
            $('#filed_tapah')        .prop("checked", false);
            $('#filed_svadhya')      .prop("checked", false);
            $('#filed_ishvara')      .prop("checked", false);
            $('#filed_social_practic').prop("checked", false);

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
            if (half_bath_active       != null && half_bath_active       != false) {$('#row_half_bath').show();}

            if (ahimsa_active          != null && ahimsa_active       != false) {$('#row_ahimsa').show();}
            if (satya_active           != null && satya_active        != false) {$('#row_satya').show();}
            if (asteya_active          != null && asteya_active       != false) {$('#row_asteya').show();}
            if (brahma_active          != null && brahma_active       != false) {$('#row_brahma').show();}
            if (aparigraha_active      != null && aparigraha_active   != false) {$('#row_aparigraha').show();}

            if (shaucha_active         != null && shaucha_active     != false) {$('#row_shaucha').show();}
            if (santosha_active        != null && santosha_active    != false) {$('#row_santosha').show();}
            if (tapah_active           != null && tapah_active       != false) {$('#row_tapah').show();}
            if (svadhya_active         != null && svadhya_active     != false) {$('#row_svadhya').show();}
            if (ishvara_active         != null && ishvara_active     != false) {$('#row_ishvara').show();}
            if (social_practic_active  != null && social_practic_active     != false) {
                $('#row_social_practic').show();
                $('#social_practic_description') .text(current_day.social_practic_description);
            }

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

            ahimsa     != null && ahimsa     !=false ?  $('#filed_ahimsa')    .prop("checked", true) : $('#filed_ahimsa')    .prop("checked", false);
            satya      != null && satya      !=false ?  $('#filed_satya')     .prop("checked", true) : $('#filed_satya')     .prop("checked", false);
            asteya     != null && asteya     !=false ?  $('#filed_asteya')    .prop("checked", true) : $('#filed_asteya')    .prop("checked", false);
            brahma     != null && brahma     !=false ?  $('#filed_brahma')    .prop("checked", true) : $('#filed_brahma')    .prop("checked", false);
            aparigraha != null && aparigraha !=false ?  $('#filed_aparigraha').prop("checked", true) : $('#filed_aparigraha').prop("checked", false);

            shaucha  != null && shaucha  !=false ?  $('#filed_shaucha') .prop("checked", true) : $('#filed_shaucha') .prop("checked", false);
            santosha != null && santosha !=false ?  $('#filed_santosha').prop("checked", true) : $('#filed_santosha').prop("checked", false);
            tapah    != null && tapah    !=false ?  $('#filed_tapah')   .prop("checked", true) : $('#filed_tapah')   .prop("checked", false);
            svadhya  != null && svadhya  !=false ?  $('#filed_svadhya') .prop("checked", true) : $('#filed_svadhya') .prop("checked", false);
            ishvara  != null && ishvara  !=false ?  $('#filed_ishvara') .prop("checked", true) : $('#filed_ishvara') .prop("checked", false);

            social_practic != null && social_practic != false ? $('#filed_social_practic') .prop("checked", true) : $('#filed_social_practic') .prop("checked", false);




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

        if (day_new == 0) {
            day_new = day_show_now;
        }

        // console.log(current_day);




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

        if (day_num > 4) {
            $('#kaoshiki_settings').show();
        }

        if (current_day.water_target_answer && day_num > 5) {
            $('#water_settings').show();
        }


        if (current_day.wake_up_target_answer) {
            $('#wake_up_alert_no_answer').hide();
            $('#table_question_wake_up').hide();
            $('#wake_up_settings').show();
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

        if (current_day.ahimsa_answer ) {
            $('#table_question_ahimsa').hide();
        } else {
            if (day_num > 44) {
                $('#table_question_ahimsa').show();
            } else {
                $('#table_question_ahimsa').hide();
            }
        }

        if (current_day.satya_answer ) {
            $('#table_question_satya').hide();
        } else {
            if (day_num > 45) {
                $('#table_question_satya').show();
            } else {
                $('#table_question_satya').hide();
            }
        }

        if (current_day.asteya_answer ) {
            $('#table_question_asteya').hide();
        } else {
            if (day_num > 46) {
                $('#table_question_asteya').show();
            } else {
                $('#table_question_asteya').hide();
            }
        }

        if (current_day.brahma_answer ) {
            $('#table_question_brahma').hide();
        } else {
            if (day_num > 47) {
                $('#table_question_brahma').show();
            } else {
                $('#table_question_brahma').hide();
            }
        }

        if (current_day.aparigraha_answer ) {
            $('#table_question_aparigraha').hide();
        } else {
            if (day_num > 48) {
                $('#table_question_aparigraha').show();
            } else {
                $('#table_question_aparigraha').hide();
            }
        }


        if (current_day.shaucha_answer ) {
            $('#table_question_shaucha').hide();
        } else {
            if (day_num > 49) {
                $('#table_question_shaucha').show();
            } else {
                $('#table_question_shaucha').hide();
            }
        }


        if (current_day.santosha_answer ) {
            $('#table_question_santosha').hide();
        } else {
            if (day_num > 50) {
                $('#table_question_santosha').show();
            } else {
                $('#table_question_santosha').hide();
            }
        }


        if (current_day.tapah_answer ) {
            $('#table_question_tapah').hide();
        } else {
            if (day_num > 51) {
                $('#table_question_tapah').show();
            } else {
                $('#table_question_tapah').hide();
            }
        }


        if (current_day.svadhya_answer ) {
            $('#table_question_svadhya').hide();
        } else {
            if (day_num > 52) {
                $('#table_question_svadhya').show();
            } else {
                $('#table_question_svadhya').hide();
            }
        }


        if (current_day.ishvara_answer ) {
            $('#table_question_ishvara').hide();
        } else {
            if (day_num > 53) {
                $('#table_question_ishvara').show();
            } else {
                $('#table_question_ishvara').hide();
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
            $('#btn_user_previus_day') .show();
            $('#btn_user_next_day')    .hide();
        } else if (current_day.day_num == marafon_day - 1){
            $('#user_current_day')    .text("День " + day_num + " (вчера)");
            $('#btn_user_next_day')   .show();
            $('#btn_user_previus_day') .show();
        } else if (current_day.day_num == marafon_day + 1) {
            $('#user_current_day')    .text("День " + day_num + " (завтра)");
        } else {
            $('#user_current_day')    .text("День " + day_num + " (" + current_day.day_date + ")");
            $('#btn_user_previus_day') .show();
            $('#btn_user_next_day')    .show();
        }

        if (day_num == 1) {
            $('#btn_user_previus_day') .hide();
            if (marafon_day == 1) {
                $('#btn_user_next_day')   .hide();
            } else {
                $('#btn_user_next_day')   .show();
            }
        }

        if (current_day.day_num > 60) {
            $('#div_btn_user_material').hide();
        } else {
            $('#div_btn_user_material').show();
        }

        $('#btn_user_material')    .val(current_day.day_materials);
        $('#btn_user_previus_day') .val(day_num - 1);
        $('#btn_user_next_day')    .val(day_num + 1);
        $('#btn_user_save_day')    .val(day_num);

        var progress = current_day.day_progress;
        $('#user_progress_bar').css('width', progress+'%').attr('aria-valuenow', progress);
        $('#user_progress_bar').text(progress+'%');
    }
    $('#btn_user_previus_day, #btn_user_next_day').click(function() {
        getDayInfoDetox($(this).val());
    });
    $('#filed_no_snacking_fact, #filed_diet, #filed_tongue_day, #filed_tongue_night, #filed_phisic, #filed_therapy, #filed_asana, #filed_psy, #filed_half_bath_day, #filed_half_bath_night, #filed_ahimsa, #filed_satya, #filed_asteya, #filed_brahma, #filed_aparigraha, #filed_shaucha, #filed_santosha, #filed_tapah, #filed_svadhya, #filed_ishvara, #filed_social_practic').change(function() {
        userSaveDayDetox();
    });
    $("#filed_water_fact, #filed_meditation_day_fact, #filed_meditation_night_fact, #filed_kaoshiki_fact, #filed_kirtan_day_fact, #filed_kirtan_night_fact, #filed_wake_up_fact_hour, #filed_wake_up_fact_minute").on('change keyup paste', function () {
        userSaveDayDetox();
    });
    function userSaveDayDetox() {
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

                ahimsa:           $('#filed_ahimsa')    .is(':checked'),
                satya:            $('#filed_satya')     .is(':checked'),
                asteya:           $('#filed_asteya')    .is(':checked'),
                brahma:           $('#filed_brahma')    .is(':checked'),
                aparigraha:       $('#filed_aparigraha').is(':checked'),

                shaucha:       $('#filed_shaucha') .is(':checked'),
                santosha:      $('#filed_santosha').is(':checked'),
                tapah:         $('#filed_tapah')   .is(':checked'),
                svadhya:       $('#filed_svadhya') .is(':checked'),
                ishvara:       $('#filed_ishvara') .is(':checked'),

                kirtan_day_fact:       $('#filed_kirtan_day_fact')        .val(),
                kirtan_night_fact:     $('#filed_kirtan_night_fact')      .val(),

                social_practic_fact:   $('#filed_social_practic').is(':checked'),

                day_comment:           $('#filed_day_comment')      .val()

                //    question_wake_up_fact: $('#filed_question_wake_up_fact').mTimePicker('getTime'),
                //    question_wake_up_plan: $('#filed_question_wake_up_plan').mTimePicker('getTime')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){

                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }

    var send_comment_timer;
    $('#filed_day_comment').on('change keyup paste', function () {
        clearTimeout(send_comment_timer);
        send_comment_timer = setTimeout(function (){
            console.log("send comment");
            userSaveDayDetox();
        }, 1500);
    });

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
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_ahimsa_save')   .click(function (){
        $('#btn_question_ahimsa_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_ahimsa_answer",
                djama_answer:       $('#filed_question_ahimsa')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_ahimsa_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_satya_save')    .click(function (){
        $('#btn_question_satya_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_satya_answer",
                djama_answer:       $('#filed_question_satya')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_satya_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_asteya_save').click(function (){
        $('#btn_question_asteya_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_asteya_answer",
                djama_answer:       $('#filed_question_asteya')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_asteya_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_brahma_save').click(function (){
        $('#btn_question_brahma_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_brahma_answer",
                djama_answer:       $('#filed_question_brahma')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_brahma_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_aparigraha_save').click(function (){
        $('#btn_question_aparigraha_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_aparigraha_answer",
                djama_answer:       $('#filed_question_aparigraha')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_aparigraha_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_shaucha_save').click(function (){
        $('#btn_question_shaucha_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_shaucha_answer",
                djama_answer:       $('#filed_question_shaucha')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_shaucha_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_santosha_save').click(function (){
        $('#btn_question_santosha_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_santosha_answer",
                djama_answer:       $('#filed_question_santosha')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_santosha_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_tapah_save').click(function (){
        $('#btn_question_tapah_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_tapah_answer",
                djama_answer:       $('#filed_question_tapah')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_tapah_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_svadhya_save').click(function (){
        $('#btn_question_svadhya_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_svadhya_answer",
                djama_answer:       $('#filed_question_svadhya')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_svadhya_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_question_ishvara_save').click(function (){
        $('#btn_question_ishvara_save').prop('disabled', true);
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "user_save_ishvara_answer",
                djama_answer:       $('#filed_question_ishvara')         .is(':checked')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_ishvara_save').prop('disabled', false);
                day_new = 0;
                setDayDetox(data.current_day, data.marafon_day);
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
                setDayDetox(data.current_day, data.marafon_day);
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
                    setDayDetox(data.current_day, data.marafon_day);
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
                    setDayDetox(data.current_day, data.marafon_day);
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });
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
                    setDayDetox(data.current_day, data.marafon_day);
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


    /////////////////MINIC/////////////////////////////

    function getDayInfoMini(day_num){
        if (day_num > 0) {
            $.ajax({
                type: "GET",
                url:  api_url + "get_day_info_mini",
                data: {
                    day_num: day_num
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    //  console.log(data);

                    day_new = data.current_day.day_num;
                    setDayMini(data.current_day, data.marafon_day, data.materials_mini.materials);

                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    }

    function setDayMini(current_day, marafon_day, materials){
        day_num = current_day.day_num;
        day_id = current_day.day_id;


        var water_active                 = current_day.water_active;
        var water_target                 = current_day.water_target;
        var water_fact                   = current_day.water_fact;
        var detox_active                 = current_day.detox_active;
        var detox_description            = current_day.detox_description;
        var detox_fact                   = current_day.detox_fact;
        var wake_up_active               = current_day.wake_up_active;
        var wake_up_hours_target         = current_day.wake_up_hours_target;
        var wake_up_hours_fact           = current_day.wake_up_hours_fact;
        var wake_up_minutes_target       = current_day.wake_up_minutes_target;
        var wake_up_minutes_fact         = current_day.wake_up_minutes_fact;
        var wake_up_recomendation        = current_day.wake_up_recomendation;
        var wake_up_next_day             = current_day.wake_up_next_day;

        var snacking_active              = current_day.snacking_active;
        var snacking_snack_fact          = current_day.snacking_snack_fact;
        var snacking_over_fact           = current_day.snacking_over_fact;
        var snacking_sugar_fact          = current_day.snacking_sugar_fact;
        var thanks_active                = current_day.thanks_active;
        var thanks_target                = current_day.thanks_target;
        var thanks_fact                  = current_day.thanks_fact;
        var family_active                = current_day.family_active;
        var family_no_critic_fact        = current_day.family_no_critic;
        var family_benevolence_fact      = current_day.family_benevolence;
        var family_no_agression_fact     = current_day.family_no_agression;
        var family_enjoy_fact            = current_day.family_enjoy;
        var vegan_active                 = current_day.vegan_active;
        var vegan_fact                   = current_day.vegan_fact;
        var vegan_description            = current_day.vegan_description;
        var kaoshiki_active              = current_day.kaoshiki_active;
        var kaoshiki_minutes_target      = current_day.kaoshiki_minutes_target;
        var kaoshiki_minutes_fact        = current_day.kaoshiki_minutes_fact;
        var asana_active                 = current_day.asana_active;
        var asana_active_1               = current_day.asana_active_1;
        var asana_active_2               = current_day.asana_active_2;
        var asana_fact_1                 = current_day.asana_fact_1;
        var asana_fact_2                 = current_day.asana_fact_2;
        var meditation_active            = current_day.meditation_active;
        var meditation_day_target        = current_day.meditation_day_target;
        var meditation_day_fact          = current_day.meditation_day_fact;
        var meditation_night_target      = current_day.meditation_night_target;
        var meditation_night_fact        = current_day.meditation_night_fact;
        var social_practic_active        = current_day.social_practic_active;
        var social_practic_fact          = current_day.social_practic_fact;
        var social_practic_description   = current_day.social_practic_description;
        var day_comment                  = current_day.day_comment;
        var day_progress                 = current_day.day_progress;


        if (day_show_now !== day_new) {
            $('#row_social_practic_mini')     .hide();
            $('#row_water_mini')              .hide();
            $('#row_detox_mini')              .hide();
            $('#row_wake_up_mini')            .hide();
            $('#row_snacking_mini')           .hide();
            $('#row_overeat_mini')            .hide();
            $('#row_sugar_mini')              .hide();
            $('#row_thanks_mini')             .hide();
            $('#row_family_no_critic_mini')   .hide();
            $('#row_family_benevolence_mini') .hide();
            $('#row_family_no_agression_mini').hide();
            $('#row_family_enjoy_mini')       .hide();
            $('#row_vegan_mini')              .hide();
            $('#row_kaoshiki_mini')           .hide();
            $('#row_asana_mini')              .hide();
            $('#div_filed_asana_mini_1')      .hide();
            $('#div_filed_asana_mini_2')      .hide();
            $('#row_meditation_day_mini')     .hide();
            $('#row_meditation_night_mini')   .hide();

            $('#question_water_mini')         .hide();
            $('#question_detox_mini')         .hide();
            $('#question_wake_up_mini')       .hide();
            $('#question_kaoshiki_mini')      .hide();
            $('#question_asana_mini')         .hide();
            $('#question_meditation_mini')    .hide();


            $('#filed_social_practic_mini')      .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_social_practic_mini')      .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_detox_mini')               .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_snacking_mini')            .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_overeat_mini')             .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_sugar_mini')               .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_family_no_critic_mini')    .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_family_benevolence_mini')  .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_family_no_agression_mini') .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_family_enjoy_mini')        .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_vegan_mini')               .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_asana_mini_1')             .prop("checked", false).attr("data-day-num", day_num);
            $('#filed_asana_mini_2')             .prop("checked", false).attr("data-day-num", day_num);

            $('#filed_water_fact_mini')             .val(null).attr("data-day-num", day_num);
            $('#filed_wake_up_fact_hour_mini')      .val(null).attr("data-day-num", day_num);
            $('#filed_wake_up_fact_minute_mini')    .val(null).attr("data-day-num", day_num);
            $('#filed_thanks_fact_mini')            .val(null).attr("data-day-num", day_num);
            $('#filed_kaoshiki_fact_mini')          .val(null).attr("data-day-num", day_num);
            $('#filed_meditation_day_fact_mini')    .val(null).attr("data-day-num", day_num);
            $('#filed_meditation_night_fact_mini')  .val(null).attr("data-day-num", day_num);
            $('#filed_day_comment_mini')            .val(null).attr("data-day-num", day_num);


            var water_read_material    = false;
            var detox_read_material    = false;
            var wake_up_read_material  = false;
            var snacking_read_material = false;
            var thanks_read_material   = false;
            var family_read_material   = false;
            var vegan_read_material    = false;
            var kaoshiki_read_material = false;
            var asana_read_material    = false;
            var meditation_read_material    = false;
            $.each(materials, function (i, item) {


                var material_num = parseInt(item.material_num);
                switch (item.material_for_practic){
                    case "water":
                        material_num === 1 && item.material_read === true ? water_read_material = true :  water_read_material = false;
                        break;

                    case "detox":
                        material_num === 1 && item.material_read === true ? detox_read_material = true :  detox_read_material = false;
                        break;

                    case "wake_up":
                        material_num === 1 && item.material_read === true ? wake_up_read_material = true :  wake_up_read_material = false;
                        break;

                    case "snacking":
                        material_num === 1 && item.material_read === true ? snacking_read_material = true :  snacking_read_material = false;
                        break;

                    case "thanks":
                        material_num === 1 && item.material_read === true ? thanks_read_material = true :  thanks_read_material = false;
                        break;
                    case "family":
                        material_num === 1 && item.material_read === true ? family_read_material = true :  family_read_material = false;
                        break;
                    case "vegan":
                        material_num === 1 && item.material_read === true ? vegan_read_material = true :  vegan_read_material = false;
                        break;
                    case "kaoshiki":
                        material_num === 1 && item.material_read === true ? kaoshiki_read_material = true :  kaoshiki_read_material = false;
                        break;
                    case "asana":
                        material_num === 1 && item.material_read === true ? asana_read_material = true :  asana_read_material = false;
                        break;
                    case "meditation":
                        material_num === 1 && item.material_read === true ? meditation_read_material = true :  meditation_read_material = false;
                        break;
                }
            });


            var water_ask_question    = false;
            var detox_ask_question    = false;
            var wake_up_ask_question  = false;
            var kaoshiki_ask_question = false;
            var asana_ask_question    = false;
            var meditation_ask_question    = false;
            water_target            == null  ? water_ask_question      = false : water_ask_question = true;
            detox_description       == null  ? detox_ask_question      = false : detox_ask_question = true;
            wake_up_hours_target    == null  ? wake_up_ask_question    = false : wake_up_ask_question = true;
            kaoshiki_minutes_target == null  ? kaoshiki_ask_question   = false : kaoshiki_ask_question = true;
            asana_active_1          == null ? asana_ask_question      = false : asana_ask_question = true;
            meditation_day_target   == null  ? meditation_ask_question = false : meditation_ask_question = true;




            if (social_practic_active) {
                $('#row_social_practic_mini').show();
                $('#social_practic_description_mini').text(social_practic_description);
            }
            if (water_active)          {
                console.log(" water_active");
                if (water_read_material){
                    console.log(" water_read_material");
                    if (water_ask_question){
                        console.log("show row_water_mini");
                        $('#row_water_mini').show();
                        $('#filed_water_plan_mini').val(water_target);
                    } else {
                        console.log("show question_water_mini");
                        $('#question_water_mini').show();
                    }
                }
            }
            if (detox_active)          {
                if (detox_read_material){
                    if (detox_ask_question) {
                        $('#row_detox_mini').show();
                        $('#text_diet_mini').text("Диета" + " - " + detox_description);
                    } else {
                        $('#question_detox_mini').show();
                    }
                }
            }
            if (wake_up_active)        {
                if (wake_up_read_material){
                  if (wake_up_ask_question){
                      $('#row_wake_up_mini').show();
                      $('#wake_up_text_mini').text(wake_up_recomendation);
                      $('#wake_up_tomorrow_mini').text(wake_up_next_day);
                      if (wake_up_minutes_target < 10) {
                          var wake_up_time = wake_up_hours_target + ":0" + wake_up_minutes_target;
                      } else {
                          var wake_up_time = wake_up_hours_target + ":" + wake_up_minutes_target;
                      }
                      $('#filed_wake_up_plan_mini').text(wake_up_time);
                  } else {
                      $('#question_wake_up_mini').show();
                  }
                }

            }
            if (snacking_active)       {
                if (snacking_read_material){
                    $('#row_snacking_mini').show();
                    $('#row_overeat_mini') .show();
                    $('#row_sugar_mini')   .show();
                }
            }
            if (thanks_active)     {
                if (thanks_read_material){
                    $('#row_thanks_mini').show();
                    $('#filed_thanks_plan_mini').val(thanks_target);
                }
            }
            if (family_active)     {
                if (family_read_material){
                    $('#row_family_no_critic_mini').show();
                    $('#row_family_benevolence_mini').show();
                    $('#row_family_no_agression_mini').show();
                    $('#row_family_enjoy_mini').show();
                }
            }
            if (vegan_active)      {
                if (vegan_read_material){
                    $('#row_vegan_mini').show();
                    $('#vegan_description').text(vegan_description);
                }
            }
            if (kaoshiki_active)   {
                if (kaoshiki_read_material) {
                    if (kaoshiki_ask_question) {
                        $('#row_kaoshiki_mini').show();
                        $('#filed_kaoshiki_plan_mini').val(kaoshiki_minutes_target);
                    } else {
                        $('#question_kaoshiki_mini').show();
                    }
                }


            }
            if (asana_active)      {
                if (asana_read_material){
                    if (asana_ask_question){
                        $('#row_asana_mini').show();
                        $('#div_filed_asana_mini_1').show();
                        if (asana_active_2){
                            $('#div_filed_asana_mini_2').show();
                        }
                    } else {
                        $('#question_asana_mini').show();
                    }
                }

            }
            if (meditation_active) {
                if (meditation_read_material) {
                    if (meditation_ask_question){
                        $('#row_meditation_day_mini').show();
                        $('#row_meditation_night_mini').show();

                        $('#filed_meditation_day_plan_mini')  .val(meditation_day_target);
                        $('#filed_meditation_night_plan_mini').val(meditation_night_target);
                    } else {
                        $('#question_meditation_mini').show();
                    }
                }
            }


            social_practic_fact != null && social_practic_fact != false ?  $('#filed_social_practic_mini') .prop("checked", true) : $('#filed_social_practic_mini') .prop("checked", false);
            water_fact          != null && water_fact != false          ?  $('#filed_water_fact_mini').val(water_fact)            : $('#filed_water_fact_mini').val();
            detox_fact          != null && detox_fact != false          ?  $('#filed_detox_fact_mini').prop("checked", true)      : $('#filed_detox_fact_mini').prop("checked", false);

            if (wake_up_hours_fact != null && wake_up_hours_fact != false) {
                var minutes = "";
                wake_up_minutes_fact < 10 ? minutes = "0" + wake_up_minutes_fact : minutes = wake_up_minutes_fact;

                $('#filed_wake_up_fact_hour').val(wake_up_hours_fact);
                $('#filed_wake_up_fact_minute').val(minutes);
            } else {
                $('#filed_wake_up_fact_hour').val(null);
                $('#filed_wake_up_fact_minute').val(null);
            }

            snacking_snack_fact != null && snacking_snack_fact != false ?  $('#filed_snacking_mini').prop("checked", true) : $('#filed_snacking_mini').prop("checked", false);
            snacking_over_fact  != null && snacking_over_fact != false  ?  $('#filed_overeat_mini') .prop("checked", true) : $('#filed_overeat_mini') .prop("checked", false);
            snacking_sugar_fact != null && snacking_sugar_fact != false ?  $('#filed_sugar_mini')   .prop("checked", true) : $('#filed_sugar_mini')   .prop("checked", false);

            thanks_fact != null && thanks_fact !=false   ?  $('#filed_thanks_fact_mini').val(meditation_day_fact)   : $('#filed_thanks_fact_mini').val();

            family_no_critic_fact    != null && family_no_critic_fact    != false ?  $('#filed_family_no_critic_mini')   .prop("checked", true) : $('#filed_family_no_critic_mini')   .prop("checked", false);
            family_benevolence_fact  != null && family_benevolence_fact  != false ?  $('#filed_family_benevolence_mini') .prop("checked", true) : $('#filed_family_benevolence_mini') .prop("checked", false);
            family_no_agression_fact != null && family_no_agression_fact != false ?  $('#filed_family_no_agression_mini').prop("checked", true) : $('#filed_family_no_agression_mini').prop("checked", false);
            family_enjoy_fact        != null && family_enjoy_fact        != false ?  $('#filed_family_enjoy_mini')       .prop("checked", true) : $('#filed_family_enjoy_mini')       .prop("checked", false);

            vegan_fact        != null && vegan_fact        != false ?  $('#filed_vegan_mini')       .prop("checked", true) : $('#filed_vegan_mini')       .prop("checked", false);


            kaoshiki_minutes_fact     != null && kaoshiki_minutes_fact !=false ?  $('#filed_kaoshiki_fact_mini').val(kaoshiki_minutes_fact)   : $('#filed_kaoshiki_fact_mini').val();

            asana_fact_1        != null && asana_fact_1        != false ?  $('#filed_asana_mini_1')       .prop("checked", true) : $('#filed_asana_mini_1')       .prop("checked", false);
            asana_fact_2        != null && asana_fact_2        != false ?  $('#filed_asana_mini_2')       .prop("checked", true) : $('#filed_asana_mini_2')       .prop("checked", false);


            meditation_day_fact   != null && meditation_day_fact !=false   ?  $('#filed_meditation_day_fact_mini')  .val(meditation_day_fact)   : $('#filed_meditation_night_fact_mini').val();
            meditation_night_fact != null && meditation_night_fact !=false ?  $('#filed_meditation_night_fact_mini').val(meditation_night_fact) : $('#filed_meditation_night_fact_mini').val();

            day_comment               != null && day_comment !=false     ?  $('#filed_day_comment_mini').val(day_comment)   : $('#filed_day_comment_mini').val();
        }
        day_show_now = day_num;

        if (day_new == 0) {
            day_new = day_show_now;
        }



        $('#btn_user_next_day_mini')    .val(day_num + 1);
        $('#btn_user_previus_day_mini') .val(day_num - 1);
        if (current_day.day_num == marafon_day) {
            $('#user_current_day_mini')    .text("День " + day_num + " (сегодня)");
            $('#btn_user_previus_day_mini') .show();
            $('#btn_user_next_day_mini')    .hide();
        } else if (current_day.day_num == marafon_day - 1){
            $('#user_current_day_mini')     .text("День " + day_num + " (вчера)");
            $('#btn_user_next_day_mini')    .show();
            $('#btn_user_previus_day_mini') .show();
        } else if (current_day.day_num == marafon_day + 1) {
            $('#user_current_day_mini')    .text("День " + day_num + " (завтра)");
        } else {
            $('#user_current_day_mini')    .text("День " + day_num + " (" + current_day.day_date + ")");
            $('#btn_user_previus_day_mini') .show();
            $('#btn_user_next_day_mini')    .show();
        }



        if (day_num == 1) {
            $('#btn_user_previus_day_mini') .hide();
            if (marafon_day == 1) {
                $('#btn_user_next_day_mini')   .hide();
            } else {
                $('#btn_user_next_day_mini')   .show();
            }
        }


        var progress = day_progress;
        $('#user_progress_bar_mini').css('width', progress+'%').attr('aria-valuenow', progress);
        $('#user_progress_bar_mini').text(progress+'%');
    }

    $('#btn_user_previus_day_mini, #btn_user_next_day_mini').click(function() {
        getDayInfoMini($(this).val());
    });

    var save_day_mini_timer;

    $('#filed_social_practic_mini, #filed_detox_mini, #filed_snacking_mini, #filed_overeat_mini, #filed_sugar_mini, #filed_family_no_critic_mini, #filed_family_benevolence_mini, #filed_family_no_agression_mini, #filed_family_enjoy_mini, #filed_vegan_mini, #filed_asana_mini_1, #filed_asana_mini_2').change(function() {
        console.log($(this).attr("data-day-num"));
        userSaveDayMini($(this).attr("data-day-num"));
    });
    $("#filed_water_fact_mini, #filed_wake_up_fact_hour_mini, #filed_wake_up_fact_minute_mini, #filed_thanks_fact_mini, #filed_kaoshiki_fact_mini, #filed_meditation_day_fact_mini, #filed_meditation_night_fact_mini,  #filed_day_comment_mini").on('change keyup paste', function () {
      // console.log($(this).attr("data-day-num"));
      // clearTimeout(save_day_mini_timer);
      // save_day_mini_timer = setTimeout(function (){
            userSaveDayMini($(this).attr("data-day-num"));
     //   }, 700);
    });
    function userSaveDayMini(day_num) {
        //console.log("save day");
        $.ajax({
            type: "POST",
            url:  api_url + "save_day_status_mini",
            data: {

                social_practic_fact:    $('#filed_social_practic_mini').is(':checked'),
                water_fact:             $('#filed_water_fact_mini')        .val(),
                detox_fact:             $('#filed_detox_mini')                   .is(':checked'),
                wake_up_hours_fact:     $('#filed_wake_up_fact_hour_mini')      .val(),
                wake_up_minutes_fact:   $('#filed_wake_up_fact_minute_mini')    .val(),

                snacking_snack_fact:      $('#filed_snacking_mini')    .is(':checked'),
                snacking_over_fact:       $('#filed_overeat_mini')     .is(':checked'),
                snacking_sugar_fact:         $('#filed_sugar_mini')       .is(':checked'),

                thanks_fact:   $('#filed_thanks_fact_mini')    .val(),

                family_no_critic:     $('#filed_family_no_critic_mini')   .is(':checked'),
                family_benevolence:   $('#filed_family_benevolence_mini') .is(':checked'),
                family_no_agression:  $('#filed_family_no_agression_mini').is(':checked'),
                family_enjoy:         $('#filed_family_enjoy_mini')       .is(':checked'),

                vegan_fact:   $('#filed_vegan_mini')       .is(':checked'),

                asana_fact_1:                 $('#filed_asana_mini_1').is(':checked'),
                asana_fact_2:                 $('#filed_asana_mini_2').is(':checked'),

                kaoshiki_minutes_fact:         $('#filed_kaoshiki_fact_mini')          .val(),

                meditation_day_fact:   $('#filed_meditation_day_fact_mini')    .val(),
                meditation_night_fact: $('#filed_meditation_night_fact_mini')  .val(),

                day_comment:           $('#filed_day_comment_mini')      .val(),
                day_num:    day_num
                //    question_wake_up_fact: $('#filed_question_wake_up_fact').mTimePicker('getTime'),
                //    question_wake_up_plan: $('#filed_question_wake_up_plan').mTimePicker('getTime')
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                setDayMini(data.current_day, data.marafon_day, data.materials_mini.materials);
                setHylsStoreMini(data.hyls_store_mini, data.user);
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }

    $('#btn_question_water_save_mini').click(function (){
        $('#btn_question_water_save_mini').prop('disabled', true);
        $.ajax({
            type: "POST",
            url:  api_url + "save_water_answer_mini",
            data: {
                answer_water_start:       $('#question_water_start_mini')  .val(),
                answer_water_target:      $('#question_water_target_mini') .val(),
                answer_water_step:        $('#question_water_step_mini')   .val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_question_water_save_mini').prop('disabled', false);
                update_user_info(); },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    var detox_type_mini, detox_days_mini, detox_time_mini, detox_start_mini, detox_last_date_mini;
    $(document).on('click', '.link_detox_type_mini',  function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_type_mini').text($(this).text());
        detox_type_mini = $(this).attr("name");

        switch (parseInt(detox_type_mini)){
            case 1:
                detox_days_mini = 21;
                break;
            case 2:
                detox_days_mini = 16;
                break;
            case 3:
                detox_days_mini = 14;
                break;
            case 4:
                detox_days_mini = 5;
                break;
        }

        var i;
        var detox_time_row      = '';
        for (i = 1; i < detox_days_mini + 1; i++) {
            detox_time_row      += '<li><a href="#" class="link_detox_time_mini" name="'+ i +'">' + i + '</a></li>';
        }
        $('#detox_answer_time_mini') .empty();
        $('#detox_answer_time_mini') .append(detox_time_row);
        $('#row_quest_detox_time_mini').show();
        $('#row_quest_detox_start_mini').hide();
        $('#btn_question_detox_save_mini').hide();
        detox_time_mini = null;
        detox_start_mini = null;
        $('#btn_dd_detox_time_mini').text("Кол-во дней");
        $('#btn_dd_detox_start_mini').text("День старта");
    });
    $(document).on('click', '.link_detox_time_mini',  function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_time_mini').text($(this).text());
        detox_time_mini = parseInt($(this).attr("name"));

        switch (parseInt(detox_type_mini)){
            case 1:
                detox_last_date_mini = 21 - detox_time_mini ;
                break;
            case 2:
                detox_last_date_mini = 21 - detox_time_mini  - 5;
                break;
            case 3:
                detox_last_date_mini = 21 - detox_time_mini  - 2 - 5;
                break;
            case 4:
                detox_last_date_mini = 21 - detox_time_mini - 2 - 1 - 1 - 2 - 1 - 2 - 5;
                break;
        }

        var i;
        var detox_start      = '';
        for (i = 1; i < detox_last_date_mini + 2 ; i++) {
            detox_start      += '<li><a href="#" class="link_detox_start_mini" name="'+ i +'">' + i + " день" + '</a></li>';
        }
        $('#detox_answer_start_mini') .empty();
        $('#detox_answer_start_mini') .append(detox_start);

        $('#row_quest_detox_start_mini').show();
        $('#btn_question_detox_save_mini').hide();
        detox_start_mini = null;
        $('#btn_dd_detox_start_mini').text("День старта");
    });
    $(document).on('click', '.link_detox_start_mini', function () {
        console.log($(this).attr("name"));
        console.log($(this).text());

        $('#btn_dd_detox_start_mini').text($(this).text());
        detox_start_mini = $(this).attr("name");
        $('#btn_question_detox_save_mini').show();
    });
    $('#btn_question_detox_save_mini').click(function (){
        if (detox_type_mini !== null && detox_time_mini !== null && detox_start_mini !== null){
            $('#btn_question_detox_save_mini').prop('disabled', true);
            $.ajax({
                type: "POST",
                url:  api_url + "save_detox_answer_mini",
                data: {
                    detox_type_mini:      detox_type_mini,
                    detox_time_mini:      detox_time_mini,
                    detox_start_mini:     detox_start_mini
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_detox_save_mini').prop('disabled', false);
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

    $('#btn_question_wake_up_save_mini').click(function (){
        $('#btn_question_wake_up_save_mini').prop('disabled', true);

        if ($('#filed_question_wake_up_fact_hour_mini').val()  != "" && $('#filed_question_wake_up_fact_minute_mini').val()  != "" && $('#filed_question_wake_up_target_hour_mini').val()  != "" && $('#filed_question_wake_up_target_minute_mini').val( ) != ""){
            $.ajax({
                type: "POST",
                url:  api_url + "save_wake_up_answer_mini",
                data: {
                    answer_wake_up_fact_hour:          $('#question_wake_up_fact_hour_mini')    .val(),
                    answer_wake_up_fact_minute:        $('#question_wake_up_fact_minute_mini')  .val(),
                    answer_wake_up_target_hour:        $('#question_wake_up_target_hour_mini')  .val(),
                    answer_wake_up_target_minute:      $('#question_wake_up_target_minute_mini').val(),
                    answer_wake_up_step:               $('#question_wake_up_step_mini').val()
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    $('#btn_question_wake_up_save_mini').prop('disabled', false);
                    update_user_info();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });

        } else {
            alert("Заполните все поля");
            $('#btn_question_wake_up_save_mini').prop('disabled', false);
        }
    });
    $('#btn_question_kaoshiki_save_mini').click(function (){
        $('#btn_question_kaoshiki_save_mini').prop('disabled', true);

        var kaoshiki_start  = parseInt($('#question_kaoshiki_start_mini').val());
        var kaoshiki_target = parseInt($('#question_kaoshiki_target_mini').val());
        var kaoshiki_step   = parseInt($('#question_kaoshiki_step_mini').val());

        if (kaoshiki_start != "" && kaoshiki_target != "" && kaoshiki_step != ""){
            if (kaoshiki_start < kaoshiki_target) {
                $.ajax({
                    type: "POST",
                    url:  api_url + "save_kaoshiki_answer_mini",
                    data: {
                        answer_kaoshiki_start:  $('#question_kaoshiki_start_mini') .val(),
                        answer_kaoshiki_target: $('#question_kaoshiki_target_mini').val(),
                        answer_kaoshiki_step:   $('#question_kaoshiki_step_mini')  .val()
                    },
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        $('#btn_question_kaoshiki_save_mini').prop('disabled', false);
                        update_user_info();
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
            } else {
                alert("Начальное время не может превышать целевое");
                $('#btn_question_kaoshiki_save_mini').prop('disabled', false);
            }
        } else {
            alert("Заполните все поля");
            $('#btn_question_kaoshiki_save_mini').prop('disabled', false);
        }
    });

    var asana_mini_counts = 0;
    $(document).on('click', '.link_asana_mini', function () {
        $('#btn_dd_asana_mini').text($(this).text());
        asana_mini_counts = $(this).attr("name");
    });
    $('#btn_question_asana_save_mini').click(function (){
        $('#btn_question_asana_save_mini').prop('disabled', true);

        if (asana_mini_counts != 0){
                $.ajax({
                    type: "POST",
                    url:  api_url + "save_asana_answer_mini",
                    data: {
                        answer_asana_counts:  asana_mini_counts
                    },
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        $('#btn_question_asana_save_mini').prop('disabled', false);
                        update_user_info();
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });

        } else {
            alert("Заполните все поля");
            $('#btn_question_asana_save_mini').prop('disabled', false);
        }
    });
    $('#btn_question_meditation_save_mini').click(function (){
        $('#btn_question_meditation_save_mini').prop('disabled', true);

        var meditation_start  = $('#question_meditation_start_mini').val();
        var meditation_target = $('#question_meditation_target_mini').val();
        var meditation_step   = $('#question_meditation_step_mini').val();

        if (meditation_start != "" && meditation_target != "" && meditation_step != ""){
            if (meditation_start < meditation_target) {
                $.ajax({
                    type: "POST",
                    url:  api_url + "save_meditation_answer_mini",
                    data: {
                        answer_meditation_start:  $('#question_meditation_start_mini') .val(),
                        answer_meditation_target: $('#question_meditation_target_mini').val(),
                        answer_meditation_step:   $('#question_meditation_step_mini')  .val()
                    },
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        $('#btn_question_meditation_save_mini').prop('disabled', false);
                        update_user_info();
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
            } else {
                alert("Начальное время не может превышать целевое");
                $('#btn_question_meditation_save_mini').prop('disabled', false);
            }
        } else {
            alert("Заполните все поля");
            $('#btn_question_meditation_save_mini').prop('disabled', false);
        }
    });

//Diary

    function setUserDiaryDetox(diary){
        var diary_row = '<table id="table_diary" class="table table-hover table-bordered table-condensed" >';
        diary_row    += '<thead><tr> <th>День</th> <th>Описание</th> <th>Выполнено</th><th>Запись</th></tr></thead><tbody>';
        $.each(diary, function (i, item) {
            diary_row += '<tr>';
            diary_row += '<td><h5 align="center"><a href="#" class="diary_day_detox reg_link" name="' + item.day_num +'">' + item.day_num + '</a></h5></td>';
            diary_row += '<td><h5><a href="'+ item.day_materials +'" class="reg_link" target="_blank">' + item.day_description + '</a></h5></td>';
            diary_row += '<td><h5 align="center">' + item.day_progress + '</h5></td>';
            diary_row += '<td><h5>' + item.day_comment + '</h5></td>';
            diary_row += '</tr>';
        });
        diary_row += '</tbody></table';
        $('#user_diary_detox').empty();
        $('#user_diary_detox').append(diary_row);
    }
    $(document).on('click', '.diary_day_detox', function () {
        console.log($(this).attr("name"));
        hide_all_in_user();
        $('#page_user_programm').show();
        getDayInfoDetox($(this).attr("name"));
    });


    function setUserDiaryMini(diary){
        var diary_row = '<table class="table table-hover table-bordered table-condensed" >';
        diary_row    += '<thead><tr> <th>День</th> <th>Выполнено</th><th>Заметки</th></tr></thead><tbody>';
        $.each(diary, function (i, item) {
            diary_row += '<tr>';
            diary_row += '<td><h5 align="center"><a href="#" class="diary_day_mini reg_link" name="' + item.day_num +'">' + item.day_num + '</a></h5></td>';
            diary_row += '<td><h5 align="center">' + item.day_progress + '</h5></td>';
            diary_row += '<td><h5>' + item.day_comment + '</h5></td>';
            diary_row += '</tr>';
        });
        diary_row += '</tbody></table';
        $('#user_diary_mini').empty();
        $('#user_diary_mini').append(diary_row);
    }
    $(document).on('click', '.diary_day_mini', function () {
        console.log($(this).attr("name"));
        hide_all_in_user();
        $('#page_user_programm').show();
        getDayInfoMini($(this).attr("name"));
    });

    function setUserMaterialsMini(materials_mini){
        $('#btn_material_mini').empty();
        if (parseInt(materials_mini.unread_materials == 0)){
            $('#btn_material_mini').append('<button class="btn btn-default btn-block btn-sm btn_footer nav-link-user" name="nav_user_diary">Материалы</button>');
        } else {
            $('#btn_material_mini').append('<button class="btn btn-default btn-block btn-sm btn_footer nav-link-user" name="nav_user_diary">Материалы <div class="material_new">' + materials_mini.unread_materials + '</div></button>');
        }


        var row = '<table class="table table-hover table-bordered table-condensed" >';
        row    += '<thead><tr> <th>Материал для практики</th><th>Название материала</th></tr></thead><tbody>';
        $.each(materials_mini.materials, function (i, item) {

            if (item.material_read) {
                row += '<tr>';
                row += '<td><h5 align="left">' + get_practic_name_rus(item.material_for_practic) + '</h5></td>';
                row += '<td><h5 align="center"><a href="' + item.material_link + '" target="_blank">' + item.material_name + '</a></h5></td>';
            } else {
                row += '<tr   class="div_material_unread">';
                row += '<td><h5 align="left">' + get_practic_name_rus(item.material_for_practic) + '</h5></td>';
                row += '<td><h5 align="center"><a href="' + item.material_link + '" target="_blank" name="' + item.material_id +'"  class="link_material_unread">' + item.material_name + '</a></h5></td>';
            }

            row += '</tr>';
        });
        row += '</tbody></table';
        $('#user_materials_mini').empty();
        $('#user_materials_mini').append(row);
    }
    $(document).on('click', '.link_material_unread', function () {
        console.log($(this).attr("name"));
        $.ajax({
            type: "POST",
            url:  api_url + "set_material_read",
            data: { material_id: $(this).attr("name") },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_user_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });


    function get_practic_name_rus(practic){
        var material_for_practic = "";
        switch (practic) {
            case "water":      material_for_practic = "Практика питья воды"; break;
            case "detox":      material_for_practic = "Практика детокса"; break;
            case "wake_up":    material_for_practic = "Практика ранних подъемов"; break;
            case "snacking":   material_for_practic = "Практика без перекусов, передания и сахара"; break;
            case "thanks":     material_for_practic = "Практика благодарности"; break;
            case "family":     material_for_practic = "Практика семейных отношений"; break;
            case "vegan":      material_for_practic = "Переход на вегетарианство"; break;
            case "kaoshiki":   material_for_practic = "Практика каушики"; break;
            case "asana":      material_for_practic = "Практика асан"; break;
            case "meditation": material_for_practic = "Практика медитации"; break;
        }
        return material_for_practic;
    }
//HYLSstore
    $('#div_btn_hyls_store').click(function (){
        hide_all_in_user();
        $('#page_user_hyls_store').show();
    });

    function setHylsStoreMini(hyls_store_mini, user) {
        var hyls_store_coin = user.user_ball_all - user.user_ball_spent;
        $('#hyls_store_coin').text(hyls_store_coin);

        $('#div_btn_hyls_store').empty();
        if (parseInt(hyls_store_mini.available_to_buy == 0)){
            $('#div_btn_hyls_store').append('<button id="btn_hyls_store"  type="button" class="btn btn-info btn-block">HYLSstore</button>');
        } else {
            $('#div_btn_hyls_store').append('<button id="btn_hyls_store"  type="button" class="btn btn-info btn-block">HYLSstore <div class="material_new">' + hyls_store_mini.available_to_buy + '</div></button>');
        }


        var row = '<table class="table table-hover table-bordered table-condensed" >';
        row    += '<thead><tr> <th>Материал для практики</th><th>Название материала</th><th>Стоимость</th></tr></thead><tbody>';
        $.each(hyls_store_mini.materials, function (i, item) {
            row += '<tr>';
            row += '<td><h5 align="left">'   + get_practic_name_rus(item.material_for_practic) + '</h5></td>';
            row += '<td><h5 align="left">'   + item.material_name + '</h5></td>';
            row += '<td><h5 align="center">' + item.material_cost + '</h5></td>';
            row += '<td><button type="button" class="btn btn-success btn-sm" name="btns_buy_material"   value="'  +  item.material_id + '"><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button></h5></td>';
            row += '</tr>';
        });
        row += '</tbody></table';
        $('#table_hyls_store_materials').empty();
        $('#table_hyls_store_materials').append(row);


    }
    $(document).on('click', '[name="btns_buy_material"]', function () {
        console.log($(this).attr("name"));
        $.ajax({
            type: "POST",
            url:  api_url + "buy_hyls_store_material_mini",
            data: { material_id: $(this).val() },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                if (data.error === 0){
                    update_user_info();
                    alert("Оплачено! Теперь Вы можете изучить материал в своей закладке 'Материал'");
                } else if (data.error === 1){
                    alert("Недостаточно баллов для покупки");
                } else if (data.error === 2) {
                    alert("Сначала Вы должны пройти предыдущий материал по практике");
                }

                },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });



    //Rating


//Settings

    $('#btn_meditation_edit').click(function (){
        $('#btn_meditation_edit').prop('disabled', true);
        var meditation_base  = $('#filed_meditation_base_edit').val();
        var meditation_target = $('#filed_meditation_target_edit').val();

        if (meditation_base === "" || meditation_target === ""){
            alert("Поля базовое и целевое значение должны быть заполнены");
            $('#btn_meditation_edit').prop('disabled', false);
        } else {
            if (parseInt(meditation_base) >= parseInt(meditation_target)) {
                alert("Базовое значение не может быть больше целевого");
                $('#btn_meditation_edit').prop('disabled', false);
            } else {
                $.ajax({
                    type: "POST",
                    url:  api_url + "set_meditation_new",
                    data: { meditation_base:  meditation_base,
                            meditation_target: meditation_target},
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        $('#btn_meditation_edit').prop('disabled', false);
                        update_user_info();
                        alert("Изменения приняты");
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
            }
        }
    });

    $('#btn_kaoshiki_edit').click(function (){
        $('#btn_kaoshiki_edit').prop('disabled', true);
        var kaoshiki_base  = $('#filed_kaoshiki_base_edit').val();
        var kaoshiki_target = $('#filed_kaoshiki_target_edit').val();

        if (kaoshiki_base === "" || kaoshiki_target === ""){
            alert("Поля базовое и целевое значение должны быть заполнены");
            $('#btn_kaoshiki_edit').prop('disabled', false);
        } else {
            if (parseInt(kaoshiki_base) >= parseInt(kaoshiki_target)) {
                alert("Базовое значение не может быть больше целевого");
                $('#btn_kaoshiki_edit').prop('disabled', false);
            } else {
                $.ajax({
                    type: "POST",
                    url:  api_url + "set_kaoshiki_new",
                    data: { kaoshiki_base:  kaoshiki_base,
                            kaoshiki_target: kaoshiki_target},
                    headers: {
                        'Authorization':'Token token=' + cookie_token,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    success: function(data){
                        $('#btn_kaoshiki_edit').prop('disabled', false);
                        update_user_info();
                        alert("Изменения приняты");
                    },
                    failure: function(errMsg) {
                        alert(errMsg.toString());
                    }
                });
            }
        }
    });




    $('#btn_rating_show_save').click(function (){
        $('#btn_rating_show_save').prop('disabled', true);
        $.ajax({
            type: "POST",
            url:  api_url + "set_rating_show",
            data: { rating_show_status:  $('#filed_rating_show').is(':checked')},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_rating_show_save').prop('disabled', false);
                update_user_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });


    $('.btn_settings_practise').click(function (){


        var checkbox_id = "setting_practiс_" + $(this).attr("name");
        var practic_status =  $('#' + checkbox_id).is(':checked');


       // switch ($(this).attr("name")) {
       //     case 'no_snacking': practic_status = $('#setting_practiс_no_snacking').is(':checked'); break;
       //     case 'tongue':      practic_status = $('#setting_practiс_tongue').is(':checked');break;
       //     case 'water':       practic_status = $('#setting_practiс_water').is(':checked'); break;
       //     case 'half_bath':   practic_status = $('#setting_practiс_half_bath').is(':checked'); break;
       //     case 'asana':       practic_status = $('#setting_practiс_asana').is(':checked'); break;
       //     case 'phisic':      practic_status = $('#setting_practiс_phisic').is(':checked'); break;
//
       //     case 'ahimsa':      practic_status = $('#setting_practiс_ahimsa').is(':checked'); break;
       //     case 'satya':       practic_status = $('#setting_practiс_satya').is(':checked'); break;
       //     case 'asteya':      practic_status = $('#setting_practiс_asteya').is(':checked'); break;
       //     case 'brahma':      practic_status = $('#setting_practiс_brahma').is(':checked'); break;
       //     case 'aparigraha':  practic_status = $('#setting_practiс_aparigraha').is(':checked'); break;
//
       //     case 'shaucha':   practic_status = $('#setting_practiс_shaucha').is(':checked'); break;
       //     case 'santosha':  practic_status = $('#setting_practiс_santosha').is(':checked'); break;
       //     case 'tapah':     practic_status = $('#setting_practiс_tapah').is(':checked'); break;
       //     case 'svadhya':   practic_status = $('#setting_practiс_svadhya').is(':checked'); break;
       //     case 'ishvara':   practic_status = $('#setting_practiс_ishvara').is(':checked'); break;
       // }

        $.ajax({
            type: "POST",
            url:  api_url + "update_practic_status",
            data: { practic_name:   $(this).attr("name"),
                    practic_status: practic_status
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_user_info();
                alert("Изменения приняты!");
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });

    });

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




    $('#btn_payment_edit').click(function (){
        if ( parseInt($('#filed_payment_size_edit').val()) > 0) {
            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "daily_payment_change_size",
                    new_amount:  $('#filed_payment_size_edit').val()
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    alert("Сумма успешно изменена");
                    update_user_info();
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        } else {
            alert("Ежедневная сумма должна быть больше 0")
        }

    });
    $('#btn_payment_stop').click(function (){
        $.ajax({
            type: "GET",
            url:  api_url_full,
            data: { query_update: "daily_payment_stop"
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                alert("Ежедневное списание Остановлено");
                update_user_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

/////////////////////////////////////  ADMIN  ////////////////////////////////////////////////////////

//Groups

    function setGroups(groups){
        var groups_selector  = '<option>Выберите группу</option>';

        var groups_row = '<table id="groups" class="table table-hover table-bordered table-condensed" >';
        groups_row    += '<thead><tr> <th>Программа</th> <th>Название</th> <th>Дата старта</th> <th>Куратор</th>  <th>Участников</th> </tr></thead><tbody>';
        $.each(groups, function (i, item) {
            groups_row += '<tr><td><h5>';
            groups_row += item.group_program + '</h5></td><td><h5>';
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

        $('#group_add_user_all').empty();
        $('#group_add_user_all').append(groups_selector);
        $('#group_add_user_all').selectpicker("deselectAll");
        $('#group_add_user_all').selectpicker("refresh");
    }
    function setUserProgramm(user_programm) {
        //  console.log(user_programm);

        var user_programm_row = '<table id="table_programm_main1" class="table table-hover table-bordered table-condensed" >';
        user_programm_row    += '<thead><tr> <th>День</th> <th>Вода</th><th>Перекусы</th><th>Диета статус</th><th>Диета тип</th><th>Подъем</th><th>Язык</th>';
        user_programm_row    += '        <th>Медитация (утро)</th> <th>Медитация (вечер)</th><th>Каушики</th><th>Физ. упр.</th><th>Терапии</th><th>Асаны</th>';
        user_programm_row    += '        <th>Псих. упр.</th><th>Полуванна</th> ';
        user_programm_row    += '        <th>Ахимса</th><th>Сатья</th><th>Астея</th><th>Брахмачарья</th><th>Апариграха</th> ';
        user_programm_row    += '        <th>Шауча</th><th>Сантоша</th><th>Тапах</th><th>Свадхья</th><th>Ишвара пранидхана</th> ';
        user_programm_row    += '        <th>Киртан (утро)</th><th>Киртан (вечер)</th>';
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

            if ( item.ahimsa_active != null  &&  item.ahimsa_active != false) {
                if (item.ahimsa_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.satya_active != null  &&  item.satya_active != false) {
                if (item.satya_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.asteya_active != null  &&  item.asteya_active != false) {
                if (item.asteya_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.brahma_active != null  &&  item.brahma_active != false) {
                if (item.brahma_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.aparigraha_active != null  &&  item.aparigraha_active != false) {
                if (item.aparigraha_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.shaucha_active != null  &&  item.shaucha_active != false) {
                if (item.shaucha_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.santosha_active != null  &&  item.santosha_active != false) {
                if (item.santosha_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.tapah_active != null  &&  item.tapah_active != false) {
                if (item.tapah_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.svadhya_active != null  &&  item.svadhya_active != false) {
                if (item.svadhya_fact) {
                    user_programm_row += '<td class="warning"><h5>' + "+"  + '</h5></td>';
                } else {
                    user_programm_row += '<td class="warning"><h5></h5></td>';
                }
            } else {
                user_programm_row += '<td><h5></h5></td>';
            }

            if ( item.ishvara_active != null  &&  item.ishvara_active != false) {
                if (item.ishvara_fact) {
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

    $('#group_add_curator').on('changed.bs.select', function () {
        //console.log($(this).find("option:selected").val());
        group_curator_id = $(this).find("option:selected").val();
    });

    $(document).on('click', '.program_link_group', function () {
        console.log($(this).attr("name"));
        $('#btn_dd_group_program').text($(this).text());
        group_program_id = $(this).attr("name");
    });

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

        if (group_name == null || group_curator_id == null || group_start === "" || group_messenger === "" || group_messenger_link === "" ||  group_program_id === "") {
            alert("Заполните все поля");
            $('#btn_group_add').prop('disabled', false);
        } else {
            $.ajax({
                type: "GET",
                url: api_url_full,
                data: { query_update:     "create_group",
                    group_name        : group_name,
                    group_start       : group_start,
                    group_curator_id  : group_curator_id,
                    group_messenger   : group_messenger,
                    group_program_id   : group_program_id,
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
                        group_program_id = "";
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
                $('#group_start_edit').val(data.group.group_start);

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
                    group_messenger: $('#group_messenger_link_edit').val(),
                    group_start:     $('#group_start_edit').val()
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
            url:  api_url + "get_group_info",
            data: { query_info: "get_group_info",
                group_id: $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                hide_all_in_admin();
                $('#page_group_info').show();

                $('#group_info_name')   .text(data.group_name);
                $('#group_info_curator').text(" (куратор: " + data.group_curator + ")  ");
                $('#group_day_today').text(data.marafon_day_today + " день");


                $('#revenu_reccurent').text("Реккурентных платежей на: " + data.transaction_reccurent_sum + " руб. ::: ");
                $('#revenu_support')  .text("Поддержки на: "             + data.transaction_support_sum + " руб. ");


                var reccurent_row = '<table id="group_users" class="table table-hover table-bordered table-condensed" >';
                reccurent_row    += '<thead><tr> <th>День</th> <th>Кол-во платежей</th>  <th>Сумма платежей</th></tr></thead><tbody>';
                $.each(data.transaction_reccurent_amount, function (i, item) {
                    var day_num = i + 1;
                    reccurent_row += '<tr>';
                    reccurent_row += '<td><h5>' + day_num + '</h5></td>';
                    reccurent_row += '<td><h5>' + data.transaction_reccurent_count[i]  + '</h5></td>';
                    reccurent_row += '<td><h5>' + data.transaction_reccurent_amount[i] + '</h5></td>';
                    reccurent_row += '</tr>';

                });
                reccurent_row += '</tbody></table';
                $('#table_group_reccurent_payments').empty();
                $('#table_group_reccurent_payments').append(reccurent_row);
                $('#table_group_reccurent_payments').bsTable(undefined, true, undefined, undefined, true);


                var group_users_row = '<table id="group_users" class="table table-hover table-bordered table-condensed" >';
                group_users_row    += '<thead><tr> <th>Имя</th> <th>Телефон</th>  <th>Ссылка ВК</th><th>Почта</th><th>Комментарий</th> </tr></thead><tbody>';
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

                    group_users_row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';
                    group_users_row += '<td><button type="button" class="btn btn-info btn-sm"   name="btns_group_user_info"   value="'  +  item.user_id + '"  > <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button></td>';

                    group_users_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_edit_user" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_edit_user"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';

                    group_users_row += '<td><button type="button" class="btn btn-danger btn-sm" name="btns_group_user_delete" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_group_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';

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
                    //hide_all_in_admin();
                    //$('#page_groups')  .show();
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

        if (curator_add_name == "" || curator_add_phone == "" || curator_add_pass == "") {
            alert("Заполните все поля");
            $('#btn_curator_add').prop('disabled', false);
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
    function setUsersRegPay(users){
        var user_register_row = '<table id="table_users_register1" class="table table-hover table-bordered table-condensed" >';
        user_register_row    += '<thead><tr>';
        user_register_row    += '<th>Имя</th>';
        user_register_row    += '<th>Почта</th>';
        user_register_row    += '<th>Телефон</th>';
        user_register_row    += '<th>Пароль</th>';
        user_register_row    += '<th>Ссылка соц.сети</th>';
        user_register_row    += '<th>Последнее действие</th>';
        user_register_row    += '<th>Дата следующего</th>';
        user_register_row    += '<th>Статус</th>';
        user_register_row    += '<th>Комментарий</th>';
        user_register_row    += '</tr></thead><tbody>';
        $.each(users.user_reg, function (i, item) {
            user_register_row += '<tr id="user_reg_' + item.user_id + '">';
            user_register_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_social_link            + '</h5></td>';
            user_register_row += '<td><textarea          class="curator_last_action" name="' + item.user_id + '">' + item.curator_last_action + '</textarea></td>';
            user_register_row += '<td><input type="date" class="curator_next_action" name="' + item.user_id + '" value="' + item.curator_next_action +'"></td>';
            user_register_row += '<td><div class="dropdown">';
            user_register_row += '<button class="btn btn-default  btn-block  dropdown-toggle" type="button" data-toggle="dropdown" id="btn_dd_status_' + item.user_id + '">';
            user_register_row += item.user_status +'<span class="caret"></span></button>';
            user_register_row += '<ul class="dropdown-menu">';
            user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="0 - заявка">0 - заявка</a></li>';
            user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="1 - уведомлен">1 - уведомлен</a></li>';
            user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="2 - отказ">отказ</a></li>';
            user_register_row += '</ul></div></td>';



            user_register_row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';
            user_register_row += '<td><button type="button" class="btn btn-success btn-sm" name="btns_confirm_pay" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_confirm_pay"> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span></button></td>';
            user_register_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_edit_user" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_edit_user"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            user_register_row += '<td><button type="button" class="btn btn-danger btn-sm"  name="btns_user_delete" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';


            user_register_row += '</tr>';
        });
        user_register_row += '</tbody></table';
        $('#table_users_register').empty();
        $('#table_users_register').append(user_register_row);
        $('#table_users_register').bsTable(undefined, true, undefined, undefined, true);



        var user_pay_row = '<table id="table_users_pay1" class="table table-hover table-bordered table-condensed" >';
        user_pay_row    += '<thead><tr>';
        user_pay_row    += '<th>Имя</th>';
        user_pay_row    += '<th>Почта</th>';
        user_pay_row    += '<th>Телефон</th>';
        user_pay_row    += '<th>Пароль</th>';
        user_pay_row    += '<th>Ссылка соц.сети</th>';
        user_pay_row    += '<th>Мессенджер</th>';
        user_pay_row    += '<th>Факт оплата</th>';
        user_pay_row    += '<th>Комментарий</th>';
        user_pay_row    += '</tr></thead><tbody>';
        $.each(users.user_pay, function (i, item) {
            user_pay_row += '<tr id="user_pay_' + item.user_id + '">';
            user_pay_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_link_vk            + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_messenger          + '</h5></td>';
            user_pay_row += '<td><h5>' + item.user_payment_size_fact  + '</h5></td>';
            user_pay_row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';
            user_pay_row += '<td><button type="button" class="btn btn-success btn-sm" name="btns_to_group" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_to_group"> <span class="glyphicon glyphicon-log-in" aria-hidden="true"></span></button></td>';
            user_pay_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_edit_user" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_edit_user"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            user_pay_row += '<td><button type="button" class="btn btn-danger btn-sm"  name="btns_user_delete" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';

            user_pay_row += '</tr>';
        });
        user_pay_row += '</tbody></table';
        $('#table_users_pay').empty();
        $('#table_users_pay').append(user_pay_row);
        $('#table_users_pay').bsTable(undefined, false, undefined, undefined, true);
    }

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


        $('#btn_register').prop('disabled', true);
        if (user_name == null || user_email == null || user_password == null ){
            alert("Заполните все поля");
            $('#btn_register').prop('disabled', false);
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
                        $('#btn_register').prop('disabled', false);
                        setUsersRegPay(data.users_reg_pay);
                        $('#modal_register') .modal('hide');
                    } else {
                        alert("Пользователь с таким телефоном/почтой уже имеется в базе");
                        $('#btn_register').prop('disabled', false);
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
                setUsersRegPay(data.users_reg_pay);

                update_admin_info();
                $('#modal_edit_user') .modal('hide');},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $('#btn_find_user').click(function () {

        if ($('#field_find_user').val() == "") {
            alert("Сначала введите параметр поиска");
        } else {
            $.ajax({
                type: "GET",
                url: api_url + "admin_find_user",
                data: { field_find_user: $('#field_find_user').val()
                },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    setUsersFind(data.found_users);

                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }

    });
    function setUsersFind(users){
        var user_register_row = '<table class="table table-hover table-bordered table-condensed" >';
        user_register_row    += '<thead><tr>';
        user_register_row    += '<th>Имя</th>';
        user_register_row    += '<th>Почта</th>';
        user_register_row    += '<th>Телефон</th>';
        user_register_row    += '<th>Пароль</th>';
        user_register_row    += '<th>Ссылка соц.сети</th>';
        user_register_row    += '<th>Статус</th>';
      //  user_register_row    += '<th>Последнее действие</th>';
      //  user_register_row    += '<th>Дата следующего</th>';
      //  user_register_row    += '<th>Статус</th>';
        user_register_row    += '<th>Комментарий</th>';
        user_register_row    += '</tr></thead><tbody>';
        $.each(users, function (i, item) {
            user_register_row += '<tr id="user_reg_' + item.user_id + '">';
            user_register_row += '<td><h5>' + item.user_name               + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_email              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_phone              + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_password           + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_social_link            + '</h5></td>';
            user_register_row += '<td><h5>' + item.user_step          + '</h5></td>';
           // user_register_row += '<td><textarea          class="curator_last_action" name="' + item.user_id + '">' + item.curator_last_action + '</textarea></td>';
           // user_register_row += '<td><input type="date" class="curator_next_action" name="' + item.user_id + '" value="' + item.curator_next_action +'"></td>';
           // user_register_row += '<td><div class="dropdown">';
           // user_register_row += '<button class="btn btn-default  btn-block  dropdown-toggle" type="button" data-toggle="dropdown" id="btn_dd_status_' + item.user_id + '">';
           // user_register_row += item.user_status +'<span class="caret"></span></button>';
           // user_register_row += '<ul class="dropdown-menu">';
           // user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="0 - заявка">0 - заявка</a></li>';
           // user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="1 - уведомлен">1 - уведомлен</a></li>';
           // user_register_row += ' <li><a href="#" class="link_curator_status" data-user-id="' + item.user_id + '" name="2 - отказ">отказ</a></li>';
           // user_register_row += '</ul></div></td>';

            user_register_row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';
            user_register_row += '<td><button type="button" class="btn btn-warning btn-sm" name="btns_edit_user" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_edit_user"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button></td>';
            user_register_row += '<td><button type="button" class="btn btn-danger btn-sm"  name="btns_user_delete" value="'  +  item.user_id + '"  data-toggle="modal" data-target="#modal_user_delete"> <span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button></td>';


            user_register_row += '</tr>';
        });
        user_register_row += '</tbody></table';
        $('#table_users_find').empty();
        $('#table_users_find').append(user_register_row);
        $('#table_users_find').bsTable(undefined, false, undefined, undefined, true);

    }


    $('#btn_hide_user_register').click(function (){
        if ($('#table_users_register').is(":visible")){
            $('#table_users_register').hide();
        } else {
            $('#table_users_register').show();
        }
    });
    $('#btn_hide_user_paid')    .click(function (){
        if ($('#table_users_pay').is(":visible")){
            $('#table_users_pay').hide();
        } else {
            $('#table_users_pay').show();
        }
    });

    $(document).on('click', '[name="btns_confirm_pay"]' , function() {
        // console.log($(this).val());
        $("#btn_confirm_pay").val($(this).val());
    });
    $('#btn_confirm_pay').click(function () {
        var user_id            = $(this).val();
        var payment_date       = $('#payment_date').val();
        var payment_size       = $('#payment_size').val();
        var payment_method     = $('#payment_method').val();
        $('#btn_confirm_pay').prop('disabled', true);



        if (payment_date == "" || payment_size == null || payment_method == null ) {
            alert("Заполните все поля");
            $('#btn_confirm_pay').prop('disabled', false);

        } else {
            $('#btn_confirm_pay').prop('disabled', false);
            $('#modal_wait_confirm').modal('hide');
            $('#modal_confirm_pay') .modal('hide');
            var row_reg_id = "user_reg_" + $(this).val();
            $("#" + row_reg_id).hide();

            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "confirm_pay",
                    user_id:            user_id,
                    payment_date:       payment_date,
                    payment_size:       payment_size,
                    payment_method:     payment_method       },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    setUsersRegPay(data.users_reg_pay);
                    $('#modal_wait_confirm').modal('hide');
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


    $(document).on('click', '[name="btns_to_group"]' , function() {
        //  console.log($(this).val());
        $('#btn_to_group').val($(this).val());
    });
    $('#group_add_user').on('changed.bs.select', function () {
        // console.log($(this).find("option:selected").val());
        group_id = $(this).find("option:selected").val();
    });
    $('#btn_to_group').click(function () {
        var row_pay_id = "user_pay_" + $(this).val();
        $("#" + row_pay_id).hide();

        var user_id = $(this).val();
        $('#btn_to_group').prop('disabled', true);

        if (group_id == null) {
            alert("Выберите группу");
            $('#btn_to_group').prop('disabled', false);

        } else {
            $('#modal_to_group') .modal('hide');

            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "join_to_group",
                    user_id:       user_id,
                    group_id:      group_id   },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    update_admin_info();
                    $('#btn_to_group').prop('disabled', false);
                    $('#modal_to_group') .modal('hide');
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });

    $('#group_add_user_all').on('changed.bs.select', function () {
        // console.log($(this).find("option:selected").val());
        group_all_id = $(this).find("option:selected").val();
    });
    $('#btn_to_group_all').click(function () {
        $('#btn_to_group_all').prop('disabled', true);

        if (group_all_id == null) {
            alert("Выберите группу");
            $('#btn_to_group_all').prop('disabled', false);

        } else {
            $('#modal_to_group_all') .modal('hide');
            $('#table_users_pay').empty();

            $.ajax({
                type: "GET",
                url:  api_url_full,
                data: { query_update: "join_to_group_all",
                    group_id:      group_all_id   },
                headers: {
                    'Authorization':'Token token=' + cookie_token,
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                success: function(data){
                    update_admin_info();
                    $('#btn_to_group_all').prop('disabled', false);
                    $('#modal_to_group_all') .modal('hide');
                },
                failure: function(errMsg) {
                    alert(errMsg.toString());
                }
            });
        }
    });

//Programs

    function setPrograms(programs){
        var program_list_for_groups = '';
        var programm_main_row = '<table class="table table-hover table-bordered table-condensed" >';
        programm_main_row    += '<thead><tr> <th>Название программы</th><th>Состав программы</th>';
        programm_main_row    += '</tr></thead><tbody>';
        $.each(programs, function (i, item) {
            programm_main_row += '<tr>';
            programm_main_row += '<td><h5>' + item.program_name         + '</h5></td>';
            programm_main_row += '<td><button type="button" class="btn btn-info btn-sm" name="btns_program_detail" value="'  +  item.program_id + '"  > <span class="glyphicon glyphicon-th-list" aria-hidden="true"></span></button></td>';
            programm_main_row += '</tr>';
            program_list_for_groups += '<li><a href="#" class="program_link_group" name="' + item.program_id + '">' + item.program_name + '</a></li>';
        });
        programm_main_row += '</tbody></table';
        $('#program_list_for_group').empty();
        $('#program_list_for_group').append(program_list_for_groups);

        $('#table_programs').empty();
        $('#table_programs').append(programm_main_row);
        $('#table_programs').bsTable(undefined, false, undefined, undefined, true);
    }

    function setProgramDetox(programm_main){
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

            programm_main_row += '</tr>';
        });
        programm_main_row += '</tbody></table';

        $('#table_programm_detox').show();
        $('#table_programm_detox').empty();
        $('#table_programm_detox').append(programm_main_row);
        $('#table_programm_detox').bsTable(undefined, false, undefined, undefined, true);
    }

    $(document).on('click', '[name="btns_program_detail"]' , function() {
       // console.log($(this).val());

        $.ajax({
            type: "GET",
            url:  api_url + "program_detail",
            data: { program_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#page_program').hide();
                $('#current_program').show();

                setProgramDetox(data.program_detox);

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_program_back').click(function () {
        $('#page_program').show();
        $('#current_program').hide();
    });

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
        $('#field_therapy_active')         .prop("checked", false);
        $('#field_therapy_decription')     .val();
        $('#field_asana_active')           .prop("checked", false);
        $('#field_psi_active')             .prop("checked", false);
        $('#field_half_bath_active')       .prop("checked", false);


        $('#field_kirtan_day_target')      .val();
        $('#field_kirtan_night_target')    .val();
        $('#field_time_to_read')           .val();
        $('#field_time_to_practise')       .val();
        $('#field_day_materials')          .val();
        $('#field_day_comment')            .val();


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
                therapy_active:            $('#field_therapy_active')         .is(':checked'),
                asana_active:              $('#field_asana_active')           .is(':checked'),
                psi_active:                $('#field_psi_active')             .is(':checked'),
                day_materials:             $('#field_day_materials')          .val(),
                day_comment:               $('#field_day_comment')            .val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                setProgramDetox(data.detox_program);
                $('#modal_edit_programm_main') .modal('hide');
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
                day_id: $(this).val()
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



// Material

    function setMaterial(materials){
        $('#table_materials_water').empty();
        $('#table_materials_water').append(createMaterialTable(materials.water));
        $('#table_materials_water').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_detox').empty();
        $('#table_materials_detox').append(createMaterialTable(materials.detox));
        $('#table_materials_detox').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_wake_up').empty();
        $('#table_materials_wake_up').append(createMaterialTable(materials.wake_up));
        $('#table_materials_wake_up').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_snacking').empty();
        $('#table_materials_snacking').append(createMaterialTable(materials.snacking));
        $('#table_materials_snacking').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_thanks').empty();
        $('#table_materials_thanks').append(createMaterialTable(materials.thanks));
        $('#table_materials_thanks').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_family').empty();
        $('#table_materials_family').append(createMaterialTable(materials.family));
        $('#table_materials_family').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_vegan').empty();
        $('#table_materials_vegan').append(createMaterialTable(materials.vegan));
        $('#table_materials_vegan').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_kaoshiki').empty();
        $('#table_materials_kaoshiki').append(createMaterialTable(materials.kaoshiki));
        $('#table_materials_kaoshiki').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_asana').empty();
        $('#table_materials_asana').append(createMaterialTable(materials.asana));
        $('#table_materials_asana').bsTable(undefined, false, undefined, undefined, false);

        $('#table_materials_meditation').empty();
        $('#table_materials_meditation').append(createMaterialTable(materials.meditation));
        $('#table_materials_meditation').bsTable(undefined, false, undefined, undefined, false);

    }

    function createMaterialTable(materials){
        var row = '<table class="table table-hover table-bordered table-condensed" >';
        row    += '<thead><tr> <th>Номер</th> <th>Название</th> <th>Стоимость</th><th>Ссылка</th></tr></thead><tbody>';
        $.each(materials, function (i, item) {
            row += '<tr>';
            row += '<td><h5>' + item.material_num  + '</h5></td>';
            row += '<td><h5>' + item.material_name + '</h5></td>';
            row += '<td><h5>' + item.material_cost + '</h5></td>';
            row += '<td><a href="' + item.material_link + '" target="_blank">Ссылка</a></td>';
            row += '<td><button type="button" class="btn btn-default btn-sm" name="btns_edit_material" value="'  +  item.material_id + '"> <span class="glyphicon glyphicon-edit" aria-hidden="true"></span></button> </td>';
            row += '</tr>';
        });
        row += '</tbody></table';
        return row;
    }

    $('.btn_modal_create_material').click(function (){
        console.log($(this).val());
        $('#btn_create_material').val($(this).val());
    });

    $('#btn_create_material').click(function (){
        $('#btn_create_material').prop("disabled", true);
        $.ajax({
            type: "POST",
            url:  api_url + "material_create",
            data: {
                material_for_practic: $(this).val(),
                material_name:        $('#field_material_name').val(),
                material_link:        $('#field_material_link').val(),
                material_cost:        $('#field_material_cost').val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                $('#btn_create_material').prop("disabled", false);
                $('#modal_create_material').modal('hide');
                update_admin_info();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });



    $(document).on('click', '[name="btns_edit_material"]' , function() {
        $.ajax({
            type: "GET",
            url:  api_url + "get_material_info",
            data: {material_id: $(this).val()},
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                $('#field_material_name_edit').val(data.material.material_name);
                $('#field_material_link_edit').val(data.material.material_link);
                $('#field_material_cost_edit').val(data.material.material_cost);
                $('#btn_edit_material').val(data.material.id);
                $('#modal_edit_material').modal('show');

            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $('#btn_edit_material').click(function (){
        $.ajax({
            type: "POST",
            url:  api_url + "material_edit",
            data: {
                material_id: $(this).val(),
                material_name:        $('#field_material_name_edit').val(),
                material_link:        $('#field_material_link_edit').val(),
                material_cost:        $('#field_material_cost_edit').val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                update_admin_info();
                $('#modal_edit_material').modal('hide');
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });



// conversion

    function setConversion(){

        conversion_start  = $('#report_conversion_start').val();
        conversion_finish = $('#report_conversion_finish').val();
        $.ajax({
            type: "GET",
            url:  api_url + "get_conversion",
            data: {
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){




                console.log(data);
                $('#conv_vk_clicks')        .text(data.vk.vk_clicks);
                $('#conv_vk_regs')        .text(data.vk.vk_regs);
                $('#conv_vk_phones')      .text(data.vk.vk_phones);
                $('#conv_vk_users_all')   .text(data.vk.vk_users_all);
                $('#conv_vk_users_pay')   .text(data.vk.vk_users_pay);
                $('#conv_vk_users_wait')  .text(data.vk.vk_users_wait);
                $('#conv_vk_users_free')  .text(data.vk.vk_users_free);
                $('#conv_vk_users_conv')  .text(data.vk.vk_users_conv);
                $('#conv_vk_users_profit')  .text(data.vk.vk_users_profit);

                $('#conv_fb_clicks')        .text(data.fb.fb_clicks);
                $('#conv_fb_regs')        .text(data.fb.fb_regs);
                $('#conv_fb_phones')      .text(data.fb.fb_phones);
                $('#conv_fb_users_all')   .text(data.fb.fb_users_all);
                $('#conv_fb_users_pay')   .text(data.fb.fb_users_pay);
                $('#conv_fb_users_wait')  .text(data.fb.fb_users_wait);
                $('#conv_fb_users_free')  .text(data.fb.fb_users_free);
                $('#conv_fb_users_conv')  .text(data.fb.fb_users_conv);
                $('#conv_fb_users_profit')  .text(data.fb.fb_users_profit);

                $('#conv_hand_clicks')      .text(data.hand.hand_clicks);
                $('#conv_hand_regs')      .text(data.hand.hand_regs);
                $('#conv_hand_phones')    .text(data.hand.hand_phones);
                $('#conv_hand_users_all') .text(data.hand.hand_users_all);
                $('#conv_hand_users_pay') .text(data.hand.hand_users_pay);
                $('#conv_hand_users_wait').text(data.hand.hand_users_wait);
                $('#conv_hand_users_free').text(data.hand.hand_users_free);
                $('#conv_hand_users_conv').text(data.hand.hand_users_conv);
                $('#conv_hand_users_profit').text(data.hand.hand_users_profit);

                $('#conv_all_clicks')       .text(data.all.all_clicks);
                $('#conv_all_regs')       .text(data.all.all_regs);
                $('#conv_all_phones')     .text(data.all.all_phones);
                $('#conv_all_users_all')  .text(data.all.all_users_all);
                $('#conv_all_users_pay')  .text(data.all.all_users_pay);
                $('#conv_all_users_wait') .text(data.all.all_users_wait);
                $('#conv_all_users_free') .text(data.all.all_users_free);
                $('#conv_all_users_conv') .text(data.all.all_users_conv);
                $('#conv_all_users_profit') .text(data.all.all_users_profit);

                $('#page_conversion').show();
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    }

    function setConvUsersTable(users){
        var row = '<table class="table table-hover table-bordered"><thead><tr class="db_main_row"> ';
        row    += '<th>Имя</th>';
        row    += '<th>Почта</th>';
        row    += '<th>Способ регистрации</th>';
        row    += '<th>Ссылка на профиль</th>';
        row    += '<th>Мессенджер</th>';
        row    += '<th>Телефон</th>';
        row    += '<th>Комментарий</th>';
        row    += '</tr></thead><tbody>';
        $.each(users, function (i, item) {
            row += '<tr class="db_main_row">';
            row += '<td><h5 class="db_main_row">' + item.user_name               + '</h5></td>';
            row += '<td><h5 class="db_main_row">' + item.user_email              + '</h5></td>';
            row += '<td><h5 class="db_main_row">' + item.user_reg_flow           + '</h5></td>';
            row += '<td><h5 class="db_main_row"><a href="' + item.user_social_link +'" target="_blank">' + item.user_social_link + '</a></h5></td>';
            row += '<td><h5 class="db_main_row">' + item.user_messenger           + '</h5></td>';
            row += '<td><h5 class="db_main_row">' + item.user_phone               + '</h5></td>';
            row += '<td><textarea class="user_comment_admin" name="' + item.user_id + '">' + item.user_comment + '</textarea></td>';
            row += '</tr>';
        });
        row += '</tbody></table>';
        $('.conv_users').empty();
        $('.conv_users').append(row);
        $('.conv_users').bsTable(undefined, true, undefined, undefined, true);


        $('#modal_conv_users').modal('show');
    }




    $(document).on('click', '.conv_regs_all',         function () {
        $.ajax({
            type: "GET",
            url:  api_url + "get_conv_regs_all",
            data: {
                reg_flow: $(this).val(),
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                setConvUsersTable(data.users)
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '.conv_practics_all',     function () {
        $.ajax({
            type: "GET",
            url:  api_url + "get_conv_practics_all",
            data: {
                reg_flow: $(this).val(),
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                setConvUsersTable(data.users)
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '.conv_lost_reg',     function () {
        $.ajax({
            type: "GET",
            url:  api_url + "get_conv_lost_reg",
            data: {
                reg_flow: $(this).val(),
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                setConvUsersTable(data.users)
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '.conv_practics_pay',     function () {
        $.ajax({
            type: "GET",
            url:  api_url + "get_conv_practics_pay",
            data: {
                reg_flow: $(this).val(),
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                setConvUsersTable(data.users)
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '.conv_practics_free',    function () {
        $.ajax({
            type: "GET",
            url:  api_url + "get_conv_practics_free",
            data: {
                reg_flow: $(this).val(),
                conversion_start:  conversion_start,
                conversion_finish: conversion_finish
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){
                console.log(data);
                setConvUsersTable(data.users)
            },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });




    $(document).on('change keyup paste', '.user_comment_admin', function () {
        console.log($(this).attr("name"));
        console.log($(this).val());

        $.ajax({
            type: "POST",
            url:  api_url + "set_comment_to_user",
            data: {
                user_id:      $(this).attr("name"),
                comment:      $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });
    $(document).on('change keyup paste', '.curator_last_action', function () {
        console.log($(this).attr("name"));
        console.log($(this).val());

        $.ajax({
            type: "POST",
            url:  api_url + "set_last_action_to_user",
            data: {user_id:      $(this).attr("name"),
                last_action:  $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('change', '.curator_next_action', function(){
        console.log(this.value);         //Date in full format alert(new Date(this.value));
        console.log(new Date(this.value));

        $.ajax({
            type: "POST",
            url:  api_url + "set_curator_next_action",
            data: {
                user_id:      $(this).attr("name"),
                next_action:  $(this).val()
            },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $(document).on('click', '.link_curator_status',       function () {
        //  console.log($(this).attr("name"));
        var btn_id = "btn_dd_status_" + $(this).attr("data-user-id");
        $('#' + btn_id).text($(this).attr("name"));


        $.ajax({
            type: "POST",
            url:  api_url + "set_user_status",
            data: {user_id:      $(this).attr("data-user-id"),
                   status:  $(this).attr("name")     },
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){},
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });


    //TEST
    $('#btn_set_soc_practic').click(function () {
        //console.log("chekbox" + $('#field_eat_no_snacking_active').is(':checked'));

        $.ajax({
            type: "POST",
            url:  api_url + "set_social_practic_for_groups",
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){  },
            failure: function(errMsg) {
                alert(errMsg.toString());
            }
        });
    });

    $('#btn_create_program_2').click(function () {
        //console.log("chekbox" + $('#field_eat_no_snacking_active').is(':checked'));

        $.ajax({
            type: "POST",
            url:  api_url + "create_second_program",
            headers: {
                'Authorization':'Token token=' + cookie_token,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            success: function(data){  },
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

        $("#group_add_user_all option:selected").prop("selected", false);
        $("#group_add_user_all option:first").prop("selected", "selected");
        $('#group_add_user_all').selectpicker("refresh");
    });





    function parse_query_string() {
        var hashParams = {};
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
            q = window.location.hash.substring(1);

        while (e = r.exec(q))
            hashParams[d(e[1])] = d(e[2]);

        return hashParams;

        // if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )){
//
        //     var key = false, res = {}, itm = null;
        //     // get the query string without the ?
        //     var qs = location.search.substring(1);
        //     // check for the key as an argument
        //     if (arguments.length > 0 && arguments[0].length > 1)
        //         key = arguments[0];
        //     // make a regex pattern to grab key/value
        //     var pattern = /([^&=]+)=([^&]*)/g;
        //     // loop the items in the query string, either
        //     // find a match to the argument, or build an object
        //     // with key/value pairs
        //     while (itm = pattern.exec(qs)) {
        //         if (key !== false && decodeURIComponent(itm[1]) === key)
        //             return decodeURIComponent(itm[2]);
        //         else if (key === false)
        //             res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
        //     }
//
        //     return key === false ? res : null;
        // } else {
//
        //     var url_string = window.location.href; //window.location.href
        //     var url = new URL(url_string);
        //     var query = url.hash.replace('#', '');
        //     var vars = query.split("&");
        //     var query_string = {};
        //     for (var i = 0; i < vars.length; i++) {
        //         var pair = vars[i].split("=");
        //         var key = decodeURIComponent(pair[0]);
        //         var value = decodeURIComponent(pair[1]);
        //         // If first entry with this name
        //         if (typeof query_string[key] === "undefined") {
        //             query_string[key] = decodeURIComponent(value);
        //             // If second entry with this name
        //         } else if (typeof query_string[key] === "string") {
        //             var arr = [query_string[key], decodeURIComponent(value)];
        //             query_string[key] = arr;
        //             // If third or later entry with this name
        //         } else {
        //             query_string[key].push(decodeURIComponent(value));
        //         }
        //     }
        //     return query_string;
        // }


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
