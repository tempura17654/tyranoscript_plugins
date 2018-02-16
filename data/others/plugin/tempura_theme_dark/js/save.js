(function($, TYRANO, sf, tf){

var SAVE_SLOT          = $.tData("save_slot_count");
var QUICK_SAVE_SLOT    = $.tData("quick_save_index");
var AUTO_SAVE_SLOT     = $.tData("auto_save_index");
var SAVE_SLOT_PER_PAGE = $.tData("slot_count_per_page");
var SAVE_PAGE_MAX      = $.tData("save_page_count");

TYRANO.kag.configSaveSlotNum = SAVE_SLOT;

//# SaveData
// 新規セーブデータオブジェクトを作るコンストラクタ
var SaveData = function () {
    this.title = $.tData("nosave_txt");
    this.current_order_index = 0;
    this.save_date = $.tData("nosave_date");
    this.img_data = $.tData("nosave_img");
    this.stat = {};
};

//# getStorage
// ローカルストレージからデータを持ってくる
var getStorage = function (key) {
    var data = $.getStorage(TYRANO.kag.config.projectID + key, TYRANO.kag.config.configSave);
    if (data) data = JSON.parse(data);
    else data = false;
    return data;
};

//# getSaveDataWithKey
// ローカルストレージからセーブデータを持ってくる
var getSaveDataWithKey = function (key) {
    var data = getStorage(key);
    if (! data) data = new SaveData();
    return data;
};

//# kag.menu.getSaveDataAll
// 通常・クイック・オートすべてのセーブデータを取得し配列にして返す
TYRANO.kag.menu.getSaveDataAll = function () {
    var root = this.getSaveData();
    for (var i = 0; i < root.data.length; i++) {
        root.data[i].kind = "normal";
        root.data[i].num  = i;
        root.data[i].name = i + 1;
    }
    var quick_data = getSaveDataWithKey("_tyrano_quick_save");
    quick_data.kind = "quick";
    quick_data.num  = 0;
    quick_data.name = "Quick";
    var auto_data = getSaveDataWithKey("_tyrano_auto_save");
    auto_data.kind = "auto";
    auto_data.num  = 0;
    auto_data.name = "Auto";
    root.data.push(quick_data);
    root.data.push(auto_data);
    return root.data;
};

//# kag.menu.getSaveData
// 通常セーブデータの配列をプロパティに持つrootオブジェクトを返す
TYRANO.kag.menu.getSaveData = function() {
    var tmp_array = $.getStorage(this.kag.config.projectID + "_tyrano_data",this.kag.config.configSave);
    /*[削除]================================================================
    if (tmp_array) {
        // データがある場合は一覧として表示します
        //return eval("(" + tmp_array + ")");
        return JSON.parse(tmp_array);
    } else {
        tmp_array = new Array();
        var root = {
            kind : "save"
        };
        
        //セーブ数の上限を変更する。
        var save_slot_num = this.kag.config.configSaveSlotNum || 5;
        
        for (var i = 0; i < save_slot_num; i++) {
            var json = {};
            json.title = $.lang("not_saved");
            // ラストテキスト
            json.current_order_index = 0;
            json.save_date = "";
            json.img_data = "";
            json.stat = {};
            tmp_array.push(json);
        }
        root.data = tmp_array;
        return root;
    }
    [代替]----------------------------------------------------------------*/
    if (tmp_array) {
        return JSON.parse(tmp_array);
    } else {
        tmp_array = [];
        var save_slot_num = this.kag.config.configSaveSlotNum || 5;
        for (var i = 0; i < save_slot_num; i++) {
            tmp_array.push(new SaveData());
        }
        return {
            kind: "save",
            data: tmp_array
        };
    }
    /*====================================================================*/
};

//# kag.menu.loadGame
// 通常セーブデータ配列のnum番目のデータをロードするが
// もし空のセーブデータなら何もしない
TYRANO.kag.menu.loadGame = function(num) {
    var array_save = this.getSaveData();
    var array = array_save.data;
    //セーブデータ配列
    /*[削除]============================================================
    //保存されていないデータはロード不可
    if (array[num].save_date == "") {
        return;
    }
    [代替]------------------------------------------------------------*/
    if (array[num].title === $.tData("nosave_txt")) {
        return false;
    }
    /*================================================================*/
    this.loadGameData($.extend(true, {}, array[num]));
};

//# cutSaveText
// セーブデータの<li>エレメントのjQueryオブジェクトを引数にとって処理
// リストアイテムに収まらないテキストをカットする
// もとのテキストのデータ自体は$.dataメソッドを使って残しておく
var cutSaveText = function (j_item) {
    var j_text = j_item.find(".save_list_item_text");
    var text = j_text.text();
    var maxlen = 63;
    $.data(j_item, "savetext", text);
    if (text.length > maxlen) {
        text = text.substr(0, maxlen - 1) + '…';
    }
    j_text.text(text);
};

//# updateSaveAreaOne
// セーブデータの<li>エレメントのjQueryオブジェクト、および
// セーブデータオブジェクトを引数にとって処理
// リストアイテムの情報を更新する
var updateSaveAreaOne = function (j_item, data) {
    j_item.find(".save_list_item_date").text(data.save_date);
    j_item.find(".save_list_item_thumb_img").attr("src", data.img_data);
    j_item.find(".save_list_item_text").html(data.title);
    cutSaveText(j_item);
};

//# updateSaveArea
// セーブデータリストの内容をすべて最新の情報に更新する
// 引数なし
var updateSaveArea = function () {
    var array = TYRANO.kag.menu.getSaveDataAll();
    var j_item = $(".save_list_item");
    j_item.each(function(i) {
        updateSaveAreaOne($(this), array[i]);
    });
};

//# isExistSaveData
// セーブデータの<li>エレメントのjQueryオブジェクトを引数にとって処理
// セーブデータが存在しているか？
var isExistSaveData = function (j_item) {
    var date = j_item.find(".save_list_item_date").text();
    return date !== $.tData("nosave_date");
};

//# clickSaveArea
// セーブデータリストアイテム（<li>～</li>）のクリックイベントに取り付けるハンドラ群
var clickSaveArea = {
    // ロードメニューにおけるハンドラ
    load: function (e) {
        var j_this = $(this);
        var kind = j_this.attr("data-kind");
        var num = parseInt(j_this.attr("data-num"));
        // セーブデータが存在しないなら何もしない
        if (! isExistSaveData(j_this)) return;
        // 存在するならロード処理
        else {
            $.tConfirm(sf.config.isDialogL, $.tData("load"), function () {
                switch (kind) {
                case "quick":
                    TYRANO.kag.menu.loadQuickSave(true);
                    break;
                case "auto":
                    TYRANO.kag.menu.loadAutoSave(true);
                    break;
                default:
                    TYRANO.kag.menu.snap = null;
                    TYRANO.kag.menu.loadGame(num);
                    break;
                }
                $.tLog($.tData("loaded"));
                clickSaveArea.after(kind, num);
            });
        }
    },
    // セーブメニューにおけるハンドラ
    save: function (e) {
        var j_this = $(this);
        var kind = j_this.attr("data-kind");
        var num = parseInt(j_this.attr("data-num"));
        // 通常セーブ欄でないなら何もしない
        if (kind !== "normal") return;
        // 通常セーブ欄ならそこにセーブする
        else {
            $.tConfirm(sf.config.isDialogS, $.tData("save"), function () {
                TYRANO.kag.menu.snap = null;
                TYRANO.kag.menu.doSave(num);
                $.tLog($.tData("saved"));
                clickSaveArea.after(kind, num);
            });
        }
    },
    // 共通の事後処理
    after: function (kind, num) {
        var slot;
        switch (kind) {
        case "quick":
            slot = QUICK_SAVE_SLOT;
            break;
        case "auto":
            slot = AUTO_SAVE_SLOT;
            break;
        default:
            slot = num;
            break;
        }
        $.tSaveLastData(slot);
        TYRANO.kag.menu.closeMenuLayer();
    }
};

//# kag.menu.displaySaveOrLoad
// セーブメニューまたはロードメニューを開く
// 第1引数typeは"save"または"load"
// セーブデータリストアイテムのクリックイベントに取り付けるハンドラだけが異なる
TYRANO.kag.menu.displaySaveOrLoad = function (type) {
    var that = this;
    this.kag.stat.is_skip = false;
    var array = this.getSaveDataAll();
    var layer_menu = TYRANO.kag.layer.getMenuLayer();
    this.kag.html(type, {
        array_save : array,
        "novel" : $.novel
    }, function(html_str) {
        var j_save = $(html_str);
        layer_menu.append(j_save);
        j_save.setTyranoFont();
        j_save.find(".save_display_area").each(function() {
            $(this).click(clickSaveArea[type]);
        });
        that.setEventSaveOrLoad(j_save);
        $.preloadImgCallback(layer_menu, function(){
            layer_menu.fadeIn(300);
        },that);
    });
};

//# kag.menu.displaySave
// セーブメニューを開く
// displaySaveOrLoadに丸投げ
TYRANO.kag.menu.displaySave = function() {
   this.displaySaveOrLoad("save");
};

//# kag.menu.displayLoad
// ロードメニューを開く
// displaySaveOrLoadに丸投げ
TYRANO.kag.menu.displayLoad = function() {
    this.displaySaveOrLoad("load");
};
    
//# kag.menu.setEventSave
// セーブメニューまたはロードメニューを開くときの処理
// 主にイベントのセットなど
TYRANO.kag.menu.setEventSaveOrLoad = function (j_save) {
    var that            = this;
    var j_item          = j_save.find(".save_list_item");
    var j_big_thumb     = j_save.find(".big_thumb_area");
    var j_big_thumb_img = j_big_thumb.find("img");
    var j_big_thumb_p   = j_big_thumb.find("p");
    var j_page          = j_save.find(".next_page");
    
    // 最初に開くページを特定
    var viewPage = 0;
    if (typeof sf.last_save_slot === "number") {
        viewPage = Math.floor(sf.last_save_slot / SAVE_SLOT_PER_PAGE);
    }
    
    // ページを切り替える処理
    var change = function (page) {
        // 存在しないページに切り替えることはできない
        if (page < 0 || page >= SAVE_PAGE_MAX) {
            return;
        }
        viewPage = page;
        // いったんすべてのリストアイテムを隠してから
        j_item.hide();
        // 表示すべきアイテムだけ表示
        var startSlot = page * SAVE_SLOT_PER_PAGE;
        for (var i = startSlot; i < startSlot + SAVE_SLOT_PER_PAGE; i++) {
            j_item.eq(i).show();
        }
        // selectedクラスについても同様
        j_page.removeClass("selected");
        j_page.eq(page).addClass("selected");
    };
    
    // 一発チェンジしておく
    change(viewPage);
    
    // 各セーブリストアイテムについて
    j_item.each(function (i) {
        var j_this  = $(this);
        // テキスト部分のカット処理
        cutSaveText(j_this);
        // ホバーイベントハンドラの取り付け
        j_this.hover(function () {
            var j_image = j_this.find(".save_list_item_thumb_img");
            j_big_thumb_img.attr("src", j_image.attr("src"));
            j_big_thumb_p.text($.data(j_this, "savetext"));
        });
    });
    
    // メニュー上でのスクロールイベントハンドラの取り付け
    j_save.onscroll(
        function () {
            change(viewPage - 1);
        },
        function () {
            change(viewPage + 1);
        }
    );
    
    // 各ページボタンに
    j_page.each(function (i) {
        // クリックイベントハンドラを取り付け
        var j_this  = $(this);
        j_this.click(function () {
            change(i);
        });
    });
    
    // 最後にセーブしたスロットが特定できればnewクラスのセット
    if (typeof sf.last_save_slot === "number") {
        var j_new = j_item.eq(sf.last_save_slot);
        j_new.addClass("new");
    }
    
    // クローズボタンにクリック処理セット
    j_save.find(".menu_close").click(function(e) {
        that.kag.menu.closeMenuLayer();
    });
};

//# kag.menu.loadGameData
// ゲームデータロード後の処理を追加
// コンフィグの反映やイベントの復元など
$.tAppendFunction(TYRANO.kag.menu, "loadGameData", function () {
    TYRANO.kag.restoreConfig("windowAlpha");
    TYRANO.kag.restoreConfig("fontFamily");
    TYRANO.kag.restoreConfig("isEdge");
});

//# kag.tag.autosave.start
// オートセーブ時の処理追加
$.tAppendFunction(TYRANO.kag.ftag.master_tag.autosave, "start", function () {
    $.tSaveLastData(AUTO_SAVE_SLOT);
    TYRANO.kag.saveSystemVariable();
    //$.tLog($.tData("asaved"));
});

//# kag.menu.setQuickSave
// クイックセーブ時の処理追加
TYRANO.kag.menu.setQuickSave = function() {
    var that = this;
    /*[追加]==========================================================*/
    $.tConfirm(sf.config.isDialogQS, $.tData("qsave"), function () {
        $(".role_button").trigger("mouseleave");
        $.tSaveLastData(QUICK_SAVE_SLOT);
        that.kag.saveSystemVariable();
    /*================================================================*/
        var saveTitle = that.kag.stat.current_save_str;
        that.kag.menu.snapSave(saveTitle, function() {
            var data = that.snap;
            data.save_date = $.getNowDate() + "　" + $.getNowTime();
            $.setStorage(that.kag.config.projectID + "_tyrano_quick_save", data, that.kag.config.configSave);
            /*[追加]==========================================================*/
            $.tLog($.tData("qsaved"));
            /*================================================================*/
        });
    /*[追加]==========================================================*/
    });
    /*================================================================*/
};

//# kag.menu.loadQuickSave
// クイックロード時の処理追加
TYRANO.kag.menu.loadQuickSave = function(bool) {
    /*[追加]==========================================================*/
    var that = this;
    $.tConfirm(!bool && sf.config.isDialogQL, $.tData("qload"), function () {
    /*================================================================*/
        var data = $.getStorage(that.kag.config.projectID + "_tyrano_quick_save", that.kag.config.configSave);
        if (data) {
            data = JSON.parse(data);
        } else {
            return false;
        }
        that.loadGameData($.extend(true, {}, data));
    /*[追加]==========================================================*/
        $.tLog($.tData("qloaded"));
    });
    /*================================================================*/
};

//# kag.menu.loadAutoSave
// オートロード時の処理追加
TYRANO.kag.menu.loadAutoSave = function() {
    var data = $.getStorage(this.kag.config.projectID + "_tyrano_auto_save",this.kag.config.configSave);
    if (data) {
        data = JSON.parse(data);
    } else {
        return false;
    }
    this.loadGameData($.extend(true, {}, data),{"auto_next":"yes"});
    /*[追加]==========================================================*/
    $.tSaveLastData(AUTO_SAVE_SLOT);
    this.kag.saveSystemVariable();
    /*================================================================*/
};

//# kag.menu.closeMenuLayer
// 各種メニューを閉じるときの共通関数
TYRANO.kag.menu.closeMenuLayer = function () {
    var layer_menu = TYRANO.kag.layer.getMenuLayer();
    layer_menu.fadeOut(300, function () {
        layer_menu.empty();
    });
    if (TYRANO.kag.stat.visible_menu_button == true) {
        $(".button_menu").show();
    }
};


// tmp_key_map
var tmp_key_map = {
    map_ges: null,
    map_key: null,
    map_mouse: null
};

//# kag.tempKeyConfig
// 一時的にすべてのキーコンフィグを無効にする
TYRANO.kag.tempKeyConfig = function () {
    for (var key in tmp_key_map) {
        tmp_key_map[key] = this.key_mouse[key];
        this.key_mouse[key] = {};
    }
};

//# kag.restKeyConfig
// 一時的に無効にしていたすべてのキーコンフィグを復元する
TYRANO.kag.restKeyConfig = function () {
    for (var key in tmp_key_map) {
        this.key_mouse[key] = tmp_key_map[key];
    }
};

}(window.$, window.TYRANO, window.TYRANO.kag.variable.sf, window.TYRANO.kag.variable.tf));