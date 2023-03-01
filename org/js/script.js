$(document).ready(function () {
    // 기본 위치(top)값
    var floatPosition = parseInt($(".floating").css('top'))

    // scroll 인식
    $(window).scroll(function () {

        // 현재 스크롤 위치
        var currentTop = $(window).scrollTop();
        var bannerTop = currentTop + floatPosition + "px";

        //이동 애니메이션
        $(".floating").stop().animate({
            "top": bannerTop
        }, 450);

    }).scroll();

    //dim
    $(".dim").click(function () {
        $(".js, .alert_box, .dim").hide();
    });

    //탭메뉴
    $(".tab_content").eq(0).show();

    $(".tab_top>li").click(function () {
        $(".tab_top>li").removeClass("active");
        $(this).addClass("active");
        $(".tab_content").hide();
        var tabid = $(this).attr("rel");
        $("#" + tabid).fadeIn();
    });
    $(".qa_tab_top>li, .cg_tab_top>li").click(function () {
        $(".qa_tab_top>li, .cg_tab_top>li").removeClass("tab_active");
        $(this).addClass("tab_active");
        $(".tab_content").hide();
        var tabid = $(this).attr("rel");
        $("#" + tabid).fadeIn();
    });

    //햄버거 메뉴
    $('.main_hd_top img:nth-child(2), .menu').on('click', function () {
        $('body').css({
            "height": "227.494vw",
            "overflow": "hidden"
        });
        $('#main').css({
            "display": "none"
        });
        $('.ham_sidebar_menu').show().animate({
            left: 0
        });
    });
    $('.ham_close>a').on('click', function () {
        $('#main').css({
            "display": "block"
        });
        $('body').css({
            "height": "100%",
            "overflow": "auto"
        });
        $('.ham_sidebar_menu').animate({
            left: '-' + 200 + '%'
        }, function () {
            $('.ham_sidebar_menu').hide();
        });
    });

    //체크박스 전체선택
    $("#join_ckall").click(function () {
        if ($("#join_ckall").is(":checked")) {
            $(".join_ck").prop("checked", true);
        } else {
            $(".join_ck").prop("checked", false);
        }
    });

    //시간별 예약
    $(".reserv_date>li").click(function () {
        $(".reserv_date>li").removeClass("rd_on");
        $(this).addClass("rd_on");
    });

    //선생님 상세정보 (더보기)
    $(".ti_more").click(function () {
        $(".teacher_info").css({
            "-webkit-line-clamp": "100"
        });
        $(".ti_more").css({
            "display": "none"
        });
        $(".teacher_inner").css({
            "padding-bottom": "5vw"
        });
    });

    //예약규정
    $(".rt_time>div").click(function () {
        $(".dim, .teacher_alert2").show();
    });
    $(".ta_close").click(function () {
        $(".dim, .teacher_alert2").hide();
    });

    //선생님 예약
    $("#teacher .reserv_time li").click(function () {
        $(".dim, .teacher_alert").show();
    });
    $(".ta_close").click(function () {
        $(".dim, .teacher_alert").hide();
    });

    //수업 방법 선택
    $(".rc1").click(function () {
        $(".dim, .rca1").show();
    });
    $(".rc2").click(function () {
        $(".dim, .rca2").show();
    });
    $(".rc3").click(function () {
        $(".dim, .rca3").show();
    });
    $(".rca1 button").click(function () {
        $(".dim, .rca1, .rca2, .rca3").hide();
        $(".dim, .reserv_finish").show();
        $(".reserv_finish button").hide();
        $(".rf_btn1").show();
    });
    $(".rca2 button").click(function () {
        $(".dim, .rca1, .rca2, .rca3").hide();
        $(".dim, .reserv_finish").show();
        $(".reserv_finish button").hide();
        $(".rf_btn2").show();
    });
    $(".rca3 button").click(function () {
        $(".dim, .rca1, .rca2, .rca3").hide();
        $(".dim, .reserv_finish").show();
        $(".reserv_finish button").hide();
        $(".rf_btn3").show();
    });
    $(".reserv_finish button").click(function () {
        $(".dim, .js").hide();
    });
    $(".bt_plus").click(function () {
        if ($(this).siblings(".me").css({
                display: "-webkit-box"
            })) {
            $(this).siblings(".me").css({
                display: "block"
            })
        }
        $(this).css({
            display: "none"
        })
        // if($(this).siblings(".me").css({display:"block"})){
        //     $(this).siblings(".me").css({display:"-webkit-box"})
        // }
    });
    var today = null;

    var year = null;

    var month = null;

    var firstDay = null;

    var lastDay = null;

    var $tdDay = null;

    var $tdSche = null;



    $(document).ready(function () {
        drawCalendar();

        initDate();

        drawDays();

        $("#movePrevMonth").on("click", function () {
            movePrevMonth();
        });

        $("#moveNextMonth").on("click", function () {
            moveNextMonth();
        });

    });
    //calendar 그리기

    function drawCalendar() {
        var setTableHTML = "";

        setTableHTML += '<table class="calendar">';

        setTableHTML += '<tr id="cal-tr"><th style="color: red;">일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th style="color:blue;">토</th></tr>';

        for (var i = 0; i < 6; i++) {
            setTableHTML += '<tr height="100">';

            for (var j = 0; j < 7; j++) {
                setTableHTML += '<td style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap">';

                setTableHTML += '    <div class="cal-day"></div>';

                setTableHTML += '    <div class="cal-schedule"></div>';

                setTableHTML += '</td>';

            }

            setTableHTML += '</tr>';

        }

        setTableHTML += '</table>';

        $("#cal_tab").html(setTableHTML);

    }



    //날짜 초기화

    function initDate() {
        $tdDay = $("td div.cal-day")

        $tdSche = $("td div.cal-schedule")

        dayCount = 0;

        today = new Date();

        year = today.getFullYear();

        month = today.getMonth() + 1;

        firstDay = new Date(year, month - 1, 1);

        lastDay = new Date(year, month, 0);

    }



    //calendar 날짜표시

    function drawDays() {
        $("#cal_top_year").text(year);

        $("#cal_top_month").text(month);

        for (var i = firstDay.getDay(); i < firstDay.getDay() + lastDay.getDate(); i++) {
            $tdDay.eq(i).text(++dayCount);

        }

        for (var i = 0; i < 42; i += 7) {
            $tdDay.eq(i).css("color", "red");

        }

        for (var i = 6; i < 42; i += 7) {
            $tdDay.eq(i).css("color", "blue");

        }

    }



    //calendar 월 이동

    function movePrevMonth() {
        month--;

        if (month <= 0) {
            month = 12;

            year--;

        }

        if (month < 10) {
            month = String("0" + month);

        }

        getNewInfo();

    }



    function moveNextMonth() {
        month++;

        if (month > 12) {
            month = 1;

            year++;

        }

        if (month < 10) {
            month = String("0" + month);

        }

        getNewInfo();

    }





    function getNewInfo() {
        for (var i = 0; i < 42; i++) {
            $tdDay.eq(i).text("");

        }

        dayCount = 0;

        firstDay = new Date(year, month - 1, 1);

        lastDay = new Date(year, month, 0);

        drawDays();

    }
    $('#searchBtn').on("click", function (event) {
        self.location = "${contextPath}/ktdi1/ktdi1050"

            +
            '${pageMaker.makeQuery(1)}'

            +
            "&searchType="

            +
            $("select option:selected").val()

            +
            "&yyyy=" + $("#yyyy").val() + "&mmmm="

            +
            $("#mmmm").val() + "&keyword="

            +
            encodeURI($('#keyword').val());



    });



    $('#newBtn').on("click", function (evt) {
        self.location = "${contextPath}/ktdi1/ktdi1052";

    });



    $('#sub_code').on("change", function (evt) {
        location.href = "?yyyy=" + $("#yyyy").val()

            +
            "&mmmm=" + $("#mmmm").val()

            +
            "&sub_code="

            +
            encodeURI($("#sub_code").val());

    });



    $('#yyyy').on("change", function (evt) {
        location.href = "?yyyy=" + $("#yyyy").val()

            +
            "&mmmm=" + $("#mmmm").val()

            +
            "&sub_code="

            +
            encodeURI($("#sub_code").val());

    });



    $('#mmmm').on("change", function (evt) {
        location.href = "?yyyy=" + $("#yyyy").val()

            +
            "&mmmm=" + $("#mmmm").val()

            +
            "&sub_code="

            +
            encodeURI($("#sub_code").val());

    });

    function goYearMonth() {
        location.href = "?yyyy=" + $("#yyyy").val() + "&mmmm=" + $("#mmmm").val();

    }
    $(".cal td").click(function(){
        alert()
        $(this).css({background:"#026202"})
    })
    // 1 . #checkAll 클릭
    $("#checkAll").click(function() {
        // 2. #checkAll이 체크되었을 때,
        // chk라는 name을 가진 input태그를 찾아 checked를 true로 정의
        if ($("#checkAll").prop("checked")) {
          $("input[name=chk]").prop("checked", true)
        // 3. #checkAll이 체크되지 않았을 때,
        // chk라는 name을 가진 input태그를 찾아 checked를 false로 정의
        } else {
          $("input[name=chk]").prop("checked", false)
        }
    })
});