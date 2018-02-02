// manpu.js

// グローバル領域にTEMPURAオブジェクトを確保
if (typeof window.TEMPURA === "undefined") {
    window.TEMPURA = {};
    TEMPURA.kag = TYRANO.kag;
    TEMPURA.tag = {};
}

// 被セーブ領域にtempuraオブジェクトを確保
if (typeof TYRANO.kag.stat.tempura === "undefined") {
    TYRANO.kag.stat.tempura = {};
}

// 即時関数の中で作業しよう
(function(){
    
    // 参照を確保
    var TG = TYRANO.kag;
    var sf = TG.variable.sf;
    var f  = TG.stat.f;
    var tf = TG.variable.tf;
    
    // タグを定義
    //#[manpu]
    TEMPURA.tag["manpu"] = {
        init: function () {
            var that = this;
            var data = that.data;
            var list = ["in_time", "time", "out_time"];
            for (var i in data) {
                if (i == "def") continue;
                var def = data["def"];
                var d = data[i];
                for (var j = 0; j < list.length; j++) {
                    var key = list[j];
                    if (d[key] != undefined) {
                        d[key] *= def[key];
                    };
                };
            };
        },
        data: {
            // ==========================
            // デフォルト設定をしている場所
            // すべてのアニメーションの元となる設定です
            def: {
                file      : "ase.png", // 画像ファイル名
                sound     : "se.ogg",  // 音声ファイル名
                x         : 0,         // 調整用
                y         : 0,         // 調整用
                _x        : 0,         // キャラの left 位置を基準にして、どれだけ右にずらすか
                _y        : -50,       // キャラの top 位置を基準にして、どれだけ下にずらすか
                width     : 200,       // 漫符の横幅
                in_count  : "1",       // 登場アニメーションの回数 
                in_effect : "fadeIn",  // 登場アニメーションの種類（[mtext]タグと同じものが指定できます）
                in_time   : 500,       // 登場アニメーションの時間（ミリ秒）
                time      : 500,       // 完全に表示されている時間（ミリ秒）
                out_time  : 500,       // 退場アニメーションの時間（ミリ秒）
                out_effect: "fadeOut", // 退場アニメーションの種類（[mtext]タグと同じものが指定できます）
                out_count : "1",       // 退場アニメーションの回数
                layer     : "0",       // name を探すレイヤ、かつ漫符を挿入するレイヤ
                name      : ""         // 漫符をつけるキャラ名（そのキャラの top, left を参照する）
            }
            // ==========================
            // これより下が、各タイプのアニメーション設定を行っている場所
            //
            //【１】基本的にデフォルト設定と同様に設定すればよいが、
            // 　　 in_time, time, out_time（時間３種）の３つだけは、
            // 　　 デフォルト設定に対する割合（ 0.5 とか 2 とか）で指定する
            // 　　 これは時間の調節をしやすくするため
            //
            //【２】効果音をつけたい場合は「sound:"XXX.ogg"」の行を付け加える
            // 　　 逆に効果音をなくしたい場合はこの行を削除する
            // 　　 ファイルの場所は./data/others/plugin/manpu/soundの中を想定している
            // 
            ,
            ase: {
                file: "ase.png",
                sound: "se2.ogg", // 音声ファイル名。効果音を指定している行はここ
                in_effect: "fadeInDown",
                out_effect: "fadeOutDown",
                _x: 200,
                _y: -30
            }
            // ==========================
            ,
            ase2: {
                file: "ase2.png",
                sound: "se6.ogg",
                in_effect: "shake",
                _x: -10,
                _y: -90
            }
            // ==========================
            ,
            bikkuri: {
                file: "bikkuri.png",
                sound: "se4.ogg",
                in_effect: "fadeInUpBig",
                in_time: 0.5,
                time: 1.5,
                out_time: 0.5,
                out_effect: "fadeOutUpBig"
            }
            // ==========================
            ,
            bikkuri2: {
                file: "bikkuri2.png",
                sound: "se4.ogg",
                in_effect: "bounceIn"
            }
            // ==========================
            ,
            fukidashi: {
                file: "fukidashi.png",
                sound: "se.ogg",
                in_effect: "bounce",
                _x: -50
            }
            // ==========================
            ,
            fukidashi2: {
                file: "fukidashi2.png",
                sound: "se.ogg",
                in_effect: "fadeInUp",
                out_effect: "fadeOutUp",
                _x: -50
            }
            // ==========================
            ,
            gaan: {
                file: "gaan.png",
                sound: "se2.ogg",
                in_effect: "fadeInDown",
                out_effect: "fadeOutDown",
                _x: 200,
                _y: -30
            }
            // ==========================
            ,
            hatena: {
                file: "hatena.png",
                sound: "se7.ogg",
                in_effect: "flipInY",
                in_time: 2,
                time: 0.8,
                out_time: 0.8,
                out_effect: "fadeOutUp"
            }
            // ==========================
            ,
            heart: {
                file: "heart.png",
                sound: "se8.ogg",
                in_effect: "pulse",
                in_count: "2",
                out_effect: "bounceOut"
            }
            // ==========================
            ,
            heart2: {
                file: "heart2.png",
                sound: "se9.ogg",
                in_effect: "tada",
                _y: -80
            }
            // ==========================
            ,
            heart3: {
                file: "heart3.png",
                sound: "se8.ogg",
                in_effect: "manpuLeftUp",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden"
            }
            // ==========================
            ,
            kiran: {
                file: "kiran.png",
                sound: "se5.ogg",
                in_effect: "manpuKiran",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden",
                _y: 60
            }
            // ==========================
            ,
            mojamoja: {
                file: "mojamoja.png",
                sound: "se9.ogg",
                in_effect: "manpuLeftUp",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden",
                _x: -35,
                _y: -45
            }
            // ==========================
            ,
            muka: {
                file: "muka.png",
                sound: "se5.ogg",
                in_effect: "tada",
                _x: 50
            }
            // ==========================
            ,
            muka2: {
                file: "muka2.png",
                sound: "se5.ogg",
                in_effect: "bounce",
                in_time: 0.8,
                _x: 30,
                _y: -70
            }
            // ==========================
            ,
            nami: {
                file: "nami.png",
                sound: "se9.ogg",
                n_effect: "manpuLeftUp",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden",
                _x: -35,
                _y: -45
            }
            // ==========================
            ,
            nami2: {
                file: "nami2.png",
                sound: "se9.ogg",
                in_effect: "manpuLeftUp",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden",
                _x: -35,
                _y: -45
            }
            // ==========================
            ,
            nanto: {
                file: "nanto.png",
                sound: "se.ogg",
                in_effect: "flash",
                _x: -10,
                _y: -30
            }
            // ==========================
            ,
            onpu: {
                file: "onpu.png",
                sound: "se.ogg",
                in_effect: "manpuLeftUp",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden"
            }
            // ==========================
            ,
            oya: {
                file: "oya.png",
                sound: "se.ogg",
                in_effect: "flash",
                _x: -60,
                _y: -20
            }
            // ==========================
            ,
            pikon: {
                file: "pikon.png",
                sound: "se4.ogg",
                in_effect: "bounce",
                _y: 0,
                _x: -30
            }
            // ==========================
            ,
            tameiki: {
                file: "tameiki.png",
                sound: "se9.ogg",
                in_effect: "manpuLeftDown",
                in_time: 3,
                time: 0,
                out_time: 0,
                out_effect: "manpuHidden",
                _y: 220,
                _x: 40
            }
            // ==========================
            ,
            waiwai: {
                file: "waiwai.png",
                sound: "se8.ogg",
                width: 300,
                in_effect: "pulse",
                in_count: "2",
                _x: 80,
                _y: -80
            }
        },
        pm: {
            "wait": "false",
            "zindex": "1"
        },
        start: function (pm) {
            var image_folder = "./data/others/plugin/manpu/image/";
            var sound_folder = "../others/plugin/manpu/sound/";
            // スキップ中ならば無視
            if (this.kag.stat.is_skip == true) return this.kag.ftag.nextOrder();
            var that = this;
            var data = that.data;
            var key = pm.type;
            // 漫符オブジェクト作成
            var manpu = $.extend({}, data["def"], data[key], pm);
            manpu.in_time = parseInt(manpu.in_time);
            manpu.time = parseInt(manpu.time);
            manpu.out_time = parseInt(manpu.out_time);
            pm.time = manpu.in_time + manpu.time + manpu.out_time;
            if (manpu.sound != undefined) {
                pm.sound = sound_folder + manpu.sound;
            };
            // キャラ画像エレメントの取得
            var layer = (manpu.layer == "") ? "" : "." + manpu.layer + "_fore "
            var name = (manpu.name == "") ? "" : "." + manpu.name;
            if (name != "") {
                var chara = $(layer + name);
                var chara_x = parseInt(chara.css("left"));
                var chara_y = parseInt(chara.css("top"));
                var chara_w = parseInt(chara.css("width"));
                var chara_h = parseInt(chara.css("height"));
            } else {
                var chara_x = 0;
                var chara_y = 0;
            };
            // 場所の決定
            var top = chara_y + manpu._y + parseInt(manpu.y);
            var left = chara_x + manpu._x + parseInt(manpu.x);
            var width = manpu.width;
            var zindex = pm.zindex
            // 画像ソース
            var img_src = image_folder + manpu.file;
            // 画像エレメント追加
            manpu.element = $("<img />");
            $(layer).append(manpu.element);
            // 画像エレメント追加処理が終わったら
            manpu.element.ready(function () {
                //
                //  1. 登場処理
                //
                // ソースをセット
                manpu.element.attr({
                    "src": img_src
                });
                // スタイルをセット
                manpu.element.css({
                    "z-index": zindex,
                    "height": "auto",
                    "width": width + "px",
                    "position": "absolute",
                    "top": top + "px",
                    "left": left + "px",
                    "-webkit-animation-duration": manpu.in_time + "ms",
                    "-moz-animation-duration": manpu.in_time + "ms",
                    "-o-animation-duration": manpu.in_time + "ms",
                    "animation-duration": manpu.in_time + "ms",
                    "-webkit-animation-iteration-count": manpu.in_count,
                    "-moz-animation-iteration-count": manpu.in_count,
                    "-o-animation-iteration-count": manpu.in_count,
                    "animation-iteration-count": manpu.in_count,
                    "-webkit-animation-fill-mode": "forwards",
                    "-moz-animation-fill-mode": "forwards",
                    "-o-animation-fill-mode": "forwards",
                    "animation-fill-mode": "forwards"
                });
                // 登場エフェクトをセット
                manpu.element.addClass(manpu.in_effect);
                //
                //  2. 退場処理
                //
                // 次の処理は【登場時間＋表示時間】が過ぎてから行われる
                setTimeout(function () {
                    // 登場エフェクトを取り除いて退場エフェクトをセット
                    manpu.element.removeClass(manpu.in_effect).addClass(manpu.out_effect);
                    // スタイルをセット
                    manpu.element.css({
                        "-webkit-animation-duration": manpu.out_time + "ms",
                        "-moz-animation-duration": manpu.out_time + "ms",
                        "-o-animation-duration": manpu.out_time + "ms",
                        "animation-duration": manpu.out_time + "ms",
                        "-webkit-animation-iteration-count": "" + manpu.out_count,
                        "-moz-animation-iteration-count": "" + manpu.out_count,
                        "-o-animation-iteration-count": "" + manpu.out_count,
                        "animation-iteration-count": "" + manpu.out_count
                    });
                    //
                    //  3. エレメント消去処理
                    //
                    // この処理はさらに【退場時間＋1000ミリ秒の猶予】が過ぎてから行われる
                    setTimeout(function () {
                        manpu.element.remove();
                    }, manpu.out_time + 1000); // エレメント消去処理ここまで
                    if (pm.wait != "false") 
                        setTimeout(function () {
                            that.kag.ftag.nextOrder();
                        }, manpu.out_time);
                }, parseInt(manpu.in_count) * manpu.in_time + manpu.time); // 退場処理ここまで
            }); // エレメント追加処理終了後の処理ここまで
            if (typeof pm.sound !== "undefined") this.kag.ftag.startTag("playse", {
                storage: pm.sound,
                buf: 0,
                stop: true
            });
            if (pm.wait == "false") this.kag.ftag.nextOrder();
        } // スタートメソッドここまで
    };
    
    TEMPURA.tag["manpu"].init();
    
    // タグの組み上げ
    var master_tag = TG.ftag.master_tag;
    for (var tag_name in TEMPURA.tag) {
        if (typeof master_tag[tag_name] === "undefined") {
            master_tag[tag_name] = object(TEMPURA.tag[tag_name]);
            master_tag[tag_name].kag = TG;
        }
    }
    
}());