$(document).ready(function () {
    
    /*document.getElementById("startTimeButton").onclick = function () {
        var a = $.get('https://open.iii.pics/iiimimi/detail')
        alert(a);
    }*/
    $(document.getElementById("startTimeButton")).click(function(){
        $.get("https://open.iii.pics/iiimimi/detail",function(data,status){
            alert("数据: " + data + "\n状态: " + status);
        });
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