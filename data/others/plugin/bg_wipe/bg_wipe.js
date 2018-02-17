// bg_wipe.js

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

// window.requestAnimationFrame
window.requestAnimationFrame = 
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback, element) {
        return window.setTimeout(callback, 1000/30);
    };

// window.cancelAnimationFrame
window.cancelAnimationFrame =
    window.cancelAnimationFrame              ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    function(id) {
        clearTimeout(id);
    };

// 即時関数の中で作業しよう
(function(){
    
    // 参照を確保
    var TG = TYRANO.kag;
    var sf = TG.variable.sf;
    var f  = TG.stat.f;
    var tf = TG.variable.tf;
    
    // タグを定義
    //#[bg_wipe]
    TEMPURA.tag["bg_wipe"] = {
        cw: true,
        start: function (pm) {
            var CfW = TEMPURA.canvasForWipe;
            if (CfW.wiping) {
                this.kag.ftag.current_order_index--;
                CfW.getOption().wait = "true";
                return;
            };
            var that = this;
            pm.preloads = [];
            var base = "./data/others/plugin/bg_wipe/";
            if ( undefined != pm.storage       ) {
                if ($.isHTTP(pm.storage)) pm.preloads.push(pm.storageFromRoot = pm.storage);
                else pm.preloads.push(pm.storageFromRoot  = "./data/bgimage/" + pm.storage);
            };
            if ( undefined != pm.i_name        ) { pm.preloads.push(pm.storageFromRoot2 = base + "timage/" + pm.i_name + ".png")  };
            if ( undefined != pm.s_name        ) { pm.preloads.push(pm.storageFromRoot3 = base + "simage/" + pm.s_name + ".png")  };
            if ( undefined == pm.wait          ) { pm.wait    = CfW.getDefOption().wait;   };
            if ( undefined == pm.preload       ) { pm.preload = CfW.getDefOption().preload;};
            if ( this.kag.stat.is_skip == true ) { pm.time = 0;                            }
            else if ( undefined == pm.time     ) { pm.time = CfW.getDefOption().transTime; };
            pm.i = -1;
            var load = function () {
                pm.i++;
                if (pm.i >= pm.preloads.length) {
                    TEMPURA.canvasForWipe.wipeStart(pm);
                } else {
                    TYRANO.kag.preload(pm.preloads[pm.i], load);
                };
            };
            if (pm.preloads.length) load();
            else TEMPURA.canvasForWipe.wipeStart(pm);
        }
    };
    
    //#[def_bg_wipe]
    TEMPURA.tag["def_bg_wipe"] = {
        start: function (pm) {
            TEMPURA.canvasForWipe.setOption(pm, true);
            var that = this;
            pm.preloads = [];
            var CfW = TEMPURA.canvasForWipe;
            var base = "./data/others/plugin/bg_wipe/";
            if ( undefined != pm.storage       ) {
                if ($.isHTTP(pm.storage)) pm.preloads.push(pm.storageFromRoot = pm.storage);
                else pm.preloads.push(pm.storageFromRoot  = "./data/bgimage/" + pm.storage);
            };
            if ( undefined != pm.i_name        ) { pm.preloads.push(pm.storageFromRoot2 = base + "timage/" + pm.i_name + ".png")  };
            if ( undefined != pm.s_name        ) { pm.preloads.push(pm.storageFromRoot3 = base + "simage/" + pm.s_name + ".png")  };
            if ( undefined == pm.preload       ) { pm.preload = CfW.getDefOption().preload;};
            pm.i = -1;
            var load = function () {
                pm.i++;
                if (pm.i >= pm.preloads.length) {
                    that.kag.ftag.nextOrder();
                } else {
                    TYRANO.kag.preload(pm.preloads[pm.i], load);
                };
            };
            if (pm.preloads.length) load();
            else that.kag.ftag.nextOrder();
        }
    };
    
    //#[skipoff_bg_wipe]
    TEMPURA.tag["skipoff_bg_wipe"] = {
        start: function (pm) {
            TEMPURA.canvasForWipe.setEnableClickSkip(false);
            this.kag.ftag.nextOrder();
        }
    };
    
    //#[skipon_bg_wipe]
    TEMPURA.tag["skipon_bg_wipe"] = {
        start: function (pm) {
            TEMPURA.canvasForWipe.setEnableClickSkip(true);
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
    
    // キャンバス要素を追加する（ id 属性はbg_wipe。id の衝突に注意）
    var canvas = document.createElement("canvas");
    canvas.id = "bg_wipe";
    canvas.style.position = "absolute";
    canvas.width = TYRANO.kag.config.scWidth;
    canvas.height = TYRANO.kag.config.scHeight;
    canvas.style.zIndex = 10;
    $(canvas).prependTo("#root_layer_game");
    
}());

//#■TEMPURA.canvasForWipe
(function(){
}());
TEMPURA.canvasForWipe = {
    // --------------------------------------------------------------
    // プロパティ
    // --------------------------------------------------------------
    kag: TYRANO.kag,
    wiping: false, // いままさにワイプアニメーションしている最中か？（勝手に切り替わる）
    setEnableClickSkip: function (bool) {
        return TYRANO.kag.stat.tempura.bg_wipe_skip = bool;
    },
    getEnableClickSkip: function () {
        return TYRANO.kag.stat.tempura.bg_wipe_skip;
    },
    enableClickSkip: true, // クリックによるアニメーションスキップが有効か？（能動的に切り変える必要アリ）
    width: 0, // キャンバスの幅（ px ）
    height: 0, // キャンバスの高さ（ px ）
    longer: 0, // キャンバスの幅と高さのうち長いほう
    context: {}, // キャンバスの２Ｄレンダーコンテキスト
    oldImage: {}, // 切り替える前の背景画像エレメントオブジェクト
    oldColor: "", // 切り替える前の背景色（CSS3形式）
    shapeImage: {}, // 図形画像エレメントオブジェクト
    transImage: {}, // 演出画像エレメントオブジェクト
    timer: NaN, // アニメーションを管理するタイマー（停止に必要）
    progress: 0, // アニメーションの進行度（０から１に直線的に漸増する）
    time: {
        old: 0, // 前フレームの時刻（経過秒の計算に必要）
        sum: 0, // アニメーションが始まってから経過した時間（ミリ秒）
    },
    // --------------------------------------------------------------
    // 初期化関数：オブジェクト定義後に一度だけ呼び出される
    // --------------------------------------------------------------
    //##getOption()
    getOption: function () {
        return TYRANO.kag.stat.tempura.bg_wipe;
    },
    //##getDefOption()
    getDefOption: function () {
        return TYRANO.kag.stat.tempura.def_bg_wipe;
    },
    //##init()
    init: function () {
        TYRANO.kag.stat.tempura.bg_wipe_skip = true;
        TYRANO.kag.stat.tempura.bg_wipe = {
            storage: "",
            wait: "true",
            preload: "true",
            color: "", // 色
            transTime: 0, // 切り替え時間（ミリ秒）
            easing: "", // イージング
            method: "", // 切り替え方法
            direction: "", // 切り替え方向
            shapeName: "", // 図形タイプ
            customName: "", // カスタム関数
            numberOfShape: 0, // 図形の数（＝縦画面の分割数）
            gradWidth: 0, // グラデーションの幅
            imageName: "", // 画像ファイルの名前
        };
        TYRANO.kag.stat.tempura.def_bg_wipe = {
            storage: "",
            wait: "true",
            preload: "true",
            color: "black",
            transTime: 1000,
            easing: "none",
            method: "wipe",
            direction: "leftTop",
            shapeName: "square",
            customName: "myWipe",
            numberOfShape: 10,
            gradWidth: 0.2,
            imageName: "mosaic",
        };
        // 画面サイズの取得
        this.width = $("#tyrano_base").width();
        this.height = $("#tyrano_base").height();
        // なんか使うかもしれないので「幅と高さのうち長いほう」を格納しておく
        if (this.width > this.height) {
            this.longer = this.width;
        } else {
            this.longer = this.height;
        };
        // コンテキストの取得
        this.context = document.getElementById("bg_wipe").getContext("2d");
        // トランジション用画像をひとつずつ読み込み
        this.transImage = new Image();
        this.transImage.src = "./data/others/plugin/bg_wipe/timage/mosaic.png";
        this.shapeImage = new Image();
        this.shapeImage.src = "./data/others/plugin/bg_wipe/simage/square.png";
    },
    // --------------------------------------------------------------
    // デフォルト値を設定する
    // --------------------------------------------------------------
    //##setOption()
    setOption: function (mp, doSetDefault) {
        // 第２引数は「『デフォルトオプション』にセットするかどうか」
        // false なら『現在のオプション』にセットする
        var option = (doSetDefault) ? this.getDefOption() : this.getOption();
        // undefined でない mp のプロパティをオプションオブジェクトのプロパティにセットしていく
        // mp のプロパティは string 型なので適宜型変換を行う
        if (undefined != mp.color) option.color = mp.color;
        if (undefined != mp.easing) option.easing = mp.easing;
        if (undefined != mp.method) option.method = mp.method;
        if (undefined != mp.direction) option.direction = mp.direction;
        if (undefined != mp.s_name) option.shapeName = mp.s_name;
        if (undefined != mp.c_name) option.customName = mp.c_name;
        if (undefined != mp.num_shape) option.numberOfShape = Number(mp.num_shape);
        if (undefined != mp.grad_width) option.gradWidth = Number(mp.grad_width);
        if (undefined != mp.time) option.transTime = Number(mp.time);
        if (undefined != mp.wait) option.wait = mp.wait;
        if (undefined != mp.preload) option.preload = mp.preload;
        if (undefined != mp.i_name) option.imageName = mp.i_name;
    },
    // --------------------------------------------------------------
    // いまの背景画像を取得する
    // --------------------------------------------------------------
    //##getOldImage()
    getOldImage: function () {
        // いまの背景レイヤーの background-image を取得する
        var base_fore = document.getElementsByClassName("base_fore")[0];
        var url = base_fore.style.backgroundImage;
        /*
            【！】 これは    url("〇〇/××.jpg")    のような文字列で返ってくる
            　 　　背景画像がなければ "none" という文字列で返ってくる
        */
        // 背景画像がなんかあれば
        if (url != "none" && url != "") {
            // 取得したURLのうち、ソース部分だけを取り出して
            // this.oldImage のソースとする
            var iUseMark = 0;
            var startMarks = ["\"", "\'", "("];
            var endMarks = ["\"", "\'", ")"];
            for (var i = 0; i < 3; i++) {
                if (url.indexOf(startMarks[i]) > -1) {
                    iUseMark = i;
                    break;
                };
            };
            var a = url.indexOf(startMarks[iUseMark]);
            var b = url.lastIndexOf(endMarks[iUseMark]);
            this.oldImage.src = url.substr(a + 1, b - a - 1);
        }
        // 背景画像がないなら
        else {
            // background-color のほうを取得する
            this.oldColor = base_fore.style.backgroundColor;
            /*
                【！】 背景色の設定が何もされていない、すなわち透明ならば
                　　　 "rgba(0, 0, 0, 0)"が返ってくる
            */
            // 背景色すらないなら
            if (this.oldColor == "rgba(0, 0, 0, 0)") {
                // さしあたり黒を指定しておく
                this.oldColor = "black";
            };
        };
    },
    // --------------------------------------------------------------
    // いまの背景画像をキャンバスに写す
    // --------------------------------------------------------------
    //##drawOldImage()
    drawOldImage: function () {
        /*
            ここの処理を ctx.save() ～ ctx.restore() で囲むことで
            コンテキストの設定を汚染しないようにできるが
            とりあえず使用していない
        */
        // キャンバスコンテキストへの参照を取得
        var ctx = TEMPURA.canvasForWipe.context;
        // oldImage になんか入ってれば
        if (this.oldImage.src) {
            // それを描画する
            ctx.drawImage(this.oldImage, 0, 0, this.width, this.height);
        }
        // oldImage になにも入っていなければ
        else {
            // oldColor で塗りつぶす
            ctx.fillStyle = this.oldColor;
            ctx.fillRect(0, 0, this.width, this.height);
        };
    },
    // --------------------------------------------------------------
    // ワイプマクロが使われるたびに呼ばれるリセット関数
    // --------------------------------------------------------------
    //##reset()
    reset: function (mp) {
        // プロパティの初期化
        this.oldImage = new Image();
        this.oldColor = null;
        this.shapeImage = new Image();
        this.transImage = new Image();
        this.progress = 0;
        this.timer = null;
        this.time = {
            old: new Date().getTime(),
            sum: 0
        };
        // コンテキストの設定初期化（最低限）
        this.context.globalAlpha = 1;
        this.context.clearRect(0, 0, this.width, this.height);
        // オプションにデフォルトオプションを統合して、さらに mp をセット
        var option = this.getOption();
        $.extend(true, option, this.getDefOption());this.setOption(mp, false);
        // パラメータ default が true なら、いまのオプションをデフォルトオプションにセット
        if (mp["default"] == "true") {
            this.setOption(option, true);
        };
        // トランスに使う画像の読み込み
        if (option.method == "image") {
            this.transImage = new Image();
            this.transImage.src = "./data/others/plugin/bg_wipe/timage/" + option.imageName + ".png";
        };
        if (option.method == "shape") {
            this.shapeImage = new Image();
            this.shapeImage.src = "./data/others/plugin/bg_wipe/simage/" + option.shapeName + ".png";
        };
    },
    // --------------------------------------------------------------
    // ワイプはじめ！
    // --------------------------------------------------------------
    //##wipeStart()
    wipeStart: function (mp) {
        // console.info( " \nマクロ [bg_wipe] が呼ばれました。" );
        // 各種プロパティのリセット
        this.reset(mp);
        // 現在の背景画像を取得する
        this.getOldImage();
        // コンテキストの合成モードを「上書き」に指定、不透明度は１
        this.context.globalCompositeOperation = "source-over";
        this.context.globalAlpha = 1;
        // キャンバスにいまの背景画像を描く
        this.drawOldImage();
        // 合成モードを「消しゴム」に指定
        this.context.globalCompositeOperation = "destination-out";
        // キャンバスを可視化
        var $bg_wipe = $("#bg_wipe");
        var base_fore = document.getElementsByClassName("base_fore")[0];
        $bg_wipe.show();
        // console.log( " - キャンバスに、今の背景/色を写しました。" );        
        // 背景レイヤーの差し替え
        if (mp.storage) {
            base_fore.style.backgroundColor = "rgba(0,0,0,0)";
            base_fore.style.backgroundImage = "url(" + mp.storageFromRoot + ")";
        } else {
            base_fore.style.backgroundImage = "none";
            base_fore.style.backgroundColor = this.getOption().color;
        };
        // console.log( " - 背景レイヤーに、最終的に表示すべき画像/色を写しました。" );
        // トランジション秒数が０より大きいならば
        if (this.getOption().transTime > 0) {
            this.wiping = true; // ｢アニメーション中」フラグを立てる
            this.kag.stat.is_stop = true;
            this.wipeLoop(); // ワイプループを駆動
            // console.log( " - アニメーションを始めます" );
        }
        // トランジション秒数が０であるか、それかいまアニメーションしてる最中なら
        else {
            // キャンバスを非表示にして即座にマクロ終了
            $bg_wipe.hide();
        };
        if (this.getOption().wait == "false") this.kag.ftag.nextOrder();
    },
    // --------------------------------------------------------------
    // ループしながらワイプしていく
    // --------------------------------------------------------------
    //##wipeLoop()
    wipeLoop: function () {
        // よく使うグローバル変数ををローカル変数で参照できるようにしておく
        var CfW = TEMPURA.canvasForWipe;
        var ctx = CfW.context;
        var opt = CfW.getOption();
        var a = CfW.progress;
        // 次のワイプループをリクエストしておく
        CfW.timer = requestAnimationFrame(CfW.wipeLoop);
        // easing によって進行度に補正をかける（３乗イージングを採用）
        switch (opt.easing) {
        case "none":
            break;
        case "in":
            a = a * a * a;
            break;
        case "out":
            a--;
            a = a * a * a + 1;
            break;
        case "inOut":
            a *= 2;
            if (a < 1) {
                a = a * a * a / 2
            } else {
                a -= 2;
                a = (a * a * a + 2) / 2
            }
            break;
        };
        // ワイプ方式で分岐
        switch (opt.method) {
        // -------------- グラデーションワイプ
        case "wipe":
            // グラデーションの定義をする
            var gd; // gradation
            var gw = opt.gradWidth / 2; // gradation width
            var alp = 1; // alpha
            gw = Math.min(0.5, Math.max(0.01, gw)); // この範囲じゃないとなんかおかしくなる
            // ワイプ方向で分岐
            switch (opt.direction) {
            // ◆ ワイプ方向：端から端（８ケース）
            case "left":
            case "leftTop":
            case "leftBottom":
            case "right":
            case "rightTop":
            case "rightBottom":
            case "top":
            case "bottom":
                switch (opt.direction) {
                case "left":
                    gd = ctx.createLinearGradient(0, 0, CfW.width, 0);
                    break;
                case "right":
                    gd = ctx.createLinearGradient(CfW.width, 0, 0, 0);
                    break;
                case "top":
                    gd = ctx.createLinearGradient(0, 0, 0, CfW.height);
                    break;
                case "bottom":
                    gd = ctx.createLinearGradient(0, CfW.height, 0, 0);
                    break;
                case "leftTop":
                    gd = ctx.createLinearGradient(0, 0, CfW.height, CfW.width);
                    break;
                case "rightBottom":
                    gd = ctx.createLinearGradient(CfW.height, CfW.width, 0, 0);
                    break;
                case "leftBottom":
                    gd = ctx.createLinearGradient(0, CfW.height, CfW.height, CfW.height - CfW.width);
                    break;
                case "rightTop":
                    gd = ctx.createLinearGradient(CfW.height, CfW.height - CfW.width, 0, CfW.height);
                    break;
                };
                if (a < gw) {
                    gd.addColorStop(0, "rgba( 0,0,0," + (a / gw) + " )");
                } else {
                    gd.addColorStop(0, "rgba( 0,0,0,0.5 )");
                };
                if (a < gw) {
                    gd.addColorStop(a, "rgba( 0,0,0," + (a / gw) + " )");
                } else {
                    gd.addColorStop(a, "rgba( 0,0,0,1 )");
                };
                if (a + gw - 1 < 0) {
                    gd.addColorStop(a + gw, "rgba( 0,0,0,0 )");
                } else {
                    gd.addColorStop(1, "rgba( 0,0,0," + ((a + gw - 1) / gw) + " )");
                };
                break;
            // ◆ ワイプ方向：中央線→端もしくは端→中央（４ケース）
            case "centerHorizon":
            case "outHorizon":
            case "centerVertical":
            case "outVertical":
                gw * a / 2;
                a /= 2;
                switch (opt.direction) {
                case "centerHorizon":
                case "outHorizon":
                    gd = ctx.createLinearGradient(0, 0, 0, CfW.height);
                    break;
                case "centerVertical":
                case "outVertical":
                    gd = ctx.createLinearGradient(0, 0, CfW.width, 0);
                    break;
                };
                switch (opt.direction) {
                    // ワイプ方向：中央線→端（２ケース）
                case "centerHorizon":
                case "centerVertical":
                    gd.addColorStop(0, "red");
                    // 中央
                    if (a < gw) {
                        gd.addColorStop(0.5, "rgba( 0,0,0," + (a / gw / 4) + " )");
                    } else {
                        gd.addColorStop(0.5 - a, "rgba( 0,0,0,1 )");
                        gd.addColorStop(0.5 + a, "rgba( 0,0,0,1 )");
                    };
                    // 端
                    if (a + gw < 0.5) {
                        gd.addColorStop(0, "rgba( 0,0,0,0 )");
                        gd.addColorStop(0.5 - (a + gw), "rgba( 0,0,0,0 )");
                        gd.addColorStop(0.5 + (a + gw), "rgba( 0,0,0,0 )");
                        gd.addColorStop(1, "rgba( 0,0,0,0 )");
                    } else {
                        gd.addColorStop(0, "rgba( 0,0,0," + ((a + gw - 0.5) / gw) + " )");
                        gd.addColorStop(1, "rgba( 0,0,0," + ((a + gw - 0.5) / gw) + " )");
                    };
                    break;
                    // ワイプ方向：端→中央線（２ケース）
                case "outHorizon":
                case "outVertical":
                    // 端
                    if (a < gw) {
                        gd.addColorStop(0, "rgba( 0,0,0, " + (a / gw / 2) + " )");
                        gd.addColorStop(1, "rgba( 0,0,0, " + (a / gw / 2) + " )");
                    } else {
                        gd.addColorStop(0, "rgba( 0,0,0,0.5 )");
                        gd.addColorStop(0 + a, "rgba( 0,0,0,1 )");
                        gd.addColorStop(1 - a, "rgba( 0,0,0,1 )");
                        gd.addColorStop(1, "rgba( 0,0,0,0.5 )");
                    };
                    // 中央
                    if (a + gw < 0.5) {
                        gd.addColorStop(0 + (a + gw), "rgba( 0,0,0,0 )");
                        gd.addColorStop(1 - (a + gw), "rgba( 0,0,0,0 )");
                    } else {
                        gd.addColorStop(0.5, "rgba( 0,0,0," + ((a + gw - 0.5) / gw) + " )");
                    };
                    break;
                };
                break;
                // ◆ ワイプ方向：中央点→端もしくは端→中央点（２ケース）
            default:
                // キャンバスサイズを2で割って切り捨てる
                gw *= 2;
                var wd = (CfW.width / 2) | 0;
                var ht = (CfW.height / 2) | 0;
                // グラデーションの定義
                switch (opt.direction) {
                case "center":
                    gd = ctx.createRadialGradient(wd, ht, 0, wd, ht, Math.sqrt(wd * wd + ht * ht));
                    break;
                case "out":
                    gd = ctx.createRadialGradient(wd, ht, Math.sqrt(wd * wd + ht * ht), wd, ht, 0);
                    break;
                };
                if (a < gw) {
                    gd.addColorStop(0, "rgba( 0,0,0," + (a / gw / 4) + " )");
                } else {
                    gd.addColorStop(0, "rgba( 0,0,0,0.25 )");
                };
                if (a < gw) {
                    gd.addColorStop(a, "rgba( 0,0,0," + (a / gw) + " )");
                } else {
                    gd.addColorStop(a, "rgba( 0,0,0,1 )");
                };
                if (a + gw - 1 < 0) {
                    gd.addColorStop(a + gw, "rgba( 0,0,0,0 )");
                } else {
                    gd.addColorStop(1, "rgba( 0,0,0," + ((a + gw - 1) / gw) + " )");
                };
                break;
            }; // ワイプ方向で switch 分岐するグラデーション定義はここまで
            // 塗りつぶしの色に、いま定義したグラデーションをセット
            ctx.fillStyle = gd;
            // パスを開始して画面いっぱいに矩形を描画
            ctx.beginPath();
            ctx.rect(0, 0, CfW.width, CfW.height);
            ctx.fill();
            break;
        // -------------- 画像でトランジション
        case "image":
            ctx.globalAlpha = 0.1;
            ctx.drawImage(CfW.transImage, 0, 0, CfW.width, CfW.height);
            ctx.globalAlpha = a * a * a / 2;
            ctx.fillRect(0, 0, CfW.width, CfW.height);
            break;
        // -------------- 図形でトランジション
        case "shape":
            ctx.globalAlpha = 1;
            a *= 2;
            // 図形の設定
            var ny = opt.numberOfShape; // 縦の図形数
            var s = (CfW.height / ny++) | 0; // 図形の最終サイズ（図形数で分割）
            var nx = 2 + (CfW.width / s) | 0; // 横の図形数
            for (var y = 0; y < ny; y++) {
                for (var x = 0; x < nx; x++) {
                    // b は図形拡大の「遅れの大きさ」を意味する係数（0～1）
                    // この b を図形ひとつひとつを描画するたびに計算することで
                    // ワイプっぽい演出になる
                    var b = 0;
                    // ワイプ方向による switch 分岐
                    switch (opt.direction) {
                    case "left":
                        b = x / nx;
                        break;
                    case "right":
                        b = 1 - x / nx;
                        break;
                    case "top":
                        b = y / ny;
                        break;
                    case "bottom":
                        b = 1 - y / ny;
                        break;
                    case "leftTop":
                        b = (x + y) / (nx + ny);
                        break;
                    case "rightBottom":
                        b = 1 - (x + y) / (nx + ny);
                        break;
                    case "leftBottom":
                        b = (x + ny - y) / (nx + ny);
                        break;
                    case "rightTop":
                        b = 1 - (x + ny - y) / (nx + ny);
                        break;
                    case "centerHorizon":
                        b = Math.abs((2 * y / ny - 1));
                        break;
                    case "outHorizon":
                        b = 1 - Math.abs((2 * y / ny - 1));
                        break;
                    case "centerVertical":
                        b = Math.abs((2 * x / nx - 1));
                        break;
                    case "outVertical":
                        b = 1 - Math.abs((2 * x / nx - 1));
                        break;
                    case "center":
                        b = Math.sqrt(Math.pow((x / nx - 0.5), 2) + Math.pow((y / ny - 0.5), 2));
                        break;
                    case "out":
                        b = 1 - Math.sqrt(Math.pow((x / nx - 0.5), 2) + Math.pow((y / ny - 0.5), 2));
                        break;
                    };
                    // 現在の図形サイズ（切り捨て）
                    var s2 = Math.max(0, (s * (a - b)) | 0);
                    // shapeName による switch 分岐
                    /*
                        【！】★、▲などは形がいびつなので、●、■などよりも大きくしてやらないと
                        　　　きちんとトランジションしているように見えない
                    */
                    switch (opt.shapeName) {
                    case "square":
                        break;
                    case "circle":
                    case "pentagon":
                    case "hexagon":
                        s2 *= 1.2;
                        break;
                    case "star":
                        s2 *= 2.0;
                        break;
                    default:
                        s2 *= 1.6;
                        break;
                    };
                    ctx.drawImage(CfW.shapeImage, ((x * s - s2 / 2)) | 0, (y * s - s2 / 2) | 0, s2, s2);
                }; // next x
            }; // next y
            break;
        // -------------- カスタム関数でトランジション
        case "custom":
            CfW.customWipe(opt);
            break;
        } // ワイプ方法による switch 分岐はここまで
        // 現在の時間を取得
        var now = new Date().getTime(); // 現在の時間を取得
        var dif = now - CfW.time.old; // 前回の時間との差（＝経過ミリ秒）を計算
        CfW.time.sum += dif; // 合計時間に経過ミリ秒を足す
        CfW.time.old = now; // 前回の時間に現在の時間を代入（次回フレームで使用）
        // 進行度（０～１）の計算
        CfW.progress = CfW.time.sum / opt.transTime;
        // 進行度が１以上になったら
        if (CfW.progress >= 1) {
            cancelAnimationFrame(CfW.timer); // タイマーを止めて
            CfW.wiping = false; // ｢アニメーション中」フラグを折り
            $("#bg_wipe").hide(); // キャンバス要素を非表示にする
            TYRANO.kag.stat.is_stop = false;
            if (opt.wait != "false") TYRANO.kag.ftag.nextOrder();
            //console.log( " - アニメーションが終わりました。\n " );
        };
    },
    // --------------------------------------------------------------
    // ワイプを途中でスキップする
    // --------------------------------------------------------------
    //##wipeSkip()
    wipeSkip: function () {
        // いまアニメーション中で、かつ、クリックによるスキップが有効ならば
        if (this.wiping　 && this.getEnableClickSkip()) {
            this.time.sum += this.getOption().transTime; // オブジェクト内の時間を一気に経過させ
            tyrano.plugin.kag.stat.is_wait = false; // エンジンのウェイト状態に false を直接代入
        };
    },
    // --------------------------------------------------------------
    // カスタムワイプ
    // --------------------------------------------------------------
    //##customWipe()
    customWipe: function (opt) {
        var CfW = this;
        var ctx = CfW.context;  // コンテキスト
        var W   = CfW.width;    // キャンバスの幅
        var H   = CfW.height;   // 　　〃　　の高さ
        var L   = CfW.longer;   // 　　〃　　の幅と高さのうち長いほう
        var CX  = (W / 2) | 0;  // 　　〃　　の中央 x 座標（少数部分切り捨て）
        var CY  = (H / 2) | 0;  // 　　〃　　の中央 y 座標（少数部分切り捨て）
        var A   = CfW.progress; // アニメーションの進行度（0～1）
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgb(0,0,0)";
        switch (opt.customName) {
        case "myWipe":
            var r = Math.sqrt(CX * CX + CY * CY);
            var p = Math.PI;
            ctx.globalAlpha = 0.3;
            ctx.beginPath();
            ctx.moveTo(CX, CY);
            ctx.arc(CX, CY, r, -0.5 * p, -0.25 * p * (1 - 8 * A), false);
            ctx.closePath();
            ctx.fill();
            break;
        case "myWipe2":
            // [カスタムのヒント] 
            // 毎フレーム背景画像を描画しなおすこともできる！
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 1;
            CfW.drawOldImage();
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgb(0,0,0)";
            var r = Math.sqrt(CX * CX + CY * CY);
            var p = Math.PI;
            var circles = [
                // 遅延,    x,    y, 最終半径
                [0, -100, -200, r / 2],
                [0.2, 50, 300, r * 2],
                [0.4, -250, -100, r * 1],
            ];
            for (var i = 0; i < circles.length; i++) {
                var c = circles[i];
                var aa = A - c[0];
                if (0 < aa) {
                    ctx.globalAlpha = aa / (1 - c[0]);
                    ctx.beginPath();
                    ctx.arc(CX + c[1], CY + c[2], (c[3] * aa) | 0, 0, p * 2, true);
                    ctx.fill();
                }
            }
            break;
        case "myWipe3":
            ctx.globalCompositeOperation = "source-over";
            ctx.globalAlpha = 0.2;
            CfW.drawOldImage();
            ctx.globalCompositeOperation = "destination-out";
            ctx.globalAlpha = 1;
            ctx.fillStyle = "rgb(0,0,0)";
            var s = (2 * L * A) | 0;
            var s2 = (s / 2) | 0;
            ctx.save();
            ctx.translate(CX, CY);
            ctx.rotate(A * 8);
            ctx.fillRect(-s2, -s2, s, s);
            ctx.restore();
            break;
        case "":
            break;
        };
    }
};

TEMPURA.canvasForWipe.init();

TYRANO.kag.layer.layer_event.on("click.bg_wipe", function () {
    TEMPURA.canvasForWipe.wipeSkip();
});