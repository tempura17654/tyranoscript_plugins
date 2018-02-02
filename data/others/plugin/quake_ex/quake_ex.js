// quake_ex.js

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
    //#[quake_ex]
    TEMPURA.tag["quake_ex"] = {
        wait: false,
        stack: [],
        pm: {
            wait: "true",
            hmax: "0",
            vmax: "0",
            time: "1000",
            name: "",
            layer: "",
            effect: "easeOutCubic"
        },
        start: function (pm) {
            var that = this;
            if (pm.hmax == "0" && pm.vmax == "0") {
                pm.vmax = "500";
            }
            if (this.kag.stat.is_skip == true) {
                pm.time = "0";
                pm.wait = "false";
            }
            var quake = {
                time: parseInt(pm.time),
                st_time: new Date().getTime(),
                ed_time: 0,
                gap_x: parseInt(pm.hmax),
                gap_y: parseInt(pm.vmax),
                st_gap_x: 0,
                st_gap_y: 0,
                easing: pm.effect,
                target: null,
                sign: -1
            };
            // ターゲットの特定
            var target;
            if (pm.layer != "") {
                var layer_name = pm.layer + "_fore";
                if (pm.layer == "free") layer_name = "layer_free";
                target = $("." + layer_name);
            } else {
                target = $(".layer_camera");
            }
            if (pm.name != "") {
                target = target.find("." + pm.name);
            }
            quake.target = target;
            quake.ed_time = quake.st_time + quake.time;
            quake.st_gap_x = 0;
            quake.st_gap_y = 0;
            this.stack.push(quake);
            if (this.stack.length == 1) {
                this.loop();
            }
            if (pm.wait == "false") {
                this.kag.ftag.nextOrder();
            }
            else this.wait = true;
        },
        loop: function () {
            var that, quake, i, id, now, progress_time, progress;
            that = TYRANO.kag.ftag.master_tag["quake_ex"];
            id = requestAnimationFrame(that.loop);
            for (i = 0; i < that.stack.length; i++) {
                quake = that.stack[i];
                now = new Date().getTime();
                progress_time = Math.min( quake.time, now - quake.st_time );
                progress = jQuery.easing[ quake.easing ]( 0, progress_time, 0, 1, quake.time );
                var gx = (quake.st_gap_x + quake.gap_x * quake.sign * (1 - progress))|0;
                var gy = (quake.st_gap_y + quake.gap_y * quake.sign * (1 - progress))|0;
                quake.target.css("transform", "translate(" + gx + "px, " + gy + "px)");
                quake.sign *= -1;
                if (quake.ed_time < now) {
                    quake.target.css("transform", "translate(" + quake.st_gap_x + "px, " + quake.st_gap_y + "px)");
                    that.stack.splice(i, 1);
                    i--;
                }
            }
            if (!that.stack.length) {
                cancelAnimationFrame(id);
                if (that.wait) {
                    that.wait = false;
                    that.kag.ftag.nextOrder();
                }
            }
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