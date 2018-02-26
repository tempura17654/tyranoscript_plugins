[iscript]
// 親ウィンドウと子ウィンドウをそれぞれ取得
window.child = window;
window.parent = window.parent;
// 親の関数を一発読んでおく
parent.afterLoadingTyrano();
// ここのスナップを作成
TYRANO.kag.menu.snapSave("", function () {
    parent.startSnap = $.extend(true, {}, TYRANO.kag.menu.snap);
    TYRANO.kag.ftag.nextOrder();
}, "false");
[endscript stop=true]
[iscript]
var TEXT_ID = "first.ks";
var getText = function () {
    var editor = parent.ace.edit("editor");
    return editor.getValue();
};
var loadText = function (text_str) {
    var result_obj = TYRANO.kag.parser.parseScenario(text_str);
    TYRANO.kag.cache_scenraio["./data/scenario/" + TEXT_ID] = result_obj;
    TYRANO.kag.ftag.startTag("jump", {
        storage: TEXT_ID
    });
};
var loadTextOld = $.loadText;
$.loadText = function (filename, callback) {
    if (filename === "./data/scenario/" + TEXT_ID) {
        callback(getText());
    }
    else {
        loadTextOld.apply($, arguments);
    }
};
loadText(getText());
[endscript stop=true]