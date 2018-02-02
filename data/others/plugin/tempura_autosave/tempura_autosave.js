(function(){

// 参照
var TYRANO = window.TYRANO;
var $      = window.$;
var object = window.object;
var mp     = TYRANO.kag.stat.mp;

// 設定
var autosaver_setting = {
    var_name     : "tempura_autosave_data",                  // オートセーブデータを格納するシステム変数の名前
    slot_num     : parseInt(mp.slot) || 5,   // スロットの数
    tag_name_save: "tempura_autosave",                       // オートセーブするタグの名前
    tag_name_load: "tempura_autoload",                       // オートロードするタグの名前
    tag_name_del : "tempura_autodelete",                     // オートセーブを消去するタグの名前
    message_save : "オートセーブしました。",                 // オートセーブしたという通知メッセージ
    html_load    : "./data/others/plugin/tempura_autosave/autoload.html" //オートロード画面に用いるHTMLファイルのアドレス
};
var log = function (message) {               // オートセーブしたという通知を出すための関数
    $.inform(message, "", 2000);
};
var index_start       = 0;                   // スロットを指定するときの先頭の番号。ここを1にしておくと先頭をslot=1で指定できるようになる。
var log_default       = mp.log || "false";   // オートセーブ通知をデフォルトで出すかどうか。"true"/"false"
var initial_title     = $.lang("not_saved"); // セーブデータが存在しないときのセーブタイトル表記
var initial_save_date = "";                  // セーブデータが存在しないときのセーブ日時表記
var initial_img_data  = "";                  // セーブデータが存在しないときのサムネイル
var fade_in  = 300;                          // オートロード画面のフェードイン時間(ミリ秒)
var fade_out = 300;                          // オートロード画面のフェードアウト時間(ミリ秒)
var img_html = ''                            // サムネイルのHTMLコード
+ '<img style="width:100px">';
var li_html  = ''                            // セーブデータリストアイテムのHTMLコード
+ '<li class="save_display_area save_list_item" data-num="{{:num}}">'
+     '<span class="save_list_item_thumb">'
+         '{{img}}'
+     '</span>'
+     '<span class="save_list_item_area">'
+         '<span class="save_list_item_date" style="text-align: center">{{:save_date}}</span>'
+         '<span class="save_list_item_text" style="text-align: center">{{:title}}</span>'
+     '</span>'
+ '</li>';





// 以下組み立て
var TG = TYRANO.kag;
var object_name  = "tempura";   // TYRANO.kag.menuに作成する天ぷらオブジェクトの名前
var saver_name   = "saver";     // 天ぷらオブジェクトに作成するサーバーオブジェクトの名前
var exsaver_name = "autosaver"; // 天ぷらオブジェクトに作成するEXサーバーオブジェクトの名前
var Tempura = function () {
    this.kag = TG;
};
if (typeof TG.menu[object_name] === "undefined") {
    TG.menu[object_name] = new Tempura();
}





// Saverコンストラクタ
var Saver = function () {
    this.kag = TG;
    this.version = "1.2.0";
    // saveメソッド（セーブします）
    this.save = function (var_name, slot_num, title, slot, call_back) {
        var that = this;
        slot = parseInt(slot);
        if (typeof title !== "string") title = "%m";
        title = title.replace("%m", this.kag.stat.current_message_str);
        this.kag.menu.snapSave(title, function () {
            var sf = that.kag.variable.sf;
            var snap = that.kag.menu.snap;
            var arr = sf[var_name];
            // slot指定がある→そこに上書きす
            if (!isNaN(slot)) {
                arr[slot - index_start] = $.extend(true, {}, snap);
            }
            // slot指定がない→先頭に挿入＆最後尾をポップ
            else {
                arr.unshift($.extend(true, {}, snap));
                if (arr.length > slot_num) {
                    arr.pop();
                }
            }
            //システム変数を保存
            that.kag.saveSystemVariable();
            if (call_back) call_back();
        });
    };
    // loadメソッド（ロードします）
    this.load = function (var_name, slot) {
        slot = parseInt(slot) || index_start;
        slot = slot - index_start;
        var snap = this.kag.variable.sf[var_name][slot];
        if (this.isWS(snap)) {
            this.kag.ftag.nextOrder();
        } else {
            this.kag.menu.loadGameData($.extend(true, {}, snap));
            this.kag.stat.is_skip = false;
            this.kag.ftag.nextOrder();
        }
    };
    // getWSメソッド（白紙のスナップを取得します）
    this.getWS = function () {
        var ret = {
            title: initial_title,
            current_order_index: -1,
            img_data: initial_img_data,
            save_date: initial_save_date,
            stat: {},
            layer: {}
        };
        return ret;
    };
    // isWSメソッド（白紙のスナップならtrueを返します）
    this.isWS = function (snap) {
        if (!snap || snap.current_order_index <= 0) return true;
        else return false;
    };
    // delメソッド（セーブデータを削除します）
    this.del = function (var_name, slot) {
        var arr = this.kag.variable.sf[var_name];
        if (typeof slot === "undefined" || slot === "") {
            this.init(var_name, arr.length);
        } else {
            slot = parseInt(slot);
            arr[slot] = this.getWS();
        }
        // システム変数を保存します
        this.kag.saveSystemVariable();
    };
    // initメソッド（初期化します）
    this.init = function (var_name, slot_num) {
        var arr = this.kag.variable.sf[var_name];
        for (var i = 0; i < slot_num; i++) {
            arr[i] = this.getWS();
        }
    };
};
// Saverコンストラクタを使ってオブジェクトを生成
if (typeof TG.menu[object_name][saver_name] === "undefined") {
    TG.menu[object_name][saver_name] = new Saver();
}





// SaverExコンストラクタ
var SaverEx = function (setting) {
    var exsaver = this;
    this.j_savelist = null;
    this.kag = TG;
    this.var_name = setting.var_name;
    this.slot_num = setting.slot_num;
    this[saver_name] = TG.menu[object_name][saver_name];
    this.isWS = this[saver_name].isWS;
    // saveメソッド
    this.save = function (title, slot, call_back) {
        this[saver_name].save(this.var_name, this.slot_num, title, slot, function () {
            if (call_back) call_back();
        });
    };
    // loadメソッド
    this.load = function (slot) {
        this[saver_name].load(this.var_name, slot);
    };
    // delメソッド
    this.del = function (slot) {
        this[saver_name].del(this.var_name, slot);
    };
    // updateSavelistメソッド（セーブリストを更新します）
    this.updateSavelist = function () {
        var snap_array = exsaver.kag.variable.sf[this.var_name];
        var ul_html = "";
        for (var i = 0; i < snap_array.length; i++) {
            var snap = snap_array[i];
            var img = img_html;
            var li = li_html;
            li = li.replace("{{:save_date}}", snap.save_date);
            li = li.replace("{{:title}}", snap.title);
            li = li.replace("{{img}}", img);
            li = li.replace("{{:num}}", i);
            ul_html += li;
        }
        this.j_savelist = $(ul_html);
        this.j_savelist.find("img").each(function (i) {
            if (snap_array[i].img_data) this.src = snap_array[i].img_data;
            else this.remove();
        });
    };
    // initメソッド
    this.init = function () {
        if (typeof exsaver.kag.variable.sf[this.var_name] === "undefined") {
            exsaver.kag.variable.sf[this.var_name] = [];
            TG.menu[object_name][saver_name].init(this.var_name, this.slot_num);
        }
    };
    this.init();
    // displayLoadメソッド（ロード画面を表示します）
    this.displayLoad = function () {
        var exsaver = this;
        var snap_array = exsaver.kag.variable.sf[this.var_name];
        var j_save = $("<div id=\"save_wrap\" style=\"display:none;opacity:0;z-index:100000001;position:absolute;width:100%;height:100%;\">").appendTo("#tyrano_base").html(this.html);
        var ul = j_save.find(".save_list").css("font-family", exsaver.kag.config.userFace);
        this.updateSavelist();
        if (snap_array) ul.append(this.j_savelist);
        j_save.css("display", "block");
        j_save.animate({
            "opacity": "1"
        }, fade_in);
        // 各々のセーブリストアイテムにロード関数を割り当てていく
        j_save.find(".save_display_area").each(function () {
            $(this).click(function (e) {
                var slot = parseInt($(this).attr("data-num"));
                var snap = snap_array[slot];
                if (exsaver.isWS(snap)) return false;
                exsaver.kag.tmp.sleep_game = snap;
                $("#save_wrap").fadeOut(fade_out, function () {
                    $(this).remove();
                });
                var layer_menu = TYRANO.kag.layer.getMenuLayer();
                layer_menu.hide();
                layer_menu.empty();
                if (exsaver.kag.stat.visible_menu_button === true) $(".button_menu").show();
                exsaver.kag.ftag.startTag("awakegame", {
                    auto_next: "no",
                    variable_over: "false",
                    bgm_over: "false"
                });
            });
        });
        // クローズ関数
        var close = function (flag, delay) {
            $("#save_wrap").delay(delay).fadeOut(fade_out, function () {
                $(this).remove();
            });
            exsaver.kag.ftag.startTag("awakegame", {});
            var layer_menu = exsaver.kag.layer.getMenuLayer();
            layer_menu.hide();
            layer_menu.empty();
            if (!flag && exsaver.kag.stat.visible_menu_button === true) $(".button_menu").show();
        };
        // 普通のロード画面を開くボタン
        j_save.find(".button_normalsave").click(function () {
            close(true, 300);
            exsaver.kag.menu.displayLoad();
        });
        // スマートフォン用のスクロールボタンセット
        j_save.find(".button_smart").hide();
        if ($.userenv() != "pc") {
            j_save.find(".button_smart").show();
            j_save.find(".button_arrow_up").click(function () {
                var now = j_save.find(".area_save_list").scrollTop();
                var pos = now - 160;
                j_save.find(".area_save_list").animate({
                    scrollTop: pos
                }, {
                    queue: false
                });
            });
            j_save.find(".button_arrow_down").click(function () {
                var now = j_save.find(".area_save_list").scrollTop();
                var pos = now + 160;
                j_save.find(".area_save_list").animate({
                    scrollTop: pos
                }, {
                    queue: false
                });
            });
        }
        // 高さを設定
        var save_list_height = parseInt($(".tyrano_base").outerHeight()) - parseInt($(".save_list").offset().top);
        $(".area_save_list").css("height", save_list_height);
        // 右クリックにクローズ関数を割り当て
        j_save.on("contextmenu", function () {
            close();
        });
        // クローズボタンにクローズ関数を割り当て
        j_save.find(".button_close").on("click", function () {
            close();
        });
    };
    if (setting.html_load) {
        $.get(setting.html_load, function (text) {
            exsaver.html = text;
        });
    }
};
if (typeof TG.menu[object_name][exsaver_name] === "undefined") {
    TG.menu[object_name][exsaver_name] = new SaverEx(autosaver_setting);
}




// ティラノスクリプト用のタグを生成＆登録
var tag = {};

// セーブ
tag[autosaver_setting.tag_name_save] = {
    pm: {
        slot: "",
        title: "%m",
        log: log_default
    },
    start: function (pm) {
        var that = this;
        var exsaver = TG.menu[object_name][exsaver_name];
        //if (this.kag.stat.is_adding_text) return false;
        exsaver.save(pm.title, pm.slot, function () {
            if (pm.log == "true") log(autosaver_setting.message_save);
            that.kag.ftag.nextOrder();
        });
    }
};

// ロード
tag[autosaver_setting.tag_name_load] = {
    pm: {},
    start: function (pm) {
        var exsaver = TG.menu[object_name][exsaver_name];
        //if (that.kag.stat.is_adding_text) return false;
        exsaver.load(pm.slot);
    }
};

// 削除
tag[autosaver_setting.tag_name_del] = {
    pm: {},
    start: function (pm) {
        var that = this;
        var exsaver = TG.menu[object_name][exsaver_name];
        //if (that.kag.stat.is_adding_text) return false;
        exsaver.del(pm.slot);
        that.kag.ftag.nextOrder();
    }
};

for (var tag_name in tag) {
    TG.ftag.master_tag[tag_name] = object(tag[tag_name]);
    TG.ftag.master_tag[tag_name].kag = TG;
}
    
}());