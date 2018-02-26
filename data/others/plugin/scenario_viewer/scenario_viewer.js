window.TYRANO.Viewer = (function ($, TYRANO, mp) {

// プラグインの多重読み込みの禁止
if (typeof TYRANO.Viewer !== "undefined") {
    return TYRANO.Viewer;
}

//# define plugin
var plugin = {};

// なんか使いそうな定数など
plugin.dirPath      = "./data/others/plugin/scenario_viewer";
plugin.scWidth      = parseInt(TYRANO.kag.config.scWidth);
plugin.scHeight     = parseInt(TYRANO.kag.config.scHeight);
plugin.gameHtmlName = location.href.split("/").pop(); // ようするにindex.html
plugin.gameHtmlDir  = location.href.replace(/^file:\/+/, "").replace("/" + plugin.gameHtmlName, ""); // index.htmlの親フォルダ

// jQueryオブジェクト
plugin.$body                 = $("body");
plugin.$originalBodyChildren = $("body").children();
plugin.$tyranoBase           = $("#tyrano_base");

// node-webkitのモジュール読み込み
if ($.isNWJS()) {
    plugin.fs   = window.require("fs");
    plugin.path = window.require("path");
    plugin.gui  = window.require("nw.gui");
}

//# plugin.downloadStr
// テキストデータをダウンロードするぞ
plugin.downloadStr = function (title, content) {
    var type = "text/plain";
    var blob = new Blob([content], {type: type});
    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, name);
    }
    else {
        var a = document.createElement("a");
        a.download = title;
        a.href = window.URL.createObjectURL(blob);
        a.click();
    }
};

//# plugin.saveAs
// 名前を付けて保存しよう
// 隠しinputをクリックしたことにしてダイアログを開く
plugin.saveAs = function (title, content) {
    plugin.$inputSaveAs.attr("nwsaveas", title);
    plugin.$inputSaveAs.unbind("change");
    plugin.$inputSaveAs.change(function () {
        var path = $(this).val();
        window.path = path;
        plugin.fs.writeFile(path, content);
    });
    plugin.$inputSaveAs.trigger("click");
};

//# plugin.parsePath
// パスを修正する
// 1) / を \ に置換する
// 2) 「./」「../」の削除
// 例) C:/hoge/fuga/../piyo/./fuga.txt -> C:\hoge\piyo\fuga.txt
// この修正を入れないとエクスプローラで開けないような気がする
plugin.parsePath = function (path) {
    path = path.replace(/\//g, "\\");
    var arr = path.split("\\");
    var newarr = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "..") {
            newarr.pop();
        }
        else if (arr[i] === ".") {
        }
        else {
            newarr.push(arr[i]);
        }
    }
    var ret = newarr.join("\\");
    return ret;
};

//# plugin.getTimeStr
// 現在時刻を使って -20181231-235959 のような文字列を得る
// ゼロ埋めもするぞ
plugin.getTimeStr = function () {
    var now = new Date();
    var s0 = now.getFullYear();
    var s1 = ("00"+(now.getMonth()+1)).slice(-2);
    var s2 = ("00"+now.getDate()).slice(-2);
    var s3 = ("00"+now.getHours()).slice(-2);
    var s4 = ("00"+now.getMinutes()).slice(-2);
    var s5 = ("00"+now.getSeconds()).slice(-2);
    return "-" + s0 + s1 + s2 + "-" + s3 + s4 + s5;
};

//# plugin.openExplorer
// エクスプローラでパスの場所を開く
plugin.openExplorer = function (path) {
    path = plugin.parsePath(path);
    plugin.gui.Shell.showItemInFolder(path);
};

//# plugin.saveBackup
// バックアップを作成したあと新しい内容で上書きする
plugin.saveBackup = function (path, content, isOpen) {
    var pathObj = plugin.path.parse(path);
    var time = plugin.getTimeStr();
    var newPath = pathObj.dir + "\\" + pathObj.name + time + ".bak";
    // 読み込んで
    plugin.fs.readFile(path, "utf-8", function (err, data) { if (!err && data) {
        // 別名で保存
        plugin.fs.writeFile(newPath, data, function (err) { if (! err) {
            // 新しい内容で保存
            if (content) {
                plugin.fs.writeFile(path, content, function (err) { if (! err) {
                    // その場所を開く
                    if (isOpen) {
                        plugin.openExplorer(path);
                    }
                }});
            }
        }});
    }});
};

//# $.getViewPort
// ゲーム画面をテーブルに埋め込む関係で、関数を上書きしなければいけない
$.getViewPortOrigin = $.getViewPort;
$.getViewPort = function () {
    var width = plugin.$tyranoBaseArea.width();
    var height = plugin.$tyranoBaseArea.height();
    var viewPort = {
        width: width,
        height: height
    };
    return viewPort;
};

//# TYRANO.kag.loadScenario
// シナリオファイルをロードしようとしたときの処理を追加するぞ
var loadScenairo = TYRANO.kag.loadScenario;
TYRANO.kag.loadScenario =  function (filename, callback) {
    // ログ
    console.log("* By The " + plugin.lastTag.type + " [" + plugin.lastTag.name + "], Load Scenario \"" + filename + "\"");
    // エディタにシナリオをセットする
    // もとの関数はコールバックに埋め込む
    plugin.setScenarioToEditor(filename, function () {
        loadScenairo.call(TYRANO.kag, filename, callback);
    });
};
 
plugin.saveSnap       =    {}; // セーブスナップを格納していく
plugin.lastTag        =    {}; // 最後にオーダーしたタグ
plugin.targetLine     =    -1; // スキップ目標とする行
plugin.shouldSaveSnap = false; // セーブスナップを撮るべき？

//# TYRANO.kag.ftag.nextOrder
// ネクストオーダーに処理を追加するぞ
var nextOrderOld = TYRANO.kag.ftag.nextOrder;
TYRANO.kag.ftag.nextOrder = function () {
    var nextOrderFlag =  true; // ネクストオーダーしていい？
    var saveSnapFlag  = false; // セーブスナップを撮るべき？
    var index  = TYRANO.kag.ftag.current_order_index;  // index
    var tagObj = TYRANO.kag.ftag.array_tag[index + 1]; // tagをゲット
    
    // 正規タグか？　マクロか？
    if (TYRANO.kag.stat.map_macro[tagObj]) {
        tagObj.type = "Macro";
    }
    else {
        tagObj.type = "Tag";
    }
    
    // 行数の特定
    if (! tagObj.line) {
        tagObj.line = tagObj.pm.line || -1;
    }
    
    // 目標行が存在するならスキップ処理
    if (plugin.targetLine > -1) {
        if (tagObj.line < plugin.targetLine) {
            TYRANO.kag.stat.is_skip = true;
            tagObj.pm.time = "0";
            if (tagObj.name == "text") {
                tagObj.name = "wa";
            }
        }
        else {
            plugin.targetLine = -1;
            TYRANO.kag.stat.is_skip = false;
        }
    }
    
    // シナリオの先頭ならセーブスナップを撮りたい
    if (index === -1) {
        saveSnapFlag = true;
        // もうここのスナップを持ってたら要らない
        var key = plugin.getScenarioPath();
        if (! plugin.saveSnap[key]) plugin.saveSnap[key] = [];
        for (var i = 0; i < plugin.saveSnap[key].length; i++) {
            if (index == plugin.saveSnap[key][i].current_order_index) {
                saveSnapFlag = false;
                break;
            }
        }
        // make.ksのスナップも要らない
        if (TYRANO.kag.stat.current_scenario === "make.ks") {
            saveSnapFlag = false;
        }
    }
    
    // スナップフラグが立っているなら
    if (saveSnapFlag || plugin.shouldSaveSnap) {
        // ネクストオーダーはとりあえずさせない
        nextOrderFlag = false;
        // ログ
        console.log("* Save Snap Line -> " + (tagObj.line + 1));
        // 現在のスナップをセーブしよう
        TYRANO.kag.menu.snapSave("", function () {
            var snapObj = $.extend(true, {}, TYRANO.kag.menu.snap);
            // indexは最低でも-1
            snapObj.current_order_index = Math.max(-1, snapObj.current_order_index);
            // どこにセーブする？
            var key = plugin.getScenarioPath();
            if (! plugin.saveSnap[key]) plugin.saveSnap[key] = [];
            plugin.saveSnap[key].push(snapObj);
            // フラグを折る
            plugin.shouldSaveSnap = false;
            // ここでネクストオーダー
            nextOrderOld.apply(TYRANO.kag.ftag, arguments);
        }, "false");
    }
    
    // ラストタグに登録
    plugin.lastTag = tagObj;
    
    // ハイライト
    plugin.highlightCurrentLine();
    
    // フラグが折られていなければネクストオーダー
    if (nextOrderFlag) {
        nextOrderOld.apply(TYRANO.kag.ftag, arguments);
    }
};

/*
var startTagOld = TYRANO.kag.ftag.startTag;
TYRANO.kag.ftag.startTag = function(name, pm) {
    startTagOld.apply(TYRANO.kag.ftag, arguments);
};
*/

//# TYRANO.kag.ftag.nextOrderWithLabel
// スナップフラグを立たせる
var nextOrderWithLabelOld = TYRANO.kag.ftag.nextOrderWithLabel;
TYRANO.kag.ftag.nextOrderWithLabel = function(name, pm) {
    plugin.shouldSaveSnap = true;
    nextOrderWithLabelOld.apply(TYRANO.kag.ftag, arguments);
};

//# $.fn.onscroll
// スクロールイベントにハンドラを取り付ける
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


//# plugin.getScenarioPath
// シナリオファイルのURLをゲットする
plugin.getScenarioPath = function (filename) {
    var path = filename || TYRANO.kag.stat.current_scenario;
    if (! $.isHTTP(path)) {
        path = "./data/scenario/" + path;
    }
    return path;
};

//# plugin.setScenarioToEditor
// 現在のシナリオファイルを読み取ってエディターに映し出す
plugin.setScenarioToEditor = function (filename, callback) {
    var path = plugin.getScenarioPath(filename);
    $.loadText(path, function (scenario) {
        // もう開いているシナリオファイルならそれをアクティブにする
        if (plugin.editors[path]) {
            plugin.editors[path].editor.show();
        }
        // 開いていないシナリオファイルなら新規に開く
        else {
            plugin.createEditor(path, true);
        }
        // テキストをセットして0行目にジャンプ
        plugin.editor.setValue(scenario);
        plugin.editor.gotoLine(0);
        // アンドゥスタックを削除
        plugin.editor.getSession().getUndoManager().reset();
        // コールバックがあればここで実行
        if (typeof callback === "function") {
            callback();
        }
    });
};

//# plugin.stopBubbling
// エディタ上でのクリックイベント等をバブリングさせない
plugin.stopBubbling = function () {
    plugin.$editorArea.onscroll(function (e) {
        e.stopPropagation();
    }, function (e) {
        e.stopPropagation();
    }).on("keydown", function (e) {
        e.stopPropagation();
    }).on("mousedown", function (e) {
        e.stopPropagation();
    });
};

//# plugin.fitTyranoBase
// 画面をフィットさせる
plugin.fitTyranoBase = function (e) {
    // いったん0にする
    plugin.$tyranoBaseArea.css("width", 0);
    // いろいろ取得
    var barHeight = plugin.$menubars.eq(0).height() * plugin.$menubars.size();
    var editorWidth = plugin.$editorTextArea.get(0).offsetWidth;
    var editorTabHeight = plugin.$editorTabArea.get(0).offsetHeight;
    var editorCommandHeight = plugin.$editorCommandArea.get(0).offsetHeight;
    var gameHeight = $.getViewPortOrigin().height - barHeight;
    var gameWidth = $.getViewPortOrigin().width - editorWidth;
    // ティラノベースエリア
    plugin.$tyranoBaseArea.css({
        "height": gameHeight,
        "width": gameWidth
    });
    // エディタエリア
    if (plugin.editor) {
        plugin.$editor.css("height", gameHeight - editorTabHeight - editorCommandHeight);
        plugin.editor.resize();
    }
    // ティラノ本体のフィット関数も呼び出しておく
    TYRANO.base.fitBaseSize();
};

//# plugin.appendViewer
// htmlを読み込んでセットする
plugin.appendViewer = function (callback) {
    $.loadText(plugin.dirPath + "/scenario_viewer.html", function (html) {
        // start～endまでを取り出してjQueryでパースする
        html = html.split("<!-- viewer start -->")[1].split("<!-- viewer end -->")[0];
        plugin.$newBodyChildren = $(html);
        // jQueryオブジェクトを見つけていく
        plugin.$menubars          = plugin.$newBodyChildren.find(".menubar");
        plugin.$tyranoBaseArea    = plugin.$newBodyChildren.find("#tyrano_base_area");
        plugin.$editorArea        = plugin.$newBodyChildren.find("#editor_area");
        plugin.$editorCommandArea = plugin.$newBodyChildren.find("#editor_command_area");
        plugin.$editorTabArea     = plugin.$newBodyChildren.find("#editor_tab_area");
        plugin.$editorTabList     = plugin.$newBodyChildren.find("#editor_tab_area ul");
        plugin.$editorTextArea    = plugin.$newBodyChildren.find("#editor_text_area");
        plugin.$inputSaveAs       = plugin.$newBodyChildren.filter("#input_saveas");
        
        // ソートできるようにする
        plugin.$editorTabList.sortable();
        
        // コマンド
        plugin.commands = {};
        plugin.commands.$create    = plugin.$editorCommandArea.find("#command_create");
        plugin.commands.$open      = plugin.$editorCommandArea.find("#command_open");
        plugin.commands.$save      = plugin.$editorCommandArea.find("#command_save");
        plugin.commands.$saveas    = plugin.$editorCommandArea.find("#command_saveas");
        plugin.commands.$rewind    = plugin.$editorCommandArea.find("#command_rewind");
        plugin.commands.$rewind.on("click", function (e) {
        
        });
        
        // bodyに追加
        plugin.$body.append(plugin.$newBodyChildren);
        
        // 元々body直下にあった要素を引っ越す
        //plugin.$tyranoBase.css("overflow", "initial").css("display", "table-cell");
        plugin.$tyranoBaseArea.append(plugin.$originalBodyChildren);
        
        // フィットさせる
        TYRANO.base.fitBaseSize(plugin.scWidth, plugin.scHeight);
        
        // コールバックがあればここで実行
        if (typeof callback === "function") {
            callback();
        }
    });
};

//# plugin.highlightCurrentLine
// 現在のゲームが滞在している行をハイライト
plugin.highlightCurrentLine = function (adjust) {
    var index = TYRANO.kag.ftag.current_order_index + (adjust || 1);
    if (index >= 0) {
        var tag = $.cloneObject(TYRANO.kag.ftag.array_tag[index]);
        if (tag) {
            var line = tag.line || (tag.pm && tag.pm.line) || -1;
            if (line >=0 && plugin.editor) {
                var editor = plugin.editor;
                editor.getSession().removeMarker(editor.highlightRange.id);
                editor.highlightRange = editor.getSession().highlightLines(line, line, "ace_line_current");
                setTimeout(function () {
                    editor.gotoLine(line + 1);
                }, 1);
            }
        }
    }
};

//# plugin.destroyEditor
// idを指定してエディタを破壊する
plugin.destroyEditor = function (id) {
    var obj = plugin.editors[id];
    // Editorオブジェクトのメソッドを呼ぶ
    obj.editor.destroy();
    // DOMを追放する
    obj.$tab.remove();
    obj.$editor.remove();
    // あばよ
    delete plugin.editors[id];
};

//# plugin.createEditor
// Aceエディターを作成する
var idx = 1;
plugin.editors = {};
plugin.createEditor = function (id, isActive) {
    var editor, $editor, $tab, KAGMode;
    
    // idが指定されてなかったら勝手に決める
    if (! id) {
        id = "editor" + (idx++);
    }
    
    // タブに表示する名前
    var tabName = id.split("/").pop();
    
    // タブ準備
    $tab = $("<li></li>");
    $tab.attr("id", id + "-tab");
    $tab.attr("data-editor-id", id);
    $tab.attr("title", id);
    $tab.append("<span class='editor_tab_name'>" + tabName + "</span>");
    $tab.append("<span class='editor_tab_close'>×</span>");
    // タブクリック処理
    $tab.on("click", function (e) {
        plugin.$editorTabArea.find("li").addClass("hidden").removeClass("active");
        plugin.$editorTextArea.find(".editor_text").hide();
        var id = $(this).attr("data-editor-id");
        plugin.editors[id].$tab.removeClass("hidden").addClass("active");
        plugin.editors[id].$editor.show();
        plugin.$editor = $editor;
        plugin.editor = editor;
    });
    // タブ右側のクローズボタンクリック処理
    $tab.find(".editor_tab_close").on("click", function (e) {
        var $li = $(this).parent();
        var index = $li.index();
        var id = $li.attr("data-editor-id");
        plugin.destroyEditor(id);
        var $list = plugin.$editorTabArea.find("li");
        if ($list.length === 0) {
        }
        else if ($list.length > index) {
            $list.eq(index).trigger("click");
        }
        else {
            $list.eq(index - 1).trigger("click");
        }
    });
    plugin.$editorTabList.append($tab);
    
    // Aceエディタ準備
    $editor = $("<div class='editor_text'></div>");
    $editor.attr("id", id);
    plugin.$editorTextArea.append($editor);
    editor = window.ace.edit(id);
    editor.setReadOnly(true);
    editor.setShowPrintMargin(false);
    editor.setFontSize(14);
    KAGMode = ace.require("ace/mode/kag").Mode;
    editor.getSession().setMode(new KAGMode());
    editor.setTheme("ace/theme/kag-dark");
    editor.$blockScrolling = 99999999;
    editor.highlightRange = {};
    
    // ガタークリック処理
    $editor.find(".ace_gutter-layer").on("click", function (e) {
        var $surface = $(":hover").last();
        if ($surface.hasClass("ace_gutter-cell")) {
            // クリックした行はどこだ
            var targetLine = parseInt($surface.text()) - 1;
            // ターゲットラインに登録
            plugin.targetLine = targetLine;
            // 使うべきスナップを特定しよう
            var snap, index, tag, line, useSnap;
            var tagArray = TYRANO.kag.ftag.array_tag;
            var snapArray = plugin.saveSnap[id];
            for (var i = snapArray.length - 1; i >= 0; i--) {
                snap = snapArray[i];
                index = snap.current_order_index;
                if (index > -1) {
                    tag = tagArray[index];
                    line = tag.line || tag.pm.line || 0;
                }
                else {
                    line = 0;
                }
                if (line < targetLine) {
                    useSnap = snap;
                    break;
                }
            }
            // 特定したスナップでロード開始
            TYRANO.kag.menu.loadGameData($.extend(true, {}, useSnap), {
                bgm_over: "false",
                auto_next: "yes"
            });
        }
    });
    editor.show = function () {
        $tab.trigger("click");
    };
    editor.close = function () {
        $tab.find(".editor_tab_close").trigger("click");
    };
    
    // editorsに登録
    plugin.editors[id] = {
        $tab: $tab,
        $editor: $editor,
        editor: editor
    };
    
    // アクティブにする
    if (isActive) {
        editor.show();
    }
    
    // 一発フィット関数を呼んでおく
    plugin.fitTyranoBase();
};

// ゲームエリア|エディタエリアをリサイズ可能にする
plugin.resizeable = function () {
    var isResizing = false;
    var startOffset = -1;
    var startOffset2 = -1;
    plugin.$editorArea.each(function () {
        var $this = $(this);
        $this.css("position", "relative");
        var $grip = $("<div class='td_glip'></div>");
        $grip.on("mousedown", function (e) {
            isResizing = true;
            startOffset =  plugin.$editorArea.get(0).offsetWidth + e.pageX;
            startOffset2 = plugin.$tyranoBaseArea.get(0).offsetWidth - e.pageX;
        });
        $this.append($grip);
    });
    $(window).on("mousemove", function (e) {
        if (isResizing) {
            plugin.$editorArea.css("width", startOffset - e.pageX);
            plugin.$tyranoBaseArea.css("width", startOffset2 + e.pageX);
        }
    });
    $(window).on("mouseup", function (e) {
        if (isResizing) {
            isResizing = false;
            $(window).trigger("resize");
        }
    });
};

//# plugin.init
// 初期化
plugin.init = function () {
    plugin.appendViewer(function(){
        plugin.stopBubbling();
        plugin.resizeable();
        $(window).on("load orientationchange resize", plugin.fitTyranoBase);
        $(window).trigger("resize");
        $(window).trigger("resize");
    });
    plugin.loaded = true;
    return plugin;
};

return plugin.init();

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));