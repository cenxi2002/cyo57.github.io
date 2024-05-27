$(function () {

   $(".input input").focus(function () {

      $(this).parent(".input").each(function () {
         $("label", this).css({
            "line-height": "18px",
            "font-size": "18px",
            "font-weight": "100",
            "top": "25px"
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

   $(".select select").on("change", function() {
         
      let selectedOption = $(this).find(":selected");
      let index = selectedOption.index();
      let yearPart = "";
     switch (index) {
      case 0:
         yearPart = `20231`; 
         break;
         case 1:
            yearPart = `20232`; 
            break;
            case 2:
               yearPart = `20241`; 
               break;
               case 3:
                  yearPart = `20242`; 
                  break;
      default:
         yearPart = `20231`; 
         break;
     }
     m = parseInt(yearPart);

      
  });


   $(".input .but1").click(function (e) {
      e.preventDefault();
      $(".select select").trigger("change");
      var name = $("#name").val();

      if (name.trim() === "") {
         alert("请输入账号");
         return;
      }

      $.ajax({
         url: "https://hnjmapi.cloudyshore.top/score/" + name ,
         type: "GET",
         success: function (data) {
            alert(JSON.stringify(data["score_simple"], null, 4))
            var scoreSimple = data.score_simple.data;
            // var scoreSimpleArray = Object.entries(scoreSimple);



          scoreSimple.forEach(function (pair) {
            console.log(pair);
               var value = pair.积分;
               var key = pair.积分类别;
               $('.table-container').append(`        <table>
               <tbody>
                   <tr class="tr">
                       <td>${key}：</td>
                       <td>${value}</td>
                       <td><button class="but2">删除</button></td>
                   </tr>
               </tbody>
           </table>`);
            });
      $('td').click(function(){
         $(this).parents('.tr').remove()

      })

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
