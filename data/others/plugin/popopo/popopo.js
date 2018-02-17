(function ($, TYRANO) {

var AudioContext = window.AudioContext || window.webkitAudioContext;

TYRANO.kag.tmp.pppContext = new AudioContext();
TYRANO.kag.tmp.pppTimer = -1;
TYRANO.kag.tmp.pppGainNode = TYRANO.kag.tmp.pppContext.createGain();
TYRANO.kag.tmp.pppGainNode.gain.value = 0.1;
TYRANO.kag.tmp.pppGainNode.connect(TYRANO.kag.tmp.pppContext.destination);

var newtag = {};
/*
TYRANO.kag.ftag.startTag("startppp", {volume: "0", stop: "false"});
TYRANO.kag.ftag.startTag("playppp", {duration: "20"});
*/
newtag.startppp = {
    pm: {
        volume: "100",
        frequency: "440",
        detune: "0",
        type: "sine",
        duration: "1000",
        stop: "true"
    },
    start: function (pm) {
        TYRANO.kag.tmp.oscillatorNode = TYRANO.kag.tmp.pppContext.createOscillator();
        TYRANO.kag.tmp.oscillatorNode.connect(TYRANO.kag.tmp.pppGainNode);
        
        TYRANO.kag.tmp.pppGainNode.gain.value = parseFloat(pm.volume) / 100;
        TYRANO.kag.tmp.oscillatorNode.frequency.value        = parseFloat(pm.frequency);
        TYRANO.kag.tmp.oscillatorNode.detune.value           = parseFloat(pm.detune);
        TYRANO.kag.tmp.oscillatorNode.type                   = pm.type; // sine/square/sawtooth/triangle
        
        var t = TYRANO.kag.tmp.pppContext.currentTime;
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(1, t + 0.0);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(0, t + 0.1);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(1, t + 0.1 + 0.05);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(0, t + 0.2);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(1, t + 0.2 + 0.05);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(0, t + 0.3);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(1, t + 0.3 + 0.05);
        TYRANO.kag.tmp.pppGainNode.gain.setValueAtTime(0, t + 0.4);
        
        // start
        TYRANO.kag.tmp.oscillatorNode.start();
        
        if (pm.stop === "true") {
            // stop
            clearTimeout(TYRANO.kag.tmp.pppTimer);
            TYRANO.kag.tmp.pppTimer = setTimeout(function () {
                TYRANO.kag.tmp.oscillatorNode.stop();
            }, parseInt(pm.duration));
        }
        
    }
};

newtag.playppp = {
    pm: {
        volume: "10",
        duration: "100"
    },
    start: function (pm) {
        TYRANO.kag.tmp.pppGainNode.gain.value = parseFloat(pm.volume) / 100;
        TYRANO.kag.tmp.pppTimer = setTimeout(function () {
            TYRANO.kag.tmp.pppGainNode.gain.value = 0;
        }, parseInt(pm.duration));
    }
};

var playppp = function (pm) {
    TYRANO.kag.tmp.pppGainNode.gain.value = parseFloat(pm.volume) / 100;
    clearTimeout(TYRANO.kag.tmp.pppTimer);
    TYRANO.kag.tmp.pppTimer = setTimeout(function () {
        TYRANO.kag.tmp.pppGainNode.gain.value = 0;
    }, parseInt(pm.duration));
};

newtag.stopppp = {
    pm: {
    },
    start: function (pm) {
        TYRANO.kag.tmp.oscillatorNode.stop();
    }
};

for (var key in newtag) {
    newtag[key].kag = TYRANO.kag;
    TYRANO.kag.ftag.master_tag[key] = TYRANO.kag.tag[key] = newtag[key];
}

//TYRANO.kag.ftag.startTag("startppp", {volume: "0", stop: "false"});
        TYRANO.kag.ftag.startTag("startppp");
/*
setTimeout(function () {
    setInterval( function () {
        TYRANO.kag.ftag.startTag("startppp");
    }, 100);
}, 1000);
*/
TYRANO.kag.tag.text.showMessage = function (message_str, pm) {
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
        var pchar = function(pchar) {
            playppp({volume: 10, duration: 10});
            TYRANO.kag.ftag.startTag("playppp", {duration: "20"});
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
            TYRANO.kag.ftag.startTag("stopppp", {duration: "30"});
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
}(window.jQuery, window.TYRANO));