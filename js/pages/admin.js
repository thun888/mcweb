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
    // 获取选择框元素
var ban_choice = document.getElementById("ban_choice");
var ban_reason = document.getElementById("ban_reason");
var ban_player = document.getElementById("ban_gamename")
    // 添加事件监听器，在选择框的值改变时触发
ban_choice.addEventListener('change', function() {
    // 获取当前选择的选项值
    var selectedValue = ban_choice.value;

    // 根据选项值执行相应的操作
    switch (selectedValue) {
        case '1':
            ban_reason.value = "使用非法的修改器、外挂或其他作弊手段来获取优势，如飞行、无限物品、自动攻击等。"
            break;
        case '2':
            ban_reason.value = "故意破坏其他玩家的建筑、物品或服务器设施，包括恶意放火、爆炸、挖掘等。"
            break;
        case '3':
            ban_reason.value = "在聊天频道或其他地方发布未经许可的广告、垃圾信息或恶意链接"
            break;
        case '4':
            ban_reason.value = "对其他玩家进行辱骂、威胁、骚扰或恶意攻击"
            break;
        case '5':
            ban_reason.value = "故意进行大规模的红石电路、崩服机或其他可能导致服务器崩溃或卡顿的行为。"
            break;
        case '6':
            ban_reason.value = "使用多个账号进行作弊、恶意破坏或其他违规行为。"
            break;
    }
});
document.getElementById("ban-enter").onclick = function() {
    var inst = new mdui.Dialog('#dialog');

    $.ajax({
        url: 'https://mcweb-api.hzchu.top/admin/banplayer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            playername: ban_player.value,
            token: getCookie('token'),
            reason: ban_reason.value
        }),
        success: function(response) {
            var code = response.code;
            console.log(code);

            // 处理返回的code和msg
            if (code === 0) {
                document.getElementById("dialog-title").innerText = "返回结果"
                document.getElementById("dialog-content").innerText = response.response
                inst.open();
            } else {
                document.getElementById("dialog-title").innerText = "返回结果"
                document.getElementById("dialog-content").innerText = response.msg
                inst.open();

            }

        }
    })
}
document.getElementById("deban-enter").onclick = function() {
    var inst = new mdui.Dialog('#dialog');

    $.ajax({
        url: 'https://mcweb-api.hzchu.top/admin/debanplayer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            playername: ban_player.value,
            token: getCookie('token')
        }),
        success: function(response) {
            var code = response.code;
            console.log(code);

            // 处理返回的code和msg
            if (code === 0) {
                document.getElementById("dialog-title").innerText = "返回结果"
                document.getElementById("dialog-content").innerText = response.response
                inst.open();
            } else {
                document.getElementById("dialog-title").innerText = "返回结果"
                document.getElementById("dialog-content").innerText = response.msg
                inst.open();

            }

        }
    })
}
































document.getElementById("titletext").innerHTML = "峰间云海|管理";