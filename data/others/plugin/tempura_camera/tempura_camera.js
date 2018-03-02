(function ($, TYRANO, tf, mp) {

var layer_names = mp.uselayer.split(",");

tf.tcamera_param    = [];
tf.tcamera_index    = 0;
tf.tcamera_loop     = true;
tf.tcamera_count    = parseInt(TYRANO.kag.config.numCharacterLayers) + 1;
tf.tcamera_layer    = [];
tf.tcamera_pos      = {"x": 0, "y": 0, "z": 0};
tf.tcamera_bgzoom   = 2;
tf.tcamera_memory   = {"x": 0, "y": 0, "z": 0};

var SC_WIDTH = parseInt(TYRANO.kag.config.scWidth);
var SC_HEIGHT = parseInt(TYRANO.kag.config.scHeight);

//# getLayerName
var getLayerName = function (num) {
    num = parseInt(num);
    if (! num) return "base";
    else return "" + (num - 1);
};

var i, key;
for (i = 0; i < tf.tcamera_count; i++) {
   key = getLayerName(i);
   tf.tcamera_layer[i] = {
      "x": 0,
      "y": 0,
      "z": 0
   };
   tf.tcamera_param[i] = {
      "layer": layer_names[i],
   };
}

var newtag = {};

//# [tcamera_set]
newtag.tcamera_set = {
    pm: {
        z: "",
        bgzoom: ""
    },
    start: function (pm) {
        var zs, i, val;
        if (pm.z !== "") {
            zs = pm.z.split(",");
            for (i = 0; i < zs.length; i++) {
                val = parseInt(zs[i]);
                tf.tcamera_layer[i].z = val;
            }
        }
        if (pm.bgzoom !== "") {
            tf.tcamera_bgzoom = parseInt(pm.bgzoom);
        }
        this.kag.ftag.nextOrder();
    }
};


var ZOOM_MAX = 10;
var DIF_Z_RATE = 100;
var DIF_Z_MIN = 1 / ZOOM_MAX;

//# calcCamera
var calcCamera = function (pm) {
    var i, _i, key, val, dif_z, pos_obj, cam_obj, zoom,
    j_chara, j_parent, chara_x, chara_left, chara_width, chara_layer = -1;
    // 数値型に変換できるプロパティは数値型にする
    for (key in pm) {
        val = parseInt(pm[key]);
        if (! isNaN(val)) {
            pm[key] = val;
        }
    }
    if (pm.name !== "") {
        j_chara = pm.chara;
        j_parent = j_chara;
        for (var i = 0; i < 3; i++) {
            j_parent = j_parent.parent();
            if (j_parent.hasClass("layer")) break;
        }
        chara_layer = parseInt(j_parent.zIndex()) || 0;
        if (chara_layer >= 10) {
            chara_layer = chara_layer - 9;
        }
        chara_width = j_chara.width() || 0;
        chara_left  = parseInt(j_chara.css("left")) || 0;
        chara_x     = chara_left + chara_width / 2 - SC_WIDTH / 2;
    }
    // レイヤーの数だけループ
    i = pm.name ? -1 : 0;
    for (; i < tf.tcamera_count; i++) {
        _i = i < 0 ? chara_layer : i;
        // 参照
        pos_obj = tf.tcamera_layer[_i];
        cam_obj = tf.tcamera_param[_i];
        // レイヤーとカメラ間のz距離を計算する
        dif_z      = pos_obj.z - pm.z;
        is_visible = dif_z > 0;                  // カメラより後ろにある物は見えない
        dif_z      = Math.max(dif_z, DIF_Z_MIN); // 最低値を保証する
        zoom       = DIF_Z_RATE / dif_z;         // 拡大率は距離に反比例する
        if (i < 0) {
            pm.x = chara_x;
            pm.z = pos_obj.z - 100;
        }
        else {
            // パラメータの初期化
            cam_obj.x    = pm.x;
            cam_obj.y    = pm.y;
            cam_obj.zoom = 1;
            cam_obj.time = pm.time;
            // パラメータを計算していく
            cam_obj.zoom *= zoom;
            cam_obj.x    *= zoom;
            cam_obj.y    *= zoom;
            if (i === 0) {
                cam_obj.zoom += tf.tcamera_bgzoom;
            }
            //console.log(cam_obj.x);
            for (key in cam_obj) {
              cam_obj[key] = String(cam_obj[key]);
            }
        }
    }
};

//# [tcamera]
newtag.tcamera = {
    pm: {
        "x": "0",
        "y": "0",
        "z": "0",
        "name": "",
        "time": "1000",
    },
    start: function (pm) {
        var that = this;
        if (pm.name !== "" && ! pm.chara) {
            pm.chara = $("." + pm.name);
            if (pm.chara.get(0).tagName === "IMG" && ! pm.chara.get(0).complete) {
                pm.chara.on("load", function () {
                    that.start(pm);
                });
                return;
            }
        }
        if (tf.tcamera_index === 0) {
            calcCamera(pm);
            tf.tcamera_memory = pm;
            //console.log(pm);
        }
        var cam_obj = tf.tcamera_param[tf.tcamera_index];
        tf.tcamera_index++;
        tf.tcamera_loop = tf.tcamera_index < tf.tcamera_count;
        if (pm.quick) {
            quickMoveCamera(cam_obj);
            if (tf.tcamera_loop) {
                this.start(pm);
            }
            else {
                tf.tcamera_index = 0;
            }
        }
        else {
            if (tf.tcamera_loop) {
                this.kag.ftag.current_order_index--;
                cam_obj.wait = "false";
            }
            else {
                tf.tcamera_index = 0;
                cam_obj.wait = "true";
            }
            this.kag.ftag.startTag("camera", cam_obj);
        }
    }
};

for (var key in newtag) {
    newtag[key].kag = TYRANO.kag;
    TYRANO.kag.ftag.master_tag[key] = newtag[key];
}


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
    };
    //console.log(pm.layer + ": " + to_camera.scale);
    var css_str = "scale(" + to_camera.scale + ") rotate(" + to_camera.rotate + ") translate3d(" + to_camera.x + "," + to_camera.y + ",0px)";
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

var id = ".tcamera";
var isMousedown = false;
var startX = -1;
var startY = -1;
var camera = {};
$(window).on("mousedown" + id, function (e) {
    isMousedown = true;
    startX = e.pageX;
    startY = e.pageY;
    camera = $.extend({}, tf.tcamera_memory);
});
$(window).on("mousemove" + id, function (e) {
    if (! isMousedown) return;
    var dx  = e.pageX - startX,
        dy  = e.pageY - startY;
    dx *= -1;
    newtag.tcamera.start($.extend({}, newtag.tcamera.pm, {
        x: parseInt(camera.x) + dx,
        y: parseInt(camera.y) + dy,
        z: parseInt(camera.z),
        time: "0",
        quick: true
    }));
   
});
$(window).on("mouseup" + id, function (e) {
    isMousedown = false;
});

}(window.jQuery, window.TYRANO, window.TYRANO.kag.variable.tf, window.TYRANO.kag.stat.mp));