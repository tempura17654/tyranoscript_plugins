//[plugin name=monitor_stat simg=data/others/plugin/monitor_stat/svg/skip.svg sx=10 sy=10 sw=80 sh=80 aimg=data/others/plugin/monitor_stat/svg/auto.svg ax=10 ay=10 aw=80 ah=80]

(function(){

// SETTING
var $            = window.$;
var TYRANO       = window.TYRANO;
var mp           = TYRANO.kag.stat.mp;
var img_src_skip = mp.simg || "./data/others/plugin/monitor_stat/svg/skip.svg";
var img_src_auto = mp.aimg || "./data/others/plugin/monitor_stat/svg/auto.svg";
var cls_skip     = "img_skip";
var cls_auto     = "img_auto";
var target       = ".button_menu";
var px           = "px";
var css_skip     = {position: "absolute"};
var css_auto     = {position: "absolute"};
css_skip.left    = (mp.sx || 10) + px;
css_skip.top     = (mp.sy || 10) + px;
css_skip.width   = (mp.sw || 80) + px;
css_skip.height  = (mp.sh || 80) + px;
css_auto.left    = (mp.ax || 10) + px;
css_auto.top     = (mp.ay || 10) + px;
css_auto.width   = (mp.aw || 80) + px;
css_auto.height  = (mp.ah || 80) + px;

// MONITOR_STAT OBJECT
var monitor_stat = {
  start: function () {},
  setSkipTrue: function () {},
  setSkipFalse: function () {},
  setAutoTrue: function () {},
  setAutoFalse: function () {}
};

// SKIP START FUNCTION
monitor_stat.setSkipTrue = function() {
  $("<img src=\"" + img_src_skip + "\" />")
  .addClass(cls_skip)
  .css(css_skip)
  .insertAfter(target);
};

// SKIP STOP FUNCTION
monitor_stat.setSkipFalse = function() {
  $("." + cls_skip).remove();
};

// AUTO START FUNCTION
monitor_stat.setAutoTrue = function() {
  $("<img src=\"" + img_src_auto + "\" />")
  .addClass(cls_auto)
  .css(css_auto)
  .insertAfter(target);
};

// AUTO STOP FUNCTION
monitor_stat.setAutoFalse = function() {
  $("." + cls_auto).remove();
};

// MONITOR START
monitor_stat.start = function() {
  delete TYRANO.kag.stat.is_skip;
  var is_skip = false;
  var is_skip_old = false;
  Object.defineProperty(TYRANO.kag.stat, "is_skip", {
    get: function () {
      return is_skip;
    },
    set: function (newValue) {
      is_skip = newValue;
      if (newValue) {
        monitor_stat.setSkipTrue();
      }
      else if (is_skip_old) {
        monitor_stat.setSkipFalse();
      }
      is_skip_old = newValue;
    },
    enumerable: true,
    configurable: true
  });
  delete TYRANO.kag.stat.is_auto;
  var is_auto = false;
  var is_auto_old = false;
  Object.defineProperty(TYRANO.kag.stat, "is_auto", {
    get: function () {
      return is_auto;
    },
    set: function (newValue) {
      is_auto = newValue;
      if (newValue) {
        monitor_stat.setAutoTrue();
      } else if (is_auto_old) {
        monitor_stat.setAutoFalse();
      }
      is_auto_old = newValue;
    },
    enumerable: true,
    configurable: true
  });
};
monitor_stat.start();

tyrano.plugin.kag.tag.monitor_stat = {
  pm: {
  },
  start: function (pm) {
    monitor_stat.start();
    this.kag.ftag.nextOrder();
  }
};

(function(tag_names){
    for (var tag_name, i = 0; i < tag_names.length; i++) {
        tag_name = tag_names[i];
        tyrano.plugin.kag.ftag.master_tag[tag_name] = object(tyrano.plugin.kag.tag[tag_name]);
        tyrano.plugin.kag.ftag.master_tag[tag_name].kag = TYRANO.kag;
    }
}(["monitor_stat"]));

}());