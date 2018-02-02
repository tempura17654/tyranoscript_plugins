(function(){

// SETTING
var $            = window.$;
var TYRANO       = window.TYRANO;
var tyrano       = window.tyrano;
var object       = window.object;
var sf           = TYRANO.kag.variable.sf;
var role_button_auto_hide = function (pm) {
  
  // setting
  var cls1 = "role_button";
  var cls2 = "role_button_area";
  var cls3 = "fixlayer";
  var cls4 = "pin";
  var slc1 = "." + cls1;
  var slc2 = "." + cls2;
  var role = $(slc1);
  var key1 = "_is_pinned_role_button";
  
  // initialize system variable
  if (pm.default !== "" || typeof sf[key1] === "undefined") {
    if (pm.default == "show") {
      sf[key1] = true;
    }
    else {
      sf[key1] = false;
    }
  }
  
  // opacity -> 0
  if (!sf[key1]) {
    role.css("opacity", 0);
  }
  
  // function to create rectangle for wrapping
  var createRect = function () {
    var infn = 9999;
    var minX = infn;
    var minY = infn;
    var maxX = -infn;
    var maxY = -infn;
    var self, x1, y1, x2, y2;
    
    // get role-button-area size
    role.each(function () {
      self = $(this);
      x1 = parseInt(self.css("left"));
      y1 = parseInt(self.css("top" ));
      x2 = x1 + self.width();
      y2 = y1 + self.height();
      if (x1 < minX) minX = x1;
      if (y1 < minY) minY = y1;
      if (x2 > maxX) maxX = x2;
      if (y2 > maxY) maxY = y2;
    });
    
    var rect = {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY
    };
    
    if (pm.log == "true") {
      console.log(rect);
    }
    
    return rect;
  };
  
  // function to wrap the role-button with rectangle
  var wrapWithRect = function (rect) {
    
    var wrap = "<div class=\""+ cls2 +" "+ cls3 +"\"></div>";
    var pstn = "absolute";
    var bkgd = "rgba(255,0,100,.3)";
    var zidx = "99999999";
    var px = "px";
    var m  = "-=";
    var arr = pm.padding.split(",");
    var padd = {
      y: parseInt(arr[0]),
      x: parseInt(arr[1])
    };
    
    rect.elm = $(wrap).css({
      "top"     : (rect.y - padd.y * 1) + px,
      "left"    : (rect.x - padd.x * 1) + px,
      "width"   : (rect.w + padd.x * 2) + px,
      "height"  : (rect.h + padd.y * 2) + px,
      "position": pstn,
      "z-index" : zidx
    });
    
    if (pm.area == "show") {
      rect.elm.css("background", bkgd);
    }
    
    role.wrapAll(rect.elm).removeClass(cls3).css({
      "top" : m + (rect.y - padd.y) + px,
      "left": m + (rect.x - padd.x) + px
    });
  };
  
  // function to set 3 event-handler in elements
  var setEventHandler = function () {
    
    if ($._data($(slc2).get(0)).events) {
      return;
    }
    
    var fade = parseInt(pm.fade);
    var slc3 = "." + cls4;
    var show = function (time) {
      role.fadeIn(time);
    };
    var hide = function (time) {
      if (!sf[key1]) {
        role.fadeOut(time);
      }
    };
    
    // 1. when click the pin-button
    $(slc3).on("click.pin", function () {
      sf[key1] = !sf[key1];
    });
    
    // 2. when hover the role-button-area
    $(slc2).hover(function () {
      show(fade);
    }, function () {
      hide(fade);
    })
    
    // 3. when click the role-button-area
    .click(function () {
      $(".layer_event_click").click();
    });
    
    hide(0);
    role.css("opacity", 1);
  };
  
  // build
  
  // restore when load game-data
  if ($(slc2).length) {
    setEventHandler();
  }
  
  // reset source & set onload-event-handler
  else if (pm.rect === "") {
    var src  = "";
    var len  = role.length;
    var i    = 0;
    var load = function () {
      i++;
      if (i == len) {
        var rect = createRect();
        wrapWithRect(rect);
        setEventHandler();
      }
    };
    role.each(function () {
      if (!this.complete) {
        src = this.src;
        this.src = "";
        this.onload = function () {
          load();
        };
        this.src = src;
      }
      else {
        load();
      }
    });
  }
  
  // directly build
  else {
    var arr = pm.rect.split(",");
    wrapWithRect({
      x: parseInt(arr[0]),
      y: parseInt(arr[1]),
      w: parseInt(arr[2]),
      h: parseInt(arr[3])
    });
    setEventHandler();
  }
};

/*
var role_button_auto_hide_reset = function () {
  var plus = "+=";
  var px   = "px";
  var cls1 = "role_button";
  var cls2 = "role_button_area";
  var cls3 = "fixlayer";
  var cls4 = "pin";
  var obj  = $("." + cls2);
  var left = obj.css("left");
  var top  = obj.css("top");
  $("." + cls1)
  .css("top", plus + top + px)
  .css("left", plus + left + px)
  .addClass(cls3)
  .unwrap();
  $("." + cls4).off("click.pin");
};
*/

tyrano.plugin.kag.tag.role_button_auto_hide = {
  pm: {
    default: "",
    fade   : "200",
    rect   : "",
    padding: "70,70",
    area   : "hide",
    log    : "false",
  },
  start: function (pm) {
    role_button_auto_hide(pm);
    this.kag.ftag.nextOrder();
  }
};

(function(tag_names){
    for (var tag_name, i = 0; i < tag_names.length; i++) {
        tag_name = tag_names[i];
        tyrano.plugin.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
        tyrano.plugin.kag.ftag.master_tag[tag_name].kag = TYRANO.kag;
    }
}(["role_button_auto_hide"]));

}());