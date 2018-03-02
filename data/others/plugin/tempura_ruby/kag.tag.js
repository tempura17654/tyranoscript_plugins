(function ($, TYRANO, mp) {

//# TYRANO.kag.tag.ruby
TYRANO.kag.tag.ruby.pm.str = "";
TYRANO.kag.tag.ruby.start = function(pm) {
    // [edit.start] ================================================
    pm.val = pm.str;
    this.kag.stat.ruby_manual = pm;
    if (pm.val) this.kag.ftag.startTag("text", pm);
    else this.kag.ftag.nextOrder();
    // [edit.end] ==================================================
};

//# TYRANO.kag.tag.text.showMessage
TYRANO.kag.tag.text.showMessage = function(message_str, pm) {

    var that = this;



    // [add.start] ==================================================
    // ルビターゲットの初期化
    this.kag.ruby.initRubyTarget(message_str);
    // [add.end] ====================================================



    // [delete.start] ==================================================
    /*
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
    */
    // [delete.end] ==================================================



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



    // [add.start] ==================================================
    var j_ruby_str;
    var j_ruby_text;
    var log_str = "";
    that.kag.ruby.line_height = parseInt(j_span.css("line-height"));
    that.kag.ruby.ch_speed    = ch_speed;
    // [add.end] ====================================================



        var pchar = function(pchar) {



            // [edit.start] ==================================================
            /*
            var c = _message_str.substring(index, ++index);
            ルビ指定がされている場合
            if (that.kag.stat.ruby_str != "") {
                c = "<ruby><rb>" + c + "</rb><rt>" + that.kag.stat.ruby_str + "</rt></ruby>";
                that.kag.stat.ruby_str = "";
            }
            current_str += c;
            */
            // 表示すべき1文字を取得
            var c = _message_str.substr(index, 1);
            // ルビ変換処理にかける
            var ret = that.kag.ruby.convertRuby(c, index);
            // 1文字返ってきた
            if (ret.c) {
                that.kag.ruby.fadeIn(c, j_span);
            }
            // ログが返ってきた
            if (ret.log) {
                log_str += ret.log;
            }
            // 新規ルビ用HTMLが返ってきた
            if (ret.str) {
                j_span.append(ret.str);
                j_ruby_str = j_span.find(".ruby_str" + that.kag.stat.ruby_no);
                j_ruby_text = j_span.find(".ruby_text" + that.kag.stat.ruby_no);
            }
            // ルビ追加用オブジェクトが返ってきた
            if (ret.ruby) {
                if (ret.ruby.str)  that.kag.ruby.fadeIn(ret.ruby.str, j_ruby_str);
                if (ret.ruby.text) that.kag.ruby.fadeIn(ret.ruby.text, j_ruby_text);
            }
            // index調整
            if (ret.index) {
                index += ret.index;
            }
            // 文章の途中でスキップが開始された
            if (!that.kag.ruby.is_skip_start && that.kag.ruby.isSkip()) {
                that.kag.ruby.is_skip_start = true;
                j_span.find(".fadein_char").finish();
            }
            // index増加
            index++;
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


                // [add.start] ==================================================
                //バックログ用の値を格納
                if (that.kag.stat.ruby_config.enable_backlog) that.kag.ruby.makeLog(log_str, pm);
                else that.kag.ruby.makeLog(message_str, pm);
                // [add.end] ====================================================
                that.kag.stat.is_adding_text = false;
                that.kag.stat.is_click_text = false;


                //すべて表示完了 ここまではイベント残ってたな

                if (that.kag.stat.is_stop != "true") {

                    if(that.kag.stat.is_skip == true || that.kag.stat.is_nowait==true || ch_speed < 3){



                        // [delete.start] ==================================================
                        // スキップ中でも1文字ずつ追加しているのでここは削除していい
                        //that.kag.appendMessage(jtext, current_str);
                        // [delete.end] ====================================================



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

//# TYRANO.kag.tag.text.r
TYRANO.kag.tag.r.start = function() {
    var that = this;
    //クリックするまで、次へすすまないようにする
    var j_inner_message = this.kag.getMessageInnerLayer();



    // [edit.start]==============================================================================
    /*
    var txt = j_inner_message.find("p").find(".current_span").html() + "<br />";
    j_inner_message.find("p").find(".current_span").html(txt);
    */
    that.kag.ftag.hideNextImg();
    j_inner_message.find("p").find(".current_span").append("<br />");
    //that.kag.pushBackLog("<br />", "join");
    // [edit.end]================================================================================



    setTimeout(function(){
        that.kag.ftag.nextOrder();
    },5);
};

// ティラノビルダーV170の場合[p][l]の改造が必要
if (mp.builder) {
    var version = parseInt(mp.builder);
    if (version <= 170) {
        TYRANO.kag.ftag.showNextImg=function(){if(this.kag.stat.flag_glyph=="false"){$(".img_next").remove();var jtext=this.kag.getMessageInnerLayer();jtext.find("p").append("<img class='img_next' src='./tyrano/images/system/nextpage.gif' />")}else{$(".glyph_image").show()}};
        TYRANO.kag.ftag.master_tag.l={kag:TYRANO.kag,cw:true,start:function(){var that=this;this.kag.ftag.showNextImg();if(this.kag.stat.is_skip==true){this.kag.ftag.nextOrder()}else if(this.kag.stat.is_auto==true){this.kag.stat.is_wait_auto=true;var auto_speed=that.kag.config.autoSpeed;if(that.kag.config.autoSpeedWithText!="0"){var cnt_text=this.kag.stat.current_message_str.length;auto_speed=parseInt(auto_speed)+(parseInt(that.kag.config.autoSpeedWithText)*cnt_text)}setTimeout(function(){if(that.kag.stat.is_wait_auto==true){if(that.kag.tmp.is_vo_play==true){that.kag.tmp.is_vo_play_wait=true}else{that.kag.ftag.nextOrder()}}},auto_speed)}}};
        TYRANO.kag.ftag.master_tag.p={kag:TYRANO.kag,cw:true,start:function(){var that=this;this.kag.stat.flag_ref_page=true;this.kag.ftag.showNextImg();if(this.kag.stat.is_skip==true){this.kag.ftag.nextOrder()}else if(this.kag.stat.is_auto==true){this.kag.stat.is_wait_auto=true;var auto_speed=that.kag.config.autoSpeed;if(that.kag.config.autoSpeedWithText!="0"){var cnt_text=this.kag.stat.current_message_str.length;auto_speed=parseInt(auto_speed)+(parseInt(that.kag.config.autoSpeedWithText)*cnt_text)}setTimeout(function(){if(that.kag.stat.is_wait_auto==true){if(that.kag.tmp.is_vo_play==true){that.kag.tmp.is_vo_play_wait=true}else{that.kag.ftag.nextOrder()}}},auto_speed)}}};
    }
}

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));