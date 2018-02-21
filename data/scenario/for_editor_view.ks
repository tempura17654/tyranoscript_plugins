[iscript]
var child = window;
var parent = window.parent;
parent.afterLoadingTyrano();
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
loadText(getText());
[endscript stop=true]