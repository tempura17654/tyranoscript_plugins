(function ($, TYRANO, mp) {

// 多重読み込みの禁止
if (typeof TYRANO.kag.stat.tcamera_layer !== "undefined") {
    return;
}

//# stat領域に変数定義
TYRANO.kag.stat.tcamera_layer  = {};
TYRANO.kag.stat.tcamera_memory = {
    "x": 0,
    "y": 0,
    "z": 0,
    "rotate": 0,
    "name_x": "theCX",
    "name_y": "theCY",
    "name_z": "theZ",
    "zoom": 1
};

//# ローカル変数定義
var tcamera_index      = 0,
    tcamera_loop       = true,
    tcamera_param      = {},
    i,
    key,
    newtag = {},
    LAYER_NAMES = mp.layer.split(","),
    LAYER_COUNT = LAYER_NAMES.length,
    SC_WIDTH    = parseInt(TYRANO.kag.config.scWidth),
    SC_HEIGHT   = parseInt(TYRANO.kag.config.scHeight),
    DEF_WAIT    = String(mp.defwait || "true"),
    DEF_EASE    = String(mp.defease || "ease"),
    DEF_TIME    = String(mp.deftime || 1000),
    SKIP_TIME   = String(mp.skiptime || 0),
    ZOOM_MAX    = 8,
    DIF_Z_RATE  = 100,
    DIF_Z_MIN   = parseInt(DIF_Z_RATE / ZOOM_MAX),
    getMemory = function () {
        return TYRANO.kag.stat.tcamera_memory;
    },
    getLayer = function () {
        return TYRANO.kag.stat.tcamera_layer;
    },
    getLayerName = function (num) {
        return LAYER_NAMES[num];
    },
    getLayerNameJ = function (j_layer) {
        var ret = "null", i, list = j_layer.get(0).className.split(/\s+/);
        for (i = 0; i < list.length; i++) {
            if (list[i].indexOf("_fore") > -1 && list[i].indexOf("layer_") < 0) {
                ret = list[i].replace("_fore", "");
                break;
            }
        }
        return ret;
    },
    initLayers = function () {
        var lay_obj = getLayer();
        for (i = 0; i < LAYER_COUNT; i++) {
           key = getLayerName(i);
           lay_obj[key] = {
              "x": 0,
              "y": 0,
              "z": 100,
              "zoom": 1,
           };
        }
    };
    initLayers();

//# パラメータ自動計算
var calcCamera = function (pm) {
    var i, key, val, dif_z, pos_obj, cam_obj, zoom,
        j_chara, j_parent, target_x, target_y, target_z, target_zoom,
        chara_x, chara_y, chara_cx, chara_cy, chara_w, chara_h, chara_layer;
    
    // 数値型への変換
    val = parseFloat(pm.z);
    if (!isNaN(val)) pm.z = val;
    val = parseFloat(pm.rotate);
    if (!isNaN(val)) pm.rotate = val;
    if (pm.name === "") {
        val = parseFloat(pm.x);
        if (!isNaN(val)) pm.x = val;
        val = parseFloat(pm.y);
        if (!isNaN(val)) pm.y = val;
    }
    // pm.zは絶対必要。未指定なら前回の記憶から持ってくる
    if (pm.z === "") {
        pm.z = getMemory().z;
    }
    
    // name指定があれば
    if (pm.name !== "") {
        // pm.zoom、pm.x、pm.yは絶対必要。未指定なら前回の記憶から持ってくる
        if (pm.zoom === "") {
            pm.zoom = getMemory().zoom;
        }
        if (pm.x === "") {
            pm.x = getMemory().name_x;
        }
        if (pm.y === "") {
            pm.y = getMemory().name_y;
        }
        if (pm.z === "") {
            pm.z = getMemory().name_z;
        }
        // 記憶処理
        getMemory().name_x = pm.x;
        getMemory().name_y = pm.y;
        getMemory().name_z = pm.z;
        // キャラクターのjQueryオブジェクトを取得
        j_chara = pm.chara;
        // 親レイヤーのjQueryオブジェクトを取得
        j_parent = j_chara;
        for (i = 0; i < 3; i++) {
            j_parent = j_parent.parent();
            if (j_parent.hasClass("layer")) break;
        }
        // 親レイヤーの名前を取得
        chara_layer = getLayerNameJ(j_parent);
        if (chara_layer === "null") {
            console.error("エラー：キャラクター「"+pm.name+"」がいるレイヤーを特定できませんでした。");
        }
        //console.log(chara_layer);
        // widthとleftを元に目標xを決定する
        chara_w = j_chara.width() || 0;
        chara_h = j_chara.height() || 0;
        chara_x = parseInt(j_chara.css("left")) || 0;
        chara_y = j_chara.css("top");
        if (chara_y === "auto") {
            chara_y = SC_HEIGHT - chara_h - (parseInt(j_chara.css("bottom") || 0));
        }
        else {
            chara_y = parseInt(chara_y) || 0;
        }
        chara_x -= SC_WIDTH  / 2;
        chara_y -= SC_HEIGHT / 2;
        chara_cx = chara_x + chara_w / 2;
        chara_cy = chara_y + chara_h / 2;
        chara_y  *= -1;
        chara_cy *= -1;
        pm.x = String(pm.x).replace("theX", "("+chara_x+")").replace("theW", "("+chara_w+")").replace("theCX", "("+chara_cx+")");
        pm.y = String(pm.y).replace("theY", "("+chara_y+")").replace("theH", "("+chara_h+")").replace("theCY", "("+chara_cy+")");
        target_x = eval(pm.x);
        target_y = eval(pm.y);
    }
    
    // レイヤーの数だけループ…するのだが
    i = (pm.name !== "") ? -1 : 0; // name指定がある場合は-1からスタート
    for (; i < LAYER_COUNT; i++) {
        // -1の場合はキャラレイヤーを参照
        key = i < 0 ? chara_layer : getLayerName(i);
        // レイヤーのposを参照
        pos_obj = getLayer()[key];
        // -1の場合はpmを補正する
        if (i < 0) {
            target_zoom = Math.min(pm.zoom * pos_obj.zoom, ZOOM_MAX);
            target_z = pos_obj.z - DIF_Z_RATE / target_zoom;
            pm.x = parseInt(target_x / target_zoom);
            pm.y = parseInt(target_y / target_zoom);
            pm.z = String(pm.z).replace("theZ", "("+target_z+")");
            pm.z = parseInt(eval(target_z));
            continue;
        }
        // 0以上ならパラメータ作成
        else {
            // 新規オブジェクト
            cam_obj = {
                "layer": key,
                "wait": "false",
                "ease_type": pm.ease_type,
                "time": String((TYRANO.kag.stat.is_skip === true && SKIP_TIME > -1) ? SKIP_TIME : pm.time),
            };
            // 計算
            dif_z      = pos_obj.z - pm.z;           // レイヤーとカメラのz距離
            //is_visible = dif_z > 0;                // カメラより前にある物だけ見える(未使用)
            dif_z      = Math.max(dif_z, DIF_Z_MIN); // z距離に最低値を保証する
            zoom       = DIF_Z_RATE / dif_z;         // 拡大率はz距離に反比例する
            // パラメータを設定していく
            if (pm.x !== "") cam_obj.x = String(pm.x * zoom);
            if (pm.y !== "") cam_obj.y = String(pm.y * zoom);
            if (pm.rotate !== "") cam_obj.rotate = String(pm.rotate);
            cam_obj.zoom = String(Math.min(zoom * pos_obj.zoom, ZOOM_MAX));
            //console.log(cam_obj);
            tcamera_param[key] = cam_obj;
        }
    }
};

//# 深度設定
newtag.tcamera_setting = {
    pm: {
        x: "",
        y: "",
        z: "",
        zoom: ""
    },
    start: function (pm) {
        var i, j, vals, key, keys = Object.keys(this.pm),
            lay_key, lay_obj = getLayer();
        
        // 配列keysをループ
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            // そのパラメータが指定されていれば
            if (pm[key] !== "" && typeof pm[key] === "string") {
                // カンマで分割して配列にする。その配列をループ
                vals = pm[key].split(",");
                for (j = 0; j < LAYER_COUNT && j < vals.length; j++) {
                    // 指定されていれば
                    if (vals[j] !== "") {
                        // そのレイヤ設定を上書きする
                        lay_key = getLayerName(j);
                        lay_obj[lay_key][key] = parseFloat(vals[j]);
                    }
                }
                
            }
        }
        this.kag.ftag.nextOrder();
    }
};

//# 深度設定初期化
newtag.tcamera_setting_init = {
    start: function (pm) {
        initLayers();
        this.kag.ftag.nextOrder();
    },
};

//# てんぷらカメラ初期化
newtag.tcamera_init = {
    start: function (pm) {
        pm.x = "0";
        pm.y = "0";
        pm.z = "0";
        pm.rotate = "0";
        this.kag.ftag.startTag("tcamera", pm);
    },
};

//# てんぷらカメラ
newtag.tcamera = {
    pm: {
        "x": "",
        "y": "",
        "z": "",
        "rotate": "",
        "name": "",
        "name_x": "",
        "name_y": "",
        "zoom": "",
        "wait": DEF_WAIT,
        "ease_type": DEF_EASE,
        "time": DEF_TIME,
    },
    start: function (pm) {
        var that = this, key, memory, cam_obj;
        
        // もしname指定があって、pm.charaが未定義なら
        if (pm.name !== "" && ! pm.chara) {
            // そのキャラのjQueryオブジェクトを取得してpm.charaに格納する
            pm.chara = $("." + pm.name).eq(0);
            if (pm.chara.size() == 0) {
                console.error("エラー：キャラクター「"+pm.name+"」が見つけられませんでした。");
            }
            // もしそのキャラが<img>要素であり、かつ、画像の読み込みが終わっていないならば
            if (pm.chara.get(0).tagName === "IMG" && ! pm.chara.get(0).complete) {
                // 画像の読み込みが終わったときにもう一度この関数をやり直す
                return pm.chara.on("load", function () {
                    that.start(pm);
                });
            }
        }
        
        // 最初のカメラなら
        if (tcamera_index === 0) {
            // pmを用いてカメラ用のパラメータを計算する
            calcCamera(pm);
            // カメラ位置を覚えておく
            memory = getMemory();
            for (key in memory) {
                if (pm[key] !== "") {
                    memory[key] = pm[key];
                }
            }
            //console.log(pm);
            //console.log($.extend({}, tcamera_param));
        }
        
        // カメラパラメータを取得する
        key = getLayerName(tcamera_index);
        cam_obj = tcamera_param[key];
        // インデックス増加、ループするかどうかを判定
        tcamera_index++;
        tcamera_loop = tcamera_index < LAYER_COUNT;
        
        //【特殊】クイック処理ならば
        if (pm.quick) {
            // 専用のタグでカメラを動かす
            quickMoveCamera(cam_obj);
            // ループするなら再帰する
            if (tcamera_loop) {
                return this.start(pm);
            }
            // ループしないならインデックスを初期化して終了
            else {
                return tcamera_index = 0;
            }
        }
        
        // 通常のタグによる処理ならば
        else {
            // ループするならオーダーを戻す
            if (tcamera_loop) {
                this.kag.ftag.current_order_index--;
            }
            // ループしないならインデックスを初期化
            else {
                tcamera_index = 0;
                cam_obj.wait = pm.wait;
            }
            // 正規の[camera]に処理を投げる
            //console.log(cam_obj);
            this.kag.ftag.startTag("camera", cam_obj);
        }
    }
};

// 新タグを登録
for (key in newtag) {
    newtag[key].kag = TYRANO.kag;
    TYRANO.kag.ftag.master_tag[key] = newtag[key];
}

//# カメラを一瞬で動かす
var quickMoveCamera = function (pm) {
    pm = $.extend(TYRANO.kag.tag.camera.pm, pm);
    var that = TYRANO.kag.ftag.master_tag.camera;
    if(typeof that.kag.stat.current_camera[pm.layer] == "undefined"){
        that.kag.stat.current_camera[pm.layer] = {
            x : "0",
            y : "0",
            scale : "1",
            rotate:"0"
        };
    }
    var to_camera = $.extend(true, {}, that.kag.stat.current_camera[pm.layer]);
    if(pm.x!="") to_camera.x = parseInt(pm.x)*-1 +"px";
    if(pm.y!="") to_camera.y = parseInt(pm.y)*1 +"px";
    if(pm.zoom!="") to_camera.scale = pm.zoom;
    if(pm.rotate!="") to_camera.rotate = pm.rotate+"deg";
    if(pm.from_x != "0" || pm.from_y!="0" || pm.from_zoom!="1" || pm.from_rotate!="0" ){
        that.kag.stat.current_camera[pm.layer] = {
            x : parseInt(pm.from_x)*-1 +"px",
            y : parseInt(pm.from_y)*1+"px",
            scale : pm.from_zoom,
            rotate:pm.from_rotate+"deg"
        };
    }
    //console.log(pm.layer + ": " + to_camera.scale);
    //var css_str = "scale(" + to_camera.scale + ") rotate(" + to_camera.rotate + ") translate3d(" + to_camera.x + "," + to_camera.y + ",0px)";
    var css_str = "scale(" + to_camera.scale + ") rotate(" + to_camera.rotate + ") translate(" + to_camera.x + "," + to_camera.y + ")";
    //console.log(css_str);
    if(pm.layer=="layer_camera"){
        $(".layer_camera").css({
            "transform": css_str,
            "animation-name": "",
            "-webkit-animation-name": ""
        });
        that.kag.stat.current_camera_layer = "";
    }else{
        $("."+pm.layer +"_fore").css({
            "transform": css_str,
            "animation-name": "",
            "-webkit-animation-name": ""
        });
        that.kag.stat.current_camera_layer = pm.layer;
    }
    that.kag.stat.current_camera[pm.layer] = to_camera;
};

//# マネージャ
// マネージャが有効じゃなければここで終わり
if (mp.manager !== "true") {
    return;
}
// 有効ならマネージャの作成
else {
    var enableAutoCopy = document.execCommand("copy"),
        isOnSpan = false,
        cameraMode = 0,
        startX = -1,
        startY = -1,
        sign   = 1,
        camera = {},
        opt    = {"x": 0, "y": 0, "z": 0, "rotate": 0, "quick": true},
        j_side,
        j_span = $("<span style=\"z-index: 1; display: inline-block; position: absolute; cursor: default; font-family: " + TYRANO.kag.config.userFace + "; font-size: 16px; color: white; background: blue\"></span>"),
        j_span1 = $("<span>カメラ制御モード</span>"),
        j_span2 = $("<span style=\"cursor: pointer\">[リセット]</span>"),
        j_span3 = $("<span style=\"cursor: pointer\"></span>"),
        j_left  = $("<div data-side=\"left\" style=\"cursor: ns-resize; z-index: 0; position: absolute;  left: 0; top: 0; bottom: 0; width: 80px;\"></div>"),
        j_right = $("<div data-side=\"right\" style=\"cursor: ns-resize; z-index: 0; position: absolute; right: 0; top: 0; bottom: 0; width: 80px;\"></div>"),
        j_pre = $("<pre></pre>"),
        j_copy = $("<div style=\"position: fixed; left: -100%;\"></div>"),
        j_event = $("<div id=\"tcamera_manager\" style=\"cursor: move; z-index: 100000010; position: absolute; width: "+SC_WIDTH+"px; height: "+SC_HEIGHT+"px; box-sizing: border-box; border: 5px solid blue; display: none;\"></div>"),
        makeTag = function (opt) {
            j_span3.text("[tcamera x=" + opt.x + " y=" + opt.y + " z=" + opt.z + " rotate=" + opt.rotate + "]");
            if (enableAutoCopy) j_span3.trigger("click");
        };
        
    $("#tyrano_base").append(j_event);
    j_span.append(j_span1).append(j_span2).append(j_span3);
    j_event.append(j_span).append(j_right).append(j_left);
    j_copy.append(j_pre);
    $("body").append(j_copy);
    $(window).on("keydown", function (e) {
        if (e.keyCode === 67) {
            j_event.toggle();
            makeTag(getMemory());
        }
    });
    j_span2.on("click", function (e) {
        opt.x = 0;
        opt.y = 0;
        opt.z = 0;
        opt.rotate = 0;
        makeTag(opt);
        newtag.tcamera.start($.extend({}, newtag.tcamera.pm, opt));
        e.stopPropagation();
    });
    j_span3.on("click", function (e) {
        j_pre.get(0).textContent = j_span3.text();
        document.getSelection().selectAllChildren(j_copy.get(0));
        document.execCommand("copy");
        e.stopPropagation();
    });
    j_event.on("onwheel" in document ? "wheel" : "onmousewheel" in document ? "mousewheel" : "DOMMouseScroll", function (e) {
        var delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);
        camera = $.extend({}, getMemory());
        opt.x = parseInt(camera.x || 0);
        opt.y = parseInt(camera.y || 0);
        opt.z = parseInt(camera.z || 0);
        opt.rotate = parseInt(camera.rotate || 0);
        if (delta < 0){
            opt.z = parseInt(opt.z - 5);
            if (-5 < opt.z && opt.z < 0) opt.z = 0;
        } else {
            opt.z = parseInt(opt.z + 5);
            if (0 < opt.z && opt.z < 5) opt.z = 0;
        }
        makeTag(opt);
        newtag.tcamera.start($.extend({}, newtag.tcamera.pm, opt));
        e.stopPropagation();
    });
    j_side = j_left.add(j_right);
    j_side.on("mousedown", function (e) {
        if (isOnSpan) return;
        sign = $(this).attr("data-side") === "left" ? -1 : 1;
        cameraMode = 2;
        startX = e.pageX;
        startY = e.pageY;
        camera = $.extend({}, getMemory());
        e.stopPropagation();
    });
    j_event.on("mousedown", function (e) {
        if (isOnSpan) return;
        cameraMode = 1;
        j_side.hide();
        startX = e.pageX;
        startY = e.pageY;
        camera = $.extend({}, getMemory());
        e.stopPropagation();
    });
    $(window).on("mousemove", function (e) {
        if (! cameraMode) return;
        var dx  = e.pageX - startX,
            dy  = e.pageY - startY;
        if (cameraMode === 1) {
            dx *= -1;
            opt.x = parseInt(camera.x || 0) + dx;
            opt.y = parseInt(camera.y || 0) + dy;
            opt.z = parseInt(camera.z || 0);
            opt.rotate = parseInt(camera.rotate || 0);
        }
        else if (cameraMode === 2) {
            dy *= sign;
            opt.x = parseInt(camera.x || 0);
            opt.y = parseInt(camera.y || 0);
            opt.z = parseInt(camera.z || 0);
            opt.rotate = parseInt(camera.rotate || 0) + parseInt(dy / 2);
        }
        makeTag(opt);
        newtag.tcamera.start($.extend({}, newtag.tcamera.pm, opt));
        e.stopPropagation();
    });
    $(window).on("mouseup", function (e) {
        if (cameraMode) {
            cameraMode = 0;
            j_side.show();
            e.stopPropagation();
        }
    });
    j_span.on("mousedown", function (e) {
        isOnSpan = true;
    });
    j_span.on("mouseup", function (e) {
        isOnSpan = false;
        e.stopPropagation();
    });
}

}(window.jQuery, window.TYRANO, window.TYRANO.kag.stat.mp));