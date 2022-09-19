$(document).ready(function () {

    /*document.getElementById("startTimeButton").onclick = function () {
        var a = $.get('https://open.iii.pics/iiimimi/detail')
        alert(a);
    }*/

    $.get("https://open.iii.pics/iiimimi/detail", function (data, status) {
        obj = JSON.stringify(data) //转换为Json字符串
        obj = JSON.parse(obj) //转换为Json对象
        console.log(obj)

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
            $("#textBootTime").text("关机时间:" +time)
            $("#textRunTime").text("已关机")
            $("#titleStatus").text("已关机")
            $("#titleLastExe").text("啊哦, 电脑没有运行哦")
        }
        if(obj.bootAllow == '0'){
            $("#textLockStatus").text('已锁定')
        }else if(obj.bootAllow == '1'){
            $("#textLockStatus").text('未锁定')
        }else{
            $("#textLockStatus").text('无法获取')
        }
        if(obj.message == null){
            $("#textMessage").text("留言:" + obj.message)
        }else{
            $("#textMessage").text("留言未设置")
        }

        //});
    });

    /*
    * @url: url link
    * @action: "get", "post"
    * @json: {'key1':'value2', 'key2':'value2'} 
    */

});

/*
JavaScript Form GET/POST
function doFormRequest(url, action, json) {
    var form = document.createElement("form");
    form.action = url;
    form.method = action;
    // append input attribute and valus
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            var val = json[key];
            input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = val;
            // append key-value to form
            form.appendChild(input)
        }
    }
    // send post request
    document.body.appendChild(form);
    form.submit();
    // remove form from document
    document.body.removeChild(form);
}
*/