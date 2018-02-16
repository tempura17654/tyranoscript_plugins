(function($, TYRANO, sf, tf){

//# kag.menu.displayConfig
TYRANO.kag.menu.displayConfig = function () {
    $(".button_menu").hide();
    var that = this;
    var layer_menu = this.kag.layer.getMenuLayer();
    this.kag.stat.is_config = true;
    this.kag.stat.is_skip = false;
    this.kag.html("config", {}, function (html) {
        var j_body = $(html);
        j_body.setTyranoFont();
        layer_menu.append(j_body);
        $.extend(tf.config, sf.config);
        that.kag.menu.setEventConfig(j_body);
        $.preloadImgCallback(j_body, function () {
            layer_menu.fadeIn(300);
        }, that.kag.menu);
    });
};

//# kag.menu.setEventConfig
// コンフィグ画面を開いた後の処理
TYRANO.kag.menu.setEventConfig = function (j_body) {
    var that = this;
    var layer_menu = TYRANO.kag.layer.getMenuLayer();
    // テストメッセージ出力開始
    TM.create();
    // 終了ボタン
    j_body.find(".menu_exit").click(function(e) {
        if ($.tIsSaved()) {
            $.confirm($.tData("exit"), $.tExitApp);
        }
        else {
            $.confirm($.tData("nosaveexit"), $.tExitApp);
        }
    });
    // タイトルに戻るボタン
    j_body.find(".menu_title").click(function(e) {
        if ($.tIsSaved()) {
            $.confirm($.tData("title"), $.tReload);
        }
        else {
            $.confirm($.tData("nosavetitle"), $.tReload);
        }
    });
    // クローズボタン
    j_body.find(".menu_close").click(function(e) {
        that.kag.stat.is_config = false;
        TM.destroy();
        that.kag.saveSystemVariable();
        that.kag.menu.closeMenuLayer();
    });
    // レンジスライダー
    $("input[type=\"range\"]").each(function(){
        var j_this = $(this);
        var key = j_this.attr("id"); // idを取得して
        var value = tf.config[key];  // それをキーにしてsf.configから値を引っ張る
        j_this.attr("value", value); // それをvalue属性にセット（スライダーの初期値になる）
        j_this.wrap("<div class=\"rangeslider__wrapper\"></div>");
        // rangesliderライブラリの呼び出し
        j_this.rangeslider({
            polyfill: false,
            // 初期化イベントハンドラ
            onInit: function () {},
            // スライド時イベントハンドラ
            onSlide: function (position, value) {
                // 文字スピードとオートモードスピード以外なら更新処理
                if (key !== "chSpeed" && key !== "autoSpeed") {
                    tf.config[key] = value;
                    that.kag.updateConfig();
                }
            },
            // スライド終了イベントハンドラ
            onSlideEnd: function (position, value) {
                tf.config[key] = value;
                that.kag.updateConfig();
                that.kag.saveSystemVariable();
            }
        });
    });
    // ON/OFFボタン
    var j_on = j_body.find(".on");
    var j_off = j_body.find(".off");
    // 更新イベントハンドラ
    var update = function (is_set, default_value, brother_class) {
        var j_this = $(this);
        var j_parent = j_this.parent();
        var j_brother = j_parent.find(brother_class);
        var key = j_parent.attr("id");
        var value = j_this.attr("value") || default_value;
        if (is_set) {
            tf.config[key] = value;
            that.kag.updateConfig();
            that.kag.saveSystemVariable();
        }
        // selectedクラス付与、隣からは剥奪
        if (tf.config[key] === value) {
            j_this.addClass("selected");
            j_brother.removeClass("selected");
        }
        // selectedクラス剥奪、隣には付与
        else {
            j_this.removeClass("selected");
            j_brother.addClass("selected");
        }
    };
    // クリックイベントハンドラ
    j_on.click(function () {
        update.apply(this, [true, true, ".off"]);
    });
    j_off.click(function () {
        update.apply(this, [true, false, ".on"]);
    });
    // selectedクラス付与
    j_on.each(function () {
        update.apply(this, [false, true, ".off"]);
    });
    j_off.each(function () {
        update.apply(this, [false, false, ".on"]);
    });
    // サンプルテキストの透明度と縁取り調整
    this.kag.restoreConfig("windowAlpha");
    this.kag.restoreConfig("isEdge");
};

//# kag.initConfig
// コンフィグを初期化する
TYRANO.kag.initConfig = function () {
    tf.config = {
    		chSpeed       : 80,      // 文字速度
    		autoSpeed     : 60,      // オートモード速度
        masterVolume  : 50,      // マスターボリューム
        musicVolume   : 50,      // 背景音音量
        soundVolume   : 50,      // 効果音音量
        voiceVolume   : 50,      // ボイス音量
        windowAlpha   : 80,      // ウィンドウ不透明度
        fontFamily    : "serif", // 書体
        isEdge        : true,    // 縁取りするか
        isSkipURT     : false,   // 未読スキップするか
        isColorCodeART: false,   // 既読文章を色分けするか
        isFScreen     : false,   // フルスクリーンか
        isDialogS     : false,   // セーブ確認ダイアログを開くか
        isDialogL     : false,   // ロード確認ダイアログを開くか
        isDialogQS    : false,   // クイックセーブ確認ダイアログを開くか
        isDialogQL    : false    // クイックロード確認ダイアログを開くか
    };
    sf.config = {};
    this.updateConfig();
};

//# kag.updateConfig
// tf.configの値を用いてコンフィグ項目の更新処理を呼び出す
// sf.configの値と逐一照らし合わせて、違いがあった場合のみ処理を行うようにする
TYRANO.kag.updateConfig = function () {
    for (var key in tf.config) {
        if (tf.config[key] !== sf.config[key]) {
            if (this.updateConfigWithKey[key]) {
                this.updateConfigWithKey[key](tf.config[key]);
            }
            sf.config[key] = tf.config[key];
        }
    }
};

//# kag.restoreConfig
// sf.configの値を用いてコンフィグ更新処理を呼び出す
TYRANO.kag.restoreConfig = function (key) {
    this.updateConfigWithKey[key](sf.config[key]);
};

//# kag.updateConfigWithKey
// 個々のコンフィグ更新関数群
TYRANO.kag.updateConfigWithKey = {
    kag: TYRANO.kag,
    masterVolume: function (value) {
        sf.config.masterVolume = value;
        this.musicVolume(sf.config.musicVolume);
        this.soundVolume(sf.config.soundVolume, true);
    },
    musicVolume: function (value) {
        var new_volume = sf.config.masterVolume * value / 100;
        TYRANO.kag.config.defaultBgmVolume = String(new_volume);
        if (this.kag.define.FLAG_APRI == false) {
            var map_bgm     = this.kag.tmp.map_bgm;
            var new_vol_bgm = new_volume / 100;
            for (var key in map_bgm) {
                if(map_bgm[key]){
                    map_bgm[key].volume = new_vol_bgm;
                }
            }
        }
    },
    soundVolume: function (value, bool) {
        var new_volume = sf.config.masterVolume * value / 100;
        TYRANO.kag.config.defaultSeVolume = String(new_volume);
        if (this.kag.define.FLAG_APRI == false) {
            var map_se      = this.kag.tmp.map_se;
            var new_vol_se  = new_volume / 100;
            for (var key in map_se) {
                if(map_se[key]){
                    map_se[key].volume = new_vol_se;
                }
            }
        }
        if (this.kag.stat.is_config && !bool) {
            this.kag.ftag.startTag("playse", {
                storage: "../others/plugin/tempura_theme_dark/sound/sound.ogg",
                stop: true
            });
        }
    },
    chSpeed: function (value) {
        this.kag.config.chSpeed = String(Math.max(1, 100 - value));
        if (this.kag.stat.is_config) {
            TM.currentTextNumber = 0;
            TM.next(true);
        }
    },
    autoSpeed: function (value) {
        this.kag.config.autoSpeed         = String(40 * (100 - value));
        this.kag.config.autoSpeedWithText = String(100 - value);
        if (this.kag.stat.is_config) {
            TM.currentTextNumber = 0;
            TM.next(true);
        }
    },
    windowAlpha: function (value) {
        var j_layer  = this.kag.layer.getLayer("message0");
        var j_outer  = j_layer.find(".message_outer");
        j_outer.css("opacity", value / 100);
        if (this.kag.stat.is_config) {
            var j_outer2 = this.kag.layer.getMenuLayer().find(".text_area_outer");
            j_outer2.css("opacity", value / 100);
        }
    },
    fontFamily: function (value) {
        var font = $.tData(value);
        this.kag.config.userFace = font;
        var is_default_text = this.kag.stat.font.face === this.kag.stat.default_font.face;
        if (is_default_text) {
            this.kag.stat.font.face = font;
        }
        this.kag.stat.default_font.face = font;
        var j_layer  = this.kag.layer.getLayer("message0");
        var j_inner  = j_layer.find(".message_inner");
        var j_cname  = j_layer.find(".chara_name_area");
        var j_remodal = $(".remodal");
        j_remodal.setTyranoFont();
        j_inner.setTyranoFont();
        j_cname.setTyranoFont();
        if (is_default_text) {
            j_inner.find("span").setTyranoFont();
        }
        if (this.kag.stat.is_config) {
            TM.messageArea.setTyranoFont();
        }
    },
    isEdge: function (value) {
        var color = "none";
        if (value) {
            color = $.tData("edge_color");
        }
        var is_default_text = this.kag.stat.font.face === this.kag.stat.default_font.face;
        this.kag.config.defaultEdgeColor = color;
        if (is_default_text) {
            this.kag.stat.font.edge = color;
        }
        this.kag.stat.default_font.edge = color;
        this.kag.config.defaultEdgeColor = color;
        var j_layer  = this.kag.layer.getLayer("message0");
        var j_inner  = j_layer.find(".message_inner");
        var j_cname  = j_layer.find(".chara_name_area");
        j_inner.setEdge(color);
        j_cname.setEdge(color);
        if (is_default_text) {
            j_inner.find("span").setEdge(color);
        }
        if (this.kag.stat.is_config) {
            TM.messageArea.setEdge(color);
        }
    },
    isSkipURT: function (value) {
        this.kag.config.unReadTextSkip = String(value);
    },
    isColorCodeART: function (value) {
        var color = "default";
        if (value) {
            color = $.tData("a_r_t_color");
        }
        this.kag.config.alreadyReadTextColor = color;
    },
    isFScreen: function (value) {
        $.tScreenFull(value);
    }
    
};

}(window.$, window.TYRANO, window.TYRANO.kag.variable.sf, window.TYRANO.kag.variable.tf));