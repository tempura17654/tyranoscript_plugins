(function(){ // 即時関数の中で作業したい

// プラグインに渡された変数mpを参照
var mp = TYRANO.kag.stat.mp;
// ルビの割り付け方 "center" または "justify" で指定
TYRANO.kag.stat.ruby_type = mp.type || "center";

var ruby_dic = TYRANO.kag.stat.ruby_dic; // ruby_dic には undefined という値がコピーされるだけで、TYRANO.kag.stat.ruby_dic の参照がコピーされているわけではない
if (typeof ruby_dic === "undefined") {
    ruby_dic = {}; // TYRANO.kag.stat.ruby_dic の参照がコピーされているわけではないので、この時点ではTYRANO.kag.stat.ruby_dic は undefined
    var filePath = "./data/others/plugin/ruby/dic.json";
    $.getJSON(filePath, function(data) {
        for (var key in data) ruby_dic[key] = { ruby : data[key], count : 0 }; // ローカル変数 ruby_dic に値が入っていく
        TYRANO.kag.stat.ruby_dic = ruby_dic; // ここでローカル変数 ruby_dic の参照が TYRANO.kag.stat.ruby_dic にコピーされる
    });
};

var getRubySetting = function(str, text) {

    var str_width = getFontSize(str, TYRANO.kag.stat.font.size);
    var text_width = getFontSize(text, TYRANO.kag.config.defaultRubySize);
    var ruby_offset = (TYRANO.kag.stat.font.size*-1)+(TYRANO.kag.config.defaultRubyOffset*-1);

    var conf = {
        text: text, // textの情報も欲しい
        ruby_size : TYRANO.kag.config.defaultRubySize,
        ruby_offset : ruby_offset,
        font_size : TYRANO.kag.stat.font.size,
        str_width : str_width,
        text_width : text_width,
        startpos : (str_width-text_width)/2
    };

    return conf;
};

var getFontSize = function(str, font_size) {

    var font_face = TYRANO.kag.stat.font.face;
    $("body").append("<span id='font_width' style='visibility:hidden;position:absolute;white-space:nowrap;font-size:"+font_size+"px;font-family:"+font_face+";'></span>");

    var width = $("#font_width").text(str).get(0).offsetWidth;
    $("#font_width").remove();
    return width;

};

// createRubytag 
//   .center  (ruby_no, conf, text, ruby) ... Function 中央寄せ用HTMLコードを返す
//   .justify (ruby_no, conf, text, ruby) ... Function 均等割付用HTMLコードを返す
//   引数(共通)
//   1) ruby_no ... Number ルビ番号
//   2) conf    ... Object 設定オブジェクト
//   3) text    ... String 本文
//   4) ruby    ... String ルビ
//   戻り値 String ルビ用のHTMLコード
var createRubytag = {
    center: function (ruby_no, conf, str, text) {
        // display:inline-blockの指定によって文字途中での折り返しを抑制
        var ruby_tag = "<span class='ruby_str"+ruby_no+"' style='display:inline-block;position:relative; width:"+conf.str_width+"px; font-size:"+conf.font_size+"px;'>" + str;
        ruby_tag += "<span class='ruby_text"+ruby_no+"' style='position:absolute; width:"+conf.text_width+"px; white-space: nowrap; font-size:"+conf.ruby_size+"px; top:"+conf.ruby_offset+"px; left:"+conf.startpos+"px;'>" + text;
        ruby_tag += "</span></span>";
        return ruby_tag;
    },
    justify: function (ruby_no, conf, str, text) {
        // 1) ルビが1文字
        // 2) ルビの幅のほうが本文の幅よりデカい
        // この2ケースは均等割り付け不可なのでthis.centerに全投げする
        if (conf.text.length === 1 || conf.text_width - conf.str_width > 0) {
            return this.center.apply(this, arguments);
        }
        // 均等割り付け可能
        // 均等割り付け用の文字間隔を計算する
        var spacing = parseInt((conf.str_width - conf.text_width) / (conf.text.length - 1));
        var ruby_tag = "<span class='ruby_str"+ruby_no+"' style='display:inline-block;position:relative; width:"+conf.str_width+"px; font-size:"+conf.font_size+"px;'>" + str;
        ruby_tag += "<span class='ruby_text"+ruby_no+"' style='position:absolute;letter-spacing:"+spacing+"px;width:100%; white-space: nowrap; font-size:"+conf.ruby_size+"px; top:"+conf.ruby_offset+"px; left:0;'>" + text;
        ruby_tag += "</span></span>";
        return ruby_tag;
    }
}

TYRANO.kag.stat.ruby_no = -1;
var getRubytag = function(str, text, char) {

    TYRANO.kag.stat.ruby_text = [];

    var conf = getRubySetting(str, text);

    TYRANO.kag.stat.ruby_no++;
    var ruby_no = TYRANO.kag.stat.ruby_no;
    var cnt = Math.ceil(parseInt(text.length)/parseInt(str.length));
    for(var i = 0; i < text.length; i++) {
        var text_tmp = text.substr(i, cnt);
        TYRANO.kag.stat.ruby_text.push(text_tmp);
        i = i + cnt-1;
    }

    // createRubytagに丸投げ
    var ruby_tag = createRubytag[TYRANO.kag.stat.ruby_type](ruby_no, conf, char, TYRANO.kag.stat.ruby_text[0]); 

    return ruby_tag;
};

var getStdRubytag = function(str, text, ruby_no) {

    var conf = getRubySetting(str, text);

    // createRubytagに丸投げ
    var ruby_tag = createRubytag[TYRANO.kag.stat.ruby_type](ruby_no, conf, str, text);

    return ruby_tag;
};

tyrano.plugin.kag.tag.text.showMessage = function(message_str,pm) {

    var that = this;

    // [add.start] ==================================================

    var ruby_dic = TYRANO.kag.stat.ruby_dic;
    var ruby_target = [];
    for (var key in ruby_dic) {
        var match = new RegExp(key + '(.*?)', 'g');
        var pos;
        while (pos = match.exec(message_str)) {
            ruby_target.push([pos.index, key, ruby_dic[key].ruby]);
        }
    }
    ruby_target = ruby_target.sort(function(a,b) { return(a[0] - b[0]); });

    // [add.end] ====================================================

    //特定のタグが直前にあった場合、ログの作り方に気をつける
    if(that.kag.stat.log_join=="true"){
        pm.backlog="join";
    }

    //バックログ用の値を格納
    var chara_name = $.isNull($(".chara_name_area").html());
    if((chara_name != "" && pm.backlog!="join") || (chara_name!="" && this.kag.stat.f_chara_ptext=="true")){

        this.kag.pushBackLog("<b class='backlog_chara_name "+chara_name+"'>"+chara_name+"</b>：<span class='backlog_text "+chara_name+"'>"+message_str+"</span>","add");

        if(this.kag.stat.f_chara_ptext=="true"){
            this.kag.stat.f_chara_ptext="false";
            this.kag.stat.log_join = "true";
        }

    }else{

        var log_str = "<span class='backlog_text "+chara_name+"'>"+ message_str +"</span>";

        if(pm.backlog=="join"){
            this.kag.pushBackLog(log_str,"join");
        }else{
            this.kag.pushBackLog(log_str,"add");

        }
    }

    //テキスト表示時に、まず、画面上の次へボタンアイコンを抹消
    that.kag.ftag.hideNextImg();

    (function(jtext) {

        if (jtext.html() == "") {

            //タグ作成
            jtext.append("<p class=''></p>");

        }

        var _message_str = message_str;

        var current_str = "";

        if (jtext.find("p").find(".current_span").length != 0) {

            current_str = jtext.find("p").find(".current_span").html();

        }

        var index = 0;
        //jtext.html("");

        that.kag.checkMessage(jtext);

        //メッセージ領域を取得
        var j_span = that.kag.getMessageCurrentSpan();


        j_span.css({
                    "color":that.kag.stat.font.color,
                    "font-weight": that.kag.stat.font.bold,
                    "font-size": that.kag.stat.font.size + "px",
                    "font-family": that.kag.stat.font.face,
                    "font-style":that.kag.stat.font.italic
                    });



        if(that.kag.stat.font.edge !=""){

            var edge_color = that.kag.stat.font.edge;
            j_span.css("text-shadow","1px 1px 0 "+edge_color+", -1px 1px 0 "+edge_color+",1px -1px 0 "+edge_color+",-1px -1px 0 "+edge_color+"");

        }else if(that.kag.stat.font.shadow != ""){
            //j_span.css()
            j_span.css("text-shadow","2px 2px 2px "+that.kag.stat.font.shadow);
        }



        //既読管理中の場合、現在の場所が既読済みなら、色を変える
        if(that.kag.config.autoRecordLabel == "true"){

            if(that.kag.stat.already_read == true){
                //テキストの色調整
                if(that.kag.config.alreadyReadTextColor !="default"){
                    j_span.css("color",$.convertColor(that.kag.config.alreadyReadTextColor));
                }

            }else{
                //未読スキップがfalseの場合は、スキップ停止
                if(that.kag.config.unReadTextSkip == "false"){
                    that.kag.stat.is_skip = false;
                }
            }

        }


        var ch_speed = 30;

        if(that.kag.stat.ch_speed != ""){
            ch_speed = parseInt(that.kag.stat.ch_speed);
        }else if(that.kag.config.chSpeed){
            ch_speed = parseInt(that.kag.config.chSpeed);
        }

        /*　// バグ is_nowaitが必ずtrueに戻るね。
        if(ch_speed <= 3){
            that.kag.stat.is_nowait = true;
        }else{
            that.kag.stat.is_nowait = false;
        }
        */

        var target_key_length = 0;
        var ruby_text_cnt = 0;

        var pchar = function(pchar) {

            // [edit.start] ==================================================

            var c = _message_str.substring(index, ++index);

            //ルビ指定がされている場合
            if (that.kag.stat.ruby_str != "") {
                TYRANO.kag.stat.ruby_no++;
                c = getStdRubytag(c, that.kag.stat.ruby_str, TYRANO.kag.stat.ruby_no);
                that.kag.stat.ruby_str = "";
                current_str += c;
            } else {
                if (ruby_target.length != 0) {
                    var pos = ruby_target[0][0];
                    var key = ruby_target[0][1];
                    var value = ruby_target[0][2];
                    if (pos == index-1) {
                        switch (TYRANO.kag.stat.show) {
                            case "each":
                                target_key_length = key.length-1;
                                current_str += getRubytag(key, value, c);
                                if (key.length == 1) ruby_target.shift();
                                break;
                            case "once":
                                if (TYRANO.kag.stat.ruby_dic[key].count == 0) {
                                    target_key_length = key.length-1;
                                    current_str += getRubytag(key, value, c);
                                    if (key.length == 1) ruby_target.shift();
                                } else current_str += c;
                                break;
                            default:
                                target_key_length = key.length-1;
                                current_str += getRubytag(key, value, c);
                                if (key.length == 1) ruby_target.shift();
                                break;
                        }
                        TYRANO.kag.stat.ruby_dic[key].count = TYRANO.kag.stat.ruby_dic[key].count + 1;

                    } else if (target_key_length > ruby_text_cnt) {
                        ruby_text_cnt++;
                        var class_name = ".ruby_text" + TYRANO.kag.stat.ruby_no;
                        jtext.find("p").find(".current_span").find(class_name).before(c);
                        jtext.find("p").find(".current_span").find(class_name).append(TYRANO.kag.stat.ruby_text[ruby_text_cnt]);
                        current_str = jtext.find("p").find(".current_span").html();
                        if (target_key_length == ruby_text_cnt) {
                            ruby_target.shift();
                            target_key_length = 0;
                            ruby_text_cnt = 0;
                        }
                    } else current_str += c;
                } else current_str += c;
            }

            //current_str += c;

            //スキップ中は１文字ずつ追加ということはしない
            //if(that.kag.stat.is_skip != true && that.kag.stat.is_nowait!=true && ch_speed >3){
            //    that.kag.appendMessage(jtext, current_str);
            //}
            
            //スキップ中も1文字ずつ追加しておかないと、jtext.find("p")...が働かない
            that.kag.appendMessage(jtext, current_str);
            
            // [edit.end] ====================================================
            
            if (index <= _message_str.length) {

                that.kag.stat.is_adding_text = true;

                //再生途中にクリックされて、残りを一瞬で表示する
                if (that.kag.stat.is_click_text == true || that.kag.stat.is_skip == true || that.kag.stat.is_nowait == true) {
                    //setTimeout(function() {
                        pchar(pchar);
                    //}, 0);
                } else {
                    setTimeout(function() {
                        pchar(pchar);
                    }, ch_speed);
                }

            } else {

                that.kag.stat.is_adding_text = false;
                that.kag.stat.is_click_text = false;


                //すべて表示完了 ここまではイベント残ってたな

                if (that.kag.stat.is_stop != "true") {

                    if(that.kag.stat.is_skip == true || that.kag.stat.is_nowait==true || ch_speed < 3){

                        that.kag.appendMessage(jtext, current_str);
                        setTimeout(function(){
                            if (!that.kag.stat.is_hide_message) that.kag.ftag.nextOrder();
                         }, parseInt(that.kag.config.skipSpeed));

                    }else{
                        if (!that.kag.stat.is_hide_message) that.kag.ftag.nextOrder();
                    }

                } else {

                }

                //メッセージ用

                //that.kag.appendMessage(jtext,current_str+"<img class='img_next' src='./tyrano/images/kag/nextpage.gif' />");

            }

        };

        pchar(pchar);

    })(this.kag.getMessageInnerLayer());

};

}()); // 即時関数ここまで