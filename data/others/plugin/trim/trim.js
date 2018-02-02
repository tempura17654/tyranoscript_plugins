// trim.js

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
    //#[trim]
    TEMPURA.tag["trim"] = {
        // -----------------------------------------------
        // デフォルト値
        // -----------------------------------------------
        getDef: function () {
            return TYRANO.kag.stat.tempura.trim;
        },
        // -----------------------------------------------
        // デフォルト値リセット用
        // -----------------------------------------------
        defdef: {
            folder: "fgimage",
            storage: "",
            ext: "",
            preload: "true",
            layer: "0",
            page: "fore",
            name: "",
            time: "1000",
            wait: "true",
            zindex: "auto",
            opacity: "255",
            rotate: "0",
            trim: "",
            draw: "",
            anim: "",
            radius: "",
            color: "rgba(0,0,0,0)"
        },
        // -----------------------------------------------
        // ソースゲットメソッド
        // -----------------------------------------------
        getSrc: function (pm) {
            var def = this.getDef();
            var folder = pm.folder || def.folder;
            var storage = pm.storage || def.storage;
            var ext = pm.ext || def.ext;
            var src = "";
            // pm.storage でそのままアクセスできるようなら pm.storage にアクセスするが
            if ($.isHTTP(storage)) {
                src = storage;
            }
            // 通常はこちら
            else {
                src = "./data/" + folder + "/" + storage;
                // もし拡張子設定が入っていればドット付きで加える
                if (ext != "") {
                    src += "." + ext;
                };
            };
            // url を代入
            pm.src = src;
            // デフォルト値をとっておく
            pm.wait = pm.wait || def.wait;
            pm.time = pm.time || def.time;
            if (tyrano.plugin.kag.stat.is_skip == true) {
                pm.time = 0;
                pm.wait = "false";
            };
            pm.preload = pm.preload || def.preload;
        },
        // -----------------------------------------------
        // Div 要素の追加メソッド
        // -----------------------------------------------
        addDiv: function (_pm) {
            var that = this;
            // デフォルト値に mp を統合        
            var pm = $.extend({}, this.getDef(), _pm);
            // pm.time だけ数値にしておく
            pm.time = parseInt(pm.time);
            //
            // ブロックエレメントの作成と追加
            //
            var layer = this.kag.layer.getLayer(pm.layer, pm.page).get(0);
            var obj_num = document.getElementsByClassName("trim_img").length;
            pm.div_obj = document.createElement("div");
            pm.div_obj.className = "trim_img trim_img_" + obj_num + " " + pm.name;
            layer.appendChild(pm.div_obj); // もう追加しちゃう
            //
            // イメージエレメントの作成と読み込み完了イベントの登録
            //
            var img_obj = new Image();
            img_obj.onload = function () {
                that.setImg(this, pm, obj_num);
            };
            // イメージエレメントの読み込み開始
            img_obj.src = pm.src;
        },
        // -----------------------------------------------
        // 画像ロード完了イベント時メソッド
        // -----------------------------------------------
        setImg: function (img, pm, obj_num) {
            var that = this;
            // split メソッドを使ってパラメータを取り出す
            // trimming parameters 元画像のどこからどれだけトリミングするか
            var tPrms = pm.trim.split(","); // [ tx, ty, tw, th ]
            // drawing parameters トリミングした画像をどこからどれだけの大きさで描画するか
            var dPrms = pm.draw.split(","); // [ dx, dy, dw, dh ]
            // animating parameters
            var aPrms = pm.anim.split(","); // [ anim-x, anim-y ]
            var t = {}; // trimming
            var d = {}; // drawing
            var r = {}; // ratio of d / t
            var b = {}; // background
            //
            // 初期化＆数値化
            //
            t.x = parseInt(tPrms[0]) || 0;
            t.y = parseInt(tPrms[1]) || 0;
            t.w = parseInt(tPrms[2]) || img.width - t.x;
            t.h = parseInt(tPrms[3]) || img.height - t.y;
            d.x = parseInt(dPrms[0]) || 0;
            d.y = parseInt(dPrms[1]) || 0;
            d.w = parseInt(dPrms[2]) || t.w;
            d.h = parseInt(dPrms[3]) || t.h;
            r.w = d.w / t.w;
            r.h = d.h / t.h;
            b.w = (img.width * r.w) | 0;
            b.h = (img.height * r.h) | 0;
            b.x = (-t.x * r.w) | 0;
            b.y = (-t.y * r.h) | 0;
            b.bx = b.x + (parseFloat(aPrms[0]) || 0); // before x
            b.by = b.y + (parseFloat(aPrms[1]) || 0); // before y
            //
            // プロパティの設定
            //
            var div_obj = $(pm.div_obj);
            var properties = {
                opacity: pm.opacity / 255,
                zIndex: pm.zindex,
                transform: "rotate(" + pm.rotate + "deg)",
                position: "absolute",
                left: d.x + "px",
                top: d.y + "px",
                width: d.w + "px",
                height: d.h + "px",
                borderRadius: pm.radius,
                backgroundColor: pm.color,
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(" + img.src + ")",
                backgroundSize: b.w + "px " + b.h + "px",
                backgroundPosition: b.x + "px " + b.y + "px"
            };
            //
            // アニメーションありなら
            //
            if (pm.time > 0) {
                // opacity と opacity に初期値をセット
                properties.opacity = 0;
                properties.backgroundPosition = b.bx + "px " + b.by + "px";
                div_obj.css(properties);
                // さらにアニメーションをセット
                div_obj.animate({
                    "opacity": pm.opacity / 255,
                    "backgroundPositionX": b.x,
                    "backgroundPositionY": b.y
                }, pm.time, function () {
                    if (pm.wait != "false") that.kag.ftag.nextOrder();
                });
            }
            // 瞬間表示するならばただセット
            else {
                div_obj.css(properties);
            };
            if (pm.wait == "false") this.kag.ftag.nextOrder();
        },
        start: function (pm) {
            var that = this;
            this.getSrc(pm);
            if (pm.preload != "false") this.kag.preload(pm.src, function () {
                that.addDiv(pm);
            });
            else this.addDiv(pm);
            if (pm.wait == "false") this.kag.ftag.nextOrder();
        }
    };
    
    //#[def_trim]
    TEMPURA.tag["def_trim"] = {
        trim: TEMPURA.tag["trim"],
        start: function (pm) {
            $.extend(this.trim.getDef(), pm);
            this.kag.ftag.nextOrder();
        }
    };
    
    //#[reset_def_trim]
    TEMPURA.tag["reset_def_trim"] = {
        trim: TEMPURA.tag["trim"],
        start: function (pm) {
            $.extend(this.trim.getDef(), this.trim.defdef);
            this.kag.ftag.nextOrder();
        }
    };
    
    TG.stat.tempura.trim = $.extend({}, TEMPURA.tag["trim"].defdef);
    
    // タグの組み上げ
    var master_tag = TG.ftag.master_tag;
    for (var tag_name in TEMPURA.tag) {
        if (typeof master_tag[tag_name] === "undefined") {
            master_tag[tag_name] = object(TEMPURA.tag[tag_name]);
            master_tag[tag_name].kag = TG;
        }
    }
    
}());