(function($, TYRANO, sf, tf){

//# TYRANO.kag.tag.skipstart
TYRANO.kag.tag.skipstart.start = function (pm) {
    /*[削除]====================================================================
    //文字追加中は、スキップしない。
    if (this.kag.stat.is_skip == true || this.kag.stat.is_adding_text) {
        return false;
    }
    ==========================================================================*/
    this.kag.readyAudio();
    this.kag.stat.is_skip = true;
    this.kag.ftag.nextOrder();
};

//# TYRANO.kag.tag.ruby
TYRANO.kag.tag.ruby.pm.str = "";
TYRANO.kag.tag.ruby.start = function(pm) {
    pm.val = pm.str;
    this.kag.stat.ruby_manual = pm;
    if (pm.val) this.kag.ftag.startTag("text", pm);
    else this.kag.ftag.nextOrder();
};

//# kag.ftag.showNextImg
TYRANO.kag.ftag.showNextImg = function(){
    if (this.kag.stat.flag_glyph == "false") {
        $(".img_next").remove();
        var jtext = this.kag.getMessageInnerLayer()
        jtext.find("p").append("<img class='img_next' src='" + $.tData("theme_dir") + "/img/nextpage.gif' />");
    } else {
        $(".glyph_image").show();
    }
};

//# kag.tag.text.start
// キャラクターネームエリアが空でない（→セリフである→カギカッコつきである）ならば
// 2行目以降の字下げを行う
$.tAppendFunction(TYRANO.kag.ftag.master_tag.text, "start", function () {
    if ($(".chara_name_area").html() !== "") {
        var indent = parseInt(this.kag.stat.font.size);
        $(".current_span").parent().css({
            "text-indent" : (- indent) + "px",
            "padding-left": (  indent) + "px"
        });
    }
});

//# kag.tag.text.makeBacklog
TYRANO.kag.ftag.master_tag.text.makeBacklog = {
    kag: TYRANO.kag,
    add: function (chara_name, message_str) {
    	  var log_str;
    	  if (chara_name) log_str = '<td class="left">' + chara_name + '</td><td class="serif right">' + message_str;
    	  else log_str = '<td class="left"></td><td class="right">' + message_str;
    		this.kag.pushBackLog(log_str, "add");
    },
    join: function (chara_name, message_str) {
    		this.kag.pushBackLog(message_str, "join");
    },
    start: function (message_str, pm) {
        var is_first_char = this.kag.getMessageInnerLayer().find(".current_span").size() === 0;
        var chara_name    = $.isNull($(".chara_name_area").html());
    		if (chara_name !== "")
      			if (this.kag.stat.log_join == "true" && !is_first_char)
      			    this.join(chara_name, message_str);
      			else
      			    this.add(chara_name, message_str);
    		else if (pm.backlog == "join" && !is_first_char)
      			this.join(chara_name, message_str);
        else
      			this.add(chara_name, message_str);
    }
};

//# kag.tag.text.showMessage
TYRANO.kag.ftag.master_tag.text.showMessage = function (message_str, pm) {
    var that = this;
    //特定のタグが直前にあった場合、ログの作り方に気をつける
    if(that.kag.stat.log_join=="true"){
        pm.backlog="join";
    }
    /*[削除]====================================================================
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
    [代替]--------------------------------------------------------------------*/
    this.kag.ruby.initRubyTarget(message_str);
    /*========================================================================*/
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
        /*[追加]==============================================================*/
        var j_ruby_str;
        var j_ruby_text;
        var log_str = "";
        that.kag.ruby.line_height = parseInt(j_span.css("line-height"));
        that.kag.ruby.ch_speed    = ch_speed;
        /*====================================================================*/
        var pchar = function(pchar) {
            /*[削除]============================================================
            var c = _message_str.substring(index, ++index);
            //ルビ指定がされている場合
            if (that.kag.stat.ruby_str != "") {
                c = "<ruby><rb>" + c + "</rb><rt>" + that.kag.stat.ruby_str + "</rt></ruby>";
                that.kag.stat.ruby_str = "";
            }
            current_str += c;
            //スキップ中は１文字ずつ追加ということはしない
            if(that.kag.stat.is_skip != true && that.kag.stat.is_nowait!=true && ch_speed >3){
                that.kag.appendMessage(jtext, current_str);
            }
            [代替]------------------------------------------------------------*/
            var c = _message_str.substr(index, 1);
            // ルビ変換処理にかける
            var ret = that.kag.ruby.convertRuby(c, index);
            // 1文字返ってきた
            if (ret.c) {
                that.kag.ruby.fadeIn(c, j_span);
            }
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
            /*================================================================*/
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
                /*[追加]======================================================*/
                if (that.kag.stat.ruby_config.enable_backlog) that.makeBacklog.start(log_str, pm);
                else that.makeBacklog.start(message_str, pm);
                /*============================================================*/
                that.kag.stat.is_adding_text = false;
                that.kag.stat.is_click_text = false;
                //すべて表示完了 ここまではイベント残ってたな
                if (that.kag.stat.is_stop != "true") {
                    if(that.kag.stat.is_skip == true || that.kag.stat.is_nowait==true || ch_speed < 3){
                        //that.kag.appendMessage(jtext, current_str);
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

//# kag.menu.displayLog
// バックログ画面表示
TYRANO.kag.menu.displayLog = function() {
    var that = this;
    this.kag.stat.is_skip = false;
    this.kag.html("backlog", {
        "novel" : $.novel
    }, function(html_str) {
        var j_menu = $(html_str);
        var layer_menu = that.kag.layer.getMenuLayer();
        layer_menu.empty();
        layer_menu.append(j_menu);
        layer_menu.find(".menu_close").click(function() {
            layer_menu.fadeOut(300,function(){
                layer_menu.empty();
                });
            if (that.kag.stat.visible_menu_button === true) {
                $(".button_menu").show();
            }
        });
        /*[削除]================================================================
        //スマホの場合はボタンの上下でスクロールできるようにする
        layer_menu.find(".button_smart").hide();
        if($.userenv()!="pc"){
            layer_menu.find(".button_smart").show();
            layer_menu.find(".button_arrow_up").click(function(){
                var now = layer_menu.find(".log_body").scrollTop();
                var pos = now - 60;
                layer_menu.find(".log_body").animate({scrollTop:pos},{queue:false});
            });
            layer_menu.find(".button_arrow_down").click(function(){
                var now = layer_menu.find(".log_body").scrollTop();
                var pos = now + 60;
                layer_menu.find(".log_body").animate({scrollTop:pos},{queue:false});
            });
        }
        var log_str = "";
        var array_log = that.kag.variable.tf.system.backlog;
        for (var i = 0; i < array_log.length; i++) {
            log_str += array_log[i] + "<br />";
        }
        [代替]----------------------------------------------------------------*/
        var MAX = 1<<30;
        var scroll = function (y) {
            var now = layer_menu.find(".log_body").scrollTop();
            var pos = now + y;
            layer_menu.find(".log_body").animate({scrollTop:pos}, 0, {queue:false});
        };
        layer_menu.find(".menu_up").click(function(){
            scroll(-94);
        });
        layer_menu.find(".menu_down").click(function(){
            scroll(+94);
        });
        layer_menu.find(".menu_upmax").click(function(){
            scroll(-MAX);
        });
        layer_menu.find(".menu_downmax").click(function(){
            scroll(+MAX);
        });
    		var log_str = "<table>";
    		var array_log = that.kag.variable.tf.system.backlog;
    		for (var i = 0; i < array_log.length; i++) {
    		    log_str += "<tr>" + array_log[i] + "</td></tr>";
    		}
    		log_str += "</table>";
        /*====================================================================*/
        layer_menu.find(".log_body").html(log_str);
        layer_menu.find(".log_body").css("font-family", that.kag.config.userFace);
        $.preloadImgCallback(layer_menu,function(){
            layer_menu.fadeIn(300);
            //一番下固定させる
            layer_menu.find(".log_body").scrollTop(9999999999);
            //[追加]============================================================
            j_menu.setTyranoFont();
            //==================================================================
        },that);
        $(".button_menu").hide();
    });
};

//# TYRANO.kag.tag.text.r
TYRANO.kag.tag.r.start = function() {
    var that = this;
    //クリックするまで、次へすすまないようにする
    var j_inner_message = this.kag.getMessageInnerLayer();
    /*[削除]====================================================================
    var txt = j_inner_message.find("p").find(".current_span").html() + "<br />";
    j_inner_message.find("p").find(".current_span").html(txt);
    [代替]--------------------------------------------------------------------*/
    that.kag.ftag.hideNextImg();
    j_inner_message.find("p").find(".current_span").append("<br />");
    /*========================================================================*/
    setTimeout(function(){
        that.kag.ftag.nextOrder();
    },5);
};



var newtag = {};

newtag.rubydic = {
    vital: ["str", "text"],
    pm: {
        str: "",
        text: ""
    },
    start: function (pm) {
        this.kag.stat.ruby_dic[pm.str] = {
            ruby: pm.text,
            count: 0
        }
        this.kag.ftag.nextOrder();
    }
}

newtag.rubyconfig = {
    start: function (pm) {
        var val;
        this.kag.ruby.updateConfig(pm);
        this.kag.ftag.nextOrder();
    }
}

for (var key in newtag) {
    newtag[key].kag = TYRANO.kag;
    TYRANO.kag.ftag.master_tag[key] = newtag[key];
}

}(window.$, window.TYRANO, window.TYRANO.kag.variable.sf, window.TYRANO.kag.variable.tf));