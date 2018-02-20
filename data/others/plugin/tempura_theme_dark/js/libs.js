(function($, TYRANO, sf, tf){

// 定数定義
var constants = {
    save_slot_count    : 25,
    quick_save_index   : 25,
    auto_save_index    : 26,
    slot_count_per_page: 5,
    save_page_count    : 6,
    theme_name         : "tempura_theme_dark",
    theme_dir          : "./data/others/plugin/tempura_theme_dark",
    serif              : "Noto Serif CJK JP, Noto Serif, ヒラギノ明朝 ProN W3, Hiragino Mincho ProN W3, HiraMinProN-W3, ヒラギノ明朝 ProN, Hiragino Mincho ProN, Yu Mincho, ＭＳ 明朝, serif",
    gothic             : "Noto Sans CJK JP, Noto Sans, ヒラギノ角ゴ ProN W3, Hiragino Kaku Gothic ProN W3, HiraKakuProN-W3, ヒラギノ角ゴ ProN, Hiragino Kaku Gothic ProN, Yu Gothic, Meiryo, ＭＳ ゴシック, sans-serif",
    a_r_t_color        : "#87cefa",
    edge_color         : "#000000",
    nosave_txt         : "まだ、保存されているデータがありません。",
    nosave_img         : "./data/others/plugin/tempura_theme_dark/img/nodata.png",
    nosave_date        : "----/--/--  --:--:--",
    beforeunload       : "このページを離れると、セーブしていないデータは消えてしまいます。このページを離れてよろしいですか？",
    save               : "このスロットにセーブしてもよろしいですか？",
    load               : "このスロットをロードしてもよろしいですか？",
    qsave              : "クイックセーブしてもよろしいですか？",
    qload              : "クイックロードしてもよろしいですか？",
    asaved             : "オートセーブしました。",
    qsaved             : "クイックセーブしました。",
    qloaded            : "クイックロードしました。",
    saved              : "セーブしました。",
    loaded             : "ロードしました。",
    title              : "タイトルに戻ってもよろしいですか？",
    exit               : "ゲームを終了してもよろしいですか？",
    nosavetitle        : "セーブしていないデータは消えてしまいます。<br>タイトルに戻ってもよろしいですか？",
    nosaveexit         : "セーブしていないデータは消えてしまいます。<br>ゲームを終了してもよろしいですか？",
    yes                : "はい",
    no                 : "いいえ"
};

//# $.tData
// 定数を取り出す
$.tData = function (key) {
    return constants[key];
};

//# $.tIsSaved
// 最後のプレイ状態をセーブしたか？
// セーブせずにゲームを終了しようとしたときなどを検知するために用いる
$.tIsSaved = function () {
    return sf.last_save_order_index === TYRANO.kag.ftag.current_order_index && 
    sf.last_save_scenario === TYRANO.kag.stat.current_scenario;
};

//# $.tSaveLastData
// 最後のプレイ状態を記憶するための処理
$.tSaveLastData = function (slot) {
    if (typeof slot !== "undefined") sf.last_save_slot = slot;
    sf.last_save_order_index = TYRANO.kag.ftag.current_order_index;
    sf.last_save_scenario = TYRANO.kag.stat.current_scenario;
    TYRANO.kag.saveSystemVariable();
};

//# $.tConfirm
// is_confirmが偽なら即座にcallback
// is_confirmが真ならその前に確認ダイアログを開く
$.tConfirm = function (is_confirm, title, callback) {
    if (! is_confirm) {
        callback();
    }
    else {
        $.confirm(title, callback);
    }
};

//# $.tReload
// リロードする
$.tReload = function () {
    $(window).off("beforeunload");
    var href = location.href;
    if (href.indexOf("index.html") > -1) {
        location.href = "./index.html";
    }
    else {
        location.href = href.split("#")[0];
    }
};

//# $.tLog
// 画面上部に通知ログを出す
$.tLog = function(str) {
    $(".notification").remove();
    $('<div class="notification">' + str + '</div>')
    .setTyranoFont()
    .appendTo("body")
    .delay(900)
    .fadeOut(500,
        function() {
            $(this).remove();
        }
    );
};

//# $.tExitApp
// アプリを閉じる
$.tExitApp = function () {
    if (typeof window.navigator.app !== "undefined") {
        navigator.app.exitApp();
    }
    else if ($.isNWJS()) {
        var gui = window.require("nw.gui");
        gui.Window.get().close(true);
    }
    else {
        $(window).off("beforeunload");
        window.open('about:blank','_self').close();
    }
};

//# $.tAppendFunction
// 関数の後に処理を追加する
$.tAppendFunction = function (parentObject, propertyName, newFunction) {
    var oldFunction = parentObject[propertyName];
    parentObject[propertyName] = function () {
        oldFunction.apply(parentObject, arguments);
        newFunction.apply(parentObject, arguments);
    };
};

//# $.tPrependFunction
// 関数の前に処理を追加する
$.tPrependFunction = function (parentObject, propertyName, newFunction) {
    var oldFunction = parentObject[propertyName];
    parentObject[propertyName] = function () {
        newFunction.apply(parentObject, arguments);
        oldFunction.apply(parentObject, arguments);
    };
};

//# $.tScreenFull
// boolが真ならフルスクリーンモードにする
// boolが偽ならウィンドウモードにする
$.tScreenFull = function (bool) {
  	if ($.isNWJS() == true) {
  		var gui = window.require("nw.gui");
  		var win = gui.Window.get();
  		if (win.isFullscreen && !bool) win.leaveFullscreen();
  		else if (bool) win.enterFullscreen();
  	} else {
  		var isFullScreen = document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullScreenElement || false;
  		var isEnableFullScreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || false;
  		var elem = document.body;
  		if (isEnableFullScreen)
  			if (elem.requestFullscreen)
  				if (!bool) document.exitFullscreen();
  				else  elem.requestFullscreen();
  		else if (elem.webkitRequestFullscreen)
  			if (!bool) document.webkitExitFullscreen();
  			else elem.webkitRequestFullscreen();
  		else if (elem.mozRequestFullScreen)
  			if (!bool) document.mozCancelFullScreen();
  			else elem.mozRequestFullScreen();
  		else if (elem.msRequestFullscreen)
  			if (!bool) document.msExitFullscreen();
  			else elem.msRequestFullscreen();
    }
};

TYRANO.kag.key_mouse.canShowMenu = function () {
    /*[追加]==================================================================*/
    if (this.kag.layer.layer_remodal.css("display") !== "none") {
        return false;
    }
    /*========================================================================*/
    if (this.kag.layer.layer_event.css("display") == "none" && this.kag.stat.is_strong_stop != true) {
        return false;
    }
    if(this.kag.stat.is_wait == true){
        return false;
    }
    return true;
};

//# $.getNowDate
// 既存関数の上書き：0埋め処理の追加
$.getNowDate = function() {
    var nowdate = new Date();
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth() + 1;
    var d = nowdate.getDate();
    y = ("00" + y).slice(-4);
    m = ("00" + m).slice(-2);
    d = ("00" + d).slice(-2);
    return y + "/" + m + "/" + d;
};

//# $.getNowTime
// 既存関数の上書き：0埋め処理の追加と区切り文字の変更
$.getNowTime = function() {
    var nowdate = new Date();
    var h = nowdate.getHours();
    var m = nowdate.getMinutes();
    var s = nowdate.getSeconds();
    h = ("00" + h).slice(-2);
    m = ("00" + m).slice(-2);
    s = ("00" + s).slice(-2);
    return h + ":" + m + ":" + s;
};
    
//# $.fn.setEdge
$.fn.setEdge = function (color) {
    if (!color) {
        color = TYRANO.kag.config.defaultEdgeColor;
    }
    var css_str = "none";
    if (color && color !== "none") {
        css_str = "1px 1px 0 "+color+", -1px 1px 0 "+color+",1px -1px 0 "+color+",-1px -1px 0 "+color+"";
    }
    return $(this).css("text-shadow", css_str);
};

//# $.fn.setTyranoFont
// ティラノスクリプトのデフォルトフォントをセットする
$.fn.setTyranoFont = function (font) {
    if (!font) {
        font = TYRANO.kag.config.userFace;
    }
    return $(this).css("font-family", font);
};

//# $.fn.onscroll
// 上スクロール、下スクロールイベントにハンドラを取り付ける
$.fn.onscroll = function (cb_up, cb_down) {
    var $this = $(this);
    var scroll = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $this.on(scroll, function (e) {
        var delta = e.originalEvent.deltaY     ? - (e.originalEvent.deltaY    ):
                    e.originalEvent.wheelDelta ?   (e.originalEvent.wheelDelta):
                                                 - (e.originalEvent.detail    );
        if (delta < 0) cb_down();
        else cb_up();
    });
    return $this;
};

}(window.$, window.TYRANO, window.TYRANO.kag.variable.sf, window.TYRANO.kag.variable.tf));