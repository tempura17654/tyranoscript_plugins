[bg storage=room.jpg time=0]
[position width=920 height=211 top=371 left=20]
[position page=fore margint=45 marginl=10 marginr=20 marginb=10 vertical=false opacity=180 color=0x000000]
[ptext name=chara_name_area layer=message0 color=0xFFFFFF size=26 x=30 y=381 bold=bold]
[chara_config ptext=chara_name_area]
[chara_config talk_focus=brightness]



;サブルーチンでゆうこを定義
[call target=sub_define_yuko]

;サブルーチンで撮影用マクロを定義
[call target=sub_define_macro]

;ゆうこを表示
[chara_show name=yuko width=470 time=500]

#yuko
ゆうこです。[r]
キャラクターパーツのテストを開始します。[l]

[chara_part name=yuko eye=1 face=2 megane=1][l]

現在の状態を撮影してみます。[l][cm]

[chara_capture]

……撮影できましたか？[l]
[s]



*sub_define_yuko

;yuko
[chara_new name=yuko storage=chara/yuko/hair_back/ロング.png jname=ゆうこ ] 

;yuko--body_back:体後面
[chara_layer name=yuko part=body_back id=breza storage=chara/yuko/body_back/ブレザー1.png zindex=9 ]

;yuko--body_front:体前面
[chara_layer name=yuko part=body_front id=breza storage=chara/yuko/body_front/ブレザー1.png zindex=10 ]

;yuko--eye:目
[chara_layer name=yuko part=eye id=1 storage=chara/yuko/eye/普通な目(黒め)1.png zindex=20 ]
[chara_layer name=yuko part=eye id=2 storage=chara/yuko/eye/デフォルメ目1.png ]

;yuko--hair_front:髪前面
[chara_layer name=yuko part=hair_front id=ナチュラル storage=chara/yuko/hair_front/ナチュラル.png zindex=40 ]
[chara_layer name=yuko part=hair_front id=くせ毛 storage=chara/yuko/hair_front/くせ毛.png ]

;yuko--head:顔
[chara_layer name=yuko part=head id=1 storage=chara/yuko/head/普通な顔1.png zindex=11]
[chara_layer name=yuko part=head id=2 storage=chara/yuko/head/青ざめた顔1.png ]

;yuko--face:表情
[chara_layer name=yuko part=face id=1 storage=chara/yuko/face_front/素.png zindex=20 ]
[chara_layer name=yuko part=face id=2 storage=chara/yuko/face_front/驚き.png]

;yuko--megane:アクセサリ
[chara_layer name=yuko part=megane id=0 storage=none zindex=30 ]
[chara_layer name=yuko part=megane id=1 storage=chara/yuko/accessory_front/メガネ.png]

[return]



*sub_define_macro

;【マクロ】[chara_capture]
; 
;【パラメータ】
;
; name     ... 撮影の対象にするキャラクターのnameを指定する。
;              未指定でもよい。その場合、画面に追加した順番が一番若いキャラクターを対象にする。
;
; width    ... 出力する横幅(px)を指定する。
;              未指定でもよい。その場合、現在画面に表示されているのと同じ横幅で撮影する。
;              数値ではなく"origin"を指定してもよい。その場合、素材画像と同じ横幅で撮影する。
;
; height   ... 出力する高さ(px)を指定する。
;              未指定時、また"origin"指定時の挙動についてはwidthパラメータと同様。
;
; log      ... true/falseを指定する。trueの場合、コンソールにデバッグ用の文字列を出力する。
;              未指定でもよい。その場合、trueの挙動となる。
;
; filename ... 保存するファイル名を指定する。
;              未指定でもよい。その場合、キャラクターのnameと現在時刻から自動的に決定する。
;
;【使用例】
;
; [chara_capture name=akane width=origin height=origin]

[macro name=chara_capture]
[iscript]
(function ($, mp, sf) {
    mp = $.extend({
        "name": "",
        "width": "",
        "height": "",
        "filename": "",
        "log": "true"
    }, mp);
    var logger = mp.log === "true" ? console : {
        log: function () {}
    };
    var download = function (img_code, chara_name, file_name) {
        if (file_name) var filename = file_name;
        else {
            var name = chara_name;
            var date = $.getNowDate().replace(/\//g, "");
            var time = $.getNowTime().replace(/:|：/g, "");
            filename = name + "_" + date + "_" + time + ".png";
        }
        img_code = img_code.split(",")[1];
      	if ($.isNWJS()) {
            if (sf.savedir) {
                var savedir = sf.savedir;
            }
            else {
                savedir = $.getProcessPath();
            }
            var input = document.createElement("input");
            input.style.visibility = "hidden";
            input.type = "file";
            input.nwsaveas = savedir + "/" + filename;
            input.value = "";
            var $input = $(input);
            $("body").append($input);
            input.onchange = function () {
                var path = this.value;
                logger.log("input value is <" + path + ">.");
                savedir = window.require("path").parse(path).dir;
            		window.require("fs").writeFile(path, img_code, "base64", function () {
            		    logger.log("success save.");
            		    sf.savedir = savedir;
            		});
            		$input.remove();
            };
            input.click();
      	}
      	else {
        		var bin = atob(img_code);
        		var buffer = new Uint8Array(bin.length);
        		for (var i = 0; i < bin.length; i++) {
        			  buffer[i] = bin.charCodeAt(i);
        		}
        		var blob = new Blob([buffer.buffer], {type: "image/png"});
        		if (navigator.msSaveBlob) { 
        			  navigator.msSaveBlob(blob, filename);
        		}
        		else {
          			var a = document.createElement("a");
          			a.download = filename;
          			a.href = URL.createObjectURL(blob);
          			a.click();
        		}
      	}
    };
    var getChara = function (body) {
        if (mp.name) return $(body).find(".tyrano_chara." + mp.name).eq(0);
        else return $(body).find(".tyrano_chara").eq(0);
    };
    var width   = mp.width;
    var height  = mp.height;
    logger.log("... [capture_chara] start ...");
    logger.log("option name is <" + mp.name + ">.");
    logger.log("option width is <" + width + ">.");
    logger.log("option height is <" + height + ">.");
    logger.log("...");
    var j_chara = getChara("body");
    if (j_chara.size() < 1) {
        logger.error("there are no character.");
    }
    else {
        var j_img = j_chara.find("img");
        var chara_name = mp.name || j_chara.get(0).className.replace("tyrano_chara", "").replace(/\s+/g, "");
        if (!      width       ) width  = j_chara.width();
        if (!      height      ) height = j_chara.height();
        if (width  === "origin") width  = j_img.get(0).naturalWidth;
        if (height === "origin") height = j_img.get(0).naturalHeight;
        logger.log("* render character is <" + chara_name + ">.");
        logger.log("* render width is <" + width + ">.");
        logger.log("* render height is <" + height + ">.");
        logger.log("... html2canvas start ...");
        window.html2canvas(j_chara.get(0), {
            width: parseInt(width),
            height: parseInt(height),
            onclone: function (body) {
                logger.log("success clone.");
                var base = $(body).find(".tyrano_base");
                base.css("transform", "");
                var j_chara = getChara(body);
                j_chara.add(j_chara.find("img")).css({
                    "width": width,
                    "height": height
                });
            },
            onrendered: function (canvas) {
                logger.log("success render.");
                var img_code = canvas.toDataURL("image/png");
                download(img_code, chara_name, mp.filename);
            }
        });
    }
}(window.jQuery, window.TYRANO.kag.stat.mp, window.TYRANO.kag.variable.sf));
[endscript]
[endmacro]
[return]
