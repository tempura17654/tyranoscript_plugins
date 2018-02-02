// bg_tile.js

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
    //#[bg_tile]
    TEMPURA.tag["bg_tile"] = {
        get: {
            "random"        : function (x, y, nx, ny) {return Math.random()},
            "left"          : function (x, y, nx, ny) {return x/nx},
            "right"         : function (x, y, nx, ny) {return 1-x/nx},
            "top"           : function (x, y, nx, ny) {return y/ny},
            "bottom"        : function (x, y, nx, ny) {return 1-y/ny},
            "leftTop"       : function (x, y, nx, ny) {return (x+y)/(nx+ny)},
            "rightBottom"   : function (x, y, nx, ny) {return 1-(x+y)/(nx+ny)},
            "leftBottom"    : function (x, y, nx, ny) {return (x+ny-y)/(nx+ny)},
            "rightTop"      : function (x, y, nx, ny) {return 1-(x+ny-y)/(nx+ny)},
            "centerHorizon" : function (x, y, nx, ny) {return Math.abs((2*y/(ny-1)-1))},
            "outHorizon"    : function (x, y, nx, ny) {return 1-Math.abs((2*y/(ny-1)-1))},
            "centerVertical": function (x, y, nx, ny) {return Math.abs((2*x/(nx-1)-1))},
            "outVertical"   : function (x, y, nx, ny) {return 1-Math.abs((2*x/(nx-1)-1))},
            "center"        : function (x, y, nx, ny) {return Math.sqrt( Math.pow((2*x/(nx-1)-1),2)+Math.pow((2*y/(ny-1)-1),2) )},
            "out"           : function (x, y, nx, ny) {return 1-Math.sqrt( Math.pow((2*x/(nx-1)-1),2)+Math.pow((2*y/(ny-1)-1),2))}
        },
        def: {
            wait   : "true",
            folder : "bgimage",
            storage: "",
            ext    : "",
            color  : "",
            time   : "1000",
            delay  : "1000",
            dir    : "random",
            ny     : "4",
            light  : "white"
        },
        pm: {},
        start: function (pm) {
            var that = this;
            // pm の修正
            var def = this.kag.stat.tempura.def_bg_tile;
            pm = $.extend({}, def, pm);
            pm.time = parseInt(pm.time);
            pm.delay = parseInt(pm.delay);
            pm.ny = parseInt(pm.ny);
            if (TG.stat.is_skip == true) {
                pm.time = 0;
                pm.delay = 0;
                pm.wait = "false";
            };
            var is_light = (pm.light != "none" && pm.light != "");
            //
            // 次の背景データを取得
            //
            var nxt_src = "";
            if ( pm.storage != "" ) {
                // pm.storage でそのままアクセスできるようなら mp.storage にアクセスするが
                if ( $.isHTTP( pm.storage ) ) {
                    nxt_src = "url("+ pm.storage +")";
                }
                // 通常はこちら
                else {
                    nxt_src = "url(./data/" + pm.folder + "/" + pm.storage;
                    // もし拡張子設定が入っていればドット付きで加える
                    if ( pm.ext != "" ) {
                        nxt_src += "." + pm.ext;
                    }
                    nxt_src += ")";
                };
            };
            // 次の背景色
            var nxt_col = pm.color;
            //
            // 現在の背景レイヤーのデータを取得
            //
            var bg_elm = TYRANO.kag.layer.getLayer("base").get(0);
            var bg_src = bg_elm.style.backgroundImage;
            var bg_col = bg_elm.style.backgroundColor;
            //
            // タイルの幅・高さ・縦個数・横個数の決定
            //
            // 画面幅、画面高さ
            var bw = parseInt(TYRANO.kag.config.scWidth);
            var bh = parseInt(TYRANO.kag.config.scHeight);
            // タイル数
            var ny = Math.max(1, pm.ny);
            // 縦タイル数からタイル高さを計算
            var h = Math.ceil(bh / ny);
            // もし nx に数値が入っていなければタイルは正方形ということにしてタイル幅と横タイル数を決定
            if (typeof pm.nx === "undefined") {
                var w = h;
                var nx = Math.ceil(bw / h);
            }
            // nx に数値が入っていればそれに従ってタイル幅を決定
            else {
                var nx = Math.max(1, parseInt(pm.nx));
                var w = Math.ceil(bw / nx);
            };
            //
            // 決定したタイル情報に基づいて、画面を分割した<div>要素を量産する
            //
            var px = "px", s = " ";
            var count = 0;
            pm.count = nx * ny;
            // すべてのタイルについてループ
            for ( var y = 0; y < ny; y++ ) {
                for ( var x = 0; x < nx; x++ ) {
                    var div = document.createElement("div");
                    div.className = "layer_tile_"+(y*nx+x);
                    div.style.position = "absolute";
                    div.style.top = (y*h)+px;
                    div.style.left = (x*w)+px;
                    div.style.width = w+px;
                    div.style.height = h+px;
                    if (bg_src) div.style.backgroundImage = bg_src;
                    if (bg_col) div.style.backgroundColor = bg_col;
                    div.style.backgroundSize = bw+px+s+bh+px;
                    div.style.backgroundPositionY = (-y*h)+px;
                    div.style.backgroundPositionX = (-x*w)+px;
                    if (is_light) {
                        var light = document.createElement("div");
                        light.style.background = pm.light;
                        light.style.width = "100%";
                        light.style.height = "100%";
                        light.style.opacity = 0;
                        div.appendChild(light);
                    };
                    bg_elm.appendChild(div);
                    // フェード遅れを表す係数b(0-1)を取得
                    var b = this.get[pm.dir](x, y, nx, ny);
                    // 追加した<div>要素に対してアニメーションを追加
                    var $div = $(div);
                    $div.delay(b * pm.delay).fadeOut(pm.time, function() {
                        if (--pm.count == 0 && pm.wait != "false") that.kag.ftag.nextOrder();
                        $(this).remove();
                    });
                    // ワイプライトの設定
                    if (is_light) $div.children().delay(b * pm.delay).animate({"opacity":"1"},pm.time);
                };
            }; // タイルの数だけ行うforループ終わり
            //
            // いまの背景レイヤに次の背景データをセット
            //
            bg_elm.style.backgroundImage = nxt_src;
            bg_elm.style.backgroundColor = nxt_col;
            if (pm.wait == "false") this.kag.ftag.nextOrder();
        }
    };
    TG.stat.tempura.def_bg_tile = $.extend({}, TEMPURA.tag["bg_tile"].def);
    
    //#[def_bg_tile]
    TEMPURA.tag["def_bg_tile"] = {
        pm: {},
        start: function (pm) {
            this.kag.stat.tempura.def_bg_tile = $.extend(true, {}, this.kag.stat.tempura.def_bg_tile, pm);
            this.kag.ftag.nextOrder();
        }
    };
    
    //#[reset_def_bg_tile]
    TEMPURA.tag["reset_def_bg_tile"] = {
        pm: {},
        start: function (pm) {
            this.kag.stat.tempura.def_bg_tile = $.extend(true, {}, this.kag.stat.tempura.def_bg_tile, TEMPURA.tag["bg_tile"].def);
            this.kag.ftag.nextOrder();
        }
    };
    
    // タグの組み上げ
    var master_tag = TG.ftag.master_tag;
    for (var tag_name in TEMPURA.tag) {
        if (typeof master_tag[tag_name] === "undefined") {
            master_tag[tag_name] = object(TEMPURA.tag[tag_name]);
            master_tag[tag_name].kag = TG;
        }
    }
    
}());