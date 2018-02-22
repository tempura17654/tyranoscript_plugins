(function(){

var $      = window.$;
var tyrano = window.tyrano;
var object = window.object;
var TYRANO = window.TYRANO;
var defineTagNames = [
    "popstack",
    "icss",
    "endcss",
    "loadhtml"
];

//#[popstack]
tyrano.plugin.kag.tag.popstack = {
    vital: [
      "name"
    ],
    pm: {
        name: ""
    },
    start: function (pm) {
        this.kag.popStack(pm.stack);
        this.kag.ftag.nextOrder();
    }
};

//#[icss]
tyrano.plugin.kag.tag.icss = {
    start: function (pm) {
        this.kag.stat.is_script = true;
        this.kag.stat.buff_script = "";
        this.kag.ftag.nextOrder();
    }
};

//#[endcss]
tyrano.plugin.kag.tag.endcss = {
    start: function (pm) {
        this.kag.stat.is_script = false;
        var str_css = this.kag.stat.buff_script;
        var str_css_arr = str_css.split("}");
        for (var i = 0; i < str_css_arr.length; i++) {
            str_css = str_css_arr[i];
            if (str_css.indexOf("{") > -1) {
                str_css += "}";
                $.insertRule(str_css);
            }
        }
        this.kag.stat.buff_script = "";
        this.kag.ftag.nextOrder();
    }
};

//#[loadhtml]
tyrano.plugin.kag.tag.loadhtml = {
    vital: [
        "storage"
    ],
    pm: {
        storage: "",
        name: "",
        top: "",
        left: ""
    },
    start: function (pm) {
        var that = this;
        $.get(pm.storage, function (html) {
            var html_obj = $("<div></div>");
            html_obj.css("position", "absolute");
            html_obj.css("top", pm.top + "px");
            html_obj.css("left", pm.left + "px");
            $.setName(html_obj, pm.name);
            html_obj.append($(html));
            var layer_free = that.kag.layer.getFreeLayer();
            layer_free.zIndex(9999999);
            layer_free.append(html_obj);
            layer_free.show();
            that.kag.ftag.nextOrder();
        });
    }
};

(function(tagNames){
    for (var i = 0; i < tagNames.length; i++) {
        var tagName = tagNames[i];
        var tagObj = tyrano.plugin.kag.ftag.master_tag[tagName] = object(tyrano.plugin.kag.tag[tagName]);
        tagObj.kag = TYRANO.kag;
        if (typeof tagObj.kag === "undefined") tagObj.kag = TYRANO.kag;
        if (typeof tagObj.pm  === "undefined") tagObj.pm  = {};
    }
}(defineTagNames));

}());