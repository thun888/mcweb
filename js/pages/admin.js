//token检查
if (document.cookie.indexOf('token') < 0) {
    document.getElementById("fuction").style.display = "none";
    mdui.snackbar({
        message: 'Cookies中没有token！'
    });
    document.getElementById("wtf").style.display = "unset";
} else {
    document.getElementById("token").value = getCookie('token')
    $.ajax({
        url: 'https://mcweb-api.hzchu.top/admin/checktoken',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            token: getCookie('token')
        }),
        success: function(response) {
            var code = response.code;
            console.log(code);
            var msg = response.msg;
            //console.log(msg);

            // 处理返回的code和msg
            if (code === 0) {
                mdui.snackbar({
                    message: "token过期时间：" + response.endtime
                });
            } else {
                document.getElementById("fuction").style.display = "none";
                document.getElementById("wtf").style.display = "unset";
                mdui.snackbar({
                    message: msg
                });
            }

        }
    });



}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

document.getElementById("token-enter").onclick = function() {
    var inputText = document.getElementById("token").value;
    document.cookie = "token=" + inputText;
    location.reload();
}

//ban部分


































document.getElementById("titletext").innerHTML = "峰间云海|管理";