$(document).ready(function () {
    /*document.getElementById("startTimeButton").onclick = function () {
        var a = $.get('https://open.iii.pics/iiimimi/detail')
        alert(a);
    }*/
    function get_info() {
        $.get("https://open.iii.pics/iiimimi/detail", function (data, status) {
            obj = JSON.stringify(data) //转换为Json字符串
            obj = JSON.parse(obj) //转换为Json对象
            console.log("get: " + obj)

            var timeNow = parseInt(+new Date() / 1000) //当前10位时间戳
            var _bootTime = "已持续开机 " + parseInt((timeNow - Number(obj.bootTime)) / 60) + " 分钟"
            //console.log(timeNow, Number(obj.lastRequest))
            if ((timeNow - Number(obj.lastRequest)) < 30) {
                time = new Date(Number(obj.bootTime + "000")).toLocaleString() //bootTime
                $("#textBootTime").text("开机时间: " + time)
                $("#titleStatus").text("正在运行")
                $("#titleLastExe").text("当前运行:" + obj.lastExe)
                $("#textRunTime").text(_bootTime)
            } else {
                time = new Date(Number(obj.lastRequest + "000")).toLocaleString() //最后一次请求
                $("#textBootTime").text("关机时间:" + time)
                $("#textRunTime").text("已关机")
                $("#titleStatus").text("已关机")
                $("#titleLastExe").text("啊哦, 电脑没有运行哦")
            }
            if (obj.bootAllow == '0') {
                $("#textLockStatus").text('已锁定')
            } else if (obj.bootAllow == '1') {
                $("#textLockStatus").text('未锁定')
            } else {
                $("#textLockStatus").text('无法获取')
            }

            console.log("message: " + obj.message)
            if (obj.message == "") {
                $("#textMessage").text("留言未设置")
            } else {
                $("#textMessage").text("留言:" + obj.message)
            }
            //});
            return (obj)
        });
    }
    get_info()

    $("#btnLockStatus").click(function () {
        var v = "0"
        var postdata = { "k": "bootAllow", "v": "1" }
        $.get("https://open.iii.pics/iiimimi/detail", function (data, status) {
            obj = JSON.stringify(data) //转换为Json字符串
            obj = JSON.parse(obj) //转换为Json对象
            console.log("get: " + obj)
        });
        if (obj.bootAllow == "0") {
            // 目前是锁定, 将解锁
            postdata = { "k": "bootAllow", "v": "1" }
        } else {
            postdata = { "k": "bootAllow", "v": "0" }
        }

        $.post("https://open.iii.pics/iiimimi/detail_set", postdata, function (data, status) {
            //alert("Data: " + obj + "nStatus: " + status);
            get_info()
        });
        get_info()
    });
    $("#btnLockOffline").click(function () {
        window.location.replace("http://yunshangbandao.top/PcManagerOffline.html");
    })

});