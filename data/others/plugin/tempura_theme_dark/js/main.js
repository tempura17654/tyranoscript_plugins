(function($, TYRANO, sf, tf){

// kag.stat.sysview
TYRANO.kag.stat.sysview.config  = $.tData("theme_dir") + "/html/config.html";
TYRANO.kag.stat.sysview.save    = $.tData("theme_dir") + "/html/save.html";
TYRANO.kag.stat.sysview.load    = $.tData("theme_dir") + "/html/save.html";
TYRANO.kag.stat.sysview.backlog = $.tData("theme_dir") + "/html/backlog.html";

//# init
var init = {
    kag: TYRANO.kag,
    
    // 初期化開始
    start: function () {
        this.commonInit();
        if (! sf[$.tData("theme_name")]) this.powerfulInit();
        else this.normalInit();
        this.kag.saveSystemVariable();
    },
    
    // 共通処理
    commonInit: function () {
        
        //
        TYRANO.kag.stat.cssload = {};
        
        //
        if (typeof window.navigator.app !== "undefined") {
        }
        else if ($.isNWJS()) {
            var gui = window.require("nw.gui");
            var win = gui.Window.get();
            win.on("close", function () {
                if ($.tIsSaved()) {
                    $.confirm($.tData("exit"), $.tExitApp);
                }
                else {
                    $.confirm($.tData("nosaveexit"), $.tExitApp);
                }
            });
        }
        else {
            $(window).on("beforeunload", function() {
                var is_saved = sf.last_save_order_index === TYRANO.kag.ftag.current_order_index;
                is_saved = is_saved && sf.last_save_scenario === TYRANO.kag.stat.current_scenario;
                if (! is_saved) {
                    return $.tData("beforeunload");
                }
                else {
                    return "";
                }
            });
        }
        
        // remodalの仕様変更
        var j_remodal = $(".remodal");
        var j_yes = j_remodal.find(".remodal-confirm");
        var j_no = j_remodal.find(".remodal-cancel");
        j_remodal.setTyranoFont();  // フォントのセット
        j_yes.text($.tData("yes")); // YESテキストのセット
        j_no.text($.tData("no"));   // NOテキストのセット
        j_yes.insertBefore(j_no);   // YES/NOボタンの位置入れ替え
        
        // メニュー用のレイヤーは撮影対象から外す
        var layer_menu = this.kag.layer.getMenuLayer();
        layer_menu.attr("data-html2canvas-ignore", "true");
        
        // コンフィグの上書き
        this.kag.config.autoRecordLabel    = "true";
        this.kag.config.defaultLineSpacing = "10";
        
        // フォント設定の上書き
        this.kag.stat.default_font.size    = "26";
        this.kag.stat.default_font.color   = "#FFFFFF";
        $.extend(this.kag.stat.font, this.kag.stat.default_font);
        
        // 一時変数にconfigプロパティを確保
        tf.config = {};
    },
    
    // 初起動時の処理
    powerfulInit: function () {
        // システム変数に目印を付ける
        sf[$.tData("theme_name")]    = true;
        // ラストセーブスロットはfalse
        sf.last_save_slot = false;
        sf.last_save_order_index = false;
        sf.last_save_scenario = false;
        // コンフィグ初期化処理
        TYRANO.kag.initConfig();
    },
    
    // 2回目以降起動時の処理
    normalInit: function () {
        // tf.configにsf.configの中身を移し、sf.configは空のオブジェクトに
        tf.config = sf.config;
        sf.config = {};
        // コンフィグ適用処理
        this.kag.updateConfig();
    }
};
init.start();

}(window.$, window.TYRANO, window.TYRANO.kag.variable.sf, window.TYRANO.kag.variable.tf));