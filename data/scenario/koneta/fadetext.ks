[iscript]
tyrano.plugin.kag.tag.text.showMessage = function(message_str,pm) {
    var that = this;
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
    //[edit.start]==============================================================================
    //that.kag.ftag.hideNextImg();
    setTimeout(that.kag.ftag.hideNextImg,0);
    var addstack_str = "";
    //[edit.end]================================================================================
    
    
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
        /*
        // バグ is_nowaitが必ずtrueに戻るね。
        if(ch_speed <= 3){
            that.kag.stat.is_nowait = true;
        }else{
            that.kag.stat.is_nowait = false;
        }
        */
        var pchar = function(pchar) {
            var c = _message_str.substring(index, ++index);
            //ルビ指定がされている場合
            if (that.kag.stat.ruby_str != "") {
                c = "<ruby><rb>" + c + "</rb><rt>" + that.kag.stat.ruby_str + "</rt></ruby>";
                that.kag.stat.ruby_str = "";
            }
            current_str += c;
            
            
            //[edit.start]======================================================================
            //スキップ中は１文字ずつ追加ということはしない
            //if(that.kag.stat.is_skip != true && that.kag.stat.is_nowait!=true && ch_speed >3){
            //    that.kag.appendMessage(jtext, current_str);
            //}
            if (that.kag.stat.is_skip != true && that.kag.stat.is_nowait != true && ch_speed > 3) {
                var fade_time = 200;
                var current_span = jtext.find("p").find(".current_span");
                $("<span>"+addstack_str+c+"</span>")
                .css({"opacity":"0"})
                .animate({"opacity":"1"}, fade_time, function(){
                    var self = $(this);
                    self.replaceWith(self.html());
                })
                .appendTo( current_span );
                addstack_str = "";
            }
            else {
                addstack_str += c;
            }
            //[edit.end]========================================================================
            
            
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
tyrano.plugin.kag.tag.r.start = function() {
    var that = this;
    //クリックするまで、次へすすまないようにする
    var j_inner_message = this.kag.getMessageInnerLayer();
    
    
    //[edit.start]==============================================================================
    //var txt = j_inner_message.find("p").find(".current_span").html() + "<br />";
    //j_inner_message.find("p").find(".current_span").html(txt);
    that.kag.ftag.hideNextImg();
    j_inner_message.find("p").find(".current_span").append("<br />");
    //[edit.end]================================================================================
    
    
    setTimeout(function(){
        that.kag.ftag.nextOrder();
    },5);
};
[endscript]
[jump storage=scene1.ks]