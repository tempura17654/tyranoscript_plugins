(function ($, TYRANO, mp) {

// stat領域に変数定義
TYRANO.kag.stat.tcamera_memory = {"x": 0, "y": 0, "z": 0, "rotate": 0, "zoom": 1};
TYRANO.kag.stat.tcamera_layer  = {};

// ローカル変数定義
var tcamera_laynames   = mp.layer.split(","),
    tcamera_index      = 0,
    tcamera_loop       = true,
    tcamera_count      = tcamera_laynames.length,
    tcamera_param      = {},
    i,
    key,
    newtag = {},
    SC_WIDTH   = parseInt(TYRANO.kag.config.scWidth),
    SC_HEIGHT  = parseInt(TYRANO.kag.config.scHeight),
    DEF_TIME   = String(mp.deftime || 1000),
    SKIP_TIME  = String(mp.skiptime || 0),
    BASE_LAYER = mp.base || "base",
    ZOOM_MAX   = 8,
    DIF_Z_RATE = 100,
    DIF_Z_MIN  = parseInt(DIF_Z_RATE / ZOOM_MAX),
    getMemory = function () {
        return TYRANO.kag.stat.tcamera_memory;
    },
    getLayer = function () {
        return TYRANO.kag.stat.tcamera_layer;
    }
    getLayerName = function (num) {
        return tcamera_laynames[num];
    },
    getLayerNameJ = function (j_layer) {
        var ret, i, list = j_layer.get(0).className.split(/\s+/);
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
        for (i = 0; i < tcamera_count; i++) {
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
    j_chara, j_parent, target_x, target_zoom, chara_left, chara_width, chara_layer;
    
    // pmについて、数値型に変換できるプロパティはすべて数値型にする
    for (key in pm) {
        val = parseFloat(pm[key]);
        if (! isNaN(val)) {
            pm[key] = val;
        }
    }
    
    // pm.zは絶対必要
    if (pm.z === "") {
        pm.z = getMemory().z;
    }
    
    // name指定があれば
    if (pm.name !== "") {
        // pm.zoomは絶対必要
        if (pm.zoom === "") {
            pm.zoom = getMemory().zoom;
        }
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
        //console.log(chara_layer);
        // widthとleftを元に目標xを決定する
        chara_width = j_chara.width() || 0;
        chara_left  = parseInt(j_chara.css("left")) || 0;
        target_x    = chara_left + chara_width / 2 - SC_WIDTH / 2;
    }
    
    // レイヤーの数だけループ…するのだが
    i = (pm.name !== "") ? -1 : 0; // name指定がある場合は-1からスタート
    for (; i < tcamera_count; i++) {
        // -1の場合はキャラレイヤーを参照
        key = i < 0 ? chara_layer : getLayerName(i);
        // レイヤーのposを参照
        pos_obj = getLayer()[key];
        // -1の場合はpmを補正する
        if (i < 0) {
            target_zoom = Math.min(pm.zoom, ZOOM_MAX);
            pm.x = target_x / target_zoom;
            pm.z = pos_obj.z - DIF_Z_RATE / target_zoom;
            continue;
        }
        // 0以上ならパラメータ作成
        else {
            // 新規オブジェクト
            cam_obj = {
                "layer": key,
                "wait": "false",
                "ease_type": pm.ease_type,
                "time": String(TYRANO.kag.stat.is_skip === true ? SKIP_TIME : pm.time),
            };
            // 計算
            dif_z      = pos_obj.z - pm.z;           // レイヤーとカメラのz距離
            is_visible = dif_z > 0;                  // カメラより前にある物だけ見える(未使用)
            dif_z      = Math.max(dif_z, DIF_Z_MIN); // z距離に最低値を保証する
            zoom       = DIF_Z_RATE / dif_z;         // 拡大率はz距離に反比例する
            // パラメータを設定していく
            if (pm.x !== "") cam_obj.x = String(pm.x * zoom);
            if (pm.y !== "") cam_obj.y = String(pm.y * zoom);
            if (pm.rotate !== "") cam_obj.rotate = String(pm.rotate);
            cam_obj.zoom = String(zoom * pos_obj.zoom);
            //console.log(cam_obj);
            tcamera_param[key] = cam_obj;
        }
    }
};

//# 深度設定
newtag.tcamera_setting = {
    pm: {
        z: "",
        zoom: ""
    },
    start: function (pm) {
        var zs, zooms, i, val, key;
        if (pm.z !== "") {
            zs = pm.z.split(",");
            for (i = 0; i < zs.length; i++) {
                if (zs[i] !== "") {
                    key = getLayerName(i);
                    val = parseInt(zs[i]);
                    getLayer()[key].z = val;
                }
            }
        }
        if (pm.zoom !== "") {
            zooms = pm.zoom.split(",");
            for (i = 0; i < zooms.length; i++) {
                if (zooms[i] !== "") {
                    key = getLayerName(i);
                    val = parseFloat(zooms[i]);
                    getLayer()[key].zoom = val;
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
        "zoom": "",
        "wait": "true",
        "ease_type": "ease",
        "time": DEF_TIME,
    },
    start: function (pm) {
        var that = this, key, memory, cam_obj;
        
        // もしname指定があって、pm.charaが未定義なら
        if (pm.name !== "" && ! pm.chara) {
            // そのキャラのjQueryオブジェクトを取得してpm.charaに格納する
            pm.chara = $("." + pm.name).eq(0);
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
        tcamera_loop = tcamera_index < tcamera_count;
        
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
        opt.x = camera.x;
        opt.y = camera.y;
        opt.z = camera.z;
        if (delta < 0){
            opt.z = parseInt(opt.z - 5);
        } else {
            opt.z = parseInt(opt.z + 5);
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
        }
        else if (cameraMode === 2) {
            dy *= sign;
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