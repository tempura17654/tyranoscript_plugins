// anim_filter.js

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
    //#[anim_filter]
    TEMPURA.tag["anim_filter"] = {
        vital: ["layer"],
        pm: {
            wait: "true",
            time: "1000",
            layer: "",
            page: "fore",
            name: "",
            grayscale: "0",
            sepia: "0",
            saturate: "100",
            hue: "0",
            invert: "0",
            opacity: "100",
            brightness: "100",
            contrast: "100",
            blur: "0"
        },
        start: function (pm) {
            var that = this;
            pm.time = parseInt(pm.time);
            if (pm.time == 0) pm.wait = "false";
            var j_obj = this.kag.layer.getLayer(pm.layer, pm.page);
            if (pm.name != "") j_obj = j_obj.find("." + pm.name);
            var filter_str = ""
            + "grayscale(" + pm.grayscale + "%) "
            + "sepia(" + pm.sepia + "%) "
            + "saturate(" + pm.saturate + "%) "
            + "hue-rotate(" + pm.hue + "deg) "
            + "invert(" + pm.invert + "%) "
            + "opacity(" + pm.opacity + "%) "
            + "brightness(" + pm.brightness + "%) "
            + "contrast(" + pm.contrast + "%) "
            + "blur(" + pm.blur + "px) ";
            j_obj.css({
                "-webkit-filter": filter_str,
                "-ms-filter": filter_str,
                "-moz-filter": filter_str,
                "-webkit-transition": pm.time +"ms -webkit-filter linear",
                "-ms-transition": pm.time +"ms -webkit-filter linear",
                "-moz-transition": pm.time +"ms -webkit-filter linear"
            });
            j_obj.addClass("tyrano_filter_effect");
            if (pm.wait == "false") this.kag.ftag.nextOrder()
            else setTimeout(function(){
                that.kag.ftag.nextOrder()
            }, pm.time);
        }
    };
    
    //#[free_anim_filter]
    TEMPURA.tag["free_anim_filter"] = {
        pm: {
            time: "1000",
            wait: "true",
            layer: "",
            page: "fore",
            name: ""
        },
        start: function (pm) {
            var that = this;
            pm.time = parseInt(pm.time);
            if (pm.time == 0) pm.wait = "false";
            var filter_str = "";
            var j_obj;
            if (pm.layer == "") j_obj = $(".tyrano_filter_effect");
            else j_obj = this.kag.layer.getLayer(pm.layer, pm.page);
            if (pm.name != "") j_obj = j_obj.find("." + pm.name);
            j_obj.css({
                "-webkit-filter": "",
                "-ms-filter": "",
                "-moz-filter": "",
                "-webkit-transition": pm.time +"ms -webkit-filter linear",
                "-ms-transition": pm.time +"ms -webkit-filter linear",
                "-moz-transition": pm.time +"ms -webkit-filter linear"
            });
            j_obj.removeClass("tyrano_filter_effect");
            if (pm.wait == "false") this.kag.ftag.nextOrder()
            else setTimeout(function(){
                that.kag.ftag.nextOrder()
            }, pm.time);
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