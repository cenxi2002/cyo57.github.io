$(function () {

   $(".input input").focus(function () {

      $(this).parent(".input").each(function () {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "0px"
         })
         $(".spin", this).css({
            "width": "100%"
         })
      });
   }).blur(function () {
      $(".spin").css({
         "width": "0px"
      })
      if ($(this).val() == "") {
         $(this).parent(".input").each(function () {
            $("label", this).css({
               "line-height": "60px",
               "font-size": "24px",
               "font-weight": "300",
               "top": "10px"
            })
         });

      }
   });

   $(".button.login").click(function (e) {
      e.preventDefault();

      var name = $("#name").val();

      if (name.trim() === "") {
         alert("请输入账号");
         return;
      }

      $.ajax({
         url: "https://hnjmapi.cloudyshore.top/score/" + name,
         type: "GET",
         success: function (data) {
            alert(JSON.stringify(data["score_simple"], null, 4))
            var scoreSimple = data.score_simple;
            var scoreSimpleArray = Object.entries(scoreSimple);

            var resultDiv = $("<div class='result' align='center'></div>");

            scoreSimpleArray.forEach(function (pair) {
               var key = pair[0];
               var value = pair[1];
               resultDiv.append("<div class=''>" + key + ": " + value + "</div>");
            });

            $(".materialContainer").append(resultDiv);
         },
         error: function () {
            alert("查询失败，未找到相关学号信息");
         }
      });
   });

   $(document).on("click", "#queryDormButton", function (e) {
      e.preventDefault();

      var regname = $("#regname").val();

      if (regname.trim() === "") {
         alert("请输入宿舍号");
         return;
      }

      $.ajax({
         url: "https://hnjmapi.cloudyshore.top/dorm_stars/" + regname,
         type: "GET",
         success: function(data) {
            var scoreMore = data.score_more;
            alert("星级：" + scoreMore);
        },
        
         error: function () {
            alert("查询失败，未找到相关宿舍号信息");
         }
      });
   });

   //id dowork被点击时跳转baidu
   $("#dowork").click(function () {
      window.location.href = "https://gitee.com/cyo57/hnjm-dowork";
   });




   $(".alt-2").click(function () {
      if (!$(this).hasClass('material-button')) {
         $(".shape").css({
            "width": "100%",
            "height": "100%",
            "transform": "rotate(0deg)"
         })

         setTimeout(function () {
            $(".overbox").css({
               "overflow": "initial"
            })
         }, 600)

         $(this).animate({
            "width": "140px",
            "height": "140px"
         }, 500, function () {
            $(".box").removeClass("back");

            $(this).removeClass('active')
         });

         $(".overbox .title").fadeOut(300);
         $(".overbox .input").fadeOut(300);
         $(".overbox .button").fadeOut(300);

         $(".alt-2").addClass('material-buton');
      }

   })

   $(".material-button").click(function () {

      if ($(this).hasClass('material-button')) {
         setTimeout(function () {
            $(".overbox").css({
               "overflow": "hidden"
            })
            $(".box").addClass("back");
         }, 200)
         $(this).addClass('active').animate({
            "width": "700px",
            "height": "700px"
         });

         setTimeout(function () {
            $(".shape").css({
               "width": "50%",
               "height": "50%",
               "transform": "rotate(45deg)"
            })

            $(".overbox .title").fadeIn(300);
            $(".overbox .input").fadeIn(300);
            $(".overbox .button").fadeIn(300);
         }, 700)

         $(this).removeClass('material-button');

      }

      if ($(".alt-2").hasClass('material-buton')) {
         $(".alt-2").removeClass('material-buton');
         $(".alt-2").addClass('material-button');
      }

   });

});
