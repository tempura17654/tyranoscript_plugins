(function ($, TYRANO, mp) {

if ($(".chara_part_form").length > 0) {
    $(".chara_part_form").remove();
}

mp.color   = mp.color   || "white";
mp.scale   = mp.scale   || "1";
mp.newline = mp.newline || "true";
mp.color = mp.color === "white" ? 0 : 1;

var j_form;             // フォームのjQueryオブジェクト
var checkedObject = {}; // チェックボックスのpropを格納しておく
var nextOrderPost = 0;  // nextOrderの猶予

//# execCopy
// クリップボードにコピー
var execCopy = function (string) {
    if (mp.newline == "true") string += "\n\n";
    var temp = document.createElement("div");
    temp.appendChild(document.createElement("pre")).textContent = string;
    var s = temp.style;
    s.position = "fixed";
    s.left = "-100%";
    document.body.appendChild(temp);
    document.getSelection().selectAllChildren(temp);
    var result = document.execCommand("copy");
    document.body.removeChild(temp);
    return result;
};

if (! document.execCommand("copy")) {
    $.inform("この環境では【キャラクターパーツマネージャ】プラグインの【タグの自動コピー機能】は機能しません。");
}

//# isExistChara
// そのキャラがゲーム上に存在する？
var isExistChara = function (chara_name) {
    return $("#root_layer_game").find("." + chara_name + ".tyrano_chara").length > 0;
};

//# BOOKING_KEYS_OF_PART_OBJ
// パーツオブジェクトのプロパティの予約語
var BOOKING_KEYS_OF_PART_OBJ = [
    "current_part_id",
    "default_part_id",
    "zindex"
];

//# getIds
// パーツオブジェクトのプロパティネームズから予約語を取り除いて返す
var getIds = function (part_obj) {
    var keys = Object.keys(part_obj);
    var newKeys = [];
    for (var i = 0; i < keys.length; i++) {
        var flag = false;
        for (var j = 0; j < BOOKING_KEYS_OF_PART_OBJ.length; j++) {
            if (keys[i] === BOOKING_KEYS_OF_PART_OBJ[j]) {
                flag = true;
                break;
            }
        }
        if (! flag) {
            newKeys.push(keys[i]);
        }
    }
    return newKeys;
};

//# getTagStr
// あるキャラクターの現在の立ち絵を作るためのタグを返す
// チェックされていないパーツについてはタグに含めない
var getTagStr = function (chara_name) {
    var chara_obj = TYRANO.kag.stat.charas[chara_name];
    var tag_str = "[chara_part name=" + chara_name;
    if (typeof chara_obj === "object") {
        var chara_layer = chara_obj._layer || {};
        for (var key in chara_layer) {
            if (j_form.find("input[data-part='" + key + "']").prop("checked")) {
                var part_obj = chara_layer[key];
                var value = part_obj.current_part_id;
                tag_str += " " + key + "=" + value;
            }
        }
    }
    tag_str += "]";
    return tag_str;
};

//# createForm
// フォームエレメントを作って返す
// この関数は1度だけ呼び出される
var createForm = function () {
    j_form = $('<form class="chara_part_form" />');
    j_form.append('<div class="chara_part_icon"></div>');
    j_form.append('<div class="chara_part_close">×</div>');
    j_form.append('<div class="chara_part_wrapper" />');
    var j_wrapper = j_form.find(".chara_part_wrapper");
    j_wrapper.append('<div class="chara_part_bar">キャラクターパーツマネージャ</div>');
    j_wrapper.append('<div class="chara_part_header" />');
    j_wrapper.append('<div class="chara_part_button" />');
    j_wrapper.append('<div class="chara_part_content" />');
    var j_bar = j_form.find(".chara_part_bar");
    var j_icon = j_form.find(".chara_part_icon");
    var j_close = j_form.find(".chara_part_close");
    var j_button = j_form.find(".chara_part_button");
    j_button.append('<button type="button" class="chara_part_button_copy">タグをコピー</button>');
    j_button.find(".chara_part_button_copy").on("click", function () {
        var chara_name = j_form.getHeaderChara();
        execCopy(getTagStr(chara_name));
    });
    
    j_close.on("click", function (e) {
        j_close.hide();
        j_wrapper.hide();
    });
    
    j_icon.on("click", function (e) {
        j_close.show();
        j_wrapper.show();
    });
    
    //## j_form.header
    j_form.header = function (html) {
        var j = j_form.find(".chara_part_header");
        if (html) return j.html(html);
        else return j;
    };
    
    //## j_form.content
    j_form.content = function (html) {
        var j = j_form.find(".chara_part_content");
        if (html) return j.html(html);
        else return j;
    };
    
    //## j_form.getHeaderChara
    j_form.getHeaderChara = function () {
        return j_form.header().find("select").eq(0).val();
    };
    
    //## j_form.updateHeader
    j_form.updateHeader = function () {
        j_form.header().empty();
        // HTMLをセット
        j_form.header(getHeaderHtml());
        // <select>拡張
        j_form.header().find("select").extendSelect().on("change", function () {
            j_form.updateContent();
        });
        // コンテンツもアップデート
        j_form.updateContent();
    };
    
    //## j_form.updateContent
    j_form.updateContent = function () {
        j_form.content().empty();
        var chara_name = j_form.getHeaderChara();
        if (chara_name) {
            // HTMLをセット
            j_form.content(getContentHtml(chara_name));
            // <select>拡張
            var copy_timer = -1;
            j_form.content().find("select").extendSelect().on("change", function () {
                var j_this = $(this);
                var key = j_this.attr("name");
                var value = j_this.val();
                var opt = {};
                opt.name = chara_name;
                opt.time = "0";
                opt[key] = value;
                nextOrderPost++;
                TYRANO.kag.ftag.startTag("chara_part", opt);
                clearTimeout(copy_timer);
                copy_timer = setTimeout(function () {
                    execCopy(getTagStr(chara_name));
                }, 50);
            });
            // <input>拡張
            j_form.content().find("input[type='checkbox']").extendCheckbox().on("change", function (e) {
                var j_this = $(this);
                setTimeout(function () {
                    var prop = j_this.prop("checked");
                    var chara_name = j_this.attr("data-chara");
                    var part_name = j_this.attr("data-part");
                    
                    checkedObject[chara_name][part_name] = prop;
                    j_this.parent().find("select").prop("disabled", !prop);
                    
                    clearTimeout(copy_timer);
                    copy_timer = setTimeout(function () {
                        execCopy(getTagStr(chara_name));
                    }, 50);
                }, 5);
            }).each(function () {
                var j_this = $(this);
                var chara_name = j_this.attr("data-chara");
                var part_name = j_this.attr("data-part");
                if (typeof checkedObject[chara_name] === "undefined") {
                    checkedObject[chara_name] = {};
                }
                if (typeof checkedObject[chara_name][part_name] === "undefined") {
                    checkedObject[chara_name][part_name] = true;
                    j_this.prop("checked", true);
                }
                j_this.trigger("change");
            });
        }
    };
    
    //## j_form.onscroll
    // このエレメント上でのスクロールをバブリングさせない
    j_form.onscroll(function (e) {
        e.stopPropagation();
    }, function (e) {
        e.stopPropagation();
    });
    
    // 1度ヘッダを更新
    j_form.updateHeader();
    
    // ドラッグできるようにする
    j_form.draggable({
        distance: 10,
        handle: ".chara_part_bar,.chara_part_icon"
    });
    $("body").attr("ondragstart", "");
    $("#tyrano_base").css("position", "absolute");
    
    return j_form;
};

//# getHeaderHtml
// フォームのヘッダ用HTML文字列を作って返す
var getHeaderHtml = function () {
    var charas = Object.keys(TYRANO.kag.stat.charas);
    var html_select = "";
    html_select += '<span class="chara_part_title">キャラクター</span>';
    html_select += '<select class="chara_part_select"><option value=""></option>';
    for (var i = 0; i < charas.length; i++) {
        var key = charas[i];
        var html = '<option value="' + key + '">' + i + ':' + key + '</option>';
        html_select += html;
    }
    html_select += '</select><br>';
    return html_select;
};

//# getContentHtml
// フォームのコンテンツ用HTML文字列を作って返す
var getContentHtml = function (chara_name) {
    var chara_obj = TYRANO.kag.stat.charas[chara_name];
    var html_all = "";
    if (typeof chara_obj === "object") {
        var chara_layer = chara_obj._layer || {};
        for (var key in chara_layer) {
            var part_obj = chara_layer[key];
            var part_ids = getIds(part_obj);
            var html_select = '';
            html_select += '<div>';
            html_select += '<span class="chara_part_title">' + key + '</span>';   
            html_select += '<select class="chara_part_select" name="' + key + '">';
            for (var i = 0; i < part_ids.length; i++) {
                var id = part_ids[i];
                var selected = (id === part_obj.current_part_id) ? "selected" : "";
                var html = '<option data-index="' + i + '" value="' + id + '" ' + selected + '>' + i + ':' + id + '</option>';
                html_select += html;
            }
            var checked = (checkedObject[chara_name] && checkedObject[chara_name][key]) ? ' checked="checked"' : "";
            html_select += '</select><input type="checkbox" ' + checked + ' data-chara="' + chara_name + '" data-part="' + key + '"></input>';
            html_select += '</div>';
            html_all += html_select;
        }
        html_all += '<div class="chara_part_disable_wrapper"></div>';
        j_form.content().removeClass("disable");
        if (!isExistChara(chara_name)) {
            j_form.content().addClass("disable");
        }
    }
    return html_all;
};

//# $.fn.onscroll
// スクロールにハンドラ割り当て
$.fn.onscroll = function (cb_up, cb_down) {
    var $this = $(this);
    var scroll = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $this.on(scroll, function (e) {
        var delta = e.originalEvent.deltaY     ? - (e.originalEvent.deltaY    ):
                    e.originalEvent.wheelDelta ?   (e.originalEvent.wheelDelta):
                                                 - (e.originalEvent.detail    );
        if (delta < 0) cb_down(e);
        else cb_up(e);
    });
    return $this;
};

//# $.fn.extendSelect
// <select>を拡張する
$.fn.extendSelect = function () {
    $(this).each(function () {
        var j_this = $(this);
        var j_child = j_this.children().filter("option");
        var name_obj = {};
        var name_array = [];
        var i = 0;
        j_child.each(function () {
            var val = $(this).val();
            name_obj[val] = i;
            name_array[i] = val;
            i++;
        });
        j_this.onscroll(function (e) {
            if (j_this.prop("disabled")) return;
            var index = name_obj[j_this.val()];
            if (index <= 0) ;
            else {
                var target = name_array[index - 1];
                j_this.val(target).trigger("change");
            }
        }, function (e) {
            if (j_this.prop("disabled")) return;
            var index = name_obj[j_this.val()];
            if (index >= name_array.length - 1) ;
            else {
                var target = name_array[index + 1];
                j_this.val(target).trigger("change");
            }
        });
    });
    return $(this);
};

//# $.fn.extendCheckbox
// <input type="checkbox">を拡張する
$.fn.extendCheckbox = function () {
    var is_mousedown = false;
    var first_bool = false;
    $(this).on("click", function (e) {
        return false;
    }).on("mousedown", function (e) {
        is_mousedown = true;
        var j_this = $(this);
        first_bool = j_this.prop("checked");
        j_this.prop("checked", !first_bool).trigger("change");
    }).on("mouseenter", function (e) {
        if (is_mousedown) {
            var j_this = $(this);
            j_this.prop("checked", !first_bool).trigger("change");
        }
    });
    $(document).on("mouseup", function (e) {
        is_mousedown = false;
    });
    return $(this);
};

//# nextOrder改造
var nextOrder = TYRANO.kag.ftag.nextOrder;
TYRANO.kag.ftag.nextOrder = function () {
    if (nextOrderPost > 0) {
        nextOrderPost--;
    }
    else {
        nextOrderPost = 0;
        nextOrder.call(this);
    }
};

//# appendFunc
var appendFunc = function (parentObject, propertyName, newFunction) {
    var oldFunction = parentObject[propertyName];
    parentObject[propertyName] = function () {
        oldFunction.apply(parentObject, arguments);
        newFunction.apply(parentObject, arguments);
    };
};

//# [chara_part] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_part, "start", function (pm) {
    var chara_obj = TYRANO.kag.stat.charas[pm.name];
    if (typeof chara_obj === "object") {
        var chara_layer = chara_obj._layer || {};
        for (var key in chara_layer) {
            var part_obj = chara_layer[key];
            var current_id = part_obj.current_part_id;
            var a = j_form.content().find("select[name='" + key + "']");
            a.val(current_id);
        }
    }
});

//# [chara_new] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_new, "start", function (pm) {
    j_form.updateHeader();
});

//# [chara_delete] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_delete, "start", function (pm) {
    j_form.updateHeader();
});

//# [chara_show] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_show, "start", function (pm) {
    if (pm.name === j_form.getHeaderChara()) {
        j_form.content().removeClass("disable");
    }
});

//# [chara_hide] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_hide, "start", function (pm) {
    if (pm.name === j_form.getHeaderChara()) {
        j_form.content().addClass("disable");
    }
});

//# [chara_hide_all] 処理追加
appendFunc(TYRANO.kag.ftag.master_tag.chara_hide_all, "start", function (pm) {
    j_form.content().addClass("disable");
});

//# preloadAll修正
TYRANO.kag.preloadAll=function(e,b){var d=this;if(typeof e=="object"&&e.length>0){var c=0;for(var a=0;a<e.length;a++){d.kag.preload(e[a],function(){c++;if(e.length==c){b()}})}}else{this.kag.preload(e,function(){b()})}};

//# cssload初期化
TYRANO.kag.stat.cssload = {};

//# j_form
j_form = createForm();
j_form.css("transform", "scale("+mp.scale+")");
j_form.css("filter", "invert("+mp.color+")");
j_form.css("-webkit-filter", "invert("+mp.color+")");
$("body").append(j_form);

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));