$(document).ready(function () {
    /*document.getElementById("startTimeButton").onclick = function () {
        var a = $.get('https://open.iii.pics/iiimimi/detail')
        alert(a);
    }*/
    function get_info() {
        postdata = { "key":"*-*" }
        $.post("http://mihoyo.iii.pics:7114/mi_m_i/api/get", postdata, function (data, status) {
            obj = JSON.stringify(data) //转换为Json字符串
            obj = JSON.parse(obj) //转换为Json对象
            console.log("get: " + obj)

            var timeNow = parseInt(+new Date() / 1000) //当前10位时间戳
            var _bootTime = "已持续开机 " + parseInt((timeNow - Number(obj.data.bootTime)) / 60) + " 分钟"
            //console.log(timeNow, Number(obj.lastRequest))
            if ((timeNow - Number(obj.data.lastRequest)) < 30) {
                time = new Date(Number(obj.data.bootTime + "000")).toLocaleString() //bootTime
                $("#textBootTime").text("开机时间: " + time)
                $("#titleStatus").text("正在运行")
                $("#titleLastExe").text("当前运行:" + obj.data.lastExe)
                $("#textRunTime").text(_bootTime)
            } else {
                time = new Date(Number(obj.data.lastRequest + "000")).toLocaleString() //最后一次请求
                $("#textBootTime").text("关机时间:" + time)
                $("#textRunTime").text("已关机")
                $("#titleStatus").text("已关机")
                $("#titleLastExe").text("啊哦, 电脑没有运行哦")
            }
            if (obj.data.bootAllow == '0') {
                $("#textLockStatus").text('已锁定')
            } else if (obj.data.bootAllow == '1') {
                $("#textLockStatus").text('未锁定')
            } else {
                $("#textLockStatus").text('无法获取')
            }

            console.log("message: " + obj.data.message)
            if (obj.data.message == "none") {
                $("#textMessage").text("留言未设置")
            } else {
                $("#textMessage").text("留言:" + obj.data.message)
            }
            //});
            return (obj)
        });
    }
    get_info()

    $("#btnLockStatus").click(function () {
        // 如果没有获取到值，则默认设置为1
        var postdata = { "key": "bootAllow", "value": "1" }
        var tempdata = { "key": "key", "value": "*-*" }
        $.post("http://mihoyo.iii.pics:7114/mi_m_i/api/get", tempdata, function (data, status) {
            obj = JSON.stringify(data) //转换为Json字符串
            obj = JSON.parse(obj) //转换为Json对象  
            console.log("get: " + obj.data)
        });
        if (obj.data.bootAllow == "0") {
            // 0是锁定, 将解锁
            postdata = { "key": "bootAllow", "value": "1" }
        } else {
            postdata = { "key": "bootAllow", "value": "0" }
        }

        $.post("http://mihoyo.iii.pics:7114/mi_m_i/api/set", postdata, function (data, status) {
            //alert("Data: " + obj + "nStatus: " + status);
            get_info()
        });
        get_info()
    });
    $("#btnLockOffline").click(function () {
        window.location.replace("https://yunshangbandao.top/PcManagerOffline.html");
    })

});