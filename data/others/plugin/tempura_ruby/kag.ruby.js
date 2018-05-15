(function ($, TYRANO, mp) {

//# TYRANO.kag.stat
// プロパティの一部を上書き
$.extend(TYRANO.kag.stat, {
    ruby_text  : [],                  // 現在のルビ配列
    ruby_no    : -1,                  // 現在のルビインデックス
    ruby_dic   : {},                  // ルビ辞書
    ruby_manual: null,                // ルビマニュアル
    ruby_config: {
        show            : "each",
        type            : "justify",
        ruby_size       : "auto",
        ruby_offset     : "auto",
        justify_margin  : "auto",
        enable_transform: false,
        enable_backlog  : true,
        enable_margin   : true,
        enable_onetoone : true,
        time            : 200,
    }
});

//# TYRANO.kag.stat.ruby_dic
// ルビ辞書オブジェクト
if (mp.dic !== "none") {
    $.getJSON(mp.dic || "./data/others/plugin/tempura_ruby/dic.json", function (data) {
        for (var key in data) {
            TYRANO.kag.stat.ruby_dic[key] = {
                ruby: data[key],
                count: 0
            };
        }
    });
}

//# TYRANO.kag.ruby
TYRANO.kag.ruby = {
    kag: TYRANO.kag,
    line_height: 0,
    ruby_target: [],
    ruby_text_cnt: -1,
    ch_speed: -1,
    is_skip_start: false,    
    rate: {
        ruby_size     : 0.44,
        ruby_offset   : 0.25,
        justify_margin: 0.13,
    },
};

// dummyText
//  文字列の幅を調べるために用いるHTML要素
var dummyText = $("<span></span>").css({
    "visibility" : "hidden",
    "position"   : "absolute",
    "white-space": "nowrap",
    "font-size"  : "initial",
    "font-family": "initial",
}).appendTo("body").get(0);

//# TYRANO.kag.ruby.updateConfig
TYRANO.kag.ruby.updateConfig = function (pm) {
    var val;
    pm = pm || {};
    for (var key in pm) {
        if (pm[key]) {
            switch (key) {
            default:
                val = pm[key];
                break;
            case "enable_margin":
            case "enable_backlog":
            case "enable_transform":
            case "enable_onetoone":
                val = pm[key] === "true";
                break;
            case "time":
                val = parseInt(pm[key]);
                break;
            }
            this.kag.stat.ruby_config[key] = val;
        }
    }
};

// 1発実行しておく
TYRANO.kag.ruby.updateConfig(mp);

//# TYRANO.kag.ruby.isSkip
TYRANO.kag.ruby.isSkip = function () {
    return this.kag.stat.is_click_text == true || this.kag.stat.is_skip == true || this.kag.stat.is_nowait == true || this.ch_speed < 3;
};

//# TYRANO.kag.ruby.fadeIn
TYRANO.kag.ruby.fadeIn = function (str, j_target) {
    if (!this.kag.stat.ruby_config.time || this.isSkip()) {
        j_target.append(str);
    }
    else {
        $("<span class=\"fadein_char\">" + str + "</span>").fadeIn(this.kag.stat.ruby_config.time, function(){
            var self = $(this);
            self.replaceWith(self.html());
        }).appendTo(j_target);
    }
};

//# TYRANO.kag.ruby.getRubySetting
//  ルビの各種設定を取得する
TYRANO.kag.ruby.getRubySetting = function(str, text, str_face) {
    var str_size    = this.kag.stat.font.size;
    var ruby_size   = this.kag.stat.ruby_config.ruby_size;
    var ruby_offset = this.kag.stat.ruby_config.ruby_offset;
    if (ruby_size   === "auto") ruby_size   =   str_size * this.rate.ruby_size;
    if (ruby_offset === "auto") ruby_offset = - str_size * this.rate.ruby_offset;
    //this.kag.stat.ruby_config.ruby_offset;
    var conf = {
        letter_spacing: 0,
        width_dif     : 0,
        line_height   : this.line_height,
        
        str_len       : str.length,
        str_size      : parseInt(str_size),
        str_width     : this.getTextWidth(str, str_size, str_face),
        str_x         : 0,
        
        ruby_len      : text.length,
        ruby_size     : parseInt(ruby_size),
        ruby_width    : this.getTextWidth(text, ruby_size, str_face),
        ruby_x        : -1,
        ruby_y        : (-str_size) + (-ruby_offset),
    };
    conf.ruby_x = (conf.str_width - conf.ruby_width) / 2;
    return conf;
};

//# TYRANO.kag.ruby.getTextSize
//  文字列の幅(px)を調べる
TYRANO.kag.ruby.getTextSize = function (direction, textContent, fontSize, fontFamily) {
    // HTML要素のスタイルを書き換える処理はけっこう重いので、
    // 逐一変更があるかどうかを調べ、変更がある場合に書き換えるようにする
    // font-famiy
    if (dummyText.style.fontFamily !== fontFamily) {
        dummyText.style.fontFamily = fontFamily;
    }
    // font-size
    if (dummyText.style.fontSize !== fontSize) {
        dummyText.style.fontSize = fontSize + "px";
    }
    // textContent
    dummyText.textContent = textContent;
    // offsetWidthを返す
    return dummyText[direction];
};

//# TYRANO.kag.ruby.getTextWidth
//  文字列の幅(px)を調べる
TYRANO.kag.ruby.getTextWidth = function (textContent, fontSize, fontFamily) {
    return this.getTextSize("offsetWidth", textContent, fontSize, fontFamily);
};

//# TYRANO.kag.ruby.getTextHeight
//  文字列の幅(px)を調べる
TYRANO.kag.ruby.getTextHeight = function (textContent, fontSize, fontFamily) {
    return this.getTextSize("offsetHeight", textContent, fontSize, fontFamily);
};

//# TYRANO.kag.ruby.convertConf
TYRANO.kag.ruby.convertConf = function (conf, bool) {
    var ss = conf.str_size;
    var rs = conf.ruby_size;
    var ls = bool ? ss : rs;
    conf.letter_spacing = conf.letter_spacing / ls + "em";
    conf.line_height    = conf.line_height    / ss + "em";
    conf.str_size       = conf.str_size       / ss + "em";
    conf.str_width      = conf.str_width      / ss + "em";
    conf.str_x          = conf.str_x          / ss + "em";
    conf.ruby_size      = conf.ruby_size      / ss + "em";
    conf.ruby_width     = conf.ruby_width     / rs + "em";
    conf.ruby_x         = conf.ruby_x         / rs + "em";
    conf.ruby_y         = conf.ruby_y         / rs + "em";
};

//# TYRANO.kag.ruby.createRubyTag
TYRANO.kag.ruby.createRubyTag = {
    kag: TYRANO.kag,
    // A) 中央寄せ
    center: function (conf, str, text) {
        if (conf.ruby_len === conf.str_len && this.kag.stat.ruby_config.enable_onetoone) {
            return this.onetoone.call(this, conf, str, text);
        }
        // ルビの幅が本文の幅よりデカイ場合は調整
        if (conf.ruby_width > conf.str_width) {
            // 変形が有効なら
            if (this.kag.stat.ruby_config.enable_transform) {
                conf.ruby_x = 0;
                conf.ruby_scale = conf.str_width / conf.ruby_width;
                return this.justifyTransform.call(this, conf, str, text);
            }
            // マージンが有効なら
            else if (this.kag.stat.ruby_config.enable_margin) {
                conf.str_x = (conf.ruby_width - conf.str_width) / 2;
                conf.str_width = conf.ruby_width;
            }
        }
        this.kag.ruby.convertConf(conf, true);
        return ''
        + '<span class="ruby_str'  + this.kag.stat.ruby_no + '" style="display:inline-block;position:relative;white-space:nowrap;text-indent:0;line-height:' + conf.line_height + '; width:' + conf.str_width + '; font-size:' + conf.str_size + ';left:' + conf.str_x + ';">' + str
        + '<span class="ruby_text' + this.kag.stat.ruby_no + '" style="position:absolute;white-space:nowrap;text-indent:0;width:' + conf.ruby_width + ';top:' + conf.ruby_y + '; left:' + conf.ruby_x + ';font-size:' + conf.ruby_size + '; ">' + text
        + '</span></span>';
    },
    // B) 均等割り付け
    justify: function (conf, str, text) {
        // B-a) ルビが1文字、またはルビを振る本文が1文字しかない場合
        if (conf.ruby_len === 1 || conf.str_len === 1) {
            return this.center.call(this, conf, str, text);
        }
        // B-b) 
        if (conf.ruby_len === conf.str_len && this.kag.stat.ruby_config.enable_onetoone) {
            return this.onetoone.call(this, conf, str, text);
        }
        // B-c) ルビの幅が本文の幅よりデカイ場合
        if (conf.ruby_width > conf.str_width) {
            // B-c-1) 本文のマージン付けが無効な場合
            if (! this.kag.stat.ruby_config.enable_margin) {
                return this.center.call(this, conf, str, text);
            }
            // B-c-2) ルビの変形が有効な場合
            else if (this.kag.stat.ruby_config.enable_transform) {
                conf.ruby_x = 0;
                conf.ruby_scale = conf.str_width / conf.ruby_width;
                return this.justifyTransform.call(this, conf, str, text);
            }
            // B-c-3) 本文のマージン付けが有効な場合
            else {
                conf.ruby_x = 0;
                conf.width_dif = conf.ruby_width - conf.str_width;
                conf.letter_spacing = conf.width_dif / (conf.str_len - 1);
                return this.justifyInvert.call(this, conf, str, text);
            }
        }
        // B-d) ルビの幅が本文の幅より小さい場合
        else {
            conf.ruby_x = 0;
            var margin = parseInt(this.kag.stat.ruby_config.justify_margin);
            if (isNaN(margin)) margin = parseInt(conf.str_size * this.kag.ruby.rate.justify_margin);
            while (true) {
                conf.ruby_width++;
                conf.ruby_x++;
                if (conf.ruby_x >= margin || conf.ruby_width >= conf.str_width) break;
            }
            conf.width_dif = conf.str_width - conf.ruby_width;
            conf.letter_spacing = conf.width_dif / (conf.ruby_len - 1);
            conf.ruby_x /= 2;
            this.kag.ruby.convertConf(conf, false);
            return ''
            + '<span class="ruby_str'  + this.kag.stat.ruby_no + '" style="display:inline-block;position:relative;white-space:nowrap;text-indent:0;line-height:' + conf.line_height + '; width:' + conf.str_width + '; font-size:' + conf.str_size + ';">' + str
            + '<span class="ruby_text' + this.kag.stat.ruby_no + '" style="position:absolute;white-space:nowrap;text-indent:0;letter-spacing:' + conf.letter_spacing + ';width:100%;font-size:' + conf.ruby_size + '; top:' + conf.ruby_y + '; left:' + conf.ruby_x + ';">' + text
            + '</span></span>';
        }
    },
    // C) 均等割り付けで、ルビの幅が本文の幅よりデカイ場合
    justifyInvert: function (conf, str, text) {
        conf.str_width = conf.ruby_width;
        this.kag.ruby.convertConf(conf, true);
        return ''
        + '<span class="ruby_str'  + this.kag.stat.ruby_no + '" style="display:inline-block;position:relative;white-space:nowrap;text-indent:0;line-height:' + conf.line_height + '; width:' + conf.str_width + '; letter-spacing:' + conf.letter_spacing + '; font-size:' + conf.str_size + ';">' + str
        + '<span class="ruby_text' + this.kag.stat.ruby_no + '" style="position:absolute;width:100%;white-space:nowrap;text-indent:0;letter-spacing:0; font-size:' + conf.ruby_size + '; top:' + conf.ruby_y + '; left:' + conf.ruby_x + ';">' + text
        + '</span></span>';
    },
    // D) ルビ変形
    justifyTransform: function (conf, str, text) {
        this.kag.ruby.convertConf(conf, false);
        return ''
        + '<span class="ruby_str'  + this.kag.stat.ruby_no + '" style="display:inline-block;position:relative;white-space:nowrap;text-indent:0;line-height:' + conf.line_height + '; width:' + conf.str_width + '; font-size:' + conf.str_size + ';">' + str
        + '<span class="ruby_text' + this.kag.stat.ruby_no + '" style="position:absolute;white-space:nowrap;text-indent:0;transform-origin:left top;transform:scaleX(' + conf.ruby_scale + ');letter-spacing:' + conf.letter_spacing + ';width:100%;font-size:' + conf.ruby_size + '; top:' + conf.ruby_y + '; left:' + conf.ruby_x + ';">' + text
        + '</span></span>';
    },
    // E) ルビと本文が一対一対応
    onetoone: function (conf, str, text) {
        conf.ruby_x = (conf.str_size - conf.ruby_size) / 2;
        var len = conf.str_len - 1;
        conf.letter_spacing = (conf.str_size * len + conf.ruby_size - conf.ruby_width) / len;
        this.kag.ruby.convertConf(conf, false);
        return ''
        + '<span class="ruby_str'  + this.kag.stat.ruby_no + '" style="display:inline-block;position:relative;white-space:nowrap;text-indent:0;line-height:' + conf.line_height + '; width:' + conf.str_width + '; font-size:' + conf.str_size + ';">' + str
        + '<span class="ruby_text' + this.kag.stat.ruby_no + '" style="position:absolute;white-space:nowrap;text-indent:0;letter-spacing:' + conf.letter_spacing + ';width:100%;font-size:' + conf.ruby_size + '; top:' + conf.ruby_y + '; left:' + conf.ruby_x + ';">' + text
        + '</span></span>';
    },
};

//# TYRANO.kag.ruby.setRubyText
TYRANO.kag.ruby.setRubyText = function (str, text) {
    this.ruby_text_cnt = 0;
    this.kag.stat.ruby_text = [];
    this.kag.stat.ruby_no++;
    // 本文の長さに対するルビの長さの比を取得（切り上げ）
    var cnt = Math.ceil(parseInt(text.length) / parseInt(str.length));
    // ルビの長さだけぶん回す
    for(var i = 0; i < text.length; i++) {
        // i番目からcnt文字取得して、ルビ配列にプッシュ
        var ruby_tmp = text.substr(i, cnt);
        this.kag.stat.ruby_text.push(ruby_tmp);
        // 取得した文字の分だけiを増加させて帳尻合わせ
        i += cnt - 1;
    }
};

//# TYRANO.kag.ruby.getAdditionalRuby
TYRANO.kag.ruby.getAdditionalRuby = function (c) {
    return {
        str: c,
        text: this.kag.stat.ruby_text[this.ruby_text_cnt++]
    };
};

//# TYRANO.kag.ruby.getRubyTagWithDictionary
TYRANO.kag.ruby.getRubyTagWithDictionary = function (c, ruby) {
    var enable_ruby = true;
    if (this.kag.stat.ruby_config.show === "once" && this.kag.stat.ruby_dic[ruby.key].count > 0) {
        enable_ruby = false;
    }
    if (enable_ruby) {
        this.kag.stat.ruby_dic[ruby.key].count++;
        ruby.is_dic = false;
        return this.getRubyTag(c, ruby);
    }
    else {
        return c;
    }
};

//# TYRANO.kag.ruby.getRubyTag
TYRANO.kag.ruby.getRubyTag = function (c, ruby) {
    if (ruby.is_dic) return this.getRubyTagWithDictionary(c, ruby);
    else {
        this.setRubyText(ruby.key, ruby.value);
        var conf = this.getRubySetting(ruby.key, ruby.value, this.kag.stat.font.face);
        var type = this.kag.stat.ruby_config.type;
        return this.createRubyTag[type](conf, "", "");
    }
};

//# TYRANO.kag.ruby.initRubyTarget
TYRANO.kag.ruby.initRubyTarget = function (message_str) {
    this.ruby_target   = [];
    this.ruby_text_cnt = -1;
    this.is_skip_start = this.isSkip();    
    // ルビ辞書のキーの数だけぶん回す
    var ruby_dic = this.kag.stat.ruby_dic, key, match, pos;
    for (key in ruby_dic) {
        match = new RegExp(key + "(.*?)", "g");
        // 一致する限りぶち込んでいく
        while (pos = match.exec(message_str)) {
            this.ruby_target.push({
                pos: pos.index,
                key: key,
                value: ruby_dic[key].ruby,
                is_dic: true
            });
        }
    }
    // 手動設定があればここで拾っておく
    if (this.kag.stat.ruby_manual) {
        this.ruby_target.push({
            pos: 0,
            key: this.kag.stat.ruby_manual.str,
            value: this.kag.stat.ruby_manual.text,
            is_dic: false
        });
        this.kag.stat.ruby_manual = null;
    }
    // いま配列ruby_targetの要素はルビ辞書に登録してある単語がヒットした順に並んでいる
    // これをpos(降順)で並べ替える
    this.ruby_target.sort(function (a, b) {
        return b.pos - a.pos;
    });
};

//# TYRANO.kag.ruby.convertRuby
TYRANO.kag.ruby.convertRuby = function (c, index) {
    var ret = {};
    if (this.ruby_target.length == 0) {
        ret.log = ret.c = c;
        return ret;
    }
    else {
        var ruby = this.ruby_target[this.ruby_target.length - 1];
        
        // いま表示する1文字がまさにルビの開始位置だった場合、新規ルビ
        if (ruby.pos === index) {
            if (! ruby.key) ruby.key = c;
            // 新規津ルビ用HTMLを取得
            ret.str  = this.getRubyTag(c, ruby);
            // 1) ルビ用HTMLに変換されなかった場合
            if (ret.str.length == 1) {
                ret.c = c;
                delete ret.str;
            }
            // 2) 無事ルビ用HTMLに変換された、かつスキップ中ではない
            else if (this.isSkip()) {
                ret.ruby = this.getAdditionalRuby(c);
            }
            // 3) 無事ルビ用HTMLに変換された、かつスキップ中
            else {
                ret.ruby = {
                    str: ruby.key,
                    text: ruby.value,
                };
                this.ruby_text_cnt = ruby.key.length;
                ret.index = this.ruby_text_cnt - 1;
            }
        }
        // 前の文字から振られ始めたルビがいま表示する1文字にも及んでいる場合、追加ルビ
        else if (this.ruby_text_cnt > -1 && this.ruby_text_cnt < ruby.key.length) {
            ret.ruby = this.getAdditionalRuby(c);
        }
        // ルビなし
        else {
            ret.c = c;
        }
        // 新規ルビ用HTMLがあるならログを作る
        if (ret.str) {
            var conf = this.getRubySetting(ruby.key, ruby.value, this.kag.stat.default_font.face);
            var type = this.kag.stat.ruby_config.type;
            if (this.kag.stat.ruby_config.enable_backlog) ret.log  = this.createRubyTag[type](conf, ruby.key, ruby.value);
        }
        // 1文字表示の場合もログを作る
        if (ret.c && this.kag.stat.ruby_config.enable_backlog) {
            ret.log = ret.c;
        }
        // ルビを振り終わったらpopしてインデックスを初期化
        if (this.ruby_text_cnt === ruby.key.length) {
            this.ruby_target.pop();
            this.ruby_text_cnt = -1;
        }
        return ret;
    }
};

//# TYRANO.kag.ruby.makeLog
TYRANO.kag.ruby.makeLog = function (message_str, pm) {
    // stat.log_joinとpm.backlogを対応させる
    if (this.kag.stat.log_join == "true") {
        pm.backlog = "join";
    }
    // 1) キャラ名が入っており、かつ、pm.backlogが"join"ではない
    // 2) キャラ名が入っており、かつ、stat.f_chara_ptextが"true"である
    // この2ケースはmessage_strに"<b>(キャラ名)</b>"を加えつつ"add"でpushBackLog
    var chara_name = $.isNull($(".chara_name_area").html());
    if ((chara_name != "" && pm.backlog != "join") || (chara_name != "" && this.kag.stat.f_chara_ptext == "true")) {
        this.kag.pushBackLog("<b class='backlog_chara_name "+chara_name+"'>"+chara_name+"</b>：<span class='backlog_text "+chara_name+"'>"+message_str+"</span>","add");
        if (this.kag.stat.f_chara_ptext == "true") {
            this.kag.stat.f_chara_ptext = "false";
            this.kag.stat.log_join = "true";
        }
    }
    // 1) キャラ名が入ってない
    // 2) キャラ名が入っているものの、pm.backlogが"join"である
    // 3) キャラ名が入っているものの、stat.f_chara_ptextが"true"ではない
    // この3ケースはmessage_strの内容をそのまま
    // pm.backlog(すなわちstat.log_join)の値によってadd"または"join"でpushBackLog
    else {
        var log_str = "<span class='backlog_text " + chara_name + "'>" + message_str + "</span>";
        if (pm.backlog == "join") this.kag.pushBackLog(log_str, "join");
        else this.kag.pushBackLog(log_str, "add");
    }
};

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));