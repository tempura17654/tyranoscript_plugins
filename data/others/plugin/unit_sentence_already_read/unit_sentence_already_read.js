(function () {
var TYRANO = window.TYRANO;
var tyrano = window.tyrano;
var config = tyrano.plugin.kag.config;
var sf     = tyrano.plugin.kag.variable.sf;
//このプラグインを読み込む以前のセーブデータが残っていればアップデート処理
if (! sf.unit_sentence_already_read && config.autoRecordLabel === "true") {
    sf.record = sf.record || {};
    for (var key in sf.record) {
        if (sf.record[key]) {
            sf.record[key] = 1 << 20;
        }
    }
}
sf.unit_sentence_already_read = true;

var saveTimer;
var checkAlreadyRead = function () {
    //既読処理しない設定なら無視
    if (TYRANO.kag.config.autoRecordLabel === "false") return;
    //current_text_index更新
    updateCurrentTextIndex();
    //keyを取得
    var key = getCurrentLabelKey();
    //sf.record[key]の参照と初期化
    var sf = TYRANO.kag.variable.sf;
    sf.record      = sf.record      || {};
    sf.record[key] = sf.record[key] || 0;
    //sf.record[key]とcurrent_order_indexを比較
    //小さければ未読。更新が必要
    //console.log("既読判定:");
    //console.log([key, sf.record[key], TYRANO.kag.stat.current_text_index]);
    if (sf.record[key] < TYRANO.kag.stat.current_text_index) {
        sf.record[key] = TYRANO.kag.stat.current_text_index;
        clearTimeout(saveTimer);
        saveTimer = setTimeout(function () {
            //console.log("システム変数を保存しました。");
            TYRANO.kag.saveSystemVariable();
        }, 300);
        TYRANO.kag.stat.already_read = false;
    }
    //大きければ既読。更新は不要
    else {
        TYRANO.kag.stat.already_read = true;
    }
};

var getCurrentLabelKey = function () {
    //stat.current_label_keyが定義済ならばそれを返せばいい
    //stat.current_label_keyはラベル通過時に更新される
    if (TYRANO.kag.stat.current_label_key) return TYRANO.kag.stat.current_label_key;
    //stat.current_label_keyが定義されていない場合は手動で推定する
    //ex.プラグイン導入前のセーブデータをロードした場合など
    updateCurrentLabelKey();
    return TYRANO.kag.stat.current_label_key;
};

var createCurrentLabelKey = function (scenario, label) {
    scenario = scenario || TYRANO.kag.stat.current_scenario;
    label    = label    || "";
    scenario = scenario.replace(".ks","").replace(/\u002f/g, "").replace(/:/g,"").replace(/\./g,"");
    return "trail_" + scenario + "_" + label;
};

window.createCurrentLabelKey = createCurrentLabelKey;

var updateCurrentLabelKey = function () {
    var scenario = TYRANO.kag.stat.current_scenario;
    var label = getCurrentLabel();
    var key = createCurrentLabelKey(scenario, label);
    TYRANO.kag.stat.current_label_key = key;
};
var updateCurrentTextIndex = function () {
    //stat.current_text_indexが定義済ならそれを足すだけで良い
    //stat.current_text_indexはラベル通過時に0が代入される
    if (TYRANO.kag.stat.current_text_index) {
        TYRANO.kag.stat.current_text_index++;
        return;
    }
    //stat.current_text_indexが定義されていない場合は手動で推定する
    //ex.プラグイン導入前のセーブデータをロードした場合など
    var i, name, count = 0, arr_tag = TYRANO.kag.ftag.array_tag;
    for (i = TYRANO.kag.ftag.current_order_index; i >= 0; i--) {
        name = arr_tag[i].name;
        if (name === "label") {
            break;
        }
        else if (name === "text") {
            count++;
        }
    }
    TYRANO.kag.stat.current_text_index = count + 1;
};
var getCurrentLabel = function () {
    //stat.current_labelが定義済ならばそれを返せばいい
    //stat.current_labelはラベル通過時に更新される
    if (TYRANO.kag.stat.current_label) return TYRANO.kag.stat.current_label;
    //stat.current_labelが定義されていない場合は手動で推定する
    //ex.プラグイン導入前のセーブデータをロードした場合など
    var ret = "", i, key, label, arr_label = [];
    //ラベルマップを新規ラベル配列に放り込む
    for (key in TYRANO.kag.stat.map_label) {
        label = TYRANO.kag.stat.map_label[key];
        arr_label.push({
            label_name: label.label_name,
            index: label.index
        });
    }
    //ラベル配列になんか入ったら
    if (arr_label.length > 0) {
        //index降順にソート
        arr_label.sort(function (a, b) {
            return b.index - a.index;
        });
        //ラベル配列をindexの大きいほうから見ていって
        for (i = 0; i < arr_label.length; i++) {
            //いまのcurrent_order_indexがラベルのindexを超えていた時点でラベル確定とする
            if (TYRANO.kag.ftag.current_order_index > arr_label[i].index) {
                ret = arr_label[i].label_name;
                break;
            }
        }
    }
    return ret;
};
//tag.label.start改造
tyrano.plugin.kag.tag.label.start = function (pm) {
    //全面的に改造==============================================================
    //console.log("既読処理: " + TYRANO.kag.stat.current_scenario + " *" + pm.label_name  || "");
    this.kag.stat.current_label = pm.label_name || "";
    this.kag.stat.current_text_index = 0;
    updateCurrentLabelKey();
    if (pm.nextorder === "true") {
        this.kag.ftag.nextOrder();
    }
    //==========================================================================
};
//tag.text.start改造
tyrano.plugin.kag.tag.text.start = function (pm) {
    //スクリプト解析状態の場合は、その扱いをする
    if (this.kag.stat.is_script == true) {
        this.kag.stat.buff_script += pm.val + "\n";
        this.kag.ftag.nextOrder();
        return;
    }
    //HTML解析状態の場合
    if (this.kag.stat.is_html == true) {
        this.kag.stat.map_html.buff_html += pm.val;
        this.kag.ftag.nextOrder();
        return;
    }
    //この行を追加==============================================================
    checkAlreadyRead();
    //==========================================================================
    var j_inner_message = this.kag.getMessageInnerLayer();
    //文字ステータスの設定        
    j_inner_message.css({
        "letter-spacing":this.kag.config.defaultPitch + "px",
        "line-height":parseInt(this.kag.config.defaultFontSize) + parseInt(this.kag.config.defaultLineSpacing) + "px",
        "font-family":this.kag.config.userFace
   });
    //現在表示中のテキストを格納
    this.kag.stat.current_message_str = pm.val;
    //縦書き指定の場合
    if (this.kag.stat.vertical == "true") {
        //自動改ページ無効の場合
        if (this.kag.config.defaultAutoReturn != "false") {
            //テキストエリアの横幅が、一定以上いっていたばあい、テキストをクリアします
            var j_outer_message = this.kag.getMessageOuterLayer();
            var limit_width = parseInt(j_outer_message.css("width")) * 0.8;
            var current_width = parseInt(j_inner_message.find("p").css("width"));
            if (current_width > limit_width) {
                this.kag.getMessageInnerLayer().html("");
            }
        }
        this.showMessageVertical(pm.val,pm);
    } else {
        if (this.kag.config.defaultAutoReturn != "false") {
            //テキストエリアの高さが、一定以上いっていたばあい、テキストをクリアします
            var j_outer_message = this.kag.getMessageOuterLayer();
            var limit_height = parseInt(j_outer_message.css("height")) * 0.8;
            var current_height = parseInt(j_inner_message.find("p").css("height"));
            if (current_height > limit_height) {
                //画面クリア
                this.kag.getMessageInnerLayer().html("");
            }
        }
        this.showMessage(pm.val,pm);
    }
    //this.kag.ftag.nextOrder();
};

//ftag.nextOrderWithLabel改造
tyrano.plugin.kag.ftag.nextOrderWithLabel = function(label_name, scenario_file) {
    this.kag.stat.is_strong_stop = false;
    
    
    
    //Jump ラベル記録が必要な場合に記録しておく
    if(label_name){
        if(label_name.indexOf("*")!=-1){
            label_name = label_name.substr(1,label_name.length);
        }
        //この行を削除==========================================================
        //this.kag.ftag.startTag("label",{"label_name":label_name,"nextorder":"false"});
        //======================================================================
    }
    //この行を追加(ようするに移動した)==========================================
    this.kag.ftag.startTag("label",{"label_name":label_name,"nextorder":"false"});
    //==========================================================================
    
    
    
    //セーブスナップが指定された場合
    if (label_name == "*savesnap") {
        var tmpsnap = this.kag.menu.snap;
        var co = tmpsnap.current_order_index;
        var cs = tmpsnap.stat.current_scenario;
        this.nextOrderWithIndex(co, cs, undefined, undefined, "snap");
        //snap は noかつ、スナップで上書きする
        return;
    }
    var that = this;
    var original_scenario = scenario_file;
    label_name = label_name || "";
    scenario_file = scenario_file || this.kag.stat.current_scenario;
    label_name = label_name.replace("*", "");
    //シナリオファイルが変わる場合は、全く違う動きをする
    if (scenario_file != this.kag.stat.current_scenario && original_scenario != null) {
        this.kag.layer.hideEventLayer();
        this.kag.loadScenario(scenario_file, function(array_tag) {
            that.kag.layer.showEventLayer();
            that.kag.ftag.buildTag(array_tag, label_name);
        });
    }else{
        //ラベル名が指定されてない場合は最初から
        if (label_name == "") {
            this.current_order_index = -1;
            this.nextOrder();
        } else if (this.kag.stat.map_label[label_name]) {
            var label_obj = this.kag.stat.map_label[label_name];
            this.current_order_index = label_obj.index;
            this.nextOrder();
        } else {
            $.error_message($.lang("label")+"：'" + label_name + "'"+$.lang("not_exists"));
            this.nextOrder();
        }
    }
};

//システム変数を保存
TYRANO.kag.saveSystemVariable();

}());