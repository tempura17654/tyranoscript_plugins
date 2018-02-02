(function(){





//#mp
var mp = TYRANO.kag.stat.mp;
var replace_space = new RegExp(mp.space || ";", "g");





//#defineTagNames
var defineTagNames = {
    "remove"     : "$remove",
    "empty"      : "$empty",
    "addClass"   : "$addClass",
    "removeClass": "$removeClass",
    "attr"       : "$attr",
    "removeAttr" : "$removeAttr",
    "css"        : "$css",
    "animate"    : "$animate",
    "show"       : "$show",
    "hide"       : "$hide",
    "toggle"     : "$toggle",
    "fadeIn"     : "$fadeIn",
    "fadeOut"    : "$fadeOut",
    "fadeToggle" : "$fadeToggle"
};





//#commonParam
var commonParam = {
    layer_d: "",
    layer: "",
    page: "",
    slct: "",
    name: "",
    endedCount: 0,
    execCount: 0,
    //find: "",
    //filter: "",
    //not: "",
    //eq: "",
    delay: ""
};





//#getLayer
var getLayer = function (layer, page) {
    
    layer = layer || "0";
    page  = page  || "fore";
    
    switch (layer) {
    case "message":
        var num = parseInt(TYRANO.kag.config.numMessageLayers);
        var $layers = $();
        for (var i = 0; i < num; i++) {
            $layers = $layers.add(TYRANO.kag.layer["map_layer_" + page]["message" + i]);
        };
        return $layers;
    case "chara":
        var num = parseInt(TYRANO.kag.config.numCharacterLayers);
        var $layers = $();
        for (var i = 0; i < num; i++) {
            $layers = $layers.add(TYRANO.kag.layer["map_layer_" + page][i]);
        };
        return $layers;
    case "fix":
        return $(".fixlayer");
    case "free":
        return TYRANO.kag.layer.layer_free;
    case "event":
        return TYRANO.kag.layer.layer_event;
    case "menu":
        return TYRANO.kag.layer.layer_menu;
    default:
        return TYRANO.kag.layer["map_layer_" + page][layer];
    }
};





//#replaceSpace
var replaceSpace = function (pm) {
    for (var key in pm) {
        if (typeof pm[key] == "string") {
            pm[key] = pm[key].replace(replace_space, " ");
        }
    }
};





//#getTarget
var getTarget = function (pm) {
    var $targets = $();       
    var is_selector = false;
    var is_direct = false;
    if (pm.slct !== "") {
        pm.name = pm.slct;
        is_selector = true;
    }
    if (pm.layer_d !== "") {
        pm.layer = pm.layer_d;
        is_direct = true;
    }
    var array_layer = pm.layer.split(",");
    var array_name = pm.name.split(",");
    var array_page = pm.page.split(",");
    var i, j, k, layer, page, selector, is_direct;
    for (i = 0; i < array_layer.length; i++) {
        layer = array_layer[i];
        for (j = 0; j < array_page.length; j++) {
            page = array_page[j];
            for (k = 0; k < array_name.length; k++) {
                selector = array_name[k];
                if (! is_selector && selector !== "") {
                    selector = "." + selector;
                }
                $targets = $targets.add(getTargetOne(layer, page, selector, is_direct));
            }
        }
    }
    pm.execCount = $targets.size();
    return $targets;
};





//#getTargetOne
//var getTargetCommonArray = ["find", "filter", "not", "eq"];
var getTargetOne = function (layer, page, selector, is_direct) {
    var $target;
    if (layer !== "") {
        var $layer = getLayer(layer, page);
        if (selector !== "") {
            $target = $layer.find(selector);
        }
        else if (is_direct) {
            $target = $layer;
        }
        else {
            $target = $layer.children();
        }
    }
    else {
        $target = $(selector);
    }
    //for (var pm_key, i = 0; i < getTargetCommonArray.length; i++) {
    //    pm_key = getTargetCommonArray[i];
    //    if (pm[pm_key] !== "") {
    //        $target[pm_key](pm[pm_key]);
    //    }
    //}
    return $target;
};





//#exec
var exec = function (pm, $target, method, args) {
    var delay = parseInt(pm.delay) || 0;
    if (delay > 0) {
        //setTimeout(function(){
        //    $target[method].apply($target, args);
        //}, delay);
        $target.delay(delay).queue(function() {
            $target[method].apply($target, args);
            $target.dequeue();
        });
    }
    else {
        $target[method].apply($target, args);
    }
};





//#getCss
var getCss = function (pm) {
    var css = {};
    for (var key in pm) {
        if (typeof commonParam[key] === "undefined") {
            css[key] = pm[key];
        }
    }
    return css;
};





//#getWait
var getWait = function (pm) {
    return pm.wait !== "false";
};





//#getTime
var getTime = function (pm) {
    return parseInt(pm.time) || 0;
};





//#next
var next = function (flag) {
    if (! flag) TYRANO.kag.ftag.nextOrder();
};





//#nextIfWait
var nextIfWait = function (pm) {
    pm.endedCount++;
    next(! (getWait(pm) && pm.endedCount == pm.execCount));
};





//#nextIfNoWait
var nextIfNoWait = function (pm) {
    next(  getWait(pm));
};





var method;




//#--
//#[$remove]
method = "remove";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, "fadeOut", [time, function(){
            $(this).remove();
            nextIfWait(pm);}
        ]);
        nextIfNoWait(pm);
    }

};





//#[$empty]
method = "empty";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, "fadeOut", [time, function(){
            $(this).empty().show();
            nextIfWait(pm);}
        ]);
        nextIfNoWait(pm);
    }

};





//#[$addClass]
method = "addClass";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        "class": ""
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var class_name = pm["class"].replace(/,/g, " ");
        exec(pm, $target, this.method, [class_name]);
        next();
    }

};





//#[$removeClass]
method = "removeClass";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        "class": ""
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var class_name = pm["class"].replace(/,/g, " ");
        exec(pm, $target, this.method, [class_name]);
        next();
    }

};





//#[$attr]
method = "attr";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var attr = getCss(pm);
        exec(pm, $target, this.method, [attr]);
        next();
    }

};





//#[$removeAttr]
method = "removeAttr";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        key: ""
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        if (pm.key.indexOf(",") < 0) {
            exec(pm, $target, this.method, [pm.key]);
        }
        else {
            var arr = pm.key.split(",");
            for (var i = 0; i < arr.length; i++) {
                exec(pm, $target, this.method, [arr[i]]);
            }
        }
        next();
    }

};





//#[$css]
method = "css";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var css = getCss(pm);
        exec(pm, $target, this.method, [css]);
        next();
    }

};





//#[$animate]
method = "animate";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "500",
        wait: "true",
        easing: "jswing"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        var easing = pm.easing;
        var css = getCss(pm);
        delete css.time;
        delete css.wait;
        delete css.easing;
        exec(pm, $target, this.method, [css, time, easing, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$show]
method = "show";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$hide]
method = "hide";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$toggle]
method = "toggle";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$fadeIn]
method = "fadeIn";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "500",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$fadeOut]
method = "fadeOut";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "500",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#[$fadeToggle]
method = "fadeToggle";
tyrano.plugin.kag.tag[defineTagNames[method]] = {
    
    pm: {
        time: "500",
        wait: "true"
    },
    
    start: function(pm) {
        replaceSpace(pm);
        var $target = getTarget(pm);
        var time = getTime(pm);
        exec(pm, $target, this.method, [time, function(){
            nextIfWait(pm);
        }]);
        nextIfNoWait(pm);
    }

};





//#--
//#addToMasterTag
(function(tagNames){
    for (var key in tagNames) {
        var tagName = tagNames[key];
        var tagObj = tyrano.plugin.kag.ftag.master_tag[tagName] = object(tyrano.plugin.kag.tag[tagName]);
        tagObj.kag = TYRANO.kag;
        tagObj.method = key;
        $.extend(tagObj.pm, commonParam);
    }
}(defineTagNames));





}());