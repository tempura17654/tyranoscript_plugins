; エンジン改造を呼ぶ
[call target=hack_engine]

; ここはまだ普通
はじまり[p]

; ここから中央寄せ有効
[eval exp="f.enable_centering = true"]

あああああアアアアア[p]
あああああアアアアアかかかかかカカカカカ[p]
あああああアアアアアかかかかかカカカカカさささささサササササたたたたたタタタタタなななななナナナナナ[p]

; スキップ時の負荷をわずかに上げることになるが、右端での折り返し後も自動で中央寄せできる
[eval exp="f.enable_return_and_centering = true"]

あああああアアアアアかかかかかカカカカカさささささサササササたたたたたタタタタタなななななナナナナナ[p]

; 幅を指定してみる
[eval exp="f.span_width = 200"]

あああああアアアアアかかかかかカカカカカさささささサササササたたたたたタタタタタ[p]

; 幅指定を解除する
[eval exp="f.span_width = 0"]

; 途中で改行、ただしブロックはひとつのまま
; (ブロック内改行。[r]で改行する)
あああああアアアアアかかかかかカカカカカさささささサササササ[r]
あああああアアアアア[r]
あああああアアアアアかかかかかカカカカカ[p]

; 途中で改行、ブロック自体を新しくする
; (ブロックごと改行。[r type=block][font]で改行する。マクロ化しておくと楽でよい)
[macro name=rr]
[r type=block][font]
[endmacro]
あああああアアアアアかかかかかカカカカカさささささサササササ[rr]
あああああアアアアア[rr]
あああああアアアアアかかかかかカカカカカ[p]

; ここから中央寄せ無効
[eval exp="f.enable_centering = false"]

; ここは普通
おしまい[s]



; エンジン改造ラベル
*hack_engine
[iscript]

//
// 改行タグ挿入処理変更
//

TYRANO.kag.tag.r.start = function (pm) {
    var that = this;
    var j_inner_message = this.kag.getMessageInnerLayer();
// =============================================================================
//  var txt = j_inner_message.find("p").find(".current_span").html() + "<br />";
//  j_inner_message.find("p").find(".current_span").html(txt);
// 編集ここから

    // 改行タグ<br>を、<span>の子として挿入するか、<span>の兄弟として挿入するか？
    // typeパラメータで選べるようにしてみよう
    // type=block→兄弟要素
    if (pm.type == "block") {
        this.kag.getMessageCurrentSpan().after("<br />");
    }
    // type=blockではない→子要素
    else {
        var txt = j_inner_message.find("p").find(".current_span").html() + "<br />";
        j_inner_message.find("p").find(".current_span").html(txt);
    }

// 編集ここまで
// =============================================================================
    setTimeout(function () {
        that.kag.ftag.nextOrder();
    }, 5);
};

//
// クリック待ち画像表示処理改変
//

TYRANO.kag.ftag.showNextImg = function () {
    if (this.kag.stat.flag_glyph == "false") {
        $(".img_next").remove();
// =============================================================================
// 編集ここから
//      var jtext = this.kag.getMessageInnerLayer()
//      jtext.find("p").append("<img class='img_next' src='./tyrano/images/system/nextpage.gif' />");

        // クリック待ち画像<img>は、<p>の子ではなく<span>の子として挿入してみよう
        this.kag.getMessageCurrentSpan().append("<img class='img_next' src='./tyrano/images/system/nextpage.gif' />");

// 編集ここまで
// =============================================================================
    } else {
        $(".glyph_image").show();
    }
};

//
// 未来の<span>の横幅を取得する関数
//

var getSpanWidth = function (f, j_parag, j_span, text) {
    // f.span_width指定があるならそっちを返して終了
    if (f.span_width) {
        return f.span_width;
    }
    // 指定がないなら
    else {
        var span_width = 0;
        // 子の<span>要素のクローンを生成、ただし不可視
        var j_dummy = j_span.clone().css("visibility", "hidden");
        // すべての文字を表示する
        j_dummy.text(text);
        // <p>要素の中にいったん格納
        j_parag.prepend(j_dummy);
        // 横幅(px)を得る、クリック待ち画像の分も適当に20pxとして足す(要調整)
        span_width = j_dummy.width() + 20;
        // 横幅を得たら用済み、削除
        j_dummy.remove();
        return span_width;
    }
};

//
// メッセージ表示処理改変
//

TYRANO.kag.tag.text.showMessage = function (message_str, pm) {
    var that = this;
    if (that.kag.stat.log_join == "true") {
        pm.backlog = "join";
    }
    var chara_name = $.isNull($(".chara_name_area").html());
    if ((chara_name != "" && pm.backlog != "join") || (chara_name != "" && this.kag.stat.f_chara_ptext == "true")) {
        this.kag.pushBackLog("<b class='backlog_chara_name " + chara_name + "'>" + chara_name + "</b>：<span class='backlog_text " + chara_name + "'>" + message_str + "</span>", "add");
        if (this.kag.stat.f_chara_ptext == "true") {
            this.kag.stat.f_chara_ptext = "false";
            this.kag.stat.log_join = "true";
        }
    } else {
        var log_str = "<span class='backlog_text " + chara_name + "'>" + message_str + "</span>";
        if (pm.backlog == "join") {
            this.kag.pushBackLog(log_str, "join");
        } else {
            this.kag.pushBackLog(log_str, "add");
        }
    }
    that.kag.ftag.hideNextImg();
    (function (jtext) {
        if (jtext.html() == "") {
            jtext.append("<p class=''></p>");
        }
        var _message_str = ""+message_str;
        var current_str = "";
        if (jtext.find("p").find(".current_span").length != 0) {
            current_str = jtext.find("p").find(".current_span").html();
        }
        var index = 0;
        that.kag.checkMessage(jtext);
        var j_span = that.kag.getMessageCurrentSpan();
        j_span.css({
            "color": that.kag.stat.font.color,
            "font-weight": that.kag.stat.font.bold,
            "font-size": that.kag.stat.font.size + "px",
            "font-family": that.kag.stat.font.face,
            "font-style": that.kag.stat.font.italic
        });
// =============================================================================
// 編集ここから
        
        // f.enable_centeringが真なら中央寄せのための処理をしよう
        var f = TYRANO.kag.stat.f;
        if (f.enable_centering) {
            
            // すべての文字を表示しきったときの<span>要素の横幅を調べたい。
            var j_parag = jtext.find("p");
            var span_width = getSpanWidth(f, j_parag, j_span, current_str + message_str);
            //console.log(current_str + message_str + " = " + span_width + "px");
            
            // 親の<p>要素にcssをセット
            j_parag.css({
                //"background": "blue", //デバッグ用、青背景
                "text-align": "center",
            });
            
            // 子の<span>要素にcssをセット
            // widthが未指定のときだけでいい
            if (! j_span.get(0).style.width) {
                j_span.css({
                    //"background": "red", //デバッグ用、赤背景
                    "text-align": "left",
                    "display": "inline-block",
                    "width": span_width + "px",
                });
            }
        }
        
        // 後々使う
        var height = 0;
        var current_str_ = "";
        
// 編集ここまで
// =============================================================================
        if (that.kag.stat.font.edge != "") {
            var edge_color = that.kag.stat.font.edge;
            j_span.css("text-shadow", "1px 1px 0 " + edge_color + ", -1px 1px 0 " + edge_color + ",1px -1px 0 " + edge_color + ",-1px -1px 0 " + edge_color + "");
        } else if (that.kag.stat.font.shadow != "") {
            j_span.css("text-shadow", "2px 2px 2px " + that.kag.stat.font.shadow);
        }
        if (that.kag.config.autoRecordLabel == "true") {
            if (that.kag.stat.already_read == true) {
                if (that.kag.config.alreadyReadTextColor != "default") {
                    j_span.css("color", $.convertColor(that.kag.config.alreadyReadTextColor));
                }
            } else {
                if (that.kag.config.unReadTextSkip == "false") {
                    that.kag.stat.is_skip = false;
                }
            }
        }
        var ch_speed = 30;
        if (that.kag.stat.ch_speed != "") {
            ch_speed = parseInt(that.kag.stat.ch_speed);
        } else if (that.kag.config.chSpeed) {
            ch_speed = parseInt(that.kag.config.chSpeed);
        }
        var pchar = function (pchar) {
            var c = _message_str.substring(index, ++index);
            if (that.kag.stat.ruby_str != "") {
                c = "<ruby><rb>" + c + "</rb><rt>" + that.kag.stat.ruby_str + "</rt></ruby>";
                that.kag.stat.ruby_str = "";
            }
            current_str += c;
// =============================================================================
// 編集ここから
//          if (that.kag.stat.is_skip != true && that.kag.stat.is_nowait != true && ch_speed > 3) {
//              that.kag.appendMessage(jtext, current_str);
//          }

            // 折り返し後の自動センタリング処理をしないなら
            if (! f.enable_return_and_centering) {
                // スキップしてないときだけ1文字ずつappendMessageすればいい(省エネ)
                if (that.kag.stat.is_skip != true && that.kag.stat.is_nowait != true && ch_speed > 3) {
                    that.kag.appendMessage(jtext, current_str);
                }
            }
            // 折り返し後の自動センタリング処理をするなら
            else {
                // スキップ状態に拘わらず1文字ずつappendMessageする(省エネではない)
                that.kag.appendMessage(jtext, current_str);
                // まだheightが取得できていないなら取得する、だけ
                if (! height) {
                    height = j_span.height();
                }
                // heightが取得できているなら…
                else {
                    // appendMessageしてみたらheightが増えた、つまり折り返しが行われたならば
                    if (j_span.height() > height) {
                        // なかったことにしよう
                        that.kag.appendMessage(jtext, current_str_);
                        // クローンを作成してそっちをcurrent_spanにする
                        var j_new_span = j_span.clone().text(c).css("width", "");
                        j_span.removeClass("current_span");
                        j_span.after(j_new_span).after("<br />");
                        // widthの取得とセット
                        span_width = getSpanWidth(f, j_parag, j_new_span, _message_str.substr(index - 1));
                        j_new_span.css("width", span_width + "px");
                        // いろいろ初期化
                        j_span = j_new_span;
                        current_str = c;
                        height = 0;
                    }
                }
            }
            
            // ここでcurrent_str_の内容をcurrent_strに一致させる
            current_str_ = current_str;

// 編集ここまで
// =============================================================================
            if (index <= _message_str.length) {
                that.kag.stat.is_adding_text = true;
                if (that.kag.stat.is_click_text == true || that.kag.stat.is_skip == true || that.kag.stat.is_nowait == true) {
                    pchar(pchar);
                } else {
                    setTimeout(function () {
                        pchar(pchar);
                    }, ch_speed);
                }
            } else {
                that.kag.stat.is_adding_text = false;
                that.kag.stat.is_click_text = false;
                if (that.kag.stat.is_stop != "true") {
                    if (that.kag.stat.is_skip == true || that.kag.stat.is_nowait == true || ch_speed < 3) {
                        that.kag.appendMessage(jtext, current_str);
                        setTimeout(function () {
                            if (!that.kag.stat.is_hide_message) that.kag.ftag.nextOrder();
                        }, parseInt(that.kag.config.skipSpeed));
                    } else {
                        if (!that.kag.stat.is_hide_message) that.kag.ftag.nextOrder();
                    }
                } else {}
            }
        };
        pchar(pchar);
    })(this.kag.getMessageInnerLayer());
};
[endscript]
[return]